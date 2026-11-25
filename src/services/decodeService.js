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
import {
  filterJobs,
  getJobRoleCategory,
  getPrimaryJobCategory,
  getVerifiedEmploymentType,
  getVerifiedWorkMode,
} from '../data/jobTaxonomy.js';

export const getApiUrl = () => {
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_URL : null;
  if (envUrl) return envUrl.replace(/\/+$/, '');
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }
  return 'https://portfolio-crql.onrender.com';
};

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
    const effectiveSlug = slug === 'internships' ? 'jobs' : slug;
    try {
      const { data, error } = await supabase
        .from('decode_categories')
        .select('*')
        .eq('slug', effectiveSlug)
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

      const fallback = getFallbackCategory(effectiveSlug);
      return { data: fallback || null, isLiveDb: false, error: error ? error.message : null };
    } catch (err) {
      const fallback = getFallbackCategory(effectiveSlug);
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
    skipApi = false,
    excludeJobs = false,
  } = {}) {
    const effectiveCategory = categorySlug === 'internships' ? 'jobs' : categorySlug;

    // When querying jobs, prioritize fetching live from backend database API
    if (effectiveCategory === 'jobs' && !skipApi) {
      const jobsRes = await this.getJobs({
        batch,
        type: opportunityType,
        mode: workArrangement,
        stipend,
        query,
        includeExpired,
      });
      return {
        data: jobsRes.data,
        total: jobsRes.total,
        page: 1,
        totalPages: 1,
        isLiveDb: jobsRes.isLiveDb,
        error: jobsRes.error,
      };
    }

    try {
      let dbRows = [];
      let dbError = null;

      try {
        let req = supabase
          .from('decode_resources')
          .select('*')
          .eq('published', true);

        if (effectiveCategory && effectiveCategory !== 'all') {
          req = req.eq('category_slug', effectiveCategory);
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
      if (excludeJobs) {
        allItems = allItems.filter((item) => item.category !== 'jobs');
      }

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
      if (effectiveCategory === 'jobs') {
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
            const oppType = `${r.opportunityType || ''} ${r.opportunity?.jobType || ''}`.toLowerCase();
            if (targetType === 'internship') {
              return oppType.includes('intern') || oppType.includes('apprentice') || oppType.includes('trainee');
            }
            if (targetType === 'full-time') {
              return oppType.includes('full-time') || oppType.includes('full time') || oppType.includes('fte');
            }
            if (targetType === 'trainee') {
              return oppType.includes('trainee') || oppType.includes('apprentice');
            }
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
   * Fetches directly from the backend API server (/api/jobs) which queries the database.
   */
  async getJobs(filters = {}) {
    const {
      batch = 'all',
      type = 'all',
      mode = 'all',
      stipend = 'all',
      query = '',
      includeExpired = false,
      category = 'all',
      role = 'all',
      sort = 'recent',
    } = filters;

    // 1. PRIMARY SOURCE: Attempt to fetch live from backend API server (/api/jobs) with fast timeout
    let apiJobs = [];
    let isLiveDb = false;
    let apiError = null;
    const apiUrl = getApiUrl();
    let timeoutId = null;

    try {
      const qParams = new URLSearchParams({
        batch,
        type,
        mode,
        stipend,
        search: query,
        category,
        role,
        location: filters.location || '',
        workMode: filters.workMode || '',
        experience: filters.experience || '',
        company: filters.company || '',
        postedWithin: filters.postedWithin || '',
        deadline: filters.deadline || '',
        compensation: filters.compensation || '',
        duration: filters.duration || '',
        domain: filters.domain || '',
        graduationYear: filters.graduationYear || '',
        degree: filters.degree || '',
        branch: filters.branch || '',
        trainingProgram: filters.trainingProgram || '',
        apprenticeshipProgram: filters.apprenticeshipProgram || '',
        remoteEligibility: filters.remoteEligibility || '',
        timezone: filters.timezone || '',
        employmentType: filters.employmentType || '',
        skills: filters.skills || '',
        sort,
        includeExpired: String(includeExpired),
        limit: '100',
      });

      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null;

      const response = await fetch(`${apiUrl}/api/jobs?${qParams.toString()}`, {
        signal: controller?.signal,
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          isLiveDb = true;
          apiJobs = json.data.map((j) => {
            const fallback = getFallbackResource('jobs', j.slug);
            const rawContent = j.content || fallback?.content || null;
            const cleanContent = rawContent
              ? String(rawContent).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ')
              : null;
            const rawSummary = j.summary || fallback?.summary || '';
            const cleanSummary = String(rawSummary).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');

            const eligibleBatches = Array.isArray(j.effectiveBatches) && j.effectiveBatches.length > 0
              ? j.effectiveBatches
              : Array.isArray(j.eligible_batches) && j.eligible_batches.length > 0
              ? j.eligible_batches
              : fallback?.eligibleBatches || [];

            const expired = Boolean(j.isExpired || j.status === 'expired' || j.status === 'closed');

            return {
              id: j._id || j.id || j.slug,
              slug: j.slug,
              category: 'jobs',
              title: j.title,
              summary: cleanSummary,
              content: cleanContent,
              difficulty: j.difficulty || fallback?.difficulty || 'Fresher / Entry Level',
              readTime: j.read_time || j.readTime || fallback?.readTime || '5 min read',
              tags: j.tags || fallback?.tags || [],
              author: j.author || fallback?.author || 'Raju Perumalla',
              publishedDate: j.published_date || fallback?.publishedDate,
              updatedDate: j.updated_date || fallback?.updatedDate,
              logoKey: j.logo_key || fallback?.logoKey || null,
              sourceName: fallback?.sourceName || j.source_name || j.opportunity_data?.organization || null,
              sourceLocation: fallback?.sourceLocation || j.opportunity_data?.location || j.source_location || null,
              actionText: j.action_text || fallback?.actionText || 'Apply now →',
              deadlineText: fallback?.deadlineText || j.deadlineText || j.deadline_text || null,
              status: j.computedStatus || j.status || (expired ? 'expired' : 'active'),
              isExpired: expired,
              applicationDeadline: j.application_deadline || fallback?.applicationDeadline,
              eligibleBatches,
              batchLabel: j.batchLabel || getBatchLabel(eligibleBatches),
              opportunityType: fallback?.opportunityType || getVerifiedEmploymentType(j),
              workArrangement: fallback?.workArrangement || getVerifiedWorkMode(j),
              stipendAmount: fallback?.stipendAmount || j.stipend_amount || j.opportunity_data?.stipend || null,
              opportunity: fallback?.opportunity || j.opportunity_data || null,
              primaryCategory: getPrimaryJobCategory(j) || getPrimaryJobCategory(fallback),
              roleCategory: getJobRoleCategory(j) || getJobRoleCategory(fallback),
              experienceLevel: fallback?.experienceLevel || (j.experience_level && j.experience_level !== 'Fresher' ? j.experience_level : null),
              duration: j.duration || fallback?.opportunity?.duration || null,
              internshipDomain: j.internship_domain || fallback?.opportunity?.internshipDomain || null,
              degreeRequirements: j.degree_requirements || fallback?.opportunity?.degreeRequirements || null,
              branchEligibility: j.branch_eligibility || fallback?.opportunity?.branchEligibility || null,
              trainingProgram: j.training_program || fallback?.opportunity?.trainingProgram || null,
              apprenticeshipProgram: j.apprenticeship_program || fallback?.opportunity?.apprenticeshipProgram || null,
              remoteLocationEligibility: j.remote_location_eligibility || fallback?.opportunity?.remoteLocationEligibility || null,
              timezone: j.timezone || fallback?.opportunity?.timezone || null,
              officialUrl: j.official_url || j.opportunity_data?.officialUrl || fallback?.opportunity?.officialUrl || null,
              projectSpec: j.project_spec || fallback?.projectSpec,
              referenceInfo: j.reference_data || fallback?.referenceInfo,
              isFeatured: j.is_featured || fallback?.isFeatured,
            };
          });
        } else {
          apiError = json.message || 'The job service returned an invalid response.';
        }
      } else {
        apiError = `The job service returned HTTP ${response.status}.`;
      }
    } catch (err) {
      console.warn('Backend API /api/jobs fetch error or timeout, merging with curated fallback resources:', err.message);
      apiError = 'The live job service is unavailable.';
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }

    // 2. MERGE WITH ALL CURATED FALLBACK RESOURCES:
    // Ensures all jobs in decodeData.js (including Recruit CRM, IBM, Salesforce, Honeywell, PwC, HSBC, Standard Chartered, etc.) are always present
    const apiJobSlugs = new Set(apiJobs.map((j) => j.slug));
    const missingCuratedJobs = fallbackResources
      .filter((fb) => fb.category === 'jobs' && !apiJobSlugs.has(fb.slug))
      .map((fb) => {
        const expired = isJobExpired(fb);
        return {
          ...fb,
          category: 'jobs',
          primaryCategory: getPrimaryJobCategory(fb),
          roleCategory: getJobRoleCategory(fb),
          status: fb.status || (expired ? 'expired' : 'active'),
          isExpired: expired,
          batchLabel: fb.batchLabel || getBatchLabel(fb.eligibleBatches || []),
        };
      });

    let allJobs = [...apiJobs, ...missingCuratedJobs];

    allJobs = allJobs.filter((job) => getPrimaryJobCategory(job) && getJobRoleCategory(job));

    // 3. APPLY CLIENT-SIDE FILTERS
    if (!includeExpired) {
      allJobs = allJobs.filter((j) => !j.isExpired && j.status !== 'expired' && j.status !== 'closed');
    }

    if (batch && batch !== 'all') {
      const bYear = parseInt(batch, 10);
      allJobs = allJobs.filter((j) => Array.isArray(j.eligibleBatches) && j.eligibleBatches.includes(bYear));
    }

    if (type && type !== 'all') {
      const targetType = type.toLowerCase();
      allJobs = allJobs.filter((j) => {
        const oppType = `${j.opportunityType || ''} ${j.opportunity?.jobType || ''}`.toLowerCase();
        if (targetType === 'internship') {
          return oppType.includes('intern') || oppType.includes('apprentice') || oppType.includes('trainee');
        }
        if (targetType === 'full-time') {
          return oppType.includes('full-time') || oppType.includes('full time') || oppType.includes('fte');
        }
        if (targetType === 'trainee') {
          return oppType.includes('trainee') || oppType.includes('apprentice');
        }
        return oppType.includes(targetType);
      });
    }

    if (mode && mode !== 'all') {
      const targetMode = mode.toLowerCase();
      allJobs = allJobs.filter((j) => {
        const workMode = (j.workArrangement || j.opportunity?.workMode || '').toLowerCase();
        return workMode.includes(targetMode);
      });
    }

    if (stipend === 'paid') {
      allJobs = allJobs.filter((j) => {
        const st = (j.stipendAmount || j.opportunity?.stipend || '').toLowerCase();
        return !st.includes('unpaid') && !st.includes('voluntary');
      });
    }

    if (query && query.trim()) {
      const cleanQ = query.trim().toLowerCase();
      allJobs = allJobs.filter((j) => {
        const inTitle = j.title?.toLowerCase().includes(cleanQ);
        const inSummary = j.summary?.toLowerCase().includes(cleanQ);
        const inTags = Array.isArray(j.tags) && j.tags.some((t) => t.toLowerCase().includes(cleanQ));
        const inOrg = (j.sourceName || j.opportunity?.organization || '')?.toLowerCase().includes(cleanQ);
        const inRole = (j.opportunity?.role || j.opportunity_data?.role || '')?.toLowerCase().includes(cleanQ);
        const inEligibility = (j.opportunity?.eligibility || j.opportunity_data?.eligibility || '')?.toLowerCase().includes(cleanQ);
        return inTitle || inSummary || inTags || inOrg || inRole || inEligibility;
      });
    }

    allJobs = filterJobs(allJobs, {
      ...filters,
      category,
      role,
      query,
      sort,
    });

    // 4. SORT BY MOST RECENT PUBLISHED / UPDATED DATE
    if (sort === 'closing_soon') {
      allJobs.sort((a, b) => {
        const dateA = a.applicationDeadline || a.application_deadline || a.opportunity?.deadline;
        const dateB = b.applicationDeadline || b.application_deadline || b.opportunity?.deadline;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return new Date(dateA) - new Date(dateB);
      });
    }

    const activeList = allJobs.filter((j) => !j.isExpired);
    const computedStats = {
      totalActive: activeList.length,
      batch2026Count: activeList.filter((j) => (j.eligibleBatches || []).includes(2026)).length,
      batch2027Count: activeList.filter((j) => (j.eligibleBatches || []).includes(2027)).length,
      internshipsCount: activeList.filter((j) => (j.opportunityType || j.opportunity?.jobType || '').toLowerCase().includes('intern')).length,
    };

    return {
      data: allJobs,
      total: allJobs.length,
      stats: computedStats,
      isLiveDb: isLiveDb || apiJobs.length > 0,
      error: apiError,
    };
  },

  /**
   * Fetch a single resource by category slug and resource slug
   */
  async getResourceBySlug(categorySlug, resourceSlug) {
    try {
      const effectiveCategory = (categorySlug === 'internships' ? 'jobs' : categorySlug) || null;
      const targetSlug = resourceSlug || categorySlug;
      const targetCategory = resourceSlug ? effectiveCategory : null;

      if (!targetSlug) {
        return { data: null, isLiveDb: false, error: 'Missing slug' };
      }

      // If querying a job opportunity, prioritize fetching live from backend API (/api/jobs/:slug)
      if (targetCategory === 'jobs' || !targetCategory) {
        const apiUrl = getApiUrl();
        try {
          const apiRes = await fetch(`${apiUrl}/api/jobs/${targetSlug}`);
          if (apiRes.ok) {
            const json = await apiRes.json();
            if (json.success && json.data) {
              const data = json.data;
              const fallback = getFallbackResource('jobs', data.slug);
              if (!getPrimaryJobCategory(data) && !getPrimaryJobCategory(fallback)) {
                return { data: null, isLiveDb: false, error: 'Job opportunity has no verified category.' };
              }
              if (!getJobRoleCategory(data) && !getJobRoleCategory(fallback)) {
                return { data: null, isLiveDb: false, error: 'Job opportunity has no verified role category.' };
              }
              const rawContent = data.content || fallback?.content || null;
              const cleanContent = rawContent
                ? String(rawContent).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '  ')
                : null;
              const rawSummary = data.summary || fallback?.summary || '';
              const cleanSummary = String(rawSummary).replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');
              const eligibleBatches = Array.isArray(data.effectiveBatches) && data.effectiveBatches.length > 0
                ? data.effectiveBatches
                : Array.isArray(data.eligible_batches) && data.eligible_batches.length > 0
                ? data.eligible_batches
                : fallback?.eligibleBatches || [];
              const expired = Boolean(data.isExpired || data.status === 'expired' || data.status === 'closed');

              return {
                data: {
                  id: data._id || data.id || data.slug,
                  slug: data.slug,
                  category: 'jobs',
                  title: data.title,
                  summary: cleanSummary,
                  content: cleanContent,
                  difficulty: data.difficulty || fallback?.difficulty || 'Fresher / Entry Level',
                  readTime: data.read_time || data.readTime || fallback?.readTime || '5 min read',
                  tags: data.tags || fallback?.tags || [],
                  author: data.author || fallback?.author || 'Raju Perumalla',
                  publishedDate: data.published_date || fallback?.publishedDate,
                  updatedDate: data.updated_date || fallback?.updatedDate,
                  logoKey: data.logo_key || fallback?.logoKey || null,
                  sourceName: fallback?.sourceName || data.source_name || data.opportunity_data?.organization || null,
                  sourceLocation: fallback?.sourceLocation || data.opportunity_data?.location || data.source_location || null,
                  actionText: data.action_text || fallback?.actionText || 'Apply now →',
                  deadlineText: data.deadlineText || data.deadline_text || fallback?.deadlineText || null,
                  status: data.computedStatus || data.status || (expired ? 'expired' : 'active'),
                  isExpired: expired,
                  applicationDeadline: data.application_deadline || fallback?.applicationDeadline,
                  eligibleBatches,
                  batchLabel: data.batchLabel || getBatchLabel(eligibleBatches),
                  opportunityType: fallback?.opportunityType || getVerifiedEmploymentType(data),
                  workArrangement: fallback?.workArrangement || getVerifiedWorkMode(data),
                  stipendAmount: fallback?.stipendAmount || data.stipend_amount || data.opportunity_data?.stipend || null,
                  experienceLevel: fallback?.experienceLevel || (data.experience_level && data.experience_level !== 'Fresher' ? data.experience_level : null),
                  primaryCategory: getPrimaryJobCategory(data) || getPrimaryJobCategory(fallback),
                  roleCategory: getJobRoleCategory(data) || getJobRoleCategory(fallback),
                  duration: data.duration || fallback?.opportunity?.duration || null,
                  internshipDomain: data.internship_domain || fallback?.opportunity?.internshipDomain || null,
                  degreeRequirements: data.degree_requirements || fallback?.opportunity?.degreeRequirements || null,
                  branchEligibility: data.branch_eligibility || fallback?.opportunity?.branchEligibility || null,
                  trainingProgram: data.training_program || fallback?.opportunity?.trainingProgram || null,
                  apprenticeshipProgram: data.apprenticeship_program || fallback?.opportunity?.apprenticeshipProgram || null,
                  remoteLocationEligibility: data.remote_location_eligibility || fallback?.opportunity?.remoteLocationEligibility || null,
                  timezone: data.timezone || fallback?.opportunity?.timezone || null,
                  opportunity: fallback?.opportunity || data.opportunity_data || null,
                  projectSpec: data.project_spec || fallback?.projectSpec || null,
                  referenceInfo: data.reference_data || fallback?.referenceInfo || null,
                  officialUrl: data.official_url || data.canonical_url || fallback?.opportunity?.officialUrl || null,
                },
                isLiveDb: true,
                error: null,
              };
            }
          }
        } catch (apiErr) {
          console.warn('Backend API /api/jobs/:slug fetch skipped, continuing to DB/fallback:', apiErr.message);
        }
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
        if (data.category_slug === 'jobs' && (
          (!getPrimaryJobCategory(data) && !getPrimaryJobCategory(fallback)) ||
          (!getJobRoleCategory(data) && !getJobRoleCategory(fallback))
        )) {
          return { data: null, isLiveDb: false, error: 'Job opportunity has no verified category and role classification.' };
        }
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
        if (targetCategory === 'jobs' && (!getPrimaryJobCategory(fallback) || !getJobRoleCategory(fallback))) {
          return { data: null, isLiveDb: false, error: 'Job opportunity has no verified category and role classification.' };
        }
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
