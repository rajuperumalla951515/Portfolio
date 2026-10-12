-- =========================================================================
-- RAJU PERUMALLA PORTFOLIO - SUPABASE MASTER DATABASE SETUP SCRIPT
-- =========================================================================
-- Run this complete script in your Supabase SQL Editor:
-- 1. Go to https://supabase.com/dashboard/project/hjtxvqgpvcmiktyyanxb
-- 2. Open the "SQL Editor" on the left menu
-- 3. Paste this entire query and click "Run"
-- =========================================================================

-- 1. DROP EXISTING TABLES (Clean Slate)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS portfolio_profile CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS important_assets CASCADE;

-- =========================================================================
-- 2. CREATE TABLES
-- =========================================================================

-- Table: Contact Messages ("Who messaged me")
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Portfolio Profile & Bio Info
CREATE TABLE portfolio_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    tagline TEXT,
    bio TEXT,
    email TEXT,
    location TEXT DEFAULT 'India',
    rotating_roles TEXT[],
    stats JSONB,
    social_links JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Projects Showcase
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    year TEXT,
    author TEXT DEFAULT 'Raju Perumalla',
    type_headline TEXT,
    description TEXT,
    badge TEXT,
    logo_filename TEXT,
    video_filename TEXT,
    technologies TEXT[],
    github_url TEXT,
    live_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Skills & Tech Stack
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'FRONT END', 'BACK END', 'LANGUAGES', 'AI & ML', 'TOOLS'
    proficiency INT DEFAULT 80,
    icon TEXT,
    logo_filename TEXT,
    color TEXT,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Achievements & Milestones
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    organization TEXT,
    badge TEXT,
    logo_filename TEXT,
    icon TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Experience & Craft
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    period TEXT,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Important Assets, Logos & Videos Metadata
CREATE TABLE important_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'LOGO', 'VIDEO', 'IMAGE', 'DOCUMENT'
    file_path TEXT NOT NULL,
    file_type TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_assets ENABLE ROW LEVEL SECURITY;

-- Contact Messages: Anyone can insert messages (public form submissions)
CREATE POLICY "Allow public insert on contact_messages" 
ON contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

-- Contact Messages: Allow reading messages (portfolio owner & backend)
CREATE POLICY "Allow select on contact_messages" 
ON contact_messages FOR SELECT 
TO public 
USING (true);

-- Public Read Policies for portfolio data
CREATE POLICY "Allow public read on portfolio_profile" ON portfolio_profile FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read on skills" ON skills FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read on achievements" ON achievements FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read on experiences" ON experiences FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read on important_assets" ON important_assets FOR SELECT TO public USING (true);

-- =========================================================================
-- 4. INSERT REAL DATA (SEEDING)
-- =========================================================================

-- 4.1 Profile Information
INSERT INTO portfolio_profile (full_name, tagline, bio, email, rotating_roles, stats, social_links)
VALUES (
    'Raju Perumalla',
    'CSE’27 | GSA’26 | Python, Java, C/C++ | SAP ABAP & BTP | System Design & API Integration | 2nd Runner-Up @Capgemini T4PF | YouTube Creator (2.5K+)',
    'I build scalable web and Android applications powered by AI, machine learning, and modern backend technologies. From intelligent automation to real-time data-driven systems, I enjoy transforming ideas into products that solve real-world problems and create meaningful user experiences.',
    '23ra1a05b0@kpritech.ac.in',
    ARRAY['DEVELOPER', 'SPEAKER', 'CONTRIBUTOR'],
    '{"years": "3+", "projects": "15+", "subscribers": "2.5K+"}'::jsonb,
    '{"github": "https://github.com/rajuperumalla951515", "linkedin": "https://linkedin.com", "instagram": "@impressive_dev_34", "youtube": "2.5K+ Subscribers"}'::jsonb
);

-- 4.2 Projects
INSERT INTO projects (title, year, author, type_headline, description, badge, logo_filename, video_filename, technologies, display_order)
VALUES 
(
    'SmartGuardian_IM26',
    '2024',
    'Raju Perumalla',
    'AI/ML, IoT, GPS Tracking',
    'Accident Prevention | Risk Prediction | Driver Monitoring | Speed Control | Danger Alerts | Crash Detection | Severity Analysis | GPS Tracking | Emergency Alerts | Golden Rescue',
    'SAP-IM Finalist',
    'SmartGuardianlogo.png',
    'smartguardian shoert video for portfolio.mp4',
    ARRAY['Flutter', 'Python', 'Google Maps', 'IoT', 'FastAPI'],
    1
),
(
    'CipherDoc-SecureExamPapers',
    '2024',
    'Raju Perumalla',
    'Encryption, RSA, Access Control',
    'Secure Exam Papers with Encryption | Role-Based Access | RSA Key Pair Authentication',
    'Security System',
    'logo_2.png',
    'cipherdoc shoert video for portfolio.mp4',
    ARRAY['Python', 'Database', 'HTML', 'CSS', 'JavaScript'],
    2
),
(
    'Tripzy_Travel_Companion',
    '2024',
    'Raju Perumalla',
    'HTML, CSS, JS, Firebase',
    'Tripzy is a responsive travel booking website using HTML, CSS, JavaScript, and Firebase that enables OTP login, destination search, hotel deals, and seamless booking with a mobile-friendly UI.',
    'Travel Tech',
    'Tripzylogo.png',
    'tripzy shoert video for portfolio.mp4',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Firebase'],
    3
),
(
    'Nutrixa-DietEngine',
    '2025',
    'Raju Perumalla',
    'Health Tech, Smart Engine',
    'Nutrixa is a smart health companion that helps you make better lifestyle choices and stay consistent every day.',
    'Health Engine',
    'Nutrixa.png',
    'Nutrixa shoert video for portfolio.mp4',
    ARRAY['Streamlit', 'Python', 'CSS', 'HTML'],
    4
),
(
    'Helmet Detection System',
    '2024',
    'Raju Perumalla',
    'ML / YOLOv8 / Computer Vision',
    'Automated real-time safety compliance and violation tracking powered by computer vision and deep learning.',
    'Model Train',
    'idea.png',
    NULL,
    ARRAY['YOLOv8', 'Python', 'OpenCV', 'PyTorch'],
    5
);

-- 4.3 Achievements & Milestones
INSERT INTO achievements (title, subtitle, organization, badge, logo_filename, icon, display_order)
VALUES 
(
    '2nd Runner-Up in Capgemini Hackathon',
    'Capgemini Tech Challenge (T4PF)',
    'Capgemini',
    'Podium Winner',
    'Capgemini Logo.jpeg',
    'Trophy',
    1
),
(
    'Google Student Ambassador 2026',
    'Selected lead for developer programs',
    'Google',
    'Leadership',
    'google-logo.png',
    'Sparkles',
    2
),
(
    'SAP Innovation Marathon 4.0 Finalist',
    'Pitched scalable software architecture',
    'SAP',
    'National Finalist',
    'sap-logo.png',
    'Target',
    3
),
(
    'Hosted 4+ Technical Sessions',
    'AI and software development workshops',
    'Developer Communities',
    'Community Host',
    NULL,
    'Presentation',
    4
),
(
    '2.5K+ Community Creator',
    'Educational technical video creation',
    'YouTube',
    'Content Lead',
    'youtube (1).png',
    'Video',
    5
);

-- 4.4 Skills
INSERT INTO skills (name, category, proficiency, icon, logo_filename, color, display_order)
VALUES
-- Frontend
('React.js', 'FRONT END', 90, NULL, 'react.svg', '#61dafb', 1),
('JavaScript (ES6+)', 'FRONT END', 88, NULL, 'javascript.png', '#f59e0b', 2),
('HTML5', 'FRONT END', 95, NULL, 'html.png', '#ea580c', 3),
('CSS3 / Tailwind', 'FRONT END', 88, NULL, 'css-3.png', '#38bdf8', 4),

-- Backend
('Node.js', 'BACK END', 85, NULL, 'node js.png', '#22c55e', 5),
('Express.js', 'BACK END', 82, 'Server', NULL, '#6b7280', 6),
('FastAPI', 'BACK END', 88, 'Zap', NULL, '#eab308', 7),
('REST API', 'BACK END', 85, 'Network', NULL, '#0ea5e9', 8),
('PostgreSQL', 'BACK END', 80, NULL, 'sql.png', '#3b82f6', 9),
('Docker', 'BACK END', 75, NULL, 'docker.png', '#0ea5e9', 10),

-- Languages & AI
('Python', 'LANGUAGES', 87, NULL, 'python.png', '#3b82f6', 11),
('Java', 'LANGUAGES', 90, NULL, 'java.png', '#f59e0b', 12),
('C++', 'LANGUAGES', 78, NULL, 'C++.png', '#ef4444', 13),
('Machine Learning', 'AI & ML', 84, 'Brain', NULL, '#a855f7', 14),
('Computer Vision', 'AI & ML', 82, 'Eye', NULL, '#06b6d4', 15),
('YOLOv8 & ONNX', 'AI & ML', 85, 'Crosshair', NULL, '#10b981', 16),
('NLP & LLM Agents', 'AI & ML', 80, 'MessageSquare', NULL, '#3b82f6', 17),
('Android Development', 'LANGUAGES', 82, 'Smartphone', NULL, '#22c55e', 18);

-- 4.5 Experiences
INSERT INTO experiences (role, period, description, display_order)
VALUES
('Full Stack & Android Development', '2021 – Present', 'Crafting responsive interfaces, mobile apps, and robust systems.', 1),
('Artificial Intelligence & ML', '2023 – Present', 'Predictive modeling, data systems, and smart automation pipelines.', 2),
('Technical Session Host & Mentor', 'Active', 'Hosted 4+ workshops sharing engineering knowledge on modern tech.', 3);

-- 4.6 Important Assets & Files Table (Logos, Videos, Media)
INSERT INTO important_assets (asset_name, category, file_path, file_type, description)
VALUES
('Capgemini Logo', 'LOGO', 'src/assets/Capgemini Logo.jpeg', 'image/jpeg', 'Capgemini official logo for hackathon milestone'),
('Google Logo', 'LOGO', 'src/assets/google-logo.png', 'image/png', 'Google Student Ambassador badge logo'),
('SAP Logo', 'LOGO', 'src/assets/sap-logo.png', 'image/png', 'SAP Innovation Marathon badge logo'),
('YouTube Logo', 'LOGO', 'src/assets/youtube (1).png', 'image/png', 'YouTube community branding'),
('SmartGuardian Logo', 'LOGO', 'src/assets/SmartGuardianlogo.png', 'image/png', 'SmartGuardian project branding'),
('CipherDoc Logo', 'LOGO', 'src/assets/logo_2.png', 'image/png', 'CipherDoc encryption project logo'),
('Tripzy Logo', 'LOGO', 'src/assets/Tripzylogo.png', 'image/png', 'Tripzy travel companion project logo'),
('Nutrixa Logo', 'LOGO', 'src/assets/Nutrixa.png', 'image/png', 'Nutrixa diet engine project logo'),
('Profile Photo', 'IMAGE', 'src/assets/profile.png', 'image/png', 'Raju Perumalla main portfolio photo'),
('My Logo', 'LOGO', 'src/assets/mylogo.png', 'image/png', 'Personal brand monogram'),
('SmartGuardian Video', 'VIDEO', 'src/videos/smartguardian shoert video for portfolio.mp4', 'video/mp4', 'SmartGuardian showcase reel'),
('CipherDoc Video', 'VIDEO', 'src/videos/cipherdoc shoert video for portfolio.mp4', 'video/mp4', 'CipherDoc showcase reel'),
('Tripzy Video', 'VIDEO', 'src/videos/tripzy shoert video for portfolio.mp4', 'video/mp4', 'Tripzy showcase reel'),
('Nutrixa Video', 'VIDEO', 'src/videos/Nutrixa shoert video for portfolio.mp4', 'video/mp4', 'Nutrixa showcase reel');

-- Verify setup
SELECT 'Contact Messages Table' AS table_name, count(*) AS total_rows FROM contact_messages
UNION ALL
SELECT 'Portfolio Profile Table', count(*) FROM portfolio_profile
UNION ALL
SELECT 'Projects Table', count(*) FROM projects
UNION ALL
SELECT 'Skills Table', count(*) FROM skills
UNION ALL
SELECT 'Achievements Table', count(*) FROM achievements
UNION ALL
SELECT 'Important Assets Table', count(*) FROM important_assets;
