// Database Data-Access Layer for Decode
// Primary Source of Truth: Supabase PostgreSQL (decode_categories, decode_resources)
import { supabase } from '../supabaseClient';
import {
  decodeCategories as fallbackCategories,
  getCategoryBySlug as getFallbackCategory,
  getResourceBySlug as getFallbackResource,
  getFeaturedResources as getFallbackFeatured,
  searchDecode as searchFallback,
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
        // Table not created yet or network error
        return {
          data: fallbackCategories,
          isLiveDb: false,
          error: error.message,
        };
      }

      if (data && data.length > 0) {
        // Map snake_case columns to camelCase expected by components
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

      // Fallback if not migrated yet
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
    page = 1,
    limit = 20,
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
        const mapped = data.map((r) => {
          const fallback = getFallbackResource(r.category_slug, r.slug);
          const rawContent = r.content || fallback?.content || null;
          const cleanContent = rawContent
            ? String(rawContent).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ')
            : null;
          const rawSummary = r.summary || fallback?.summary || '';
          const cleanSummary = String(rawSummary).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');

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
            opportunity: r.opportunity_data,
            projectSpec: r.project_spec,
            referenceInfo: r.reference_data,
            isFeatured: r.is_featured,
          };
        });

        return {
          data: mapped,
          total: count || mapped.length,
          page,
          totalPages: Math.ceil((count || mapped.length) / limit),
          isLiveDb: true,
          error: null,
        };
      }

      // Fallback search
      const fallbackData = searchFallback(query, categorySlug || 'all');
      const filteredByDiff =
        difficulty === 'All'
          ? fallbackData
          : fallbackData.filter((r) => r.difficulty === difficulty);

      const paginated = filteredByDiff.slice((page - 1) * limit, page * limit);

      return {
        data: paginated,
        total: filteredByDiff.length,
        page,
        totalPages: Math.ceil(filteredByDiff.length / limit),
        isLiveDb: false,
        error: error ? error.message : null,
      };
    } catch (err) {
      const fallbackData = searchFallback(query, categorySlug || 'all');
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
        // If live DB has a truncated version or lacks full stages, prefer rich fallback content
        const rawContent = (fallback?.content && (!data.content || data.content.length < fallback.content.length))
          ? fallback.content
          : (data.content || fallback?.content || null);
        const cleanContent = rawContent
          ? String(rawContent).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ')
          : null;
        const rawSummary = data.summary || fallback?.summary || '';
        const cleanSummary = String(rawSummary).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');

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
      return { data: fallback || null, isLiveDb: false, error: error ? error.message : null };
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
