import { supabase } from '../supabaseClient';
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
} from '../data/decodeData';

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
   * Fetch resources with server-side filtering, searching, and pagination
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
      let req = supabase
        .from('decode_resources')
        .select('*', { count: 'exact' })
        .eq('published', true);

      if (categorySlug && categorySlug !== 'all') {
        req = req.eq('category_slug', categorySlug);
      }

      if (difficulty && difficulty !== 'All') {
        req = req.eq('difficulty', difficulty);
      }

      if (query && query.trim()) {
        const cleanQ = query.trim();
        req = req.or(`title.ilike.%${cleanQ}%,summary.ilike.%${cleanQ}%`);
      }

      req = req.order('published_date', { ascending: false });

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      req = req.range(from, to);

      const { data, count, error } = await req;

      if (!error && data && data.length > 0) {
        let mapped = data.map((r) => {
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
            tags: r.tags || [],
            author: r.author || 'Raju Perumalla',
            publishedDate: r.published_date,
            updatedDate: r.updated_date,
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
            projectSpec: r.project_spec,
            referenceInfo: r.reference_data,
            isFeatured: r.is_featured,
          };
        });

        // Filter out expired jobs from active category feed
        if (categorySlug === 'jobs' && !includeExpired) {
          mapped = mapped.filter((r) => !r.isExpired);
        }

        // Batch filter
        if (categorySlug === 'jobs' && batch && batch !== 'all') {
          const bYear = parseInt(batch, 10);
          mapped = mapped.filter((r) => Array.isArray(r.eligibleBatches) && r.eligibleBatches.includes(bYear));
        }

        return {
          data: mapped,
          total: count || mapped.length,
          page,
          totalPages: Math.ceil((count || mapped.length) / limit),
          isLiveDb: true,
          error: null,
        };
      }

      // Fallback search / jobs filter
      let fallbackData = [];
      if (categorySlug === 'jobs') {
        fallbackData = filterActiveJobs(fallbackResources, {
          batch,
          type: opportunityType,
          mode: workArrangement,
          stipend,
          query,
          includeExpired,
        });
      } else {
        fallbackData = searchFallback(query, categorySlug || 'all');
        if (difficulty !== 'All') {
          fallbackData = fallbackData.filter((r) => r.difficulty === difficulty);
        }
      }

      const paginated = fallbackData.slice((page - 1) * limit, page * limit);

      return {
        data: paginated,
        total: fallbackData.length,
        page,
        totalPages: Math.ceil(fallbackData.length / limit),
        isLiveDb: false,
        error: error ? error.message : null,
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
