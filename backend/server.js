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
