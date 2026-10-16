const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category_slug: { type: String, default: 'jobs', index: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    difficulty: { type: String, default: 'Fresher / Entry Level' },
    read_time: { type: String, default: '5 min read' },
    author: { type: String, default: 'Raju Perumalla' },
    published_date: { type: String },
    updated_date: { type: String },
    tags: [{ type: String }],
    is_featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    status: { type: String, default: 'active', index: true }, // 'active', 'expired', 'closed'
    application_deadline: { type: String, default: null },
    eligible_batches: [{ type: Number }],
    experience_level: { type: String, default: 'Fresher' },
    opportunity_type: { type: String, default: 'Internship' }, // 'Internship', 'Apprenticeship', 'Full-time'
    work_arrangement: { type: String, default: 'Remote' }, // 'Remote', 'Hybrid', 'On-site'
    stipend_amount: { type: String },
    is_stipend_paid: { type: Boolean, default: true },
    salary_currency: { type: String, default: 'INR' },
    source_platform: { type: String, default: 'official' },
    source_name: { type: String },
    source_location: { type: String },
    action_text: { type: String, default: 'Apply now →' },
    deadline_text: { type: String },
    canonical_url: { type: String },
    official_url: { type: String },
    last_verified_at: { type: Date, default: Date.now },
    verification_notes: { type: String },
    opportunity_data: {
      organization: String,
      role: String,
      eligibility: String,
      deadline: String,
      location: String,
      workMode: String,
      jobType: String,
      stipend: String,
      officialUrl: String,
      isVerified: { type: Boolean, default: true },
    },
    project_spec: { type: mongoose.Schema.Types.Mixed, default: null },
    reference_data: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Indexes for fast querying & filtering
JobSchema.index({ status: 1, application_deadline: 1 });
JobSchema.index({ eligible_batches: 1 });
JobSchema.index({ canonical_url: 1 });

module.exports = mongoose.model('Job', JobSchema);
