require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const newJobs = [
  {
    slug: 'ibm-intern-associate-engineer-bangalore-137023',
    category_slug: 'jobs',
    title: 'Intern / Associate Engineer - IBM (Job ID: 137023)',
    summary: 'Official IBM India hiring requisition for 2026 & 2027 graduating batches. Join IBM Cloud, Infrastructure & AI systems teams in Bangalore with competitive stipend and direct FTE conversion opportunities.',
    content: `## Position Overview

IBM India is currently evaluating early-career talent and engineering students for the **Intern / Associate Engineer** track (Requisition ID: **137023**) based out of Bangalore.

This program serves as an accelerated pipeline into IBM's enterprise software engineering, hybrid cloud platforms (Red Hat OpenShift), and AI engineering teams (watsonx).

---

## Key Responsibilities

- Collaborate with senior architects and developers to build, test, and deploy resilient cloud services and microservices.
- Write clean, maintainable, and well-tested code in Java, Python, Go, or JavaScript.
- Assist in automating testing pipelines, CI/CD workflows, and containerized deployments using Docker and Kubernetes.
- Participate in agile sprints, daily stand-ups, technical code reviews, and architectural design sessions.
- Contribute to client-facing enterprise software integrations, troubleshooting production incidents, and performance benchmarking.

---

## Eligibility Criteria

- **Graduating Batches:** **2026 and 2027** Batches.
- **Degrees:** BE / B.Tech / ME / M.Tech in Computer Science, Information Technology, Electronics & Communication, or allied engineering disciplines.
- **Academic Score:** Consistent academic record (minimum 60% or 6.5+ CGPA without active backlogs).
- **Technical Skills:** Strong foundational knowledge of Data Structures & Algorithms, Object-Oriented Programming (OOP), Relational Databases (SQL), and Operating Systems.

---

## Compensation & Work Arrangement

- **Stipend:** ₹40,000 – ₹50,000 / month (Competitive Industry Standard with conversion to full-time Associate Engineer package upon graduation).
- **Location:** Bangalore, Karnataka, India.
- **Work Model:** Hybrid (IBM Client Innovation Center / Manyata Tech Park).

---

## Application Instructions

Apply directly through the official IBM Careers portal using Job ID **137023**. Keep your ATS-friendly resume and GitHub/portfolio profiles ready.`,
    difficulty: 'Fresher Engineering Assessment',
    read_time: '6 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-15',
    updated_date: '2026-10-16',
    tags: ['IBM', 'Software Engineering', 'Cloud', 'AI', 'Bangalore', '2026 Batch', '2027 Batch', 'Fresher', 'Paid'],
    is_featured: true,
    published: true,
    status: 'active',
    application_deadline: null,
    eligible_batches: [2026, 2027],
    experience_level: 'Fresher',
    opportunity_type: 'Internship',
    work_arrangement: 'Hybrid',
    stipend_amount: '₹40,000 - ₹50,000 / Month (Competitive Stipend)',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'IBM India',
    source_location: 'Bangalore, Karnataka, India',
    action_text: 'Apply at IBM Careers →',
    deadline_text: 'Rolling Applications (Job ID: 137023)',
    canonical_url: 'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023',
    official_url: 'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023&source=SN_LinkedIn',
    opportunity_data: {
      organization: 'IBM',
      role: 'Intern / Associate Engineer',
      eligibility: 'BE / B.Tech / ME / M.Tech (CS, IT, ECE, EE) - 2026 & 2027 Batches',
      deadline: 'Actively Hiring / Rolling Window',
      location: 'Bangalore, Karnataka, India (Hybrid)',
      workMode: 'Hybrid',
      jobType: 'Internship / Graduate Trainee',
      stipend: '₹40,000 - ₹50,000 / Month (Competitive Stipend)',
      officialUrl: 'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023&source=SN_LinkedIn',
      isVerified: true,
    },
  },
  {
    slug: 'salesforce-summer-2027-intern-ui-ux-designer',
    category_slug: 'jobs',
    title: 'Summer 2027 Intern - UI/UX Designer (Salesforce Futureforce)',
    summary: '6-month prestigious Futureforce design internship at Salesforce India (Hyderabad/Bangalore). Work on AI Agentforce workflows, design systems, and enterprise UI/UX.',
    content: `## About Salesforce Futureforce

The **Futureforce University Recruiting** program at Salesforce is dedicated to cultivating the next generation of top tech and design talent. Our interns work on real, impactful products used by millions of global enterprise users.

As a **Summer 2027 UI/UX Design Intern** (Job ID: **JR363342**), you will join the team responsible for shaping intuitive, accessible, and delightful experiences across industry clouds and autonomous AI agents (Agentforce).

---

## Role Responsibilities

- Solve complex UX design challenges across web, mobile, and tablet interfaces.
- Collaborate closely with Product Managers, Engineers, and User Researchers to define customer journeys and validate prototypes.
- Design high-fidelity wireframes, interaction flows, and interactive mockups in Figma and Sketch.
- Evangelize Salesforce Lightning Design System (SLDS) guidelines and contribute new patterns.
- Leverage LLM coding assistants and modern AI tools to accelerate design handoff and user research synthesis.

---

## Eligibility Criteria

- **Graduating Batch:** **Class of 2027 only** (Candidates graduating in the year 2027).
- **Branches / Qualifications:** M.Des, B.Des, or Bachelor's/UG candidates with a proven, compelling UI/UX design portfolio.
- **Skills:** Expert proficiency in modern design tools (Figma, Sketch, Adobe Creative Suite). Deep understanding of user-centered design methodologies, information architecture, and accessibility (WCAG).
- **Bonus:** Familiarity with design systems, AI tooling (Gemini, Cursor), or enterprise CRM workflows.

---

## Program Details & Benefits

- **Duration:** 6-Month Full-Time Summer Internship.
- **Locations:** Hyderabad or Bengaluru, India (Hybrid arrangement).
- **Stipend:** ₹60,000 – ₹80,000 / month (Top-tier industry compensation with mentorship, wellness benefits, and PPO potential).

---

## How to Apply

Submit your application and portfolio link directly on the Salesforce Workday portal (JR363342).`,
    difficulty: 'Portfolio & Design Challenge',
    read_time: '7 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-15',
    updated_date: '2026-10-16',
    tags: ['Salesforce', 'UI/UX Designer', 'Futureforce', 'Agentforce', 'Figma', 'Hyderabad', 'Bangalore', '2027 Batch', 'Paid'],
    is_featured: true,
    published: true,
    status: 'active',
    application_deadline: '2026-10-31T23:59:59.999Z',
    eligible_batches: [2027],
    experience_level: 'Fresher / Pre-final Year',
    opportunity_type: 'Internship',
    work_arrangement: 'Hybrid',
    stipend_amount: '₹60,000 - ₹80,000 / Month (Industry Leading)',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'Salesforce',
    source_location: 'Hyderabad / Bangalore, India',
    action_text: 'Apply at Salesforce Futureforce →',
    deadline_text: 'Valid for Class of 2027',
    canonical_url: 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/Summer-2027-Intern---UI-UX-Designer_JR363342',
    official_url: 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Summer-2027-Intern---UI-UX-Designer_JR363342?utm_source=chatgpt.com',
    opportunity_data: {
      organization: 'Salesforce',
      role: 'Summer 2027 Intern - UI/UX Designer (6 Months)',
      eligibility: 'Class of 2027 only: M.Des, B.Des, or UG/Engineering with UI/UX portfolio',
      deadline: '2027 Summer Cohort / Apply Promptly',
      location: 'Hyderabad / Bangalore, India (Hybrid)',
      workMode: 'Hybrid',
      jobType: 'Internship',
      stipend: '₹60,000 - ₹80,000 / Month',
      officialUrl: 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Summer-2027-Intern---UI-UX-Designer_JR363342?utm_source=chatgpt.com',
      isVerified: true,
    },
  },
  {
    slug: 'honeywell-intern-bachelors-mechanical-eng-2027',
    category_slug: 'jobs',
    title: 'Intern Bachelors Mechanical Eng - Honeywell',
    summary: 'Hands-on engineering internship in mechanical systems design, CAD modeling, and industrial automation at Honeywell Hyderabad. High conversion potential to full-time engineering role.',
    content: `## About the Role

As an **Intern Bachelors Mechanical Eng** at Honeywell, you will gain hands-on industrial engineering exposure. You will collaborate with seasoned engineers on real-world automation, aerospace, and building technologies hardware projects.

This internship is structured as an **Internship + FTE conversion track** for graduating students.

---

## Key Responsibilities

- Assist in the computer-aided design (CAD), thermal analysis, and physical testing of mechanical components.
- Participate in engineering design reviews and offer suggestions for manufacturability and cost efficiency.
- Conduct simulations and computational finite element analysis (FEA) to validate system durability.
- Prepare technical documentation, schematic drawings, and validation reports.
- Interface with cross-functional manufacturing and electrical teams.

---

## Qualifications & Eligibility

- **Degree:** Enrolled in a Bachelor's Degree in Mechanical Engineering, Mechatronics, or related stream.
- **Graduating Batch:** **2027 Batch** (Pre-final year).
- **Core Competencies:** Solid fundamentals in engineering mechanics, thermodynamics, and materials science.
- **Tools:** Practical exposure to SolidWorks, AutoCAD, ANSYS, or Creo is highly valued.

---

## Location & Stipend

- **Location:** Hyderabad, Telangana, India.
- **Work Model:** On-site (Honeywell Technology Solutions Center).
- **Expected Stipend:** ₹40,000 / month.

---

## Application Steps

Apply via Honeywell's Oracle Cloud Candidate Experience portal or verified partner links.`,
    difficulty: 'Engineering Technical Interview',
    read_time: '5 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-15',
    updated_date: '2026-10-16',
    tags: ['Honeywell', 'Mechanical Engineering', 'CAD', 'Design', 'Automation', 'Hyderabad', '2027 Batch', 'Paid'],
    is_featured: false,
    published: true,
    status: 'active',
    application_deadline: '2026-10-25T23:59:59.999Z',
    eligible_batches: [2027],
    experience_level: 'Fresher',
    opportunity_type: 'Internship',
    work_arrangement: 'On-site',
    stipend_amount: '₹40,000 / Month (Stipend)',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'Honeywell',
    source_location: 'Hyderabad, India',
    action_text: 'Apply at Honeywell Portal →',
    deadline_text: 'Apply Before Late October 2026',
    canonical_url: 'https://ibqbjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/Honeywell/job/159839',
    official_url: 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6504&utm_source=chatgpt.com',
    opportunity_data: {
      organization: 'Honeywell',
      role: 'Intern Bachelors Mechanical Eng (Internship + FTE)',
      eligibility: 'Degree in Mechanical Engineering - 2027 Graduating Batch',
      deadline: 'October 2026',
      location: 'Hyderabad, India',
      workMode: 'On-site',
      jobType: 'Internship',
      stipend: '₹40,000 / Month (Stipend)',
      officialUrl: 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6504&utm_source=chatgpt.com',
      isVerified: true,
    },
  },
  {
    slug: 'pwc-business-ai-engineer-intern-2027',
    category_slug: 'jobs',
    title: 'Business AI Engineer - Intern - PwC',
    summary: 'Enterprise AI & automation internship at PwC Acceleration Centers. Work on LLM fine-tuning, retrieval-augmented generation (RAG), and generative AI solutions for Fortune 500 clients.',
    content: `## About PwC Business AI Engineering

PwC's Acceleration Centers are pioneering the application of Generative AI, machine learning, and automated decision-making engines for enterprise clients across financial services, healthcare, and retail.

As a **Business AI Engineer Intern**, you will bridge the gap between cutting-edge foundational models and high-impact enterprise workflows.

---

## What You Will Do

- Build and evaluate agentic AI workflows, LangChain / LlamaIndex pipelines, and RAG architectures.
- Work with Python, PyTorch, Hugging Face transformers, and vector databases (Pinecone, Chroma, pgvector).
- Optimize prompts, evaluate hallucination metrics, and fine-tune open-source models for domain-specific tasks.
- Integrate AI services with backend REST/GraphQL microservices and cloud infrastructures (Azure AI / AWS Bedrock).
- Document data governance, security policies, and responsible AI ethics.

---

## Qualifications & Eligibility

- **Graduating Batch:** **2027 Batch** (Pre-final year).
- **Educational Background:** B.Tech / BE in Computer Science, Artificial Intelligence, Data Science, or allied STEM fields.
- **Prerequisites:** Strong programming skills in Python, solid grasp of ML mathematics (linear algebra, probability), and practical familiarity with LLMs and REST APIs.

---

## Compensation & Locations

- **Locations:** Bengaluru or Hyderabad, India.
- **Work Model:** Hybrid (2–3 days in office).
- **Stipend:** ₹35,000 – ₹45,000 / month.

---

## Application Steps

Submit your application directly through PwC's Global Careers portal or authorized campus placement pipelines.`,
    difficulty: 'AI / Python Technical Interview',
    read_time: '6 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-15',
    updated_date: '2026-10-16',
    tags: ['PwC', 'AI', 'Machine Learning', 'GenAI', 'LLM', 'Python', 'Bengaluru', 'Hyderabad', '2027 Batch', 'Paid'],
    is_featured: true,
    published: true,
    status: 'active',
    application_deadline: null,
    eligible_batches: [2027],
    experience_level: 'Fresher',
    opportunity_type: 'Internship',
    work_arrangement: 'Hybrid',
    stipend_amount: '₹35,000 - ₹45,000 / Month',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'PwC',
    source_location: 'Bengaluru & Hyderabad, India',
    action_text: 'Apply at PwC Careers →',
    deadline_text: 'Rolling Applications (2027 Batch)',
    canonical_url: 'https://jobs-ta.pwc.com/global/en/job/PACPACGLOBAL763405WDEXTERNALENGLOBAL/Business-AI-Engineer-Intern-2027',
    official_url: 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6501&utm_source=chatgpt.com',
    opportunity_data: {
      organization: 'PwC',
      role: 'Business AI Engineer - Intern',
      eligibility: 'B.Tech / BE in Computer Science, Data Science, AI or allied tech - 2027 Batch',
      deadline: 'Rolling Admissions',
      location: 'Bengaluru, Hyderabad, India (Hybrid)',
      workMode: 'Hybrid',
      jobType: 'Internship',
      stipend: '₹35,000 - ₹45,000 / Month',
      officialUrl: 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6501&utm_source=chatgpt.com',
      isVerified: true,
    },
  },
  {
    slug: 'hsbc-intern-apprentice-12-months-gurugram',
    category_slug: 'jobs',
    title: 'Intern (Apprentice - 12 Months) - HSBC Banking Operations',
    summary: '12-month paid government-certified banking apprenticeship at HSBC Corporate & Institutional Banking in Gurugram under the Apprentices Act & NATS portal. Receive Govt. Certificate of Proficiency.',
    content: `## About HSBC Corporate & Institutional Banking

HSBC is one of the world's largest banking and financial services organizations. The Corporate and Institutional Banking division provides financing, treasury, and capital markets solutions worldwide.

This **Intern (Apprentice - 12 Months)** position (Requisition ID: **563774612428195**) offers a formal 1-year apprenticeship governed by the **Apprentices Act, 1961** and registered under the **NATS portal**.

---

## What You Will Learn & Do

- Own end-to-end Credit & Lending (C&L) servicing workflows, tracking OKRs, SLAs, and customer touchpoints.
- Assist Business Control Officers (BCO) with portfolio tracking, data reconciliation, and operational risk metrics.
- Utilize Excel, PowerPoint, and modern AI data visualization tools to produce monthly executive reporting packages.
- Act as First Line of Defence adhering to anti-money laundering (AML), regulatory controls, and international banking compliance.
- Complete official compliance training and acquire deep exposure to global transaction banking.

---

## Official Government NATS Certification

- The tenure of the Apprentice is 1 (one) full year as defined under the Apprentices Act, 1961.
- All apprentices are formally registered on the **National Apprenticeship Training Scheme (NATS)** portal.
- Upon successful completion, an official **Certificate of Proficiency** will be issued by the Government of India.

---

## Eligibility Criteria

- **Graduating Batches:** **2026 & 2027 Batches** (also welcoming recent 2025 graduates seeking formal banking credentials).
- **Qualifications:** Bachelor's degree in Business, Finance, Commerce (B.Com / BBA), Computer Applications, or related quantitative fields.
- **Skills:** Strong analytical mindset, proficiency in Microsoft Excel, and exceptional English communication skills.

---

## Location & Work Model

- **Location:** Gurugram, Haryana, India.
- **Model:** Hybrid / On-site.
- **Stipend:** Standard Government & HSBC NATS Apprenticeship Monthly Stipend.

---

## How to Apply

Apply on the HSBC Careers portal (Requisition: 563774612428195).`,
    difficulty: 'Aptitude & Video Interview',
    read_time: '6 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-15',
    updated_date: '2026-10-16',
    tags: ['HSBC', 'Banking', 'Apprenticeship', 'Credit & Lending', 'NATS', 'Gurugram', '2026 Batch', '2027 Batch', 'Paid'],
    is_featured: true,
    published: true,
    status: 'active',
    application_deadline: '2027-04-07T23:59:59.999Z',
    eligible_batches: [2026, 2027],
    experience_level: 'Fresher Apprentice',
    opportunity_type: 'Apprenticeship',
    work_arrangement: 'Hybrid',
    stipend_amount: 'NATS Government & HSBC Banking Stipend',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'HSBC',
    source_location: 'Gurugram, Haryana, India',
    action_text: 'Apply at HSBC Portal →',
    deadline_text: 'Valid Through April 2027',
    canonical_url: 'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india',
    official_url: 'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india?domain=hsbc.com&utm_source=chatgpt.com',
    opportunity_data: {
      organization: 'HSBC',
      role: 'Intern (Apprentice - 12 Months, NATS)',
      eligibility: 'Bachelor degree in Business, Finance, CS or allied (2026 & 2027 Batches)',
      deadline: '2027-04-07',
      location: 'Gurugram, Haryana, India',
      workMode: 'Hybrid',
      jobType: 'Apprenticeship',
      stipend: 'Official NATS Apprentice Stipend',
      officialUrl: 'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india?domain=hsbc.com&utm_source=chatgpt.com',
      isVerified: true,
    },
  },
  {
    slug: 'standard-chartered-apprentice-operations-gbs-india-2026',
    category_slug: 'jobs',
    title: 'Apprentice Operations GBS India 2026 - Standard Chartered',
    summary: 'Early career banking operations apprenticeship at Standard Chartered Global Business Services (GBS) in Chennai. Gain comprehensive hands-on training in transaction banking, financial controls, and risk.',
    content: `## About Standard Chartered GBS India

Standard Chartered Global Business Services (GBS) in India is a major technology and operations hub delivering innovative banking, trading, client onboarding, and financial crime compliance services across 50+ international markets.

The **Apprentice Operations GBS India 2026** initiative (Requisition ID: **58757**) provides recent graduates and 2026 candidates an immersive operational foundation in multinational corporate banking.

---

## Role & Responsibilities

- Execute day-to-day transaction processing, payments settlements, and account reconciliation workflows.
- Monitor service level agreements (SLAs), accuracy metrics, and key performance indicators.
- Assist senior associates with tracking audit requests and maintaining statutory compliance.
- Help streamline client inquiries and resolve discrepancy tickets in financial databases.
- Receive systematic structured training in banking risk, international trade, and KYC/AML guidelines.

---

## Eligibility Criteria

- **Target Batch:** **2026 Batch Graduates** (also open to 2024 and 2025 graduates seeking full-time banking apprenticeships).
- **Eligible Degrees:** Bachelor's degrees such as B.Com, BBA, BBM, BMS, BSc, or equivalent 3-year undergraduate qualifications.
- *Exclusions:* Candidates pursuing or possessing post-graduate qualifications (MBA, M.Com, PGDM) are not eligible.
- **Prior Experience:** No prior banking experience required. Entry-level fresher friendly.

---

## Key Competencies

- Proficiency with Microsoft Office tools (specifically Excel data formulas and reporting).
- Analytical aptitude, attention to detail, and disciplined adherence to security protocols.
- Effective English verbal and written communication skills.

---

## Location & Compensation

- **Location:** Chennai, Tamil Nadu, India.
- **Model:** Hybrid (Standard Chartered GBS Campus).
- **Stipend:** Official Standard Chartered Monthly Banking Apprentice Stipend.

---

## Application Steps

Apply through the Standard Chartered Careers portal or verified listings using Requisition **58757**.`,
    difficulty: 'Entry Level Assessment',
    read_time: '5 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-15',
    updated_date: '2026-10-16',
    tags: ['Standard Chartered', 'Banking', 'Operations', 'GBS', 'Chennai', 'Apprenticeship', '2026 Batch', 'Paid'],
    is_featured: false,
    published: true,
    status: 'active',
    application_deadline: null,
    eligible_batches: [2026],
    experience_level: 'Fresher Apprentice',
    opportunity_type: 'Apprenticeship',
    work_arrangement: 'Hybrid',
    stipend_amount: 'Standard Chartered Monthly Banking Stipend',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'Standard Chartered Bank',
    source_location: 'Chennai, Tamil Nadu, India',
    action_text: 'Apply at Standard Chartered →',
    deadline_text: 'Active for 2026 Batch',
    canonical_url: 'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB',
    official_url: 'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB?utm_source=lilimitedlistings&feedid=363857',
    opportunity_data: {
      organization: 'Standard Chartered',
      role: 'Apprentice Operations GBS India 2026 (Req: 58757)',
      eligibility: 'Undergraduate Degree (B.Com, BBA, BBM, BMS, BSc) - 2024, 2025, 2026 Batches',
      deadline: 'Rolling Admissions (2026 Batch)',
      location: 'Chennai, Tamil Nadu, India',
      workMode: 'Hybrid',
      jobType: 'Apprenticeship',
      stipend: 'Official Bank Apprentice Stipend',
      officialUrl: 'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB?utm_source=lilimitedlistings&feedid=363857',
      isVerified: true,
    },
  },
];

async function seedMongo() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://rajuperumallar_db_user:1VIYaU1jw5XXWZaa@cluster0.ynqnk1f.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');

    let upsertCount = 0;
    for (const job of newJobs) {
      await Job.findOneAndUpdate(
        { slug: job.slug },
        { $set: job },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      upsertCount++;
      console.log(`[MongoDB] Upserted job: ${job.slug} - ${job.title}`);
    }

    const totalInMongo = await Job.countDocuments();
    console.log(`[MongoDB] Finished seeding. Total jobs in MongoDB: ${totalInMongo}`);
  } catch (err) {
    console.error('[MongoDB] Seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedMongo();
