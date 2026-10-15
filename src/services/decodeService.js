import { supabase } from '../supabaseClient.js';
import {
  decodeCategories as fallbackCategories,
  decodeResources as fallbackResources,
  getCategoryBySlug as getFallbackCategory,
  getResourceBySlug as getFallbackResource,
  getFeaturedResources as getFallbackFeatured,
  searchDecode as searchFallback,
  isJobExpired,
  getBatchLabel,
  filterActiveJobs,
} from '../data/decodeData.js';

export const decodeService = {
  /**
   * Fetch all active categories from Supabase (or fallback seed if awaiting SQL migration)
   */
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('decode_categories')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });

      if (error) {
        return {
          data: fallbackCategories,
          isLiveDb: false,
          error: error.message,
        };
      }

      if (data && data.length > 0) {
        const mapped = data.map((c) => ({
          id: c.slug,
          slug: c.slug,
          title: c.name,
          shortTitle: c.short_title,
          description: c.description,
          icon: c.icon,
          badge: c.badge,
          accentColor: c.accent_color,
          metaDescription: c.meta_description,
          displayOrder: c.display_order,
        }));
        return { data: mapped, isLiveDb: true, error: null };
      }

      return { data: fallbackCategories, isLiveDb: false, error: null };
    } catch (err) {
      return { data: fallbackCategories, isLiveDb: false, error: err.message };
    }
  },

  /**
   * Fetch a single category by slug
   */
  async getCategoryBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('decode_categories')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (!error && data) {
        return {
          data: {
            id: data.slug,
            slug: data.slug,
            title: data.name,
            shortTitle: data.short_title,
            description: data.description,
            icon: data.icon,
            badge: data.badge,
            accentColor: data.accent_color,
            metaDescription: data.meta_description,
          },
          isLiveDb: true,
          error: null,
        };
      }

      const fallback = getFallbackCategory(slug);
      return { data: fallback || null, isLiveDb: false, error: error ? error.message : null };
    } catch (err) {
      const fallback = getFallbackCategory(slug);
      return { data: fallback || null, isLiveDb: false, error: err.message };
    }
  },

  /**
   * Fetch resources with server-side filtering, searching, and pagination.
   * Seamlessly combines live Supabase records with local curated resources so no job is lost.
   */
  async getResources({
    categorySlug = null,
    query = '',
    difficulty = 'All',
    batch = 'all',
    opportunityType = 'all',
    workArrangement = 'all',
    stipend = 'all',
    page = 1,
    limit = 20,
    includeExpired = false,
  } = {}) {
    try {
      let dbRows = [];
      let dbError = null;

      try {
        let req = supabase
          .from('decode_resources')
          .select('*')
          .eq('published', true);

        if (categorySlug && categorySlug !== 'all') {
          req = req.eq('category_slug', categorySlug);
        }

        const { data, error } = await req;
        if (!error && data) {
          dbRows = data;
        } else if (error) {
          dbError = error.message;
        }
      } catch (e) {
        dbError = e.message;
      }

      // 1. Map Supabase records
      const dbSlugs = new Set(dbRows.map((r) => r.slug));
      const mappedDb = dbRows.map((r) => {
        const fallback = getFallbackResource(r.category_slug, r.slug);
        const rawContent = r.content || fallback?.content || null;
        const cleanContent = rawContent
          ? String(rawContent).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ')
          : null;
        const rawSummary = r.summary || fallback?.summary || '';
        const cleanSummary = String(rawSummary).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');

        const eligibleBatches = r.eligible_batches || fallback?.eligibleBatches || [];
        const expired = isJobExpired({ ...r, category: r.category_slug });

        return {
          id: r.id || r.slug,
          slug: r.slug,
          category: r.category_slug,
          title: r.title,
          summary: cleanSummary,
          content: cleanContent,
          difficulty: r.difficulty,
          readTime: r.read_time,
          tags: r.tags || fallback?.tags || [],
          author: r.author || 'Raju Perumalla',
          publishedDate: r.published_date || fallback?.publishedDate,
          updatedDate: r.updated_date || fallback?.updatedDate,
          logoKey: r.logo_key || fallback?.logoKey || null,
          sourceName: r.source_name || fallback?.sourceName || r.opportunity_data?.organization || null,
          sourceLocation: r.source_location || fallback?.sourceLocation || null,
          actionText: r.action_text || fallback?.actionText || 'View resource →',
          deadlineText: r.deadline_text || fallback?.deadlineText || r.opportunity_data?.deadline || null,
          status: r.status || (expired ? 'expired' : 'active'),
          isExpired: expired,
          applicationDeadline: r.application_deadline || fallback?.applicationDeadline,
          eligibleBatches,
          batchLabel: getBatchLabel(eligibleBatches),
          opportunityType: r.opportunity_type || fallback?.opportunityType,
          workArrangement: r.work_arrangement || fallback?.workArrangement,
          stipendAmount: r.stipend_amount || fallback?.stipendAmount,
          opportunity: r.opportunity_data || fallback?.opportunity,
          projectSpec: r.project_spec || fallback?.projectSpec,
          referenceInfo: r.reference_data || fallback?.referenceInfo,
          isFeatured: r.is_featured || fallback?.isFeatured,
        };
      });

      // 2. Collect fallback resources not already provided by Supabase
      const missingFallbacks = fallbackResources.filter((fb) => {
        if (categorySlug && categorySlug !== 'all' && fb.category !== categorySlug) {
          return false;
        }
        return !dbSlugs.has(fb.slug);
      }).map((fb) => {
        const expired = isJobExpired(fb);
        return {
          ...fb,
          isExpired: expired,
          status: fb.status || (expired ? 'expired' : 'active'),
          batchLabel: getBatchLabel(fb.eligibleBatches || []),
        };
      });

      let allItems = [...mappedDb, ...missingFallbacks];

      // 3. Search query filter
      if (query && query.trim()) {
        const cleanQ = query.trim().toLowerCase();
        allItems = allItems.filter((r) => {
          const t = (r.title || '').toLowerCase();
          const s = (r.summary || '').toLowerCase();
          const org = (r.sourceName || r.opportunity?.organization || '').toLowerCase();
          const tags = (r.tags || []).join(' ').toLowerCase();
          return t.includes(cleanQ) || s.includes(cleanQ) || org.includes(cleanQ) || tags.includes(cleanQ);
        });
      }

      // 4. Difficulty filter
      if (difficulty && difficulty !== 'All') {
        allItems = allItems.filter((r) => r.difficulty === difficulty);
      }

      // 5. Jobs-specific filters
      if (categorySlug === 'jobs') {
        if (!includeExpired) {
          allItems = allItems.filter((r) => !r.isExpired);
        }
        if (batch && batch !== 'all') {
          const bYear = parseInt(batch, 10);
          allItems = allItems.filter((r) => Array.isArray(r.eligibleBatches) && r.eligibleBatches.includes(bYear));
        }
        if (opportunityType && opportunityType !== 'all') {
          const targetType = opportunityType.toLowerCase();
          allItems = allItems.filter((r) => {
            const oppType = (r.opportunityType || r.opportunity?.jobType || '').toLowerCase();
            return oppType.includes(targetType);
          });
        }
        if (workArrangement && workArrangement !== 'all') {
          const targetMode = workArrangement.toLowerCase();
          allItems = allItems.filter((r) => {
            const mode = (r.workArrangement || r.opportunity?.workMode || '').toLowerCase();
            return mode.includes(targetMode);
          });
        }
        if (stipend === 'paid') {
          allItems = allItems.filter((r) => {
            const st = (r.stipendAmount || r.opportunity?.stipend || '').toLowerCase();
            return !st.includes('unpaid') && !st.includes('voluntary');
          });
        }
      }

      // 6. Sort newest first by publishedDate
      allItems.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.published_date || 0);
        const dateB = new Date(b.publishedDate || b.published_date || 0);
        return dateB - dateA;
      });

      // 7. Paginate
      const from = (page - 1) * limit;
      const paginated = allItems.slice(from, from + limit);

      return {
        data: paginated,
        total: allItems.length,
        page,
        totalPages: Math.ceil(allItems.length / limit) || 1,
        isLiveDb: dbRows.length > 0,
        error: dbError,
      };
    } catch (err) {
      const fallbackData = categorySlug === 'jobs'
        ? filterActiveJobs(fallbackResources, { batch, type: opportunityType, mode: workArrangement, stipend, query, includeExpired })
        : searchFallback(query, categorySlug || 'all');
      return {
        data: fallbackData,
        total: fallbackData.length,
        page: 1,
        totalPages: 1,
        isLiveDb: false,
        error: err.message,
      };
    }
  },

  /**
   * Specialized fetch method for Decode Jobs & Internships
   */
  async getJobs(filters = {}) {
    const {
      batch = 'all',
      type = 'all',
      mode = 'all',
      stipend = 'all',
      query = '',
      includeExpired = false,
    } = filters;

    // Use getResources targeting 'jobs'
    const res = await this.getResources({
      categorySlug: 'jobs',
      batch,
      opportunityType: type,
      workArrangement: mode,
      stipend,
      query,
      includeExpired,
      limit: 100,
    });

    const activeList = (res.data || []).filter((j) => !j.isExpired);

    const stats = {
      totalActive: activeList.length,
      batch2026Count: activeList.filter((j) => (j.eligibleBatches || []).includes(2026)).length,
      batch2027Count: activeList.filter((j) => (j.eligibleBatches || []).includes(2027)).length,
      internshipsCount: activeList.filter((j) => (j.opportunityType || j.opportunity?.jobType || '').toLowerCase().includes('intern')).length,
    };

    return {
      data: res.data || [],
      total: res.total,
      stats,
      isLiveDb: res.isLiveDb,
      error: res.error,
    };
  },

  /**
   * Fetch a single resource by category slug and resource slug
   */
  async getResourceBySlug(categorySlug, resourceSlug) {
    try {
      const targetSlug = resourceSlug || categorySlug;
      const targetCategory = resourceSlug ? categorySlug : null;

      if (!targetSlug) {
        return { data: null, isLiveDb: false, error: 'Missing slug' };
      }

      let query = supabase
        .from('decode_resources')
        .select('*')
        .eq('slug', targetSlug)
        .eq('published', true);

      if (targetCategory && targetCategory !== 'all') {
        query = query.eq('category_slug', targetCategory);
      }

      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        const fallback = getFallbackResource(data.category_slug, data.slug);
        const rawContent = (fallback?.content && (!data.content || data.content.length < fallback.content.length))
          ? fallback.content
          : (data.content || fallback?.content || null);
        const cleanContent = rawContent
          ? String(rawContent).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ')
          : null;
        const rawSummary = data.summary || fallback?.summary || '';
        const cleanSummary = String(rawSummary).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');

        const eligibleBatches = data.eligible_batches || fallback?.eligibleBatches || [];
        const expired = isJobExpired({ ...data, category: data.category_slug });

        return {
          data: {
            id: data.id || data.slug,
            slug: data.slug,
            category: data.category_slug,
            title: data.title,
            summary: cleanSummary,
            content: cleanContent,
            difficulty: data.difficulty,
            readTime: data.read_time,
            tags: data.tags || [],
            author: data.author || 'Raju Perumalla',
            publishedDate: data.published_date,
            updatedDate: data.updated_date,
            logoKey: data.logo_key || fallback?.logoKey || null,
            sourceName: data.source_name || fallback?.sourceName || data.opportunity_data?.organization || null,
            sourceLocation: data.source_location || fallback?.sourceLocation || null,
            actionText: data.action_text || fallback?.actionText || 'View resource →',
            deadlineText: data.deadline_text || fallback?.deadlineText || data.opportunity_data?.deadline || null,
            status: data.status || (expired ? 'expired' : 'active'),
            isExpired: expired,
            applicationDeadline: data.application_deadline || fallback?.applicationDeadline,
            eligibleBatches,
            batchLabel: getBatchLabel(eligibleBatches),
            opportunityType: data.opportunity_type || fallback?.opportunityType,
            workArrangement: data.work_arrangement || fallback?.workArrangement,
            stipendAmount: data.stipend_amount || fallback?.stipendAmount,
            opportunity: data.opportunity_data || fallback?.opportunity || null,
            projectSpec: data.project_spec || fallback?.projectSpec || null,
            referenceInfo: data.reference_data || fallback?.referenceInfo || null,
            officialUrl: data.official_url || fallback?.officialUrl || null,
          },
          isLiveDb: true,
          error: null,
        };
      }

      const fallback = getFallbackResource(targetCategory, targetSlug);
      if (fallback) {
        const expired = isJobExpired(fallback);
        return {
          data: {
            ...fallback,
            isExpired: expired,
            status: fallback.status || (expired ? 'expired' : 'active'),
            batchLabel: getBatchLabel(fallback.eligibleBatches || []),
          },
          isLiveDb: false,
          error: error ? error.message : null,
        };
      }

      return { data: null, isLiveDb: false, error: error ? error.message : null };
    } catch (err) {
      const targetSlug = resourceSlug || categorySlug;
      const targetCategory = resourceSlug ? categorySlug : null;
      const fallback = getFallbackResource(targetCategory, targetSlug);
      return { data: fallback || null, isLiveDb: false, error: err.message };
    }
  },

  /**
   * Fetch featured resources
   */
  async getFeaturedResources() {
    try {
      const { data, error } = await supabase
        .from('decode_resources')
        .select('*')
        .eq('is_featured', true)
        .eq('published', true)
        .limit(6);

      if (!error && data && data.length > 0) {
        const mapped = data.map((r) => ({
          id: r.id || r.slug,
          slug: r.slug,
          category: r.category_slug,
          title: r.title,
          summary: r.summary,
          difficulty: r.difficulty,
          readTime: r.read_time,
          tags: r.tags || [],
          publishedDate: r.published_date,
          opportunity: r.opportunity_data,
          projectSpec: r.project_spec,
        }));
        return { data: mapped, isLiveDb: true, error: null };
      }

      return { data: getFallbackFeatured(), isLiveDb: false, error: null };
    } catch (err) {
      return { data: getFallbackFeatured(), isLiveDb: false, error: err.message };
    }
  },
};

export default decodeService;
