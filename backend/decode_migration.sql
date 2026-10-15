-- =========================================================================
-- DECODE PLATFORM - SUPABASE DATABASE MIGRATION SCRIPT
-- =========================================================================
-- Project: Raju Perumalla Portfolio & Student Hub (Decode)
-- Run this complete script in your Supabase SQL Editor:
-- 1. Go to https://supabase.com/dashboard/project/hjtxvqgpvcmiktyyanxb
-- 2. Open "SQL Editor" on the left menu
-- 3. Paste this script and click "Run"
-- =========================================================================

-- 1. DROP EXISTING DECODE TABLES IF RE-RUNNING
DROP TABLE IF EXISTS decode_resources CASCADE;
DROP TABLE IF EXISTS decode_categories CASCADE;

-- 2. CREATE DECODE CATEGORIES TABLE
CREATE TABLE decode_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    short_title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    badge TEXT NOT NULL,
    accent_color TEXT DEFAULT 'from-blue-500 to-indigo-500',
    meta_description TEXT,
    display_order INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE DECODE RESOURCES TABLE
CREATE TABLE decode_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    category_slug TEXT NOT NULL REFERENCES decode_categories(slug) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    difficulty TEXT,
    read_time TEXT,
    author TEXT DEFAULT 'Raju Perumalla',
    published_date DATE DEFAULT CURRENT_DATE,
    updated_date DATE DEFAULT CURRENT_DATE,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    logo_key TEXT,
    source_name TEXT,
    source_location TEXT,
    action_text TEXT DEFAULT 'View resource →',
    deadline_text TEXT,
    is_featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    -- Automated Jobs & Internships Fields
    status TEXT DEFAULT 'active',
    application_deadline TIMESTAMPTZ,
    eligible_batches INT[] DEFAULT ARRAY[]::INT[],
    experience_level TEXT DEFAULT 'Fresher',
    opportunity_type TEXT DEFAULT 'Internship',
    work_arrangement TEXT DEFAULT 'Remote',
    stipend_amount TEXT,
    is_stipend_paid BOOLEAN DEFAULT true,
    salary_currency TEXT DEFAULT 'INR',
    source_platform TEXT DEFAULT 'official',
    source_job_id TEXT,
    canonical_url TEXT,
    auto_imported BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    verification_notes TEXT,
    opportunity_data JSONB,
    project_spec JSONB,
    reference_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PERFORMANCE INDEXES
CREATE INDEX idx_decode_resources_category ON decode_resources(category_slug);
CREATE INDEX idx_decode_resources_slug ON decode_resources(slug);
CREATE INDEX idx_decode_resources_published ON decode_resources(published);
CREATE INDEX idx_decode_resources_featured ON decode_resources(is_featured);
CREATE INDEX idx_decode_jobs_status_deadline ON decode_resources(status, application_deadline) WHERE category_slug = 'jobs';
CREATE INDEX idx_decode_jobs_batches ON decode_resources USING GIN (eligible_batches) WHERE category_slug = 'jobs';
CREATE INDEX idx_decode_jobs_canonical ON decode_resources(canonical_url) WHERE canonical_url IS NOT NULL;
CREATE INDEX idx_decode_categories_slug ON decode_categories(slug);
CREATE INDEX idx_decode_categories_order ON decode_categories(display_order);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE decode_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE decode_resources ENABLE ROW LEVEL SECURITY;

-- Allow public read access strictly to published categories
CREATE POLICY "Allow public read on published decode_categories"
ON decode_categories FOR SELECT
TO public
USING (published = true);

-- Allow public read access strictly to published resources
CREATE POLICY "Allow public read on published decode_resources"
ON decode_resources FOR SELECT
TO public
USING (published = true);

-- =========================================================================
-- 6. SEED DATA - 9 CATEGORIES
-- =========================================================================
INSERT INTO decode_categories (slug, name, short_title, description, icon, badge, accent_color, meta_description, display_order)
VALUES
(
    'study-material',
    'Study Material',
    'Study Material',
    'Academic notes, core engineering subjects, revision sheets, and exam-ready technical tutorials.',
    'BookOpen',
    'Academics & Theory',
    'from-blue-500 to-indigo-500',
    'Access curated academic notes, core computer science subjects, OS, DBMS, computer networks, and revision sheets for engineering students.',
    1
),
(
    'roadmaps',
    'Developer Roadmaps',
    'Roadmaps',
    'Step-by-step learning paths for full-stack, AI/ML, cloud, DevOps, and modern software engineering.',
    'Compass',
    'Structured Paths',
    'from-emerald-500 to-teal-500',
    'Step-by-step developer learning roadmaps for Full-Stack Web Development, AI/Machine Learning, and Cloud DevOps engineering.',
    2
),
(
    'jobs',
    'Jobs & Internships',
    'Jobs',
    'Verified student internships, graduate trainee roles, eligibility requirements, and official application links.',
    'Briefcase',
    'Verified Opportunities',
    'from-amber-500 to-orange-500',
    'Discover verified student internships, Google Summer of Code, Linux Foundation Mentorship, and graduate software engineering opportunities.',
    3
),
(
    'hackathons',
    'Hackathons & Competitions',
    'Hackathons',
    'National and global hackathons, eligibility, theme breakdowns, deadlines, and competition winning strategies.',
    'Trophy',
    'Contests & Awards',
    'from-red-500 to-rose-500',
    'Explore Smart India Hackathon (SIH), enterprise hackathons, winning pitch strategies, and hackathon preparation guides.',
    4
),
(
    'final-year-projects',
    'Final-Year Projects',
    'Projects',
    'Production-ready capstone project ideas, system architectures, hardware BOM, datasets, and implementation guides.',
    'Cpu',
    'Capstone Engineering',
    'from-purple-500 to-violet-500',
    'Production-ready final-year engineering capstone project ideas, system architectures, FastAPI/IoT implementations, and datasets.',
    5
),
(
    'freelancing',
    'Freelancing for Students',
    'Freelancing',
    'Client acquisition, portfolio positioning, proposal writing, pricing standards, and practical freelancing workflows.',
    'DollarSign',
    'Independent Work',
    'from-green-500 to-emerald-600',
    'Practical freelancing guides for college students: landing first clients, pricing contracts, proposals, and portfolio building.',
    6
),
(
    'references',
    'Technical References & Docs',
    'References',
    'Official API documentation, trusted developer cheat-sheets, datasets, standards, and research resources.',
    'Bookmark',
    'Docs & Specifications',
    'from-cyan-500 to-blue-600',
    'Official React, Python, FastAPI documentation references, verified public datasets, and developer specifications.',
    7
),
(
    'career-guidance',
    'Career & Placement Guidance',
    'Career Guidance',
    'Resume templates, technical interview patterns, DSA roadmaps, mock rounds, and placement preparation.',
    'GraduationCap',
    'Interview & Growth',
    'from-pink-500 to-rose-600',
    'Campus placement preparation, technical interview DSA patterns, system design for freshers, and ATS-friendly resume strategies.',
    8
),
(
    'developer-tools',
    'Developer Tools & Student Perks',
    'Developer Tools',
    'Productivity toolchains, free student developer packs, APIs, terminal workflows, and AI coding setups.',
    'Wrench',
    'Tools & Utilities',
    'from-yellow-500 to-amber-600',
    'Curated developer toolchains, GitHub Student Developer Pack guide, terminal setups, and AI-assisted programming tools.',
    9
);

-- =========================================================================
-- 7. SEED DATA - 24 RESOURCES ACROSS ALL 9 DOMAINS
-- =========================================================================

-- Study Material
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured)
VALUES
(
    'python-programming-data-structures',
    'study-material',
    'Python Programming & Core Data Structures: Comprehensive Academic & Practical Guide',
    'Master core Python semantics, algorithmic complexity, custom linked lists, binary search trees, and hash map collision handling with clean implementations.',
    '## Academic Overview & Importance\n\nPython has become the foundational language for algorithmic thinking, machine learning, and rapid prototyping. In computer science curricula, students often learn basic syntax but struggle when implementing standard data structures from scratch or analyzing asymptotic time and space complexities.\n\nThis guide bridges textbook theory with practical engineering implementations.\n\n---\n\n## 1. Asymptotic Time & Space Complexity (Big-O Notation)\n\nUnderstanding runtime growth rates is essential for university exams and technical interviews:\n\n| Data Structure | Access | Search | Insertion | Deletion | Space Complexity |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| Dynamic Array (List) | O(1) | O(n) | O(1) amortized | O(n) | O(n) |\n| Singly Linked List | O(n) | O(n) | O(1) at head | O(1) with pointer | O(n) |\n| Hash Map (Dict) | N/A | O(1) avg / O(n) worst | O(1) avg / O(n) worst | O(1) avg | O(n) |\n| Binary Search Tree | O(log n) avg | O(log n) avg | O(log n) avg | O(log n) avg | O(n) |\n\n---\n\n## 2. Implementing a Doubly Linked List from Scratch\n\n```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.prev = None\n        self.next = None\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n        self._size = 0\n\n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = self.tail = new_node\n        else:\n            new_node.prev = self.tail\n            self.tail.next = new_node\n            self.tail = new_node\n        self._size += 1\n```',
    'Beginner to Intermediate',
    '12 min read',
    ARRAY['Python', 'Data Structures', 'Algorithms', 'Computer Science'],
    '2026-01-10',
    '2026-03-15',
    true
),
(
    'operating-systems-concurrency-fundamentals',
    'study-material',
    'Operating Systems Fundamentals: Processes, Threads, Memory Management & CPU Scheduling',
    'A structured revision guide for university exams and technical interview prep covering virtual memory, paging, semaphores, and deadlocks.',
    '## Core Syllabus Topics\n\nOperating Systems form the backbone of modern computing infrastructure. Every software developer, cloud architect, and backend engineer must understand how user programs interact with CPU registers, kernel space, and hardware controllers.\n\n---\n\n## 1. Process vs Thread: Memory & Context Switching\n- Process: An instance of a program in execution. Has private memory.\n- Thread: Unit of CPU execution sharing process code, data, and heap.',
    'Intermediate',
    '10 min read',
    ARRAY['Operating Systems', 'Concurrency', 'Memory Management', 'Computer Science'],
    '2026-01-18',
    '2026-03-20',
    false
),
(
    'computer-networks-protocols-architecture',
    'study-material',
    'Computer Networks: OSI Model, TCP/IP, DNS, HTTP/3, and WebSockets Demystified',
    'Comprehensive breakdown of transport layer protocols, three-way handshakes, socket programming, and network security for engineering students.',
    '## The Modern Internet Protocol Stack\n\nEvery backend request, streaming frame, and telemetry event relies on network protocol handshakes. This guide summarizes essential network architectures from the OSI reference model to HTTP/3 QUIC.',
    'Intermediate',
    '11 min read',
    ARRAY['Computer Networks', 'TCP/IP', 'WebSockets', 'HTTP', 'Security'],
    '2026-02-01',
    '2026-03-22',
    false
),
(
    'dbms-sql-query-optimization-guide',
    'study-material',
    'Database Management Systems: Relational Algebra, Normalization & SQL Query Optimization',
    'From 1NF-BCNF normalization to B-Tree indexing, execution plans, and transaction ACID properties with PostgreSQL examples.',
    '## Database Theory & Production Practice\n\nRelational databases remain the backbone of transactional enterprise software. Designing schemas that avoid data anomalies while executing sub-10ms queries requires mastery of normalization and indexing.',
    'Intermediate',
    '9 min read',
    ARRAY['DBMS', 'PostgreSQL', 'SQL', 'Database Design', 'Indexing'],
    '2026-02-12',
    '2026-03-25',
    false
);

-- Roadmaps
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured)
VALUES
(
    'full-stack-web-development',
    'roadmaps',
    'Modern Full-Stack Web Development Roadmap: From Fundamentals to Cloud Deployments',
    'A complete, production-oriented roadmap covering modern JavaScript/TypeScript, React 19, FastAPI, Node.js, PostgreSQL, Docker, and edge hosting.',
    '## The 2026 Full-Stack Engineer Path\n\nBuilding real-world web applications requires more than copying YouTube tutorials. Engineering software today involves full lifecycle thinking: user interface responsiveness, typing safety, stateless API scaling, database indexing, and automated CI/CD pipelines.\n\n---\n\n## Phase 1: Web Fundamentals & JavaScript Core\n- Semantic HTML5 & Modern CSS Grid/Flexbox\n- ES6+ JavaScript, Closures, Promises, Event Loop\n\n## Phase 2: Modern Frontend Architecture\n- React 19 Hooks, Routing, Tailwind CSS\n\n## Phase 3: Backend & Databases\n- FastAPI / Node.js Express, PostgreSQL, Redis\n\n## Phase 4: DevOps & Cloud\n- Docker, GitHub Actions, Cloudflare Workers',
    'All Levels',
    '14 min read',
    ARRAY['Full-Stack', 'React', 'FastAPI', 'Node.js', 'PostgreSQL', 'Docker'],
    '2026-01-05',
    '2026-03-18',
    true
),
(
    'artificial-intelligence-machine-learning',
    'roadmaps',
    'AI & Machine Learning Engineering Roadmap: Linear Algebra, PyTorch & LLM Inference',
    'Step-by-step path from mathematics and data analysis to neural networks, computer vision, Hugging Face transformers, and model inference pipelines.',
    '## From Mathematical Foundations to Production Inference\n\nMachine learning engineering requires understanding underlying gradient descent mechanics, loss landscapes, and memory constraints during inference.\n\n- Linear Algebra & Vector Calculus\n- Classical ML: Scikit-learn, Regression, Trees\n- Deep Learning: PyTorch, CNNs, Transformers\n- Production Deployment: ONNX, Quantization, FastAPI',
    'Intermediate to Advanced',
    '15 min read',
    ARRAY['Machine Learning', 'Python', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    '2026-01-22',
    '2026-03-24',
    false
),
(
    'cloud-devops-system-engineering',
    'roadmaps',
    'Cloud & DevOps Engineering Roadmap: Linux, Containers, CI/CD & Serverless Edge',
    'Learn containerization with Docker, Git workflows, reverse proxies, automated testing pipelines, and serverless architectures on Cloudflare and AWS.',
    '## Modern Infrastructure as Code & Edge Computing\n\nToday software teams ship updates multiple times a day. To do so reliably, engineers must understand Linux administration, automated container builds, and edge routing.',
    'Intermediate',
    '12 min read',
    ARRAY['DevOps', 'Cloud', 'Docker', 'CI/CD', 'Linux', 'Cloudflare Workers'],
    '2026-02-15',
    '2026-03-26',
    false
);

-- Jobs & Internships
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured, opportunity_data)
VALUES
(
    'google-summer-of-code-internship-guide',
    'jobs',
    'Google Summer of Code (GSoC): Complete Student Application & Contribution Guide',
    'Official stipend-backed international open-source internship program. Learn eligibility criteria, proposal drafting, timeline, and mentor outreach.',
    '## What is Google Summer of Code (GSoC)?\n\nGoogle Summer of Code is a global, online program focused on bringing new contributors into open source software development.\n\n### Application Steps:\n1. Shortlist 2 mentoring organizations early.\n2. Submit good first pull requests.\n3. Draft a comprehensive proposal with weekly deliverables.',
    'Competitive / Open to All Students',
    '10 min guide',
    ARRAY['GSoC', 'Google', 'Internship', 'Open Source', 'Remote', 'Stipend'],
    '2026-01-12',
    '2026-03-10',
    true,
    '{"organization": "Google Open Source Programs", "role": "Open Source Contributor Intern", "eligibility": "College Students & Open Source Beginners (18+)", "deadline": "Annual March-April Proposal Window", "location": "Remote / Worldwide", "stipend": "Country-based stipend provided upon milestone completion", "officialUrl": "https://summerofcode.withgoogle.com/", "isVerified": true}'::jsonb
),
(
    'lfx-mentorship-open-source-internship',
    'jobs',
    'Linux Foundation Mentorship (LFX): Paid Open Source Software Internships',
    'Full-time and part-time funded mentorships across Linux kernel, Kubernetes, Cloud Native (CNCF), and hyperledger ecosystems.',
    '## Understanding the LFX Mentorship Program\n\nThe Linux Foundation Mentorship program provides structured, paid, remote internships for developers to work directly with core maintainers of world-critical infrastructure projects like Kubernetes and Hyperledger.',
    'Intermediate to Advanced',
    '9 min guide',
    ARRAY['Linux Foundation', 'LFX', 'Kubernetes', 'Cloud Native', 'Internship'],
    '2026-01-20',
    '2026-03-12',
    false,
    '{"organization": "The Linux Foundation", "role": "Mentee / Software Engineering Intern", "eligibility": "University Students & Early-Career Developers", "deadline": "Spring, Summer, Fall Batches", "location": "Remote / Global", "stipend": "Funded Stipend per Mentorship Term", "officialUrl": "https://lfx.linuxfoundation.org/tools/mentorship/", "isVerified": true}'::jsonb
),
(
    'mlh-fellowship-software-engineering',
    'jobs',
    'Major League Hacking (MLH) Fellowship: 12-Week Educational Internship',
    'Collaborate on real-world production codebases, receive 1-on-1 mentorship from industry software engineers, and earn an educational stipend.',
    '## About the MLH Fellowship\n\nThe MLH Fellowship is a remote 12-week internship alternative where fellows contribute to open-source software used by millions worldwide.',
    'Intermediate',
    '8 min guide',
    ARRAY['MLH Fellowship', 'Internship', 'Open Source', 'Software Engineering'],
    '2026-02-05',
    '2026-03-15',
    false,
    '{"organization": "Major League Hacking (MLH)", "role": "Software Engineering Fellow", "eligibility": "Enrolled College Students & Recent Graduates", "deadline": "Rolling Admissions", "location": "Remote / Global", "stipend": "Need-based Educational Stipend Available", "officialUrl": "https://fellowship.mlh.io/", "isVerified": true}'::jsonb
);

-- Hackathons
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured, opportunity_data)
VALUES
(
    'smart-india-hackathon-sih-strategy',
    'hackathons',
    'Smart India Hackathon (SIH): Problem Selection, Team Formation & Winning Strategy',
    'The definitive playbook for navigating SIH Software and Hardware editions, from internal college selections to grand finale jury presentations.',
    '## The SIH Journey: From College Screening to National Finals\n\nSmart India Hackathon is the world largest open innovation model.\n\n### Team Composition:\n- Exactly 6 students with at least 1 female teammate.\n- Complementary roles: Lead, 2 Backend, 2 Frontend/Mobile, 1 ML/IoT specialist.',
    'Team Competition (6 Members)',
    '13 min guide',
    ARRAY['SIH', 'Hackathon', 'Government of India', 'Innovation', 'Teamwork'],
    '2026-01-15',
    '2026-03-20',
    true,
    '{"organization": "Ministry of Education & AICTE, Government of India", "role": "Team Lead / Software Innovator", "eligibility": "Enrolled College Students in India", "deadline": "Annual National Calendar", "location": "Nodal Centers Across India", "stipend": "₹1,00,000 Cash Prize per Problem Statement (Winners)", "officialUrl": "https://www.sih.gov.in/", "isVerified": true}'::jsonb
),
(
    'sap-innovation-marathon-guide',
    'hackathons',
    'SAP Innovation Marathon: Enterprise Prototyping & Architecture Guide',
    'Insights and system architecture patterns from a National Finalist: How to design enterprise-grade cloud solutions, BTP microservices, and pitch to jury panels.',
    '## Engineering for Enterprise: The SAP Marathon Experience\n\nDuring our journey developing SmartGuardian_IM26 (selected as a National Finalist), the key differentiator was how seamlessly edge sensor events integrated into cloud analytics pipelines without violating Clean Core principles.',
    'Advanced / Enterprise Innovation',
    '11 min guide',
    ARRAY['SAP', 'Enterprise Hackathon', 'Cloud', 'SAP BTP', 'Architecture'],
    '2026-02-10',
    '2026-03-22',
    false,
    '{"organization": "SAP India", "role": "Enterprise Hackathon Finalist", "eligibility": "Pre-Final & Final-Year Engineering Students", "deadline": "Annual Innovation Marathon Schedule", "location": "Hybrid / SAP Labs Bangalore", "stipend": "Certificates, Mentorship & Cash Prizes for Winners", "officialUrl": "https://www.sap.com/", "isVerified": true}'::jsonb
),
(
    'capgemini-tech-challenge-handbook',
    'hackathons',
    'Capgemini Tech Challenge: Round-by-Round Preparation from a 2nd Runner-Up',
    'Direct playbook on cracking screening challenges, domain-specific coding rounds, and the 24-hour national grand finale hackathon.',
    '## The Journey to 2nd Runner-Up (T4PF Category)\n\nCapgemini Tech Challenge is one of India largest corporate competitions. Focus on test cases, high-concurrency conditions, and rapid MVP deployment during the 24-hour grand finale.',
    'Competitive National Challenge',
    '10 min guide',
    ARRAY['Capgemini', 'Tech Challenge', 'Hackathon', 'Coding Competition'],
    '2026-02-20',
    '2026-03-25',
    false,
    '{"organization": "Capgemini India", "role": "National 2nd Runner-Up Winner", "eligibility": "Engineering & IT Students and Professionals", "deadline": "Annual Tech Challenge Window", "location": "Online Screening + Onsite Finale", "stipend": "Cash Prizes up to ₹15+ Lakhs across categories", "officialUrl": "https://techchallenge.in.capgemini.com/", "isVerified": true}'::jsonb
);

-- Final-Year Projects
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured, project_spec)
VALUES
(
    'smartguardian-ai-accident-prevention',
    'final-year-projects',
    'SmartGuardian: Edge AI Accident Prevention & Real-Time Emergency Telemetry System',
    'Complete capstone implementation blueprint: MPU6050 accelerometer heuristics, computer vision driver drowsiness detection, and FastAPI cloud emergency dispatch.',
    '## Project Abstract & Problem Formulation\n\nIn emergency medical logistics, the Golden Hour refers to the first 60 minutes after a traumatic vehicular collision. SmartGuardian solves this with proactive driver drowsiness detection and automated crash telemetry.',
    'Advanced Capstone (Hardware + Cloud)',
    '16 min guide',
    ARRAY['IoT', 'Computer Vision', 'FastAPI', 'Accident Detection', 'Capstone', 'Hardware'],
    '2026-01-08',
    '2026-03-20',
    true,
    '{"domain": "Intelligent Transportation Systems & Edge AI", "problemStatement": "Over 1.3 million road accident fatalities occur globally each year. Delays in emergency response during the Golden Hour drastically increase mortality.", "techStack": ["Python", "FastAPI", "OpenCV", "ESP32", "MPU6050", "NEO-6M GPS", "Flutter", "PostgreSQL", "Redis"], "hardwareBOM": ["ESP32 Dev Module", "MPU6050 IMU", "NEO-6M GPS Receiver", "ESP32-CAM / USB Camera", "Active Piezo Buzzer", "Buck Converter 12V to 5V"], "difficultyLevel": "Tier 1 Capstone"}'::jsonb
),
(
    'cipherdoc-tamper-proof-exam-distribution',
    'final-year-projects',
    'CipherDoc: Tamper-Proof Exam Paper Distribution using Hybrid RSA-4096 & AES Cryptography',
    'End-to-end cryptographic system preventing academic examination paper leaks using time-locked digital envelopes, NTP synchronization, and in-memory decryption.',
    '## Project Overview & Threat Model\n\nAcademic examination integrity is the foundation of educational institutions. CipherDoc uses hybrid envelope encryption combining AES-256-GCM and RSA-4096 public keys.',
    'Advanced (Cybersecurity & Systems)',
    '14 min guide',
    ARRAY['Cybersecurity', 'Cryptography', 'RSA', 'AES', 'Security Architecture', 'Capstone'],
    '2026-01-28',
    '2026-03-22',
    false,
    '{"domain": "Applied Cryptography & Enterprise Data Security", "problemStatement": "Academic examination papers are vulnerable to illicit leaks during physical transit and unencrypted digital transmission.", "techStack": ["Python", "Cryptography", "RSA-4096", "AES-256-GCM", "React 19", "FastAPI", "PostgreSQL"], "hardwareBOM": ["Decryption Workstation"], "difficultyLevel": "Tier 1 Capstone"}'::jsonb
),
(
    'nutrixa-ai-nutrition-prescription-analyzer',
    'final-year-projects',
    'Nutrixa: OCR-Based Prescription & Dietary Anomaly Detection for Preventative Healthcare',
    'Healthcare engineering project converting handwritten clinical prescriptions and food labels into actionable dietary warnings using computer vision and semantic NLP.',
    '## System Architecture & Pipeline\n\nNutrixa bridges clinical medicine and daily diet by parsing prescription notes and matching ingredient lists against patient health records.',
    'Intermediate to Advanced',
    '13 min guide',
    ARRAY['Healthcare AI', 'OCR', 'Computer Vision', 'NLP', 'FastAPI', 'Capstone'],
    '2026-02-18',
    '2026-03-24',
    false,
    '{"domain": "Computer Vision & Healthcare Informatics", "problemStatement": "Patients with metabolic conditions frequently consume contraindicated packaged food items.", "techStack": ["Python", "Tesseract OCR", "FastAPI", "React", "PostgreSQL", "Scikit-learn"], "hardwareBOM": ["Camera"], "difficultyLevel": "Tier 2 Capstone"}'::jsonb
);

-- Freelancing
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured)
VALUES
(
    'landing-first-freelance-client-student-guide',
    'freelancing',
    'Landing Your First Tech Freelance Client: The Student Developer Playbook',
    'How to transition from zero commercial experience to paid freelance projects using proof-of-work repositories, targeted local outreach, and demo videos.',
    '## Overcoming the No Experience Paradox\n\nProof of work over resumes: Build 2 production apps, record 60-second video walkthroughs, and conduct value-add cold outreach to small businesses.',
    'Beginner to Intermediate',
    '10 min read',
    ARRAY['Freelancing', 'Client Acquisition', 'Portfolio', 'Career', 'Remote Work'],
    '2026-01-14',
    '2026-03-16',
    false
),
(
    'pricing-contracts-invoicing-for-freelancers',
    'freelancing',
    'Freelance Pricing, Scope Protection & Payment Security for Developers',
    'Avoid scope creep and non-payment: Milestone-based billing, 50% upfront deposits, scope of work contracts, and payment gateways.',
    '## Protecting Your Time and Code\n\nFollow the 50/25/25 rule: 50% upfront deposit before writing code, 25% at staging milestone, and 25% upon final deployment.',
    'Intermediate',
    '8 min read',
    ARRAY['Pricing', 'Contracts', 'Invoicing', 'Freelancing', 'Legal Basics'],
    '2026-02-08',
    '2026-03-18',
    false
);

-- References
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured, reference_data)
VALUES
(
    'react-modern-web-ecosystem-reference',
    'references',
    'Official React 19 & Modern Web Engineering Reference Guide',
    'Curated collection of official documentation, RFC specifications, performance optimization guidelines, and component lifecycle best practices.',
    '## Authoritative Web Documentation\n\n- React Official Documentation: https://react.dev/\n- MDN Web Docs: https://developer.mozilla.org/\n- Vite Next-Gen Tooling: https://vite.dev/\n- Tailwind CSS: https://tailwindcss.com/docs',
    'All Levels',
    '9 min read',
    ARRAY['React', 'Web Standards', 'MDN', 'Vite', 'Frontend'],
    '2026-01-25',
    '2026-03-22',
    false,
    '{"primarySource": "React.dev & MDN Web Docs", "officialUrl": "https://react.dev/", "specification": "ECMAScript 2026 / W3C Web Components"}'::jsonb
),
(
    'python-fastapi-backend-reference',
    'references',
    'High-Performance Python & FastAPI Async Backend Reference',
    'Official ASGI specifications, Pydantic v2 validation idioms, Uvicorn concurrency configuration, and connection pooling best practices.',
    '## FastAPI Engineering Reference\n\n- FastAPI Docs: https://fastapi.tiangolo.com/\n- Pydantic v2: https://docs.pydantic.dev/\n- Uvicorn ASGI Server: https://www.uvicorn.org/',
    'Intermediate',
    '10 min read',
    ARRAY['FastAPI', 'Python', 'ASGI', 'REST API', 'Backend Architecture'],
    '2026-02-12',
    '2026-03-24',
    false,
    '{"primarySource": "FastAPI & Pydantic Official Docs", "officialUrl": "https://fastapi.tiangolo.com/", "specification": "ASGI 3.0 / OpenAPI 3.1.0"}'::jsonb
),
(
    'verified-public-datasets-for-student-projects',
    'references',
    'Curated Directory of Verified Public Datasets & Free APIs for Student Engineering Projects',
    'High-quality, reliable, rate-limit friendly APIs and research datasets spanning weather telemetry, transport, open government data, and computer vision.',
    '## Reliable Datasets & APIs for Capstone Projects\n\n- Kaggle Datasets: https://www.kaggle.com/datasets\n- Hugging Face Datasets: https://huggingface.co/datasets\n- Data.gov.in: https://data.gov.in/\n- Open-Meteo Weather API: https://open-meteo.com/',
    'All Levels',
    '8 min read',
    ARRAY['Datasets', 'APIs', 'Open Data', 'Machine Learning', 'Research'],
    '2026-02-25',
    '2026-03-26',
    false,
    '{"primarySource": "Open Data Repositories & REST APIs", "officialUrl": "https://kaggle.com/datasets", "specification": "Open Data Commons / RESTful JSON"}'::jsonb
);

-- Career Guidance
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured)
VALUES
(
    'technical-interview-dsa-mastery-plan',
    'career-guidance',
    'Technical Interview & DSA Mastery: A 90-Day Problem-Solving Framework',
    'Structured preparation framework focusing on 14 recurring algorithmic patterns (Two Pointers, Sliding Window, DFS/BFS, Dynamic Programming) rather than random grinding.',
    '## The Pattern-Based Approach to DSA\n\nMaster the 14 core patterns:\n1. Two Pointers\n2. Sliding Window\n3. Fast & Slow Pointers\n4. Merge Intervals\n5. Cyclic Sort\n6. In-place Reversal of a LinkedList\n7. Tree BFS & DFS\n8. Two Heaps\n9. Subsets & Backtracking\n10. Modified Binary Search\n11. Top K Elements\n12. K-way Merge\n13. 0/1 Knapsack & DP\n14. Topological Sort',
    'Intermediate',
    '12 min read',
    ARRAY['DSA', 'Coding Interviews', 'Algorithms', 'Placement Preparation'],
    '2026-01-16',
    '2026-03-18',
    false
),
(
    'crafting-high-impact-swe-resume',
    'career-guidance',
    'Crafting a High-Impact Software Engineering Resume for College Students',
    'How to format projects with the Google XYZ formula (Accomplished [X] measured by [Y] by doing [Z]), pass ATS screening, and highlight open source impact.',
    '## The Google XYZ Formula\n\nAccomplished [X] as measured by [Y] by doing [Z].\n\nSingle-page ATS format, no tables/graphics, clickable links to GitHub and live deployments.',
    'All Levels',
    '9 min read',
    ARRAY['Resume', 'ATS', 'Career Guidance', 'Campus Placements', 'Job Search'],
    '2026-02-02',
    '2026-03-20',
    false
),
(
    'system-design-essentials-for-freshers',
    'career-guidance',
    'System Design Essentials for Freshers: Caching, Load Balancing & DB Sharding',
    'Master the foundational architecture principles demanded in junior engineering interviews: CAP theorem, Redis caching, microservices vs monoliths, and rate limiting.',
    '## System Design for Campus & Junior Roles\n\nKey concepts: Horizontal vs Vertical scaling, CAP Theorem, Redis caching layers, API gateways, load balancers, and database indexing.',
    'Intermediate',
    '11 min read',
    ARRAY['System Design', 'Scalability', 'Microservices', 'Redis', 'Architecture'],
    '2026-02-22',
    '2026-03-25',
    false
);

-- Developer Tools
INSERT INTO decode_resources (slug, category_slug, title, summary, content, difficulty, read_time, tags, published_date, updated_date, is_featured)
VALUES
(
    'github-student-developer-pack-guide',
    'developer-tools',
    'GitHub Student Developer Pack: Claiming $200k+ in Free Cloud, IDEs & Domain Perks',
    'Step-by-step verification guide for Indian and global university students to unlock free GitHub Copilot, JetBrains, DigitalOcean, Microsoft Azure, and Namecheap benefits.',
    '## What is the GitHub Student Developer Pack?\n\nFree developer tools for enrolled students:\n1. GitHub Pro & Copilot\n2. JetBrains Educational IDE Pack\n3. $200 DigitalOcean & $100 Azure credits\n4. Free .me domain via Namecheap\n\nVerification: Apply with college email or student ID card at https://education.github.com/pack',
    'All Enrolled College Students',
    '9 min read',
    ARRAY['GitHub Education', 'Student Perks', 'Free Cloud', 'Developer Tools'],
    '2026-01-18',
    '2026-03-15',
    true
),
(
    'essential-modern-developer-terminal-toolchain',
    'developer-tools',
    'The Modern Developer Toolchain: Terminal, Git CLI, Bruno, Docker & Postman',
    'Supercharge your local development workflow with cross-platform terminal tooling, git branch aliases, open-source API clients, and lightweight container setups.',
    '## Tools That Multiply Developer Velocity\n\n- Bruno API Client (lightweight Git-friendly Postman alternative)\n- Git CLI aliases for status, checkout, commits\n- Ripgrep (rg) and FZF for terminal search',
    'All Levels',
    '9 min read',
    ARRAY['Developer Tools', 'Git', 'Terminal', 'Docker', 'Productivity'],
    '2026-02-14',
    '2026-03-20',
    false
),
(
    'ai-assisted-coding-and-engineering-workflow',
    'developer-tools',
    'AI-Assisted Software Development: Prompting, Local LLMs & Safe Code Generation',
    'How modern developers leverage AI tools for refactoring, test case generation, and debugging without introducing hallucinations or leaking secrets.',
    '## Using AI Like a Senior Pair Programmer\n\n- Generate unit tests and edge cases\n- Explain complex error tracebacks\n- Never paste secret API keys or passwords into public LLMs',
    'All Levels',
    '10 min read',
    ARRAY['AI Tools', 'Productivity', 'Code Review', 'Prompt Engineering'],
    '2026-03-01',
    '2026-03-24',
    false
);

-- =========================================================================
-- 8. OUTBOUND CLICK ATTRIBUTION & ANALYTICS TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS decode_outbound_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_slug VARCHAR(255) NOT NULL,
    category_slug VARCHAR(100),
    resource_title VARCHAR(255),
    destination_domain VARCHAR(255) NOT NULL,
    destination_url TEXT NOT NULL,
    referrer TEXT,
    utm_source VARCHAR(100) DEFAULT 'rajuperumalla.in',
    utm_medium VARCHAR(100) DEFAULT 'referral',
    utm_campaign VARCHAR(100) DEFAULT 'decode',
    is_affiliate BOOLEAN DEFAULT FALSE,
    user_agent_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_outbound_slug ON decode_outbound_clicks(resource_slug);
CREATE INDEX IF NOT EXISTS idx_outbound_domain ON decode_outbound_clicks(destination_domain);
CREATE INDEX IF NOT EXISTS idx_outbound_category ON decode_outbound_clicks(category_slug);
CREATE INDEX IF NOT EXISTS idx_outbound_created_at ON decode_outbound_clicks(created_at);

ALTER TABLE decode_outbound_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on decode_outbound_clicks"
ON decode_outbound_clicks FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public read on decode_outbound_clicks"
ON decode_outbound_clicks FOR SELECT
TO anon, authenticated
USING (true);

-- =========================================================================
-- 9. VERIFY MIGRATION COUNTS
-- =========================================================================
SELECT 'Decode Categories' AS entity, count(*) AS total_records FROM decode_categories
UNION ALL
SELECT 'Decode Resources', count(*) FROM decode_resources
UNION ALL
SELECT 'Outbound Clicks', count(*) FROM decode_outbound_clicks;

