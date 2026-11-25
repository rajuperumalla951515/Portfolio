import assert from 'node:assert/strict';
import { decodeResources } from '../src/data/decodeData.js';
import {
  filterJobs,
  getJobRoleCategory,
  getPrimaryJobCategory,
  getVerifiedEmploymentType,
  getVerifiedWorkMode,
  jobCategories,
  jobRoles,
} from '../src/data/jobTaxonomy.js';

const jobs = decodeResources.filter((resource) => resource.category === 'jobs');
const classifications = new Map();

for (const job of jobs) {
  const category = getPrimaryJobCategory(job);
  const role = getJobRoleCategory(job);
  if (!category && !role) continue;
  assert.ok(category, `Classified job ${job.slug} needs a primary category.`);
  assert.ok(role, `Classified job ${job.slug} needs a technical role.`);
  assert.ok(jobCategories.some((item) => item.slug === category), `Unknown category for ${job.slug}.`);
  assert.ok(jobRoles.some((item) => item.slug === role), `Unknown role for ${job.slug}.`);
  classifications.set(job.slug, category);
}

assert.ok(classifications.size > 0, 'At least one curated job should have verified taxonomy.');

const remoteInternship = jobs.find((job) => job.slug === 'heizen-software-development-engineer-intern');
assert.equal(getPrimaryJobCategory(remoteInternship), 'remote');
assert.equal(getVerifiedWorkMode(remoteInternship), 'Remote');
assert.equal(getVerifiedEmploymentType(remoteInternship), 'Internship');
assert.equal(filterJobs([remoteInternship], { category: 'internships' }).length, 0);
assert.equal(filterJobs([remoteInternship], { category: 'remote' }).length, 1);

const backendRoles = filterJobs(jobs, { role: 'backend-development' });
assert.deepEqual(backendRoles.map((job) => job.slug), ['hubble-software-engineering-intern-backend-data-platform']);

const apprenticeshipJobs = filterJobs(jobs, { category: 'apprenticeships' });
assert.ok(apprenticeshipJobs.length > 0);
assert.ok(apprenticeshipJobs.every((job) => getPrimaryJobCategory(job) === 'apprenticeships'));

for (const unclassifiedSlug of ['citi-sap-cte-fieldglass-senior-business-analyst', 'google-student-researcher-2027']) {
  const job = jobs.find((item) => item.slug === unclassifiedSlug);
  assert.ok(job, `Expected curated source record ${unclassifiedSlug}.`);
  assert.equal(getPrimaryJobCategory(job), null);
  assert.equal(getJobRoleCategory(job), null);
}

console.log(`Job portal taxonomy verified for ${classifications.size} curated listings.`);
