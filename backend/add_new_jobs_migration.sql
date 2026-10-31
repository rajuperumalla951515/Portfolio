-- =========================================================================
-- DECODE PLATFORM - ADD 7 NEW VERIFIED JOBS & INTERNSHIPS MIGRATION
-- =========================================================================
-- Project: Raju Perumalla Portfolio & Student Hub (Decode)
-- Run this script in your Supabase SQL Editor:
-- Dashboard: https://supabase.com/dashboard/project/hjtxvqgpvcmiktyyanxb
-- =========================================================================

INSERT INTO decode_resources (
  slug,
  category_slug,
  title,
  summary,
  content,
  difficulty,
  read_time,
  author,
  published_date,
  tags,
  is_featured,
  published,
  status,
  application_deadline,
  eligible_batches,
  experience_level,
  opportunity_type,
  work_arrangement,
  stipend_amount,
  is_stipend_paid,
  source_name,
  source_location,
  action_text,
  deadline_text,
  canonical_url,
  opportunity_data
) VALUES
-- 1. IBM - Intern / Associate Engineer
(
  'ibm-intern-associate-engineer-bangalore-137023',
  'jobs',
  'Intern / Associate Engineer - IBM (Job ID: 137023)',
  'Official IBM India hiring requisition for 2026 & 2027 graduating batches. Join IBM Cloud, Infrastructure & AI systems teams in Bangalore with competitive stipend and direct FTE conversion opportunities.',
  '## Position Overview\n\nIBM India is currently evaluating early-career talent and engineering students for the **Intern / Associate Engineer** track (Requisition ID: **137023**) based out of Bangalore.\n\nThis program serves as an accelerated pipeline into IBM''s enterprise software engineering, hybrid cloud platforms (Red Hat OpenShift), and AI engineering teams (watsonx).\n\n---\n\n## Key Responsibilities\n\n- Collaborate with senior architects and developers to build, test, and deploy resilient cloud services and microservices.\n- Write clean, maintainable, and well-tested code in Java, Python, Go, or JavaScript.\n- Assist in automating testing pipelines, CI/CD workflows, and containerized deployments using Docker and Kubernetes.\n- Participate in agile sprints, daily stand-ups, technical code reviews, and architectural design sessions.\n- Contribute to client-facing enterprise software integrations, troubleshooting production incidents, and performance benchmarking.\n\n---\n\n## Eligibility Criteria\n\n- **Graduating Batches:** **2026 and 2027** Batches.\n- **Degrees:** BE / B.Tech / ME / M.Tech in Computer Science, Information Technology, Electronics & Communication, or allied engineering disciplines.\n- **Academic Score:** Consistent academic record (minimum 60% or 6.5+ CGPA without active backlogs).\n- **Technical Skills:** Strong foundational knowledge of Data Structures & Algorithms, Object-Oriented Programming (OOP), Relational Databases (SQL), and Operating Systems.\n\n---\n\n## Compensation & Work Arrangement\n\n- **Stipend:** ₹40,000 – ₹50,000 / month (Competitive Industry Standard with conversion to full-time Associate Engineer package upon graduation).\n- **Location:** Bangalore, Karnataka, India.\n- **Work Model:** Hybrid (IBM Client Innovation Center / Manyata Tech Park).\n\n---\n\n## Application Instructions\n\nApply directly through the official IBM Careers portal using Job ID **137023**. Keep your ATS-friendly resume and GitHub/portfolio profiles ready.',
  'Fresher Engineering Assessment',
  '6 min read',
  'Raju Perumalla',
  '2026-10-15',
  ARRAY['IBM', 'Software Engineering', 'Cloud', 'AI', 'Bangalore', '2026 Batch', '2027 Batch', 'Fresher', 'Paid'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher',
  'Internship',
  'Hybrid',
  '₹40,000 - ₹50,000 / Month (Competitive Stipend)',
  true,
  'IBM India',
  'Bangalore, Karnataka, India',
  'Apply at IBM Careers →',
  'Rolling Applications (Job ID: 137023)',
  'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023',
  '{"organization": "IBM", "role": "Intern / Associate Engineer", "eligibility": "BE / B.Tech / ME / M.Tech (CS, IT, ECE, EE) - 2026 & 2027 Batches", "deadline": "Actively Hiring / Rolling Window", "location": "Bangalore, Karnataka, India (Hybrid)", "workMode": "Hybrid", "jobType": "Internship / Graduate Trainee", "stipend": "₹40,000 - ₹50,000 / Month (Competitive Stipend)", "officialUrl": "https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023&source=SN_LinkedIn", "isVerified": true}'::jsonb
),
-- 2. Salesforce - Summer 2027 Intern - UI/UX Designer
(
  'salesforce-summer-2027-intern-ui-ux-designer',
  'jobs',
  'Summer 2027 Intern - UI/UX Designer (Salesforce Futureforce)',
  '6-month prestigious Futureforce design internship at Salesforce India (Hyderabad/Bangalore). Work on AI Agentforce workflows, design systems, and enterprise UI/UX.',
  '## About Salesforce Futureforce\n\nThe **Futureforce University Recruiting** program at Salesforce is dedicated to cultivating the next generation of top tech and design talent. Our interns work on real, impactful products used by millions of global enterprise users.\n\nAs a **Summer 2027 UI/UX Design Intern** (Job ID: **JR363342**), you will join the team responsible for shaping intuitive, accessible, and delightful experiences across industry clouds and autonomous AI agents (Agentforce).\n\n---\n\n## Role Responsibilities\n\n- Solve complex UX design challenges across web, mobile, and tablet interfaces.\n- Collaborate closely with Product Managers, Engineers, and User Researchers to define customer journeys and validate prototypes.\n- Design high-fidelity wireframes, interaction flows, and interactive mockups in Figma and Sketch.\n- Evangelize Salesforce Lightning Design System (SLDS) guidelines and contribute new patterns.\n- Leverage LLM coding assistants and modern AI tools to accelerate design handoff and user research synthesis.\n\n---\n\n## Eligibility Criteria\n\n- **Graduating Batch:** **Class of 2027 only** (Candidates graduating in the year 2027).\n- **Branches / Qualifications:** M.Des, B.Des, or Bachelor''s/UG candidates with a proven, compelling UI/UX design portfolio.\n- **Skills:** Expert proficiency in modern design tools (Figma, Sketch, Adobe Creative Suite). Deep understanding of user-centered design methodologies, information architecture, and accessibility (WCAG).\n- **Bonus:** Familiarity with design systems, AI tooling (Gemini, Cursor), or enterprise CRM workflows.\n\n---\n\n## Program Details & Benefits\n\n- **Duration:** 6-Month Full-Time Summer Internship.\n- **Locations:** Hyderabad or Bengaluru, India (Hybrid arrangement).\n- **Stipend:** ₹60,000 – ₹80,000 / month (Top-tier industry compensation with mentorship, wellness benefits, and PPO potential).\n\n---\n\n## How to Apply\n\nSubmit your application and portfolio link directly on the Salesforce Workday portal (JR363342).',
  'Portfolio & Design Challenge',
  '7 min read',
  'Raju Perumalla',
  '2026-10-15',
  ARRAY['Salesforce', 'UI/UX Designer', 'Futureforce', 'Agentforce', 'Figma', 'Hyderabad', 'Bangalore', '2027 Batch', 'Paid'],
  true,
  true,
  'active',
  '2026-10-31T23:59:59.999Z',
  ARRAY[2027],
  'Fresher / Pre-final Year',
  'Internship',
  'Hybrid',
  '₹60,000 - ₹80,000 / Month (Industry Leading)',
  true,
  'Salesforce',
  'Hyderabad / Bangalore, India',
  'Apply at Salesforce Futureforce →',
  'Valid for Class of 2027',
  'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/Summer-2027-Intern---UI-UX-Designer_JR363342',
  '{"organization": "Salesforce", "role": "Summer 2027 Intern - UI/UX Designer (6 Months)", "eligibility": "Class of 2027 only: M.Des, B.Des, or UG/Engineering with UI/UX portfolio", "deadline": "2027 Summer Cohort / Apply Promptly", "location": "Hyderabad / Bangalore, India (Hybrid)", "workMode": "Hybrid", "jobType": "Internship", "stipend": "₹60,000 - ₹80,000 / Month", "officialUrl": "https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Summer-2027-Intern---UI-UX-Designer_JR363342?utm_source=chatgpt.com", "isVerified": true}'::jsonb
),
-- 3. Honeywell - Intern Bachelors Mechanical Eng
(
  'honeywell-intern-bachelors-mechanical-eng-2027',
  'jobs',
  'Intern Bachelors Mechanical Eng - Honeywell',
  'Hands-on engineering internship in mechanical systems design, CAD modeling, and industrial automation at Honeywell Hyderabad. High conversion potential to full-time engineering role.',
  '## About the Role\n\nAs an **Intern Bachelors Mechanical Eng** at Honeywell, you will gain hands-on industrial engineering exposure. You will collaborate with seasoned engineers on real-world automation, aerospace, and building technologies hardware projects.\n\nThis internship is structured as an **Internship + FTE conversion track** for graduating students.\n\n---\n\n## Key Responsibilities\n\n- Assist in the computer-aided design (CAD), thermal analysis, and physical testing of mechanical components.\n- Participate in engineering design reviews and offer suggestions for manufacturability and cost efficiency.\n- Conduct simulations and computational finite element analysis (FEA) to validate system durability.\n- Prepare technical documentation, schematic drawings, and validation reports.\n- Interface with cross-functional manufacturing and electrical teams.\n\n---\n\n## Qualifications & Eligibility\n\n- **Degree:** Enrolled in a Bachelor''s Degree in Mechanical Engineering, Mechatronics, or related stream.\n- **Graduating Batch:** **2027 Batch** (Pre-final year).\n- **Core Competencies:** Solid fundamentals in engineering mechanics, thermodynamics, and materials science.\n- **Tools:** Practical exposure to SolidWorks, AutoCAD, ANSYS, or Creo is highly valued.\n\n---\n\n## Location & Stipend\n\n- **Location:** Hyderabad, Telangana, India.\n- **Work Model:** On-site (Honeywell Technology Solutions Center).\n- **Expected Stipend:** ₹40,000 / month.\n\n---\n\n## Application Steps\n\nApply via Honeywell''s Oracle Cloud Candidate Experience portal or verified partner links.',
  'Engineering Technical Interview',
  '5 min read',
  'Raju Perumalla',
  '2026-10-15',
  ARRAY['Honeywell', 'Mechanical Engineering', 'CAD', 'Design', 'Automation', 'Hyderabad', '2027 Batch', 'Paid'],
  false,
  true,
  'active',
  '2026-10-25T23:59:59.999Z',
  ARRAY[2027],
  'Fresher',
  'Internship',
  'On-site',
  '₹40,000 / Month (Stipend)',
  true,
  'Honeywell',
  'Hyderabad, India',
  'Apply at Honeywell Portal →',
  'Apply Before Late October 2026',
  'https://ibqbjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/Honeywell/job/159839',
  '{"organization": "Honeywell", "role": "Intern Bachelors Mechanical Eng (Internship + FTE)", "eligibility": "Degree in Mechanical Engineering - 2027 Graduating Batch", "deadline": "October 2026", "location": "Hyderabad, India", "workMode": "On-site", "jobType": "Internship", "stipend": "₹40,000 / Month (Stipend)", "officialUrl": "https://thejobcompany.co.in/frontend/job_details.php?job_id=6504&utm_source=chatgpt.com", "isVerified": true}'::jsonb
),
-- 4. PwC - Business AI Engineer - Intern
(
  'pwc-business-ai-engineer-intern-2027',
  'jobs',
  'Business AI Engineer - Intern - PwC',
  'Enterprise AI & automation internship at PwC Acceleration Centers. Work on LLM fine-tuning, retrieval-augmented generation (RAG), and generative AI solutions for Fortune 500 clients.',
  '## About PwC Business AI Engineering\n\nPwC''s Acceleration Centers are pioneering the application of Generative AI, machine learning, and automated decision-making engines for enterprise clients across financial services, healthcare, and retail.\n\nAs a **Business AI Engineer Intern**, you will bridge the gap between cutting-edge foundational models and high-impact enterprise workflows.\n\n---\n\n## What You Will Do\n\n- Build and evaluate agentic AI workflows, LangChain / LlamaIndex pipelines, and RAG architectures.\n- Work with Python, PyTorch, Hugging Face transformers, and vector databases (Pinecone, Chroma, pgvector).\n- Optimize prompts, evaluate hallucination metrics, and fine-tune open-source models for domain-specific tasks.\n- Integrate AI services with backend REST/GraphQL microservices and cloud infrastructures (Azure AI / AWS Bedrock).\n- Document data governance, security policies, and responsible AI ethics.\n\n---\n\n## Qualifications & Eligibility\n\n- **Graduating Batch:** **2027 Batch** (Pre-final year).\n- **Educational Background:** B.Tech / BE in Computer Science, Artificial Intelligence, Data Science, or allied STEM fields.\n- **Prerequisites:** Strong programming skills in Python, solid grasp of ML mathematics (linear algebra, probability), and practical familiarity with LLMs and REST APIs.\n\n---\n\n## Compensation & Locations\n\n- **Locations:** Bengaluru or Hyderabad, India.\n- **Work Model:** Hybrid (2–3 days in office).\n- **Stipend:** ₹35,000 – ₹45,000 / month.\n\n---\n\n## Application Steps\n\nSubmit your application directly through PwC''s Global Careers portal or authorized campus placement pipelines.',
  'AI / Python Technical Interview',
  '6 min read',
  'Raju Perumalla',
  '2026-10-15',
  ARRAY['PwC', 'AI', 'Machine Learning', 'GenAI', 'LLM', 'Python', 'Bengaluru', 'Hyderabad', '2027 Batch', 'Paid'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2027],
  'Fresher',
  'Internship',
  'Hybrid',
  '₹35,000 - ₹45,000 / Month',
  true,
  'PwC',
  'Bengaluru & Hyderabad, India',
  'Apply at PwC Careers →',
  'Rolling Applications (2027 Batch)',
  'https://jobs-ta.pwc.com/global/en/job/PACPACGLOBAL763405WDEXTERNALENGLOBAL/Business-AI-Engineer-Intern-2027',
  '{"organization": "PwC", "role": "Business AI Engineer - Intern", "eligibility": "B.Tech / BE in Computer Science, Data Science, AI or allied tech - 2027 Batch", "deadline": "Rolling Admissions", "location": "Bengaluru, Hyderabad, India (Hybrid)", "workMode": "Hybrid", "jobType": "Internship", "stipend": "₹35,000 - ₹45,000 / Month", "officialUrl": "https://thejobcompany.co.in/frontend/job_details.php?job_id=6501&utm_source=chatgpt.com", "isVerified": true}'::jsonb
),
-- 5. HSBC - Intern (Apprentice - 12 Months)
(
  'hsbc-intern-apprentice-12-months-gurugram',
  'jobs',
  'Intern (Apprentice - 12 Months) - HSBC Banking Operations',
  '12-month paid government-certified banking apprenticeship at HSBC Corporate & Institutional Banking in Gurugram under the Apprentices Act & NATS portal. Receive Govt. Certificate of Proficiency.',
  '## About HSBC Corporate & Institutional Banking\n\nHSBC is one of the world''s largest banking and financial services organizations. The Corporate and Institutional Banking division provides financing, treasury, and capital markets solutions worldwide.\n\nThis **Intern (Apprentice - 12 Months)** position (Requisition ID: **563774612428195**) offers a formal 1-year apprenticeship governed by the **Apprentices Act, 1961** and registered under the **NATS portal**.\n\n---\n\n## What You Will Learn & Do\n\n- Own end-to-end Credit & Lending (C&L) servicing workflows, tracking OKRs, SLAs, and customer touchpoints.\n- Assist Business Control Officers (BCO) with portfolio tracking, data reconciliation, and operational risk metrics.\n- Utilize Excel, PowerPoint, and modern AI data visualization tools to produce monthly executive reporting packages.\n- Act as First Line of Defence adhering to anti-money laundering (AML), regulatory controls, and international banking compliance.\n- Complete official compliance training and acquire deep exposure to global transaction banking.\n\n---\n\n## Official Government NATS Certification\n\n- The tenure of the Apprentice is 1 (one) full year as defined under the Apprentices Act, 1961.\n- All apprentices are formally registered on the **National Apprenticeship Training Scheme (NATS)** portal.\n- Upon successful completion, an official **Certificate of Proficiency** will be issued by the Government of India.\n\n---\n\n## Eligibility Criteria\n\n- **Graduating Batches:** **2026 & 2027 Batches** (also welcoming recent 2025 graduates seeking formal banking credentials).\n- **Qualifications:** Bachelor''s degree in Business, Finance, Commerce (B.Com / BBA), Computer Applications, or related quantitative fields.\n- **Skills:** Strong analytical mindset, proficiency in Microsoft Excel, and exceptional English communication skills.\n\n---\n\n## Location & Work Model\n\n- **Location:** Gurugram, Haryana, India.\n- **Model:** Hybrid / On-site.\n- **Stipend:** Standard Government & HSBC NATS Apprenticeship Monthly Stipend.\n\n---\n\n## How to Apply\n\nApply on the HSBC Careers portal (Requisition: 563774612428195).',
  'Aptitude & Video Interview',
  '6 min read',
  'Raju Perumalla',
  '2026-10-15',
  ARRAY['HSBC', 'Banking', 'Apprenticeship', 'Credit & Lending', 'NATS', 'Gurugram', '2026 Batch', '2027 Batch', 'Paid'],
  true,
  true,
  'active',
  '2027-04-07T23:59:59.999Z',
  ARRAY[2026, 2027],
  'Fresher Apprentice',
  'Apprenticeship',
  'Hybrid',
  'NATS Government & HSBC Banking Stipend',
  true,
  'HSBC',
  'Gurugram, Haryana, India',
  'Apply at HSBC Portal →',
  'Valid Through April 2027',
  'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india',
  '{"organization": "HSBC", "role": "Intern (Apprentice - 12 Months, NATS)", "eligibility": "Bachelor degree in Business, Finance, CS or allied (2026 & 2027 Batches)", "deadline": "2027-04-07", "location": "Gurugram, Haryana, India", "workMode": "Hybrid", "jobType": "Apprenticeship", "stipend": "Official NATS Apprentice Stipend", "officialUrl": "https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india?domain=hsbc.com&utm_source=chatgpt.com", "isVerified": true}'::jsonb
),
-- 6. Standard Chartered - Apprentice Operations GBS India 2026
(
  'standard-chartered-apprentice-operations-gbs-india-2026',
  'jobs',
  'Apprentice Operations GBS India 2026 - Standard Chartered',
  'Early career banking operations apprenticeship at Standard Chartered Global Business Services (GBS) in Chennai. Gain comprehensive hands-on training in transaction banking, financial controls, and risk.',
  '## About Standard Chartered GBS India\n\nStandard Chartered Global Business Services (GBS) in India is a major technology and operations hub delivering innovative banking, trading, client onboarding, and financial crime compliance services across 50+ international markets.\n\nThe **Apprentice Operations GBS India 2026** initiative (Requisition ID: **58757**) provides recent graduates and 2026 candidates an immersive operational foundation in multinational corporate banking.\n\n---\n\n## Role & Responsibilities\n\n- Execute day-to-day transaction processing, payments settlements, and account reconciliation workflows.\n- Monitor service level agreements (SLAs), accuracy metrics, and key performance indicators.\n- Assist senior associates with tracking audit requests and maintaining statutory compliance.\n- Help streamline client inquiries and resolve discrepancy tickets in financial databases.\n- Receive systematic structured training in banking risk, international trade, and KYC/AML guidelines.\n\n---\n\n## Eligibility Criteria\n\n- **Target Batch:** **2026 Batch Graduates** (also open to 2024 and 2025 graduates seeking full-time banking apprenticeships).\n- **Eligible Degrees:** Bachelor''s degrees such as B.Com, BBA, BBM, BMS, BSc, or equivalent 3-year undergraduate qualifications.\n- *Exclusions:* Candidates pursuing or possessing post-graduate qualifications (MBA, M.Com, PGDM) are not eligible.\n- **Prior Experience:** No prior banking experience required. Entry-level fresher friendly.\n\n---\n\n## Key Competencies\n\n- Proficiency with Microsoft Office tools (specifically Excel data formulas and reporting).\n- Analytical aptitude, attention to detail, and disciplined adherence to security protocols.\n- Effective English verbal and written communication skills.\n\n---\n\n## Location & Compensation\n\n- **Location:** Chennai, Tamil Nadu, India.\n- **Model:** Hybrid (Standard Chartered GBS Campus).\n- **Stipend:** Official Standard Chartered Monthly Banking Apprentice Stipend.\n\n---\n\n## Application Steps\n\nApply through the Standard Chartered Careers portal or verified listings using Requisition **58757**.',
  'Entry Level Assessment',
  '5 min read',
  'Raju Perumalla',
  '2026-10-15',
  ARRAY['Standard Chartered', 'Banking', 'Operations', 'GBS', 'Chennai', 'Apprenticeship', '2026 Batch', 'Paid'],
  false,
  true,
  'active',
  NULL,
  ARRAY[2026],
  'Fresher Apprentice',
  'Apprenticeship',
  'Hybrid',
  'Standard Chartered Monthly Banking Stipend',
  true,
  'Standard Chartered Bank',
  'Chennai, Tamil Nadu, India',
  'Apply at Standard Chartered →',
  'Active for 2026 Batch',
  'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB',
  '{"organization": "Standard Chartered", "role": "Apprentice Operations GBS India 2026 (Req: 58757)", "eligibility": "Undergraduate Degree (B.Com, BBA, BBM, BMS, BSc) - 2024, 2025, 2026 Batches", "deadline": "Rolling Admissions (2026 Batch)", "location": "Chennai, Tamil Nadu, India", "workMode": "Hybrid", "jobType": "Apprenticeship", "stipend": "Official Bank Apprentice Stipend", "officialUrl": "https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB?utm_source=lilimitedlistings&feedid=363857", "isVerified": true}'::jsonb
),
-- 7. Recruit CRM - Customer Success Associate (2027 Graduates)
(
  'recruit-crm-customer-success-associate-2027',
  'jobs',
  'Customer Success Associate - Recruit CRM (2027 Graduates)',
  'Official Recruit CRM hiring for 2027 graduates. Fully remote Customer Success Associate role with 6-month traineeship at ₹20,000/month followed by full-time conversion at ₹8 LPA CTC (₹6 LPA base + ₹2 LPA performance pay).',
  '## Company Overview\n\n**Recruit CRM** is one of the few fully bootstrapped, remote-first SaaS companies to surpass **$11.6M in Annual Recurring Revenue (ARR)** while remaining profitable every year since inception. Growing at **40%+ YoY** with a **30% annual profit margin**, Recruit CRM powers executive search and recruitment firms across 100+ countries with corporate entities in the US, Ireland, India, and Dubai. Ranked **#1 in its category by Gartner** and rated **4.9/5 on Capterra & G2**.\n\nDiscover more about the company at [www.recruitcrm.io](https://recruitcrm.io/).\n\n---\n\n## Position Overview\n\nRecruit CRM is hiring passionate **2027 Graduates** for the **Customer Success Associate** program (Requisition ID: **17915624986970157266mLh**). This opportunity allows upcoming graduates to gain hands-on customer success experience, master enterprise B2B SaaS workflows, and earn a direct transition into a full-time Associate Customer Success role with high-growth compensation.\n\n- **Total Open Positions:** 10\n- **Location:** Fully Remote (Work From Home)\n- **Joining Timeline:** Immediate\n\n---\n\n## Training Journey & Compensation\n\n- **Traineeship Program (First 6 Months):**\n  - **Duration & Hours:** 6 months; 8.5 hours per day (Monday to Friday).\n  - **Stipend:** **₹20,000 per month**.\n  - **Initial Shift:** Primary Europe shift (12:00 PM / Noon – 10:00 PM IST).\n- **Full-Time Opportunity (FTE Conversion):**\n  - Upon successful completion of the training program and performance evaluation, you will be offered a full-time position as **Customer Success — Associate**.\n  - **CTC:** **₹8,00,000 per annum** (**₹6,00,000 fixed base salary + ₹2,00,000 yearly performance pay**).\n  - **Post-Training Shift Options:** Europe, Asia Pacific, North America, or Middle East (aligned to business requirements).\n\n---\n\n## Why Join Recruit CRM?\n\n- **100% Fully Remote:** Freedom to work anywhere across India.\n- **ARR-Linked Performance Bonus:** After 1 year as a full-time employee, you become eligible for our ARR-Linked Performance Bonus, announced every January 1st.\n- **Sponsored L&D Programs:** Full sponsorship for continuous professional growth and skill building.\n- **Company-Paid Team Outbounds:** Regular funded company meetups and retreats.\n- **Full Insurance Coverage:** Health benefits and competitive total rewards.\n\n---\n\n## What You Will Do\n\n- Learn the Recruit CRM platform inside and out and master global recruitment operations.\n- Handle inbound customer queries and platform troubleshooting via chat, email, and video calls.\n- Empathize with users, resolve complex challenges, and offer creative workarounds.\n- Advocate for user needs by channeling customer feedback directly to Product and Engineering teams.\n- Build and nurture long-term client relationships across 100+ countries.\n\n---\n\n## Who Can Apply?\n\n- **Eligible Batches:** Exclusively open to freshers completing **Graduation / Post-Graduation in 2027**.\n- **Specialization:** All degrees and specializations welcome (B.Tech / B.E., B.Sc, BCA, MCA, BBA, B.Com, M.Tech, etc.).\n- **Skills Required:**\n  - Exceptional verbal and written English communication skills.\n  - Quick learner with natural curiosity for software and technology.\n  - Proactive problem-solving attitude with strong client empathy.\n\n---\n\n## Selection Process (100% Virtual)\n\n1. **Online Assessment (MCQ):** Testing analytical aptitude, situational problem-solving, and logic.\n2. **Practical Case Assignment:** Hands-on scenario exercise to evaluate communication and solutioning.\n3. **Virtual Interviews:** In-depth evaluation with the Customer Success and talent leadership.\n\n---\n\n## Official Links & Documents\n\n- **Official Job Description Document:** [CSA India - JD (Google Drive)](https://drive.google.com/file/d/1BwUJOYtAq8I3Fm25_ZmqzgFqryhHYMux/view?usp=sharing)\n- **Application Deadline:** November 18, 2026 (Apply early for immediate batch processing)\n- **Direct Application:** [Apply on Recruit CRM Careers Portal](https://careers.recruitcrm.io/17915624986970157266mLh?utm_source=internal+hiring+&utm_medium=job+candidate+&utm_campaign=hiring+)\n---\n',
  'Online MCQ & Virtual Assessment',
  '5 min read',
  'Raju Perumalla',
  '2026-10-20',
  ARRAY['Recruit CRM', 'Customer Success', 'SaaS', 'Remote', '2027 Batch', 'Fresher', 'Paid', 'High CTC'],
  true,
  true,
  'active',
  '2026-11-18T23:59:59.999Z',
  ARRAY[2027],
  'Fresher (2027 Batch)',
  'Internship / Full-time',
  'Remote',
  '₹20,000 / Month (Training) → ₹8,00,000 / Year (FTE CTC)',
  true,
  'Recruit CRM',
  'Fully Remote (Work From Home, India)',
  'Apply at Recruit CRM Careers →',
  'Immediate Joining (Batch 2027)',
  'https://careers.recruitcrm.io/17915624986970157266mLh',
  '{"organization": "Recruit CRM", "role": "Customer Success Associate - 2027 Graduates (Req: 17915624986970157266mLh)", "eligibility": "Freshers completing graduation/post-graduation in 2027 (Any stream/specialization)", "deadline": "November 18, 2026 (Immediate Joining)", "location": "Fully Remote (Work From Home)", "workMode": "Remote", "jobType": "Traineeship / Internship + Full-Time", "stipend": "₹20,000/month (6-mo Training) → ₹8,00,000 CTC Full-Time", "officialUrl": "https://careers.recruitcrm.io/17915624986970157266mLh?utm_source=internal+hiring+&utm_medium=job+candidate+&utm_campaign=hiring+", "eligibleBatches": [2027], "isVerified": true}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  difficulty = EXCLUDED.difficulty,
  read_time = EXCLUDED.read_time,
  author = EXCLUDED.author,
  published_date = EXCLUDED.published_date,
  tags = EXCLUDED.tags,
  is_featured = EXCLUDED.is_featured,
  published = EXCLUDED.published,
  status = EXCLUDED.status,
  application_deadline = EXCLUDED.application_deadline,
  eligible_batches = EXCLUDED.eligible_batches,
  experience_level = EXCLUDED.experience_level,
  opportunity_type = EXCLUDED.opportunity_type,
  work_arrangement = EXCLUDED.work_arrangement,
  stipend_amount = EXCLUDED.stipend_amount,
  is_stipend_paid = EXCLUDED.is_stipend_paid,
  source_name = EXCLUDED.source_name,
  source_location = EXCLUDED.source_location,
  action_text = EXCLUDED.action_text,
  deadline_text = EXCLUDED.deadline_text,
  canonical_url = EXCLUDED.canonical_url,
  opportunity_data = EXCLUDED.opportunity_data,
  updated_at = NOW();


-- =========================================================================
-- BATCH INSERT: 18 NEW VERIFIED JOBS & INTERNSHIPS (ADDED OCT 31, 2026)
-- =========================================================================
INSERT INTO decode_resources (
  slug,
  category_slug,
  title,
  summary,
  content,
  difficulty,
  read_time,
  author,
  published_date,
  tags,
  is_featured,
  published,
  status,
  application_deadline,
  eligible_batches,
  experience_level,
  opportunity_type,
  work_arrangement,
  stipend_amount,
  is_stipend_paid,
  source_name,
  source_location,
  action_text,
  deadline_text,
  canonical_url,
  opportunity_data
) VALUES
(
  'heizen-software-development-engineer-intern',
  'jobs',
  'Software Development Engineer Intern - Heizen (Remote / Hyderabad)',
  'Heizen is hiring Software Development Engineer Interns. Open to CS/Engineering students and recent graduates (2026 & 2027 batches) with stipend of ₹25,000/month and performance-based PPO potential. Remote-friendly for Hyderabad applicants.',
  '## Position Overview

Heizen is evaluating passionate engineering students and early-career talent for the **Software Development Engineer (SDE) Intern** role. This role is remote-first with strong local support for Hyderabad-based applicants.

As an SDE Intern at Heizen, you will work directly alongside core engineering leads building high-speed software delivery systems, full-stack web platforms, and cross-platform applications.

---

## Key Responsibilities

- Build and maintain modern web and mobile applications using React, Next.js, and Flutter.
- Design resilient RESTful APIs and backend services using Python and Java.
- Write performant SQL queries, design database schemas, and optimize data persistence.
- Participate in code reviews, continuous integration/continuous deployment (CI/CD) pipelines, and agile sprints.
- Troubleshoot client and production issues, shipping clean and well-tested code at light speed.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduating batches (B.Tech, B.E., M.Tech, MCA, or related disciplines).
- **Core Skills:** Proficiency in Python, Java, JavaScript/TypeScript, React, Next.js, SQL, and Flutter.
- **Problem Solving:** Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming (OOP).
- **Mindset:** Proactive, eager to take ownership of features, and driven by software craftsmanship.

---

## Compensation & Benefits

- **Stipend:** **₹25,000 per month**.
- **Pre-Placement Offer (PPO):** High-performing interns will be considered for direct full-time conversion.
- **Work Model:** Fully Remote with Hyderabad regional collaboration.
- **Contact:** Questions can be directed to hiring@heizen.work.

---

## Official Application

Apply directly on the [Official Heizen Careers Page](https://www.heizen.work/careers/sde-intern).',
  'Technical Assessment & Projects',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Heizen', 'Software Development', 'Python', 'Java', 'React', 'Next.js', 'Flutter', 'SQL', 'APIs', 'Hyderabad', 'Remote', '2026 Batch', '2027 Batch', 'Paid', 'PPO'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (CS/Engineering Students & Graduates)',
  'Internship',
  'Remote',
  '₹25,000 / Month (PPO Potential)',
  true,
  'Heizen',
  'Remote / Hyderabad, India',
  'Apply at Heizen Careers →',
  'Rolling Applications (Apply Early)',
  'https://www.heizen.work/careers/sde-intern',
  '{"organization":"Heizen","role":"Software Development Engineer Intern","eligibility":"CS/Engineering students or recent graduates (2026 & 2027 Batches)","deadline":"Rolling Applications","location":"Remote / Hyderabad, India","workMode":"Remote","jobType":"Internship","stipend":"₹25,000 / Month","officialUrl":"https://www.heizen.work/careers/sde-intern","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'hubble-software-engineering-intern-backend-data-platform',
  'jobs',
  'Software Engineering Intern (Backend & Data Platform) - Hubble',
  '6-month paid remote backend and data platform engineering internship at Hubble for 2026 & 2027 graduates. Lucrative compensation of $500–$1,000/month (~₹42,000–₹84,000/month) at minimum 40 hours/week.',
  '## Position Overview

Hubble is offering an exceptional opportunity for an ambitious student or recent graduate to join as a **Software Engineering Intern focused on Backend & Data Platforms**.

This 6-month, 40-hour/week remote internship is structured to give you deep exposure to distributed data pipelines, high-throughput microservices, and modern database infrastructure.

---

## Key Responsibilities

- Develop robust backend services and REST/gRPC endpoints using modern languages (Python, Go, or Java).
- Build and maintain scalable data ingestion, validation, and analytics pipelines.
- Work with distributed databases, relational schemas, caching tiers (Redis), and event queues (Kafka/RabbitMQ).
- Write unit tests, integration suites, and monitor production reliability and latency metrics.
- Collaborate with cross-border engineering teams on technical design and code audits.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (B.Tech, B.E., M.Tech, or equivalent in CS/IT).
- **Time Commitment:** Minimum 40 hours per week (full-time remote internship dedication).
- **Technical Skills:** Strong understanding of backend architecture, database queries, API fundamentals, and data modeling.
- **Bonus:** Familiarity with cloud platforms (AWS/GCP), Docker containerization, and data warehousing.

---

## Compensation & Highlights

- **Stipend:** **$500 – $1,000 / month** (equivalent to ~**₹42,000 – ₹84,000 per month** in INR).
- **Duration:** 6 Months.
- **Location:** Remote, India.

---

## Official Application

Submit your application through the [Official Hubble Application Portal](https://apply.headlinema.com/apply).',
  'Backend & Systems Assessment',
  '6 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Hubble', 'Backend', 'Data Platform', 'Distributed Systems', 'Python', 'SQL', 'Remote', '2026 Batch', '2027 Batch', 'Paid', 'USD Compensation'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Student (40 hrs/week)',
  'Internship',
  'Remote',
  '$500 - $1,000 / Month (~₹42,000 - ₹84,000/month)',
  true,
  'Hubble',
  'Remote, India',
  'Apply on Official Portal →',
  'Immediate Opening (Rolling)',
  'https://apply.headlinema.com/apply',
  '{"organization":"Hubble","role":"Software Engineering Intern, Backend & Data Platform","eligibility":"CS/IT engineering students or graduates with backend & data platform foundation","deadline":"Rolling Applications","location":"Remote, India","workMode":"Remote","jobType":"Internship","stipend":"$500 - $1,000 / Month","officialUrl":"https://apply.headlinema.com/apply","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'predikt-software-engineering-intern',
  'jobs',
  'Software Engineering Intern - Predikt (Remote / Hybrid)',
  'Paid software engineering internship at Predikt offering ₹15,000–₹25,000/month with potential full-time conversion (PPO). Open to CS students and recent graduates skilled in JavaScript, TypeScript, and modern web development.',
  '## Position Overview

Predikt is looking for a driven **Software Engineering Intern** to contribute to cutting-edge web products and interactive user interfaces.

This opportunity offers competitive monthly compensation, close mentorship from senior product engineers, and clear potential for full-time conversion (PPO) upon graduation.

---

## Key Responsibilities

- Develop dynamic, pixel-perfect user interfaces using JavaScript, TypeScript, and React.
- Integrate frontend views with RESTful backend endpoints and state management libraries.
- Optimize frontend rendering speed, core web vitals, and mobile responsiveness.
- Translate Figma prototypes and design tokens into reusable, clean modular UI components.
- Participate in agile sprint planning, testing, and continuous deployment workflows.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduating students or recent graduates in Computer Science or related fields.
- **Skills:** Solid proficiency in JavaScript, TypeScript, HTML5, CSS3, and modern frontend tools.
- **Portfolio:** Tangible projects, GitHub repositories, or live web applications showcasing your frontend code quality.

---

## Compensation & Growth

- **Stipend:** **₹15,000 – ₹25,000 per month**.
- **PPO:** Strong potential for full-time conversion based on performance.
- **Work Arrangement:** Remote or Hybrid across India.

---

## Official Application

Apply directly on the [Predikt Careers Portal](https://predikt.in/careers/software-engineering-intern/).',
  'Frontend Challenge & Portfolio Review',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Predikt', 'Frontend', 'Web Development', 'JavaScript', 'TypeScript', 'React', 'Remote', 'Hybrid', '2026 Batch', '2027 Batch', 'Paid', 'PPO'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (CS Students & Recent Graduates)',
  'Internship',
  'Remote',
  '₹15,000 - ₹25,000 / Month (PPO Potential)',
  true,
  'Predikt',
  'Remote or Hybrid, India',
  'Apply at Predikt Careers →',
  'Rolling Admissions',
  'https://predikt.in/careers/software-engineering-intern/',
  '{"organization":"Predikt","role":"Software Engineering Intern","eligibility":"CS students and recent graduates (2026 & 2027 Batches) with strong web project portfolio","deadline":"Rolling Applications","location":"Remote or Hybrid, India","workMode":"Remote","jobType":"Internship","stipend":"₹15,000 - ₹25,000 / Month","officialUrl":"https://predikt.in/careers/software-engineering-intern/","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'hindutone-python-developer-intern-hyderabad',
  'jobs',
  'Python Developer Intern - HinduTone (Hyderabad)',
  'Paid Python Developer internship at HinduTone in Hyderabad (Hybrid mode). Open to engineering students and recent graduates, including final-year candidates. Application window active until December 20, 2026.',
  '## Position Overview

HinduTone is inviting applications for a **Python Developer Intern** based in Hyderabad, operating in a collaborative hybrid work model.

Applications are reviewed on a rolling basis as they arrive, with the formal application deadline on **December 20, 2026**.

---

## Key Responsibilities

- Write clean, modular, and efficient Python code for internal tools and web services.
- Automate data ingestion, parsing, and API integrations using Python libraries.
- Assist in database schema management, querying, and backend optimization.
- Debug and resolve software anomalies, write automated tests, and maintain documentation.

---

## Eligibility Criteria

- **Batches:** Open to **2026 and 2027** batches (including final-year students and fresh graduates).
- **Core Skill:** Practical experience and hands-on comfort with Python programming.
- **Location:** Able to work in Hyderabad in a hybrid arrangement.
- **Problem Solving:** Good logical aptitude and willingness to learn on the job.

---

## Compensation & Terms

- **Stipend:** Paid internship; exact amount finalized during selection.
- **Deadline:** **December 20, 2026** (candidates are encouraged to apply immediately).
- **Work Model:** Hybrid (Hyderabad).

---

## Official Application

Read full instructions and apply on the [HinduTone Careers Page](https://hindutone.com/careers/python-developer-intern-hyderabad/).',
  'Python Coding & Interview',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['HinduTone', 'Python', 'Backend', 'Hyderabad', 'Hybrid', '2026 Batch', '2027 Batch', 'Paid', 'Internship'],
  false,
  true,
  'active',
  '2026-12-20T23:59:59.999Z'::timestamptz,
  ARRAY[2026, 2027],
  'Fresher (Students, Final-Year & Recent Graduates)',
  'Internship',
  'Hybrid',
  'Paid (Discussed during selection)',
  true,
  'HinduTone',
  'Hyderabad, Telangana, India',
  'Apply at HinduTone →',
  'December 20, 2026',
  'https://hindutone.com/careers/python-developer-intern-hyderabad/',
  '{"organization":"HinduTone","role":"Python Developer Intern","eligibility":"Students and recent graduates, including final-year students (2026 & 2027 Batches)","deadline":"December 20, 2026","location":"Hyderabad, Telangana, India (Hybrid)","workMode":"Hybrid","jobType":"Internship","stipend":"Paid (Industry Standard)","officialUrl":"https://hindutone.com/careers/python-developer-intern-hyderabad/","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'smartdocs-junior-software-developer-hyderabad',
  'jobs',
  'Junior Software Developer - SmartDocs Business Solutions (Hyderabad)',
  'SmartDocs Business Solutions is hiring Junior Software Developers in Hyderabad offering ₹4–6 LPA. Open to final-year students and fresh graduates (0–2 years) with skills in Java, Spring Boot, and Agentic AI systems.',
  '## Position Overview

SmartDocs Business Solutions is actively hiring a **Junior Software Developer** for its Hyderabad engineering center.

This full-time engineering position provides a competitive CTC of **₹4–6 LPA** and gives fresh engineers direct hands-on exposure to Java enterprise stacks, Spring Boot microservices, and modern Agentic AI workflows.

---

## Key Responsibilities

- Design, develop, and maintain high-performance enterprise applications in Java and Spring Boot.
- Implement Agentic AI features, autonomous workflow automation, and intelligent document processing.
- Write robust unit tests, handle database transactions, and optimize SQL queries.
- Collaborate with solution architects and product managers to deliver scalable B2B enterprise software.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (final-year students and fresh graduates are fully welcome).
- **Experience:** 0–2 years of relevant software development experience or project work.
- **Skills:** Solid Java programming, Spring Boot framework, RESTful services, and exposure to Agentic AI paradigms.
- **Location:** Hyderabad office based (On-site).

---

## Compensation & Highlights

- **Salary:** **₹4,00,000 – ₹6,00,000 per annum (₹4–6 LPA CTC)**.
- **Role Type:** Permanent Full-time Software Developer.
- **Location:** Hyderabad, Telangana.

---

## Official Application

View details and apply directly through the [Jobeedo Application Page](https://jobeedo.com/job/jr-software-developer-156169943).',
  'Java & Backend Architecture Assessment',
  '6 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['SmartDocs', 'Java', 'Spring Boot', 'Agentic AI', 'Backend', 'Hyderabad', 'On-site', '2026 Batch', '2027 Batch', 'Full-time', 'High CTC'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (0–2 Years, Final-year & Fresh graduates welcome)',
  'Full-time',
  'On-site',
  '₹4,00,000 - ₹6,00,000 / Year (FTE)',
  true,
  'SmartDocs Business Solutions',
  'Hyderabad, Telangana, India',
  'Apply on Jobeedo Portal →',
  'Active Requisition (Posted Oct 26, 2026)',
  'https://jobeedo.com/job/jr-software-developer-156169943',
  '{"organization":"SmartDocs Business Solutions","role":"Junior Software Developer","eligibility":"Final-year students and fresh engineering graduates (2026 & 2027 Batches, 0–2 years exp)","deadline":"Active Requisition / Rolling","location":"Hyderabad, Telangana, India","workMode":"On-site","jobType":"Full-time","stipend":"₹4 - ₹6 LPA CTC","officialUrl":"https://jobeedo.com/job/jr-software-developer-156169943","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'trendwick-associate-software-engineer',
  'jobs',
  'Associate Software Engineer - Trendwick (Hyderabad / Delhi)',
  'Full-time fresher Associate Software Engineer opportunity at Trendwick across Hyderabad & Delhi offices. Salary ₹3–4 LPA. Requires strong programming fundamentals in Python, Java, C, OOP, DSA, SQL, and Git.',
  '## Position Overview

Trendwick is expanding its core software engineering cohort and hiring **Associate Software Engineers** for its Hyderabad and Delhi technology centers.

This entry-level full-time role offers an annual CTC of **₹3–4 LPA** and focuses heavily on strong computer science fundamentals, algorithm efficiency, and production code quality.

---

## Key Responsibilities

- Write structured, maintainable code in Python, Java, or C.
- Solve engineering challenges applying foundational Data Structures and Algorithms.
- Design database tables, write relational SQL queries, and manage transactional integrity.
- Collaborate with team members using Git version control and modern CI/CD practices.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (Freshers welcome; 0–1 year experience).
- **Degrees:** Any engineering or science graduate with strong programming aptitude.
- **Key Concepts:** Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Relational Databases, and Git.

---

## Compensation & Details

- **Compensation:** **₹3,00,000 – ₹4,00,000 per annum (₹3–4 LPA)**.
- **Location:** Hyderabad / Delhi (On-site).
- **Hiring Cycle:** Rolling window; immediate onboarding for selected candidates.

---

## Official Application

Submit your profile on the [Official Trendwick Careers Page](https://trendwick.co/careers/associate-software-engineer).',
  'Core DSA & OOP Assessment',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Trendwick', 'Python', 'Java', 'C', 'OOP', 'DSA', 'SQL', 'Git', 'Hyderabad', 'Delhi', 'On-site', '2026 Batch', '2027 Batch', 'Full-time'],
  false,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (0–1 Year, Any Graduate)',
  'Full-time',
  'On-site',
  '₹3,00,000 - ₹4,00,000 / Year (FTE)',
  true,
  'Trendwick',
  'Hyderabad / Delhi, India',
  'Apply at Trendwick Careers →',
  'Rolling Admissions',
  'https://trendwick.co/careers/associate-software-engineer',
  '{"organization":"Trendwick","role":"Associate Software Engineer","eligibility":"Freshers welcome, any graduate (2026 & 2027 Batches, 0–1 year exp)","deadline":"Rolling Applications","location":"Hyderabad / Delhi, India","workMode":"On-site","jobType":"Full-time","stipend":"₹3 - ₹4 LPA CTC","officialUrl":"https://trendwick.co/careers/associate-software-engineer","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'sd-wot-associate-software-engineer-javascript-fullstack',
  'jobs',
  'Associate Software Engineer (JavaScript / Full Stack) - SD WoT (Hyderabad)',
  'SD WoT is hiring Associate Software Engineers in Cherlapally, Hyderabad. Package up to ₹5 LPA based on technical skills. Open to CSE, IT, ECE, EEE graduates with knowledge of JavaScript, HTML/CSS, and React/MERN stack.',
  '## Position Overview

SD WoT is hiring for the role of **Associate Software Engineer (JavaScript / Full Stack Fresher)** located at Cherlapally, Hyderabad.

The role offers compensation **up to ₹5 LPA** (commensurate with skills and assessment scores), providing an accelerated platform for fresh graduates to engineer production web applications.

---

## Key Responsibilities

- Build dynamic, interactive user interfaces with JavaScript, HTML5, CSS3, and React.js.
- Develop backend APIs and microservices using Node.js / Express or Python.
- Integrate frontend client logic with databases (MongoDB, PostgreSQL, or MySQL).
- Participate in unit testing, debugging, and software lifecycle optimization.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (0–1 year experience).
- **Eligible Branches:** CSE, IT, ECE, and EEE graduates.
- **Technical Skills:** C/C++ or Python, strong JavaScript foundations, HTML/CSS. Prior experience with React or MERN stack is a major advantage.

---

## Compensation & Workplace

- **CTC:** Up to **₹5,00,000 per annum (₹5 LPA)** based on technical performance.
- **Location:** Cherlapally, Hyderabad, Telangana.
- **Work Mode:** Office (On-site).
- **Direct HR Contact:** hr@sdwot.ai.

---

## Official Application

Apply on the [Official SD WoT Job Posting](https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1).',
  'Technical Interview & Coding Round',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['SD WoT', 'JavaScript', 'Full Stack', 'React', 'MERN', 'C++', 'Python', 'Cherlapally', 'Hyderabad', 'On-site', '2026 Batch', '2027 Batch', 'Full-time'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (0–1 Year, CSE/IT/ECE/EEE)',
  'Full-time',
  'On-site',
  'Up to ₹5,00,000 / Year (Based on Skills)',
  true,
  'SD WoT',
  'Cherlapally, Hyderabad, India',
  'Apply on SD WoT Portal →',
  'Rolling Admissions (Contact: hr@sdwot.ai)',
  'https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1',
  '{"organization":"SD WoT","role":"Associate Software Engineer (JavaScript / Full Stack)","eligibility":"CSE, IT, ECE, EEE graduates (2026 & 2027 Batches, 0–1 year exp)","deadline":"Rolling Applications","location":"Cherlapally, Hyderabad, Telangana, India","workMode":"On-site","jobType":"Full-time","stipend":"Up to ₹5 LPA CTC","officialUrl":"https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'digital-back-office-software-engineer-intern-2027',
  'jobs',
  'Software Engineer Intern - Digital Back Office (2027 Graduates)',
  'Exclusive software engineering internship at Digital Back Office specifically mentioning 2027 graduates. Fully remote role with ₹10,000/month stipend and advertised PPO. Build cloud solutions with AWS, Python, JavaScript, REST APIs, and MongoDB.',
  '## Position Overview

Digital Back Office has published a high-priority listing for a **Software Engineer Intern** explicitly designed for **2027 Graduates**.

With only 1 opening advertised, early application is strongly recommended before the deadline on **November 6, 2026**.

---

## Key Responsibilities

- Develop and integrate cloud-native services utilizing AWS infrastructure.
- Write modular scripts and backend microservices using Python and JavaScript.
- Design database queries and schemas using MongoDB and relational SQL.
- Implement secure, high-performance RESTful APIs and handle automated testing.

---

## Eligibility Criteria

- **Target Batch:** Exclusively open to **2027 graduating batch students**.
- **Experience:** Open to fresh talent with strong project-driven software development background.
- **Skills:** AWS, Git, JavaScript, MongoDB, Python, REST API development, SQL.

---

## Stipend & Conversion

- **Stipend:** **₹10,000 per month**.
- **PPO Opportunity:** Advertised pre-placement offer for full-time engineering career conversion.
- **Work Model:** 100% Fully Remote across India.
- **Application Deadline:** **November 6, 2026**.

---

## Official Application

Apply directly on the [Riseflake Job Portal](https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107).',
  'Cloud & Full-Stack Coding Task',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Digital Back Office', 'AWS', 'Python', 'JavaScript', 'MongoDB', 'REST API', 'SQL', 'Remote', '2027 Batch', 'Paid', 'PPO', 'Internship'],
  true,
  true,
  'active',
  '2026-11-06T23:59:59.999Z'::timestamptz,
  ARRAY[2027],
  'Fresher (Specifically 2027 Graduates)',
  'Internship',
  'Remote',
  '₹10,000 / Month (Advertised PPO)',
  true,
  'Digital Back Office',
  'Remote, India',
  'Apply on Riseflake Portal →',
  'November 6, 2026 (1 Opening)',
  'https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107',
  '{"organization":"Digital Back Office","role":"Software Engineer Intern (2027 Graduates)","eligibility":"Specifically 2027 engineering & computer science graduates","deadline":"November 6, 2026","location":"Remote, India","workMode":"Remote","jobType":"Internship","stipend":"₹10,000 / Month","officialUrl":"https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107","eligibleBatches":[2027],"isVerified":true}'::jsonb
),
(
  'botcadence-full-stack-ai-engineer-intern',
  'jobs',
  'Full Stack AI Engineer Intern - Botcadence (Remote)',
  'Botcadence is hiring Full Stack AI Engineer Interns to build enterprise AI applications. Remote role working with React, Python, FastAPI, WebSockets, MongoDB, Redis, and LLMs. Internships serve as direct pipeline for full-time offers.',
  '## Position Overview

Botcadence builds AI-native enterprise applications and is welcoming applications for a **Full Stack AI Engineer Intern**.

The company considers its internship program the primary hiring pipeline for full-time engineering talent, providing an incredible launchpad for developers skilled in React, FastAPI, and Large Language Models.

---

## Key Responsibilities

- Build high-performance frontend interfaces using React, modern CSS, and streaming UI components.
- Develop asynchronous backend microservices and streaming endpoints with Python and FastAPI.
- Implement real-time communication protocols using WebSockets.
- Integrate cache layers and data stores using Redis and MongoDB.
- Connect enterprise workflows to Large Language Models (LLMs) with prompt engineering and vector indexes.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates in Computer Science or Software Engineering.
- **Core Stacks:** React, Python, FastAPI, WebSockets, MongoDB, Redis, LLMs.
- **Fundamentals:** Strong grip on Data Structures, Algorithms, and System Design basics.

---

## Compensation & Highlights

- **Stipend:** Competitive industry-standard monthly stipend.
- **PPO:** Core hiring pipeline for permanent Full-Stack AI Engineer positions.
- **Work Model:** 100% Fully Remote.
- **Email Contact:** connect@botcadence.com.

---

## Official Application

Explore the team and apply on the [Official Botcadence Careers Page](https://botcadence.com/careers).',
  'FastAPI & AI Systems Challenge',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Botcadence', 'AI', 'React', 'Python', 'FastAPI', 'WebSockets', 'MongoDB', 'Redis', 'LLMs', 'Remote', '2026 Batch', '2027 Batch', 'Paid', 'PPO'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / CS Engineering Students',
  'Internship',
  'Remote',
  'Competitive Industry Stipend (PPO Pipeline)',
  true,
  'Botcadence',
  'Remote',
  'Apply at Botcadence Careers →',
  'Rolling Admissions (Hiring Pipeline)',
  'https://botcadence.com/careers',
  '{"organization":"Botcadence","role":"Full Stack AI Engineer Intern","eligibility":"CS / Software Engineering background, strong algorithms and system design fundamentals","deadline":"Rolling Admissions","location":"Remote","workMode":"Remote","jobType":"Internship","stipend":"Competitive Paid Stipend","officialUrl":"https://botcadence.com/careers","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'infergent-labs-ai-fullstack-engineering-intern',
  'jobs',
  'AI / Full-Stack Engineering Intern - Infergent Labs',
  '3–6 month remote AI & Full-Stack engineering internship at Infergent Labs. Work directly on production React/Next.js frontends, Python backend microservices, RAG architectures, and LLM integrations with founding-team PPO opportunity.',
  '## Position Overview

Infergent Labs is recruiting an **AI / Full-Stack Engineering Intern** for a 3–6 month engagement with significant founding-team full-time conversion opportunities.

You will contribute directly to autonomous AI agent systems, Retrieval-Augmented Generation (RAG) knowledge stores, and responsive Next.js web applications.

---

## Key Responsibilities

- Build and refine production web applications with React and Next.js.
- Implement server-side AI orchestration pipelines using Python and modern API frameworks.
- Design and benchmark RAG pipelines combining embeddings, vector stores, and prompt templates.
- Ensure rigorous API security, rate limiting, and observability across LLM inference routes.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduating cohorts.
- **Skills:** Strong programming fundamentals, familiarity with React/Next.js, Python, LLMs, and RAG architectures.
- **Project Work:** Practical code repositories demonstrating machine learning integration or full-stack software development.

---

## Program Details

- **Duration:** 3–6 Months.
- **Compensation:** Competitive paid monthly stipend.
- **PPO:** Direct founding-team conversion potential.
- **Location:** Remote, India.

---

## Official Application

Submit your resume and code samples at the [Infergent Labs Careers Page](https://infergent.com/careers/ai-fullstack-engineering-intern).',
  'RAG & Full-Stack Evaluation',
  '6 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Infergent Labs', 'AI', 'Next.js', 'React', 'Python', 'LLMs', 'RAG', 'APIs', 'Remote', '2026 Batch', '2027 Batch', 'Paid', 'PPO'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Engineering Students',
  'Internship',
  'Remote',
  'Competitive Paid Stipend (Founding Team PPO)',
  true,
  'Infergent Labs',
  'Remote, India',
  'Apply at Infergent Careers →',
  'Rolling Window (Founding Team PPO)',
  'https://infergent.com/careers/ai-fullstack-engineering-intern',
  '{"organization":"Infergent Labs","role":"AI / Full-Stack Engineering Intern","eligibility":"Strong programming fundamentals; practical AI/ML & full-stack project experience","deadline":"Rolling Window","location":"Remote, India","workMode":"Remote","jobType":"Internship","stipend":"Competitive Paid Stipend","officialUrl":"https://infergent.com/careers/ai-fullstack-engineering-intern","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'isocode-labs-software-engineering-intern',
  'jobs',
  'Software Engineering Intern - Isocode Labs (₹50k/mo)',
  'High-stipend 6-month software engineering internship at Isocode Labs offering an advertised ₹50,000/month stipend in fully remote mode. Design, build, and deploy resilient web systems and cloud services.',
  '## Position Overview

Isocode Labs is opening positions for a **Software Engineering Intern** for a 6-month term offering a top-tier stipend of **₹50,000 per month**.

Interns work on scalable distributed infrastructure, enterprise web tooling, and low-latency cloud microservices.

---

## Key Responsibilities

- Write high-performance, well-architected code in modern programming languages.
- Participate in the design and scaling of cloud infrastructure and database clusters.
- Collaborate with senior staff engineers through detailed design reviews and pull request audits.
- Deliver automated unit and end-to-end integration tests to safeguard platform reliability.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** batches (B.Tech / B.E. / M.Tech / MCA).
- **Core Skills:** Solid algorithmic problem solving, clean system design fundamentals, and familiarity with cloud architectures.
- **Duration:** Available for a 6-month continuous internship.

---

## Compensation & Work Model

- **Stipend:** **₹50,000 per month** advertised.
- **Duration:** 6 months.
- **Location:** 100% Fully Remote.

---

## Official Application

Apply directly on the [Isocode Labs Careers Site](https://careers.isocodelabs.com/).',
  'Advanced Coding & Algorithms',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Isocode Labs', 'Software Engineering', 'High Stipend', 'Cloud', 'Distributed Systems', 'Remote', '2026 Batch', '2027 Batch', 'Paid'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Students (2026 & 2027)',
  'Internship',
  'Remote',
  '₹50,000 / Month Advertised',
  true,
  'Isocode Labs',
  'Remote',
  'Apply at Isocode Careers →',
  'Rolling Admissions (6-Month Term)',
  'https://careers.isocodelabs.com/',
  '{"organization":"Isocode Labs","role":"Software Engineering Intern","eligibility":"BE / B.Tech / MCA students (2026 & 2027 Batches) with strong coding and CS fundamentals","deadline":"Rolling Admissions","location":"Remote","workMode":"Remote","jobType":"Internship","stipend":"₹50,000 / Month","officialUrl":"https://careers.isocodelabs.com/","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'broadcastwell-software-engineering-intern',
  'jobs',
  'Software Engineering Intern - Broadcastwell (TypeScript)',
  'Paid 12-week remote software engineering internship at Broadcastwell (20 hours/week part-time option). Ideal for students balancing coursework. Focus on TypeScript, web application development, and resilient APIs.',
  '## Position Overview

Broadcastwell is hiring a **Software Engineering Intern** for a flexible 12-week remote term requiring 20 hours of work per week.

This role provides a great balance for college students seeking paid industry software engineering experience while completing their degree.

---

## Key Responsibilities

- Build and maintain frontend web views and backend services using TypeScript.
- Implement reusable components and type-safe data validation routines.
- Optimize web application loading speed and cross-browser reliability.
- Collaborate with the core product team on weekly feature rollouts.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** batches.
- **Skills:** TypeScript, JavaScript, modern CSS, and REST API consumption.
- **Availability:** 20 hours per week over a 12-week period.

---

## Compensation & Work Terms

- **Compensation:** Paid monthly internship.
- **Duration:** 12 weeks.
- **Location:** Remote, India.

---

## Official Application

Apply directly at [Broadcastwell Careers](https://broadcastwell.com/careers/software-engineering-intern).',
  'TypeScript Practical Assessment',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Broadcastwell', 'TypeScript', 'Frontend', 'Backend', 'Part-time', 'Remote', '2026 Batch', '2027 Batch', 'Paid', 'Internship'],
  false,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Students (20 hrs/week)',
  'Internship',
  'Remote',
  'Paid Internship (20 hrs/week)',
  true,
  'Broadcastwell',
  'Remote, India',
  'Apply at Broadcastwell Careers →',
  '12-Week Term (20 hrs/week)',
  'https://broadcastwell.com/careers/software-engineering-intern',
  '{"organization":"Broadcastwell","role":"Software Engineering Intern","eligibility":"Engineering students with strong TypeScript and modern web development skills","deadline":"Rolling Applications","location":"Remote, India","workMode":"Remote","jobType":"Internship","stipend":"Paid (Part-time 20 hrs/week)","officialUrl":"https://broadcastwell.com/careers/software-engineering-intern","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'urbanizer-software-engineer-intern',
  'jobs',
  'Software Engineer Intern - Urbanizer (2026 & 2027 Passouts)',
  'Remote software engineering internship at Urbanizer open to 2026 and 2027 passouts. Gain real-world software engineering practice, collaborative git workflows, and mentorship across modern full-stack development.',
  '## Position Overview

Urbanizer is accepting applications from **2026 and 2027 passouts** for a **Software Engineer Internship** in a remote setting.

This program offers students looking to build their professional portfolios an opportunity to write production code, participate in code reviews, and earn formal experience letters and performance incentives.

---

## Key Responsibilities

- Assist in the development of web portals and backend APIs.
- Write responsive HTML/CSS/JavaScript and React components.
- Collaborate with senior engineers via Git branching, pull requests, and issue tracking.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduating students.
- **Skills:** Basic full-stack web development knowledge and enthusiasm to learn.

---

## Official Application

Apply at the [Urbanizer Careers Page](https://urbanizer.in/careers/software-engineer-intern/).',
  'Portfolio & Code Review',
  '4 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Urbanizer', 'Full Stack', 'Web Development', 'Git', 'Remote', '2026 Batch', '2027 Batch', 'Internship'],
  false,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (2026 & 2027 Passouts)',
  'Internship',
  'Remote',
  'Unpaid / Performance-Based Incentives',
  false,
  'Urbanizer',
  'Remote',
  'Apply at Urbanizer Careers →',
  'Rolling Admissions (2026/2027)',
  'https://urbanizer.in/careers/software-engineer-intern/',
  '{"organization":"Urbanizer","role":"Software Engineer Intern","eligibility":"2026 and 2027 passouts in engineering/computer science","deadline":"Rolling Admissions","location":"Remote","workMode":"Remote","jobType":"Internship","stipend":"Unpaid (Certificate & Performance Incentives)","officialUrl":"https://urbanizer.in/careers/software-engineer-intern/","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'perceptive-apprentice-software-engineer-hyderabad',
  'jobs',
  'Apprentice Software Engineer - Perceptive (Hyderabad, NATS)',
  '12-month apprentice software engineer training program at Perceptive in Hyderabad under NATS (National Apprenticeship Training Scheme). Zero prior experience required. Structured engineering rotation with government-mandated stipend.',
  '## Program Overview

Perceptive is recruiting **Apprentice Software Engineers** for a 12-month structured program under the Government of India''s **National Apprenticeship Training Scheme (NATS)** based at its Hyderabad facility (Job ID: **JR104836**).

This program is specifically created for fresh graduates without prior work experience, providing immersive, real-world software engineering mentorship.

---

## What You Will Do

- Undergo intensive training on enterprise software engineering methodologies.
- Collaborate with software development teams on coding, testing, and debugging.
- Learn CI/CD deployment, cloud platforms, and enterprise life-sciences compliance.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates with degree in Computer Science, IT, or related fields.
- **Prerequisite:** Valid registration on the National Apprenticeship Training Scheme (NATS) portal.
- **Experience:** No prior experience needed (entry-level apprenticeship).

---

## Program Details

- **Duration:** 12 Months.
- **Compensation:** Government-mandated NATS monthly stipend.
- **Location:** Hyderabad, Telangana.

---

## Official Application

Submit your profile on the [Perceptive Workday Career Portal](https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836).',
  'Aptitude & Technical Basics',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Perceptive', 'Apprenticeship', 'NATS', 'Hyderabad', 'On-site', '2026 Batch', '2027 Batch', 'Paid', 'Fresher', 'Mentorship'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (No Prior Experience Required; NATS Registration Required)',
  'Apprenticeship',
  'On-site',
  'NATS Government Apprenticeship Stipend (Paid)',
  true,
  'Perceptive',
  'Hyderabad, Telangana, India',
  'Apply on Workday Portal →',
  'Requisition: JR104836 (NATS Registered)',
  'https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836',
  '{"organization":"Perceptive","role":"Apprentice Software Engineer (Req: JR104836)","eligibility":"Recent graduates with valid NATS registration; zero prior experience required","deadline":"Active Requisition","location":"Hyderabad, Telangana, India","workMode":"On-site","jobType":"Apprenticeship","stipend":"Government Apprenticeship Stipend","officialUrl":"https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'amgen-associate-software-engineer-genai-hyderabad',
  'jobs',
  'Associate Software Engineer (GenAI) - Amgen (Hyderabad)',
  'Global biotechnology leader Amgen is hiring Associate Software Engineers in Hyderabad focusing on early-career Generative AI engineering. Work on LLM architectures, Python data pipelines, and enterprise life-sciences cloud solutions.',
  '## Position Overview

**Amgen**, one of the world''s leading biotechnology enterprises, is hiring for an **Associate Software Engineer** focusing on early-career **Generative AI engineering** at its Hyderabad innovation hub (Job ID: **100307758640**).

This position combines deep enterprise software development with cutting-edge artificial intelligence, empowering digital health and life-sciences breakthroughs.

---

## Key Responsibilities

- Build and maintain Generative AI workflows, prompting systems, and model inference pipelines.
- Implement backend data engineering pipelines in Python and modern cloud architectures (AWS/Azure).
- Ensure strict adherence to high security, compliance, and automated testing standards.
- Collaborate with global data science, bioinformatics, and product teams.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduating engineers.
- **Degrees:** B.Tech / B.E. / M.Tech in Computer Science, AI, Data Science, or related disciplines.
- **Skills:** Strong Python programming, foundational understanding of LLMs, transformers, RAG, and cloud computing.

---

## Compensation & Culture

- **Compensation:** Highly competitive enterprise salary with comprehensive medical, wellness, and retirement benefits.
- **Location:** Hyderabad (Hybrid work model).

---

## Official Application

Apply directly on the [Amgen Careers Portal](https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640).',
  'GenAI & Machine Learning Assessment',
  '6 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Amgen', 'GenAI', 'AI/ML', 'Python', 'Cloud', 'Data Engineering', 'Hyderabad', 'Hybrid', '2026 Batch', '2027 Batch', 'Full-time', 'Biotech'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Early-Career (2026 & 2027 Batches)',
  'Full-time',
  'Hybrid',
  'Competitive Industry Package (FTE)',
  true,
  'Amgen',
  'Hyderabad, Telangana, India',
  'Apply on Amgen Careers →',
  'Early-Career Requisition (Job: 100307758640)',
  'https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640',
  '{"organization":"Amgen","role":"Associate Software Engineer (Early-Career GenAI)","eligibility":"BE / B.Tech / ME / M.Tech in CS, IT, AI/ML (2026 & 2027 Batches)","deadline":"Rolling Window","location":"Hyderabad, Telangana, India","workMode":"Hybrid","jobType":"Full-time","stipend":"Competitive Enterprise Package","officialUrl":"https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'trinet-associate-software-engineer-hyderabad',
  'jobs',
  'Associate Software Engineer - TriNet (Hyderabad)',
  'TriNet is hiring Associate Software Engineers in Hyderabad for candidates with under 2 years experience (freshers welcome). Core technologies include Java, Python, REST microservices, and exposure to GenAI & RAG systems.',
  '## Position Overview

TriNet is recruiting an **Associate Software Engineer** in Hyderabad for early-career developers with under 2 years of experience (freshers are actively invited to apply).

The role focuses on building scalable enterprise cloud platforms, REST APIs, and integrating GenAI/RAG technologies into enterprise HR and fintech software.

---

## Key Responsibilities

- Develop modular software components in Java and Python.
- Build and optimize microservices, relational databases, and secure APIs.
- Participate in designing and experimenting with GenAI retrieval-augmented generation (RAG) models.
- Support automated testing, agile sprints, and production bug triage.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (0–2 years experience).
- **Core Stacks:** Java, Python, SQL, REST APIs, and interest in GenAI/RAG.
- **Location:** Hyderabad (Hybrid work model).

---

## Compensation & Highlights

- **Compensation:** Competitive market compensation package with enterprise perks.
- **Location:** Hyderabad, Telangana.

---

## Official Application

View listing and apply at the [JobsInHyd TriNet Portal](https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/).',
  'Java/Python & System Foundations',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['TriNet', 'Java', 'Python', 'GenAI', 'RAG', 'Microservices', 'Hyderabad', 'Hybrid', '2026 Batch', '2027 Batch', 'Full-time'],
  false,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Under 2 Years (0–2 Years)',
  'Full-time',
  'Hybrid',
  'Competitive Industry Package (FTE)',
  true,
  'TriNet',
  'Hyderabad, Telangana, India',
  'Apply on JobsInHyd Portal →',
  'Rolling Admissions',
  'https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/',
  '{"organization":"TriNet","role":"Associate Software Engineer","eligibility":"Graduates with under 2 years experience; freshers welcome (2026 & 2027 Batches)","deadline":"Rolling Admissions","location":"Hyderabad, Telangana, India","workMode":"Hybrid","jobType":"Full-time","stipend":"Competitive Market CTC","officialUrl":"https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'foundation-ai-associate-software-engineer-hyderabad',
  'jobs',
  'Associate Software Engineer - Foundation AI (Hyderabad)',
  'Entry-level Associate Software Engineer opening at Foundation AI in Hyderabad (0–1 year experience). Build cutting-edge machine learning and intelligent document processing platforms using Python and cloud architectures.',
  '## Position Overview

Foundation AI is seeking an **Associate Software Engineer** in Hyderabad for an entry-level engineering role (0–1 year experience).

You will join a dynamic artificial intelligence engineering team developing automated document intelligence, computer vision, and NLP systems.

---

## Key Responsibilities

- Implement machine learning models, inference APIs, and data processing workflows using Python.
- Develop and deploy scalable microservices on cloud infrastructure.
- Optimize computer vision and NLP model pipelines for high throughput and low latency.
- Collaborate with AI researchers and frontend developers to ship cohesive user products.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (0–1 year experience).
- **Core Skills:** Python, object-oriented design, machine learning fundamentals, and REST API development.
- **Degrees:** B.Tech / B.E. / M.Tech in Computer Science, AI, or allied disciplines.

---

## Official Application

Apply directly on the [Foundation AI Application Page](https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India).',
  'Python & ML Problem Solving',
  '5 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Foundation AI', 'AI/ML', 'Python', 'Computer Vision', 'NLP', 'Hyderabad', 'Hybrid', '2026 Batch', '2027 Batch', 'Full-time'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher (0–1 Year, Entry-Level)',
  'Full-time',
  'Hybrid',
  'Competitive AI Industry Package',
  true,
  'Foundation AI',
  'Hyderabad, Telangana, India',
  'Apply on Foundation AI Portal →',
  'Rolling Admissions',
  'https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India',
  '{"organization":"Foundation AI","role":"Associate Software Engineer","eligibility":"Entry-level freshers and early engineers (0–1 year, 2026 & 2027 Batches)","deadline":"Rolling Admissions","location":"Hyderabad, Telangana, India","workMode":"Hybrid","jobType":"Full-time","stipend":"Competitive Market CTC","officialUrl":"https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
),
(
  'heizen-associate-software-engineer-hyderabad',
  'jobs',
  'Associate Software Engineer - Heizen (Remote / Hyderabad)',
  'Full-time Associate Software Engineer role at Heizen offering ₹6–8 LPA advertised compensation. Supports Remote / Hyderabad applicants with 0–2 years experience. Work across Python, React, Next.js, and cloud microservices.',
  '## Position Overview

Heizen is hiring an **Associate Software Engineer** offering an advertised salary package of **₹6–8 LPA**.

The position explicitly welcomes Remote and Hyderabad-based applicants with 0–2 years of experience who want to build high-scale, modern software products.

---

## Key Responsibilities

- Develop responsive, accessible web interfaces using React and Next.js.
- Build high-concurrency microservices, API endpoints, and business logic with Python.
- Design database architectures and write performant queries for scalable data storage.
- Collaborate with senior architects on continuous delivery, automated tests, and cloud orchestration.

---

## Eligibility Criteria

- **Batches:** **2026 and 2027** graduates (0–2 years experience).
- **Core Skills:** Python, React, Next.js, Cloud APIs, SQL, and Git.
- **Mindset:** Strong product sense, velocity in execution, and solid code discipline.

---

## Compensation & Highlights

- **Package:** **₹6,00,000 – ₹8,00,000 per annum (₹6–8 LPA)** advertised.
- **Work Model:** Remote / Hyderabad, India.
- **Hiring Window:** Rolling evaluation.

---

## Official Application

View the listing and apply on the [JobSociety Portal](https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/).',
  'Full-Stack Engineering Assessment',
  '6 min read',
  'Raju Perumalla',
  '2026-10-31',
  ARRAY['Heizen', 'Software Engineer', 'Python', 'React', 'Next.js', 'Cloud APIs', 'Hyderabad', 'Remote', '2026 Batch', '2027 Batch', 'Full-time', 'High CTC'],
  true,
  true,
  'active',
  NULL,
  ARRAY[2026, 2027],
  'Fresher / Early-Career (0–2 Years)',
  'Full-time',
  'Remote',
  '₹6,00,000 - ₹8,00,000 / Year Advertised',
  true,
  'Heizen',
  'Remote / Hyderabad, India',
  'Apply on JobSociety Portal →',
  'Rolling Window (₹6–8 LPA)',
  'https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/',
  '{"organization":"Heizen","role":"Associate Software Engineer","eligibility":"Freshers and engineers with 0–2 years experience (2026 & 2027 Batches)","deadline":"Rolling Window","location":"Remote / Hyderabad, India","workMode":"Remote","jobType":"Full-time","stipend":"₹6 - ₹8 LPA CTC","officialUrl":"https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/","eligibleBatches":[2026,2027],"isVerified":true}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  status = EXCLUDED.status,
  application_deadline = EXCLUDED.application_deadline,
  eligible_batches = EXCLUDED.eligible_batches,
  experience_level = EXCLUDED.experience_level,
  opportunity_type = EXCLUDED.opportunity_type,
  work_arrangement = EXCLUDED.work_arrangement,
  stipend_amount = EXCLUDED.stipend_amount,
  is_stipend_paid = EXCLUDED.is_stipend_paid,
  source_name = EXCLUDED.source_name,
  source_location = EXCLUDED.source_location,
  action_text = EXCLUDED.action_text,
  deadline_text = EXCLUDED.deadline_text,
  canonical_url = EXCLUDED.canonical_url,
  opportunity_data = EXCLUDED.opportunity_data,
  updated_date = CURRENT_DATE;
