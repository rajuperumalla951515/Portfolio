require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Contact = require('./models/Contact');
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (optional backup)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => console.error('MongoDB connection error (Supabase will be primary):', err.message));

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running with Supabase & MongoDB!' });
});

// Decode Platform API Endpoints (Supabase-backed)
app.get('/api/decode/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('decode_categories')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    res.json({ success: true, data: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/decode/resources', async (req, res) => {
  try {
    const { category, search, difficulty, page = 1, limit = 20 } = req.query;
    let query = supabase
      .from('decode_resources')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (category && category !== 'all') {
      query = query.eq('category_slug', category);
    }
    if (difficulty && difficulty !== 'All') {
      query = query.eq('difficulty', difficulty);
    }
    if (search && search.trim()) {
      const q = search.trim();
      query = query.or(`title.ilike.%${q}%,summary.ilike.%${q}%`);
    }

    query = query.order('published_date', { ascending: false });

    const from = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const to = from + parseInt(limit, 10) - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({
      success: true,
      data: data || [],
      total: count || 0,
      page: parseInt(page, 10),
      totalPages: Math.ceil((count || 0) / parseInt(limit, 10)),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/decode/resources/:categorySlug/:slug', async (req, res) => {
  try {
    const { categorySlug, slug } = req.params;
    const { data, error } = await supabase
      .from('decode_resources')
      .select('*')
      .eq('category_slug', categorySlug)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    if (!data) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// SECURE FIRST-PARTY OUTBOUND REDIRECT & ATTRIBUTION SYSTEM
// -------------------------------------------------------------
app.get('/go/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.redirect(302, 'https://www.rajuperumalla.in/decode');
    }

    // 1. Resolve from Supabase database
    const { data: resource } = await supabase
      .from('decode_resources')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    let destinationUrl = resource?.opportunity_data?.officialUrl || resource?.official_url || null;

    // Fallback dictionary for verified destinations
    if (!destinationUrl) {
      const fallbackDestinations = {
        'clearview-healthcare-data-analyst-advanced-analytics': 'https://www.clearviewhcp.com/careers/',
        'google-summer-of-code-internship-guide': 'https://summerofcode.withgoogle.com/',
        'microsoft-software-engineering-internship-2026': 'https://careers.microsoft.com/',
        'lfx-mentorship-open-source-internship': 'https://lfx.linuxfoundation.org/tools/mentorship/',
        'mlh-fellowship-software-engineering': 'https://fellowship.mlh.io/',
        'smart-india-hackathon-sih-strategy': 'https://www.sih.gov.in/',
        'sap-innovation-marathon-guide': 'https://www.sap.com/',
        'fastapi-production-handbook': 'https://fastapi.tiangolo.com/',
        'full-stack-system-design-primer': 'https://github.com/donnemartin/system-design-primer',
        'docker-containerization-guide': 'https://docs.docker.com/',
      };
      destinationUrl = fallbackDestinations[slug];
    }

    if (!destinationUrl) {
      return res.redirect(302, 'https://www.rajuperumalla.in/decode');
    }

    // 2. Validate destination URL strictly (Prevent open redirect)
    let parsedUrl;
    try {
      parsedUrl = new URL(destinationUrl);
      if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
        return res.status(400).send('Invalid destination protocol');
      }
    } catch {
      return res.redirect(302, 'https://www.rajuperumalla.in/decode');
    }

    // 3. Attach UTM parameters without overwriting existing query parameters
    if (!parsedUrl.searchParams.has('utm_source')) {
      parsedUrl.searchParams.set('utm_source', 'rajuperumalla.in');
    }
    if (!parsedUrl.searchParams.has('utm_medium')) {
      parsedUrl.searchParams.set('utm_medium', 'referral');
    }
    if (!parsedUrl.searchParams.has('utm_campaign')) {
      parsedUrl.searchParams.set('utm_campaign', 'decode');
    }

    const finalUrl = parsedUrl.toString();
    const domain = parsedUrl.hostname.replace(/^www\./, '');

    // 4. Record outbound click asynchronously in Supabase
    const referrer = req.get('referrer') || req.get('referer') || null;
    const isMobile = /Mobi|Android/i.test(req.get('user-agent') || '');

    supabase.from('decode_outbound_clicks').insert([{
      resource_slug: slug,
      category_slug: resource?.category_slug || 'jobs',
      resource_title: resource?.title || slug,
      destination_domain: domain,
      destination_url: destinationUrl,
      referrer,
      utm_source: 'rajuperumalla.in',
      utm_medium: 'referral',
      utm_campaign: 'decode',
      user_agent_type: isMobile ? 'mobile' : 'desktop',
    }]).then(() => {}).catch(err => console.warn('Outbound click record failed:', err.message));

    // 5. Temporary 302 redirect so subsequent visits continue to be recorded
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.redirect(302, finalUrl);
  } catch (err) {
    return res.redirect(302, 'https://www.rajuperumalla.in/decode');
  }
});

// Outbound Click Tracking API
app.post('/api/decode/track-click', async (req, res) => {
  try {
    const { resource_slug, category_slug, resource_title, destination_url, referrer } = req.body;
    if (!resource_slug || !destination_url) {
      return res.status(400).json({ success: false, message: 'Missing required click parameters.' });
    }

    let domain = '';
    try {
      domain = new URL(destination_url).hostname.replace(/^www\./, '');
    } catch {
      domain = 'external';
    }

    const isMobile = /Mobi|Android/i.test(req.get('user-agent') || '');

    const { error } = await supabase.from('decode_outbound_clicks').insert([{
      resource_slug,
      category_slug: category_slug || 'general',
      resource_title: resource_title || resource_slug,
      destination_domain: domain,
      destination_url,
      referrer: referrer || req.get('referrer') || null,
      utm_source: 'rajuperumalla.in',
      utm_medium: 'referral',
      utm_campaign: 'decode',
      user_agent_type: isMobile ? 'mobile' : 'desktop',
    }]);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, message: 'Outbound click recorded successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Outbound Analytics Aggregation API
app.get('/api/decode/analytics/outbound', async (req, res) => {
  try {
    const { data, count, error } = await supabase
      .from('decode_outbound_clicks')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    const byCategory = {};
    const byDomain = {};

    (data || []).forEach(c => {
      byCategory[c.category_slug] = (byCategory[c.category_slug] || 0) + 1;
      byDomain[c.destination_domain] = (byDomain[c.destination_domain] || 0) + 1;
    });

    const topDomains = Object.entries(byDomain)
      .map(([domain, clicks]) => ({ domain, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    res.json({
      success: true,
      totalClicks: count || (data?.length || 0),
      byCategory,
      topDomains,
      recentClicks: (data || []).slice(0, 10),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Contact Route (stores to Supabase & MongoDB + sends email)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    // 1. Store in Supabase Database (Primary)
    let supabaseSaved = false;
    try {
      const { data: sbData, error: sbError } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message }]);

      if (sbError) {
        console.error('Supabase contact_messages insert error:', sbError.message);
      } else {
        supabaseSaved = true;
        console.log('Contact message stored in Supabase successfully!');
      }
    } catch (sbErr) {
      console.error('Supabase execution error:', sbErr.message);
    }

    // 2. Backup Store in MongoDB (if connected)
    try {
      if (mongoose.connection.readyState === 1) {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log('Contact message backed up to MongoDB successfully!');
      }
    } catch (mongoErr) {
      console.warn('MongoDB backup save skipped:', mongoErr.message);
    }

    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' });
    const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    // 3. EmailJS API Notification
    const emailJsPayload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        from_name: name,
        reply_to: email,
        message: message,
        timestamp: timestamp,
        initials: initials
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailJsPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('EmailJS Error:', errorText);
      } else {
        console.log('Email sent via EmailJS successfully!');
      }
    } catch (emailError) {
      console.error('Failed to contact EmailJS API:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent and stored successfully!',
      supabaseSaved
    });
  } catch (error) {
    console.error('Error handling contact message:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later.' });
  }
});

// GET /api/contacts - Retrieve all messages received
app.get('/api/contacts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/profile - Retrieve Portfolio Profile info
app.get('/api/profile', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/projects - Retrieve All Projects
app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/skills - Retrieve All Skills
app.get('/api/skills', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/achievements - Retrieve Milestones & Achievements
app.get('/api/achievements', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/assets - Retrieve Important Files, Logos & Videos Metadata
app.get('/api/assets', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('important_assets')
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
