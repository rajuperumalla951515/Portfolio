require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const fs = require('fs');
const path = require('path');

async function syncAll() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://rajuperumallar_db_user:1VIYaU1jw5XXWZaa@cluster0.ynqnk1f.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const filePath = path.resolve(__dirname, '../src/data/decodeData.js');
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract decodeResources array
    const match = content.match(/export const decodeResources = (\[[\s\S]*?\]);/);
    if (!match) {
      console.error('Could not parse decodeResources');
      return;
    }

    const decodeResources = new Function('return ' + match[1])();
    const jobs = decodeResources.filter((r) => r.category === 'jobs');
    console.log(`Found ${jobs.length} jobs in decodeData.js to sync.`);

    for (const j of jobs) {
      const doc = {
        slug: j.slug,
        category_slug: 'jobs',
        title: j.title,
        summary: j.summary,
        content: j.content,
        difficulty: j.difficulty,
        read_time: j.readTime,
        author: j.author || 'Raju Perumalla',
        published_date: j.publishedDate,
        updated_date: j.updatedDate,
        tags: j.tags || [],
        is_featured: j.isFeatured || false,
        published: true,
        status: j.status || 'active',
        application_deadline: j.applicationDeadline || null,
        eligible_batches: j.eligibleBatches || [],
        experience_level: 'Fresher',
        opportunity_type: j.opportunityType || 'Internship',
        work_arrangement: j.workArrangement || 'Remote',
        stipend_amount: j.stipendAmount,
        is_stipend_paid: true,
        source_name: j.sourceName,
        source_location: j.sourceLocation,
        action_text: j.actionText || 'Apply now →',
        deadline_text: j.deadlineText,
        canonical_url: j.opportunity?.officialUrl,
        official_url: j.opportunity?.officialUrl,
        opportunity_data: j.opportunity,
      };

      await Job.findOneAndUpdate(
        { slug: j.slug },
        { $set: doc },
        { upsert: true, returnDocument: 'after' }
      );
      console.log(`Synced: ${j.slug}`);
    }

    const total = await Job.countDocuments();
    console.log(`Total jobs stored in MongoDB database: ${total}`);
  } catch (err) {
    console.error('Sync error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

syncAll();
