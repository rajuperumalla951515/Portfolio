import taxonomy from '../../shared/job-taxonomy.json' with { type: 'json' };

export const jobCategories = taxonomy.categories;
export const jobRoles = taxonomy.roles;
export const savedJobsSlug = 'saved';

const categorySlugs = new Set(jobCategories.map(({ slug }) => slug));
const roleSlugs = new Set(jobRoles.map(({ slug }) => slug));

export const getPrimaryJobCategory = (job) => {
  const explicit = job?.primaryCategory || job?.primary_category;
  const curated = taxonomy.bySlug[job?.slug]?.primaryCategory;
  if ((categorySlugs.has(explicit) || curated) && getVerifiedWorkMode(job) === 'Remote') return 'remote';
  if (categorySlugs.has(explicit)) return explicit;
  return curated || null;
};

export const getJobRoleCategory = (job) => {
  const explicit = job?.roleCategory || job?.role_category;
  if (roleSlugs.has(explicit)) return explicit;
  return taxonomy.bySlug[job?.slug]?.roleCategory || null;
};

export const getVerifiedWorkMode = (job) => (
  taxonomy.verifiedWorkModes[job?.slug] ||
  job?.workArrangement ||
  job?.work_arrangement ||
  job?.opportunity?.workMode ||
  job?.opportunity_data?.workMode ||
  null
);

export const getVerifiedEmploymentType = (job) => (
  taxonomy.verifiedEmploymentTypes[job?.slug] ||
  job?.opportunityType ||
  job?.opportunity_type ||
  job?.opportunity?.jobType ||
  job?.opportunity_data?.jobType ||
  null
);

const valueOf = (job, camelCase, snakeCase, opportunityField) => (
  job?.[camelCase] ??
  job?.[snakeCase] ??
  job?.opportunity?.[opportunityField] ??
  job?.opportunity_data?.[opportunityField] ??
  ''
);

const includesText = (value, query) => String(value || '').toLowerCase().includes(query);

const jobDate = (job) => (
  job?.publishedDate ||
  job?.published_date ||
  job?.created_at ||
  null
);

const hasCompensation = (job) => {
  const compensation = [
    job?.stipendAmount,
    job?.stipend_amount,
    job?.opportunity?.stipend,
    job?.opportunity_data?.stipend,
    ...(Array.isArray(job?.tags) ? job.tags : []),
  ].join(' ').toLowerCase();
  return Boolean(compensation) &&
    !compensation.includes('unpaid') &&
    !compensation.includes('voluntary');
};

const hasUnpaidEvidence = (job) => {
  const compensation = [
    job?.stipendAmount,
    job?.stipend_amount,
    job?.opportunity?.stipend,
    job?.opportunity_data?.stipend,
    ...(Array.isArray(job?.tags) ? job.tags : []),
  ].join(' ').toLowerCase();
  return compensation.includes('unpaid') || compensation.includes('voluntary');
};

const hasDeadline = (job) => {
  const deadline = valueOf(job, 'applicationDeadline', 'application_deadline', 'deadline');
  if (!deadline || /rolling|open until filled/i.test(String(deadline))) return false;
  return !Number.isNaN(new Date(deadline).getTime());
};

const isRollingDeadline = (job) => {
  const deadline = valueOf(job, 'applicationDeadline', 'application_deadline', 'deadline');
  return Boolean(deadline && /rolling|open until filled/i.test(String(deadline)));
};

export const filterJobs = (jobs, filters = {}) => {
  const normalizedQuery = String(filters.query || '').trim().toLowerCase();
  const filtered = jobs.filter((job) => {
    if (filters.category && filters.category !== 'all' && getPrimaryJobCategory(job) !== filters.category) return false;
    if (filters.role && filters.role !== 'all' && getJobRoleCategory(job) !== filters.role) return false;

    if (normalizedQuery) {
      const searchable = [
        job.title,
        job.summary,
        job.sourceName,
        job.source_name,
        job.opportunity?.organization,
        job.opportunity_data?.organization,
        job.opportunity?.role,
        job.opportunity_data?.role,
        job.opportunity?.eligibility,
        job.opportunity_data?.eligibility,
        ...(Array.isArray(job.tags) ? job.tags : []),
      ].join(' ').toLowerCase();
      if (!searchable.includes(normalizedQuery)) return false;
    }

    const checks = [
      ['location', job?.opportunity?.location || job?.opportunity_data?.location || job?.sourceLocation || job?.source_location || (job?.tags || []).join(' ')],
      ['workMode', valueOf(job, 'workArrangement', 'work_arrangement', 'workMode')],
      ['experience', valueOf(job, 'experienceLevel', 'experience_level', 'experienceLevel')],
      ['company', job.sourceName || job.source_name || job.opportunity?.organization || job.opportunity_data?.organization],
      ['duration', valueOf(job, 'duration', 'duration', 'duration')],
      ['domain', valueOf(job, 'internshipDomain', 'internship_domain', 'internshipDomain')],
      ['degree', valueOf(job, 'degreeRequirements', 'degree_requirements', 'degreeRequirements') || job.opportunity?.eligibility || job.opportunity_data?.eligibility],
      ['branch', valueOf(job, 'branchEligibility', 'branch_eligibility', 'branchEligibility') || job.opportunity?.eligibility || job.opportunity_data?.eligibility],
      ['trainingProgram', valueOf(job, 'trainingProgram', 'training_program', 'trainingProgram')],
      ['apprenticeshipProgram', valueOf(job, 'apprenticeshipProgram', 'apprenticeship_program', 'apprenticeshipProgram') || (job.tags || []).join(' ')],
      ['remoteEligibility', valueOf(job, 'remoteLocationEligibility', 'remote_location_eligibility', 'remoteLocationEligibility')],
      ['timezone', valueOf(job, 'timezone', 'timezone', 'timezone')],
      ['employmentType', valueOf(job, 'opportunityType', 'opportunity_type', 'jobType')],
      ['skills', (job.tags || []).join(' ')],
    ];

    for (const [filterName, fieldValue] of checks) {
      const filterValue = String(filters[filterName] || '').trim().toLowerCase();
      if (filterValue && !includesText(fieldValue, filterValue)) return false;
    }

    if (filters.compensation === 'paid' && !hasCompensation(job)) return false;
    if (filters.compensation === 'unpaid' && !hasUnpaidEvidence(job)) return false;

    if (filters.graduationYear) {
      const year = Number(filters.graduationYear);
      const batches = job.eligibleBatches || job.eligible_batches || [];
      if (!batches.includes(year)) return false;
    }

    if (filters.deadline === 'dated' && !hasDeadline(job)) return false;
    if (filters.deadline === 'rolling' && !isRollingDeadline(job)) return false;

    if (filters.postedWithin) {
      const postedAt = jobDate(job);
      const days = Number(filters.postedWithin);
      if (!postedAt || !Number.isFinite(days)) return false;
      const age = Date.now() - new Date(postedAt).getTime();
      if (!Number.isFinite(age) || age < 0 || age > days * 24 * 60 * 60 * 1000) return false;
    }

    return true;
  });

  if (filters.sort === 'closing_soon') {
    filtered.sort((a, b) => {
      const aDeadline = valueOf(a, 'applicationDeadline', 'application_deadline', 'deadline');
      const bDeadline = valueOf(b, 'applicationDeadline', 'application_deadline', 'deadline');
      if (!aDeadline) return 1;
      if (!bDeadline) return -1;
      return new Date(aDeadline) - new Date(bDeadline);
    });
  } else {
    filtered.sort((a, b) => new Date(jobDate(b) || 0) - new Date(jobDate(a) || 0));
  }

  return filtered;
};
