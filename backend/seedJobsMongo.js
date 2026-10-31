require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const newJobs = [
{
  "slug": "heizen-software-development-engineer-intern",
  "category_slug": "jobs",
  "title": "Software Development Engineer Intern - Heizen (Remote / Hyderabad)",
  "summary": "Heizen is hiring Software Development Engineer Interns. Open to CS/Engineering students and recent graduates (2026 & 2027 batches) with stipend of ₹25,000/month and performance-based PPO potential. Remote-friendly for Hyderabad applicants.",
  "content": "## Position Overview\n\nHeizen is evaluating passionate engineering students and early-career talent for the **Software Development Engineer (SDE) Intern** role. This role is remote-first with strong local support for Hyderabad-based applicants.\n\nAs an SDE Intern at Heizen, you will work directly alongside core engineering leads building high-speed software delivery systems, full-stack web platforms, and cross-platform applications.\n\n---\n\n## Key Responsibilities\n\n- Build and maintain modern web and mobile applications using React, Next.js, and Flutter.\n- Design resilient RESTful APIs and backend services using Python and Java.\n- Write performant SQL queries, design database schemas, and optimize data persistence.\n- Participate in code reviews, continuous integration/continuous deployment (CI/CD) pipelines, and agile sprints.\n- Troubleshoot client and production issues, shipping clean and well-tested code at light speed.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduating batches (B.Tech, B.E., M.Tech, MCA, or related disciplines).\n- **Core Skills:** Proficiency in Python, Java, JavaScript/TypeScript, React, Next.js, SQL, and Flutter.\n- **Problem Solving:** Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming (OOP).\n- **Mindset:** Proactive, eager to take ownership of features, and driven by software craftsmanship.\n\n---\n\n## Compensation & Benefits\n\n- **Stipend:** **₹25,000 per month**.\n- **Pre-Placement Offer (PPO):** High-performing interns will be considered for direct full-time conversion.\n- **Work Model:** Fully Remote with Hyderabad regional collaboration.\n- **Contact:** Questions can be directed to hiring@heizen.work.\n\n---\n\n## Official Application\n\nApply directly on the [Official Heizen Careers Page](https://www.heizen.work/careers/sde-intern).",
  "difficulty": "Technical Assessment & Projects",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Heizen",
    "Software Development",
    "Python",
    "Java",
    "React",
    "Next.js",
    "Flutter",
    "SQL",
    "APIs",
    "Hyderabad",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "PPO"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (CS/Engineering Students & Graduates)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "₹25,000 / Month (PPO Potential)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Heizen",
  "source_location": "Remote / Hyderabad, India",
  "action_text": "Apply at Heizen Careers →",
  "deadline_text": "Rolling Applications (Apply Early)",
  "canonical_url": "https://www.heizen.work/careers/sde-intern",
  "official_url": "https://www.heizen.work/careers/sde-intern",
  "opportunity_data": {
    "organization": "Heizen",
    "role": "Software Development Engineer Intern",
    "eligibility": "CS/Engineering students or recent graduates (2026 & 2027 Batches)",
    "deadline": "Rolling Applications",
    "location": "Remote / Hyderabad, India",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "₹25,000 / Month",
    "officialUrl": "https://www.heizen.work/careers/sde-intern",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "hubble-software-engineering-intern-backend-data-platform",
  "category_slug": "jobs",
  "title": "Software Engineering Intern (Backend & Data Platform) - Hubble",
  "summary": "6-month paid remote backend and data platform engineering internship at Hubble for 2026 & 2027 graduates. Lucrative compensation of $500–$1,000/month (~₹42,000–₹84,000/month) at minimum 40 hours/week.",
  "content": "## Position Overview\n\nHubble is offering an exceptional opportunity for an ambitious student or recent graduate to join as a **Software Engineering Intern focused on Backend & Data Platforms**.\n\nThis 6-month, 40-hour/week remote internship is structured to give you deep exposure to distributed data pipelines, high-throughput microservices, and modern database infrastructure.\n\n---\n\n## Key Responsibilities\n\n- Develop robust backend services and REST/gRPC endpoints using modern languages (Python, Go, or Java).\n- Build and maintain scalable data ingestion, validation, and analytics pipelines.\n- Work with distributed databases, relational schemas, caching tiers (Redis), and event queues (Kafka/RabbitMQ).\n- Write unit tests, integration suites, and monitor production reliability and latency metrics.\n- Collaborate with cross-border engineering teams on technical design and code audits.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (B.Tech, B.E., M.Tech, or equivalent in CS/IT).\n- **Time Commitment:** Minimum 40 hours per week (full-time remote internship dedication).\n- **Technical Skills:** Strong understanding of backend architecture, database queries, API fundamentals, and data modeling.\n- **Bonus:** Familiarity with cloud platforms (AWS/GCP), Docker containerization, and data warehousing.\n\n---\n\n## Compensation & Highlights\n\n- **Stipend:** **$500 – $1,000 / month** (equivalent to ~**₹42,000 – ₹84,000 per month** in INR).\n- **Duration:** 6 Months.\n- **Location:** Remote, India.\n\n---\n\n## Official Application\n\nSubmit your application through the [Official Hubble Application Portal](https://apply.headlinema.com/apply).",
  "difficulty": "Backend & Systems Assessment",
  "read_time": "6 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Hubble",
    "Backend",
    "Data Platform",
    "Distributed Systems",
    "Python",
    "SQL",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "USD Compensation"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Student (40 hrs/week)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "$500 - $1,000 / Month (~₹42,000 - ₹84,000/month)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Hubble",
  "source_location": "Remote, India",
  "action_text": "Apply on Official Portal →",
  "deadline_text": "Immediate Opening (Rolling)",
  "canonical_url": "https://apply.headlinema.com/apply",
  "official_url": "https://apply.headlinema.com/apply",
  "opportunity_data": {
    "organization": "Hubble",
    "role": "Software Engineering Intern, Backend & Data Platform",
    "eligibility": "CS/IT engineering students or graduates with backend & data platform foundation",
    "deadline": "Rolling Applications",
    "location": "Remote, India",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "$500 - $1,000 / Month",
    "officialUrl": "https://apply.headlinema.com/apply",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "predikt-software-engineering-intern",
  "category_slug": "jobs",
  "title": "Software Engineering Intern - Predikt (Remote / Hybrid)",
  "summary": "Paid software engineering internship at Predikt offering ₹15,000–₹25,000/month with potential full-time conversion (PPO). Open to CS students and recent graduates skilled in JavaScript, TypeScript, and modern web development.",
  "content": "## Position Overview\n\nPredikt is looking for a driven **Software Engineering Intern** to contribute to cutting-edge web products and interactive user interfaces.\n\nThis opportunity offers competitive monthly compensation, close mentorship from senior product engineers, and clear potential for full-time conversion (PPO) upon graduation.\n\n---\n\n## Key Responsibilities\n\n- Develop dynamic, pixel-perfect user interfaces using JavaScript, TypeScript, and React.\n- Integrate frontend views with RESTful backend endpoints and state management libraries.\n- Optimize frontend rendering speed, core web vitals, and mobile responsiveness.\n- Translate Figma prototypes and design tokens into reusable, clean modular UI components.\n- Participate in agile sprint planning, testing, and continuous deployment workflows.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduating students or recent graduates in Computer Science or related fields.\n- **Skills:** Solid proficiency in JavaScript, TypeScript, HTML5, CSS3, and modern frontend tools.\n- **Portfolio:** Tangible projects, GitHub repositories, or live web applications showcasing your frontend code quality.\n\n---\n\n## Compensation & Growth\n\n- **Stipend:** **₹15,000 – ₹25,000 per month**.\n- **PPO:** Strong potential for full-time conversion based on performance.\n- **Work Arrangement:** Remote or Hybrid across India.\n\n---\n\n## Official Application\n\nApply directly on the [Predikt Careers Portal](https://predikt.in/careers/software-engineering-intern/).",
  "difficulty": "Frontend Challenge & Portfolio Review",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Predikt",
    "Frontend",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "React",
    "Remote",
    "Hybrid",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "PPO"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (CS Students & Recent Graduates)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "₹15,000 - ₹25,000 / Month (PPO Potential)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Predikt",
  "source_location": "Remote or Hybrid, India",
  "action_text": "Apply at Predikt Careers →",
  "deadline_text": "Rolling Admissions",
  "canonical_url": "https://predikt.in/careers/software-engineering-intern/",
  "official_url": "https://predikt.in/careers/software-engineering-intern/",
  "opportunity_data": {
    "organization": "Predikt",
    "role": "Software Engineering Intern",
    "eligibility": "CS students and recent graduates (2026 & 2027 Batches) with strong web project portfolio",
    "deadline": "Rolling Applications",
    "location": "Remote or Hybrid, India",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "₹15,000 - ₹25,000 / Month",
    "officialUrl": "https://predikt.in/careers/software-engineering-intern/",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "hindutone-python-developer-intern-hyderabad",
  "category_slug": "jobs",
  "title": "Python Developer Intern - HinduTone (Hyderabad)",
  "summary": "Paid Python Developer internship at HinduTone in Hyderabad (Hybrid mode). Open to engineering students and recent graduates, including final-year candidates. Application window active until December 20, 2026.",
  "content": "## Position Overview\n\nHinduTone is inviting applications for a **Python Developer Intern** based in Hyderabad, operating in a collaborative hybrid work model.\n\nApplications are reviewed on a rolling basis as they arrive, with the formal application deadline on **December 20, 2026**.\n\n---\n\n## Key Responsibilities\n\n- Write clean, modular, and efficient Python code for internal tools and web services.\n- Automate data ingestion, parsing, and API integrations using Python libraries.\n- Assist in database schema management, querying, and backend optimization.\n- Debug and resolve software anomalies, write automated tests, and maintain documentation.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** Open to **2026 and 2027** batches (including final-year students and fresh graduates).\n- **Core Skill:** Practical experience and hands-on comfort with Python programming.\n- **Location:** Able to work in Hyderabad in a hybrid arrangement.\n- **Problem Solving:** Good logical aptitude and willingness to learn on the job.\n\n---\n\n## Compensation & Terms\n\n- **Stipend:** Paid internship; exact amount finalized during selection.\n- **Deadline:** **December 20, 2026** (candidates are encouraged to apply immediately).\n- **Work Model:** Hybrid (Hyderabad).\n\n---\n\n## Official Application\n\nRead full instructions and apply on the [HinduTone Careers Page](https://hindutone.com/careers/python-developer-intern-hyderabad/).",
  "difficulty": "Python Coding & Interview",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "HinduTone",
    "Python",
    "Backend",
    "Hyderabad",
    "Hybrid",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "Internship"
  ],
  "is_featured": false,
  "published": true,
  "status": "active",
  "application_deadline": "2026-12-20T23:59:59.999Z",
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (Students, Final-Year & Recent Graduates)",
  "opportunity_type": "Internship",
  "work_arrangement": "Hybrid",
  "stipend_amount": "Paid (Discussed during selection)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "HinduTone",
  "source_location": "Hyderabad, Telangana, India",
  "action_text": "Apply at HinduTone →",
  "deadline_text": "December 20, 2026",
  "canonical_url": "https://hindutone.com/careers/python-developer-intern-hyderabad/",
  "official_url": "https://hindutone.com/careers/python-developer-intern-hyderabad/",
  "opportunity_data": {
    "organization": "HinduTone",
    "role": "Python Developer Intern",
    "eligibility": "Students and recent graduates, including final-year students (2026 & 2027 Batches)",
    "deadline": "December 20, 2026",
    "location": "Hyderabad, Telangana, India (Hybrid)",
    "workMode": "Hybrid",
    "jobType": "Internship",
    "stipend": "Paid (Industry Standard)",
    "officialUrl": "https://hindutone.com/careers/python-developer-intern-hyderabad/",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "smartdocs-junior-software-developer-hyderabad",
  "category_slug": "jobs",
  "title": "Junior Software Developer - SmartDocs Business Solutions (Hyderabad)",
  "summary": "SmartDocs Business Solutions is hiring Junior Software Developers in Hyderabad offering ₹4–6 LPA. Open to final-year students and fresh graduates (0–2 years) with skills in Java, Spring Boot, and Agentic AI systems.",
  "content": "## Position Overview\n\nSmartDocs Business Solutions is actively hiring a **Junior Software Developer** for its Hyderabad engineering center.\n\nThis full-time engineering position provides a competitive CTC of **₹4–6 LPA** and gives fresh engineers direct hands-on exposure to Java enterprise stacks, Spring Boot microservices, and modern Agentic AI workflows.\n\n---\n\n## Key Responsibilities\n\n- Design, develop, and maintain high-performance enterprise applications in Java and Spring Boot.\n- Implement Agentic AI features, autonomous workflow automation, and intelligent document processing.\n- Write robust unit tests, handle database transactions, and optimize SQL queries.\n- Collaborate with solution architects and product managers to deliver scalable B2B enterprise software.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (final-year students and fresh graduates are fully welcome).\n- **Experience:** 0–2 years of relevant software development experience or project work.\n- **Skills:** Solid Java programming, Spring Boot framework, RESTful services, and exposure to Agentic AI paradigms.\n- **Location:** Hyderabad office based (On-site).\n\n---\n\n## Compensation & Highlights\n\n- **Salary:** **₹4,00,000 – ₹6,00,000 per annum (₹4–6 LPA CTC)**.\n- **Role Type:** Permanent Full-time Software Developer.\n- **Location:** Hyderabad, Telangana.\n\n---\n\n## Official Application\n\nView details and apply directly through the [Jobeedo Application Page](https://jobeedo.com/job/jr-software-developer-156169943).",
  "difficulty": "Java & Backend Architecture Assessment",
  "read_time": "6 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "SmartDocs",
    "Java",
    "Spring Boot",
    "Agentic AI",
    "Backend",
    "Hyderabad",
    "On-site",
    "2026 Batch",
    "2027 Batch",
    "Full-time",
    "High CTC"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (0–2 Years, Final-year & Fresh graduates welcome)",
  "opportunity_type": "Full-time",
  "work_arrangement": "On-site",
  "stipend_amount": "₹4,00,000 - ₹6,00,000 / Year (FTE)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "SmartDocs Business Solutions",
  "source_location": "Hyderabad, Telangana, India",
  "action_text": "Apply on Jobeedo Portal →",
  "deadline_text": "Active Requisition (Posted Oct 26, 2026)",
  "canonical_url": "https://jobeedo.com/job/jr-software-developer-156169943",
  "official_url": "https://jobeedo.com/job/jr-software-developer-156169943",
  "opportunity_data": {
    "organization": "SmartDocs Business Solutions",
    "role": "Junior Software Developer",
    "eligibility": "Final-year students and fresh engineering graduates (2026 & 2027 Batches, 0–2 years exp)",
    "deadline": "Active Requisition / Rolling",
    "location": "Hyderabad, Telangana, India",
    "workMode": "On-site",
    "jobType": "Full-time",
    "stipend": "₹4 - ₹6 LPA CTC",
    "officialUrl": "https://jobeedo.com/job/jr-software-developer-156169943",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "trendwick-associate-software-engineer",
  "category_slug": "jobs",
  "title": "Associate Software Engineer - Trendwick (Hyderabad / Delhi)",
  "summary": "Full-time fresher Associate Software Engineer opportunity at Trendwick across Hyderabad & Delhi offices. Salary ₹3–4 LPA. Requires strong programming fundamentals in Python, Java, C, OOP, DSA, SQL, and Git.",
  "content": "## Position Overview\n\nTrendwick is expanding its core software engineering cohort and hiring **Associate Software Engineers** for its Hyderabad and Delhi technology centers.\n\nThis entry-level full-time role offers an annual CTC of **₹3–4 LPA** and focuses heavily on strong computer science fundamentals, algorithm efficiency, and production code quality.\n\n---\n\n## Key Responsibilities\n\n- Write structured, maintainable code in Python, Java, or C.\n- Solve engineering challenges applying foundational Data Structures and Algorithms.\n- Design database tables, write relational SQL queries, and manage transactional integrity.\n- Collaborate with team members using Git version control and modern CI/CD practices.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (Freshers welcome; 0–1 year experience).\n- **Degrees:** Any engineering or science graduate with strong programming aptitude.\n- **Key Concepts:** Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Relational Databases, and Git.\n\n---\n\n## Compensation & Details\n\n- **Compensation:** **₹3,00,000 – ₹4,00,000 per annum (₹3–4 LPA)**.\n- **Location:** Hyderabad / Delhi (On-site).\n- **Hiring Cycle:** Rolling window; immediate onboarding for selected candidates.\n\n---\n\n## Official Application\n\nSubmit your profile on the [Official Trendwick Careers Page](https://trendwick.co/careers/associate-software-engineer).",
  "difficulty": "Core DSA & OOP Assessment",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Trendwick",
    "Python",
    "Java",
    "C",
    "OOP",
    "DSA",
    "SQL",
    "Git",
    "Hyderabad",
    "Delhi",
    "On-site",
    "2026 Batch",
    "2027 Batch",
    "Full-time"
  ],
  "is_featured": false,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (0–1 Year, Any Graduate)",
  "opportunity_type": "Full-time",
  "work_arrangement": "On-site",
  "stipend_amount": "₹3,00,000 - ₹4,00,000 / Year (FTE)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Trendwick",
  "source_location": "Hyderabad / Delhi, India",
  "action_text": "Apply at Trendwick Careers →",
  "deadline_text": "Rolling Admissions",
  "canonical_url": "https://trendwick.co/careers/associate-software-engineer",
  "official_url": "https://trendwick.co/careers/associate-software-engineer",
  "opportunity_data": {
    "organization": "Trendwick",
    "role": "Associate Software Engineer",
    "eligibility": "Freshers welcome, any graduate (2026 & 2027 Batches, 0–1 year exp)",
    "deadline": "Rolling Applications",
    "location": "Hyderabad / Delhi, India",
    "workMode": "On-site",
    "jobType": "Full-time",
    "stipend": "₹3 - ₹4 LPA CTC",
    "officialUrl": "https://trendwick.co/careers/associate-software-engineer",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "sd-wot-associate-software-engineer-javascript-fullstack",
  "category_slug": "jobs",
  "title": "Associate Software Engineer (JavaScript / Full Stack) - SD WoT (Hyderabad)",
  "summary": "SD WoT is hiring Associate Software Engineers in Cherlapally, Hyderabad. Package up to ₹5 LPA based on technical skills. Open to CSE, IT, ECE, EEE graduates with knowledge of JavaScript, HTML/CSS, and React/MERN stack.",
  "content": "## Position Overview\n\nSD WoT is hiring for the role of **Associate Software Engineer (JavaScript / Full Stack Fresher)** located at Cherlapally, Hyderabad.\n\nThe role offers compensation **up to ₹5 LPA** (commensurate with skills and assessment scores), providing an accelerated platform for fresh graduates to engineer production web applications.\n\n---\n\n## Key Responsibilities\n\n- Build dynamic, interactive user interfaces with JavaScript, HTML5, CSS3, and React.js.\n- Develop backend APIs and microservices using Node.js / Express or Python.\n- Integrate frontend client logic with databases (MongoDB, PostgreSQL, or MySQL).\n- Participate in unit testing, debugging, and software lifecycle optimization.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (0–1 year experience).\n- **Eligible Branches:** CSE, IT, ECE, and EEE graduates.\n- **Technical Skills:** C/C++ or Python, strong JavaScript foundations, HTML/CSS. Prior experience with React or MERN stack is a major advantage.\n\n---\n\n## Compensation & Workplace\n\n- **CTC:** Up to **₹5,00,000 per annum (₹5 LPA)** based on technical performance.\n- **Location:** Cherlapally, Hyderabad, Telangana.\n- **Work Mode:** Office (On-site).\n- **Direct HR Contact:** hr@sdwot.ai.\n\n---\n\n## Official Application\n\nApply on the [Official SD WoT Job Posting](https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1).",
  "difficulty": "Technical Interview & Coding Round",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "SD WoT",
    "JavaScript",
    "Full Stack",
    "React",
    "MERN",
    "C++",
    "Python",
    "Cherlapally",
    "Hyderabad",
    "On-site",
    "2026 Batch",
    "2027 Batch",
    "Full-time"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (0–1 Year, CSE/IT/ECE/EEE)",
  "opportunity_type": "Full-time",
  "work_arrangement": "On-site",
  "stipend_amount": "Up to ₹5,00,000 / Year (Based on Skills)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "SD WoT",
  "source_location": "Cherlapally, Hyderabad, India",
  "action_text": "Apply on SD WoT Portal →",
  "deadline_text": "Rolling Admissions (Contact: hr@sdwot.ai)",
  "canonical_url": "https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1",
  "official_url": "https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1",
  "opportunity_data": {
    "organization": "SD WoT",
    "role": "Associate Software Engineer (JavaScript / Full Stack)",
    "eligibility": "CSE, IT, ECE, EEE graduates (2026 & 2027 Batches, 0–1 year exp)",
    "deadline": "Rolling Applications",
    "location": "Cherlapally, Hyderabad, Telangana, India",
    "workMode": "On-site",
    "jobType": "Full-time",
    "stipend": "Up to ₹5 LPA CTC",
    "officialUrl": "https://www.sdwot.ai/jobs/associate-software-engineer-javascript-fresher-1",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "digital-back-office-software-engineer-intern-2027",
  "category_slug": "jobs",
  "title": "Software Engineer Intern - Digital Back Office (2027 Graduates)",
  "summary": "Exclusive software engineering internship at Digital Back Office specifically mentioning 2027 graduates. Fully remote role with ₹10,000/month stipend and advertised PPO. Build cloud solutions with AWS, Python, JavaScript, REST APIs, and MongoDB.",
  "content": "## Position Overview\n\nDigital Back Office has published a high-priority listing for a **Software Engineer Intern** explicitly designed for **2027 Graduates**.\n\nWith only 1 opening advertised, early application is strongly recommended before the deadline on **November 6, 2026**.\n\n---\n\n## Key Responsibilities\n\n- Develop and integrate cloud-native services utilizing AWS infrastructure.\n- Write modular scripts and backend microservices using Python and JavaScript.\n- Design database queries and schemas using MongoDB and relational SQL.\n- Implement secure, high-performance RESTful APIs and handle automated testing.\n\n---\n\n## Eligibility Criteria\n\n- **Target Batch:** Exclusively open to **2027 graduating batch students**.\n- **Experience:** Open to fresh talent with strong project-driven software development background.\n- **Skills:** AWS, Git, JavaScript, MongoDB, Python, REST API development, SQL.\n\n---\n\n## Stipend & Conversion\n\n- **Stipend:** **₹10,000 per month**.\n- **PPO Opportunity:** Advertised pre-placement offer for full-time engineering career conversion.\n- **Work Model:** 100% Fully Remote across India.\n- **Application Deadline:** **November 6, 2026**.\n\n---\n\n## Official Application\n\nApply directly on the [Riseflake Job Portal](https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107).",
  "difficulty": "Cloud & Full-Stack Coding Task",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Digital Back Office",
    "AWS",
    "Python",
    "JavaScript",
    "MongoDB",
    "REST API",
    "SQL",
    "Remote",
    "2027 Batch",
    "Paid",
    "PPO",
    "Internship"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": "2026-11-06T23:59:59.999Z",
  "eligible_batches": [
    2027
  ],
  "experience_level": "Fresher (Specifically 2027 Graduates)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "₹10,000 / Month (Advertised PPO)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Digital Back Office",
  "source_location": "Remote, India",
  "action_text": "Apply on Riseflake Portal →",
  "deadline_text": "November 6, 2026 (1 Opening)",
  "canonical_url": "https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107",
  "official_url": "https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107",
  "opportunity_data": {
    "organization": "Digital Back Office",
    "role": "Software Engineer Intern (2027 Graduates)",
    "eligibility": "Specifically 2027 engineering & computer science graduates",
    "deadline": "November 6, 2026",
    "location": "Remote, India",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "₹10,000 / Month",
    "officialUrl": "https://jobportal.riseflake.com/internships/software-engineer-intern-digital-back-office-3107",
    "eligibleBatches": [
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "botcadence-full-stack-ai-engineer-intern",
  "category_slug": "jobs",
  "title": "Full Stack AI Engineer Intern - Botcadence (Remote)",
  "summary": "Botcadence is hiring Full Stack AI Engineer Interns to build enterprise AI applications. Remote role working with React, Python, FastAPI, WebSockets, MongoDB, Redis, and LLMs. Internships serve as direct pipeline for full-time offers.",
  "content": "## Position Overview\n\nBotcadence builds AI-native enterprise applications and is welcoming applications for a **Full Stack AI Engineer Intern**.\n\nThe company considers its internship program the primary hiring pipeline for full-time engineering talent, providing an incredible launchpad for developers skilled in React, FastAPI, and Large Language Models.\n\n---\n\n## Key Responsibilities\n\n- Build high-performance frontend interfaces using React, modern CSS, and streaming UI components.\n- Develop asynchronous backend microservices and streaming endpoints with Python and FastAPI.\n- Implement real-time communication protocols using WebSockets.\n- Integrate cache layers and data stores using Redis and MongoDB.\n- Connect enterprise workflows to Large Language Models (LLMs) with prompt engineering and vector indexes.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates in Computer Science or Software Engineering.\n- **Core Stacks:** React, Python, FastAPI, WebSockets, MongoDB, Redis, LLMs.\n- **Fundamentals:** Strong grip on Data Structures, Algorithms, and System Design basics.\n\n---\n\n## Compensation & Highlights\n\n- **Stipend:** Competitive industry-standard monthly stipend.\n- **PPO:** Core hiring pipeline for permanent Full-Stack AI Engineer positions.\n- **Work Model:** 100% Fully Remote.\n- **Email Contact:** connect@botcadence.com.\n\n---\n\n## Official Application\n\nExplore the team and apply on the [Official Botcadence Careers Page](https://botcadence.com/careers).",
  "difficulty": "FastAPI & AI Systems Challenge",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Botcadence",
    "AI",
    "React",
    "Python",
    "FastAPI",
    "WebSockets",
    "MongoDB",
    "Redis",
    "LLMs",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "PPO"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / CS Engineering Students",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "Competitive Industry Stipend (PPO Pipeline)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Botcadence",
  "source_location": "Remote",
  "action_text": "Apply at Botcadence Careers →",
  "deadline_text": "Rolling Admissions (Hiring Pipeline)",
  "canonical_url": "https://botcadence.com/careers",
  "official_url": "https://botcadence.com/careers",
  "opportunity_data": {
    "organization": "Botcadence",
    "role": "Full Stack AI Engineer Intern",
    "eligibility": "CS / Software Engineering background, strong algorithms and system design fundamentals",
    "deadline": "Rolling Admissions",
    "location": "Remote",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "Competitive Paid Stipend",
    "officialUrl": "https://botcadence.com/careers",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "infergent-labs-ai-fullstack-engineering-intern",
  "category_slug": "jobs",
  "title": "AI / Full-Stack Engineering Intern - Infergent Labs",
  "summary": "3–6 month remote AI & Full-Stack engineering internship at Infergent Labs. Work directly on production React/Next.js frontends, Python backend microservices, RAG architectures, and LLM integrations with founding-team PPO opportunity.",
  "content": "## Position Overview\n\nInfergent Labs is recruiting an **AI / Full-Stack Engineering Intern** for a 3–6 month engagement with significant founding-team full-time conversion opportunities.\n\nYou will contribute directly to autonomous AI agent systems, Retrieval-Augmented Generation (RAG) knowledge stores, and responsive Next.js web applications.\n\n---\n\n## Key Responsibilities\n\n- Build and refine production web applications with React and Next.js.\n- Implement server-side AI orchestration pipelines using Python and modern API frameworks.\n- Design and benchmark RAG pipelines combining embeddings, vector stores, and prompt templates.\n- Ensure rigorous API security, rate limiting, and observability across LLM inference routes.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduating cohorts.\n- **Skills:** Strong programming fundamentals, familiarity with React/Next.js, Python, LLMs, and RAG architectures.\n- **Project Work:** Practical code repositories demonstrating machine learning integration or full-stack software development.\n\n---\n\n## Program Details\n\n- **Duration:** 3–6 Months.\n- **Compensation:** Competitive paid monthly stipend.\n- **PPO:** Direct founding-team conversion potential.\n- **Location:** Remote, India.\n\n---\n\n## Official Application\n\nSubmit your resume and code samples at the [Infergent Labs Careers Page](https://infergent.com/careers/ai-fullstack-engineering-intern).",
  "difficulty": "RAG & Full-Stack Evaluation",
  "read_time": "6 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Infergent Labs",
    "AI",
    "Next.js",
    "React",
    "Python",
    "LLMs",
    "RAG",
    "APIs",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "PPO"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Engineering Students",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "Competitive Paid Stipend (Founding Team PPO)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Infergent Labs",
  "source_location": "Remote, India",
  "action_text": "Apply at Infergent Careers →",
  "deadline_text": "Rolling Window (Founding Team PPO)",
  "canonical_url": "https://infergent.com/careers/ai-fullstack-engineering-intern",
  "official_url": "https://infergent.com/careers/ai-fullstack-engineering-intern",
  "opportunity_data": {
    "organization": "Infergent Labs",
    "role": "AI / Full-Stack Engineering Intern",
    "eligibility": "Strong programming fundamentals; practical AI/ML & full-stack project experience",
    "deadline": "Rolling Window",
    "location": "Remote, India",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "Competitive Paid Stipend",
    "officialUrl": "https://infergent.com/careers/ai-fullstack-engineering-intern",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "isocode-labs-software-engineering-intern",
  "category_slug": "jobs",
  "title": "Software Engineering Intern - Isocode Labs (₹50k/mo)",
  "summary": "High-stipend 6-month software engineering internship at Isocode Labs offering an advertised ₹50,000/month stipend in fully remote mode. Design, build, and deploy resilient web systems and cloud services.",
  "content": "## Position Overview\n\nIsocode Labs is opening positions for a **Software Engineering Intern** for a 6-month term offering a top-tier stipend of **₹50,000 per month**.\n\nInterns work on scalable distributed infrastructure, enterprise web tooling, and low-latency cloud microservices.\n\n---\n\n## Key Responsibilities\n\n- Write high-performance, well-architected code in modern programming languages.\n- Participate in the design and scaling of cloud infrastructure and database clusters.\n- Collaborate with senior staff engineers through detailed design reviews and pull request audits.\n- Deliver automated unit and end-to-end integration tests to safeguard platform reliability.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** batches (B.Tech / B.E. / M.Tech / MCA).\n- **Core Skills:** Solid algorithmic problem solving, clean system design fundamentals, and familiarity with cloud architectures.\n- **Duration:** Available for a 6-month continuous internship.\n\n---\n\n## Compensation & Work Model\n\n- **Stipend:** **₹50,000 per month** advertised.\n- **Duration:** 6 months.\n- **Location:** 100% Fully Remote.\n\n---\n\n## Official Application\n\nApply directly on the [Isocode Labs Careers Site](https://careers.isocodelabs.com/).",
  "difficulty": "Advanced Coding & Algorithms",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Isocode Labs",
    "Software Engineering",
    "High Stipend",
    "Cloud",
    "Distributed Systems",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Paid"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Students (2026 & 2027)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "₹50,000 / Month Advertised",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Isocode Labs",
  "source_location": "Remote",
  "action_text": "Apply at Isocode Careers →",
  "deadline_text": "Rolling Admissions (6-Month Term)",
  "canonical_url": "https://careers.isocodelabs.com/",
  "official_url": "https://careers.isocodelabs.com/",
  "opportunity_data": {
    "organization": "Isocode Labs",
    "role": "Software Engineering Intern",
    "eligibility": "BE / B.Tech / MCA students (2026 & 2027 Batches) with strong coding and CS fundamentals",
    "deadline": "Rolling Admissions",
    "location": "Remote",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "₹50,000 / Month",
    "officialUrl": "https://careers.isocodelabs.com/",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "broadcastwell-software-engineering-intern",
  "category_slug": "jobs",
  "title": "Software Engineering Intern - Broadcastwell (TypeScript)",
  "summary": "Paid 12-week remote software engineering internship at Broadcastwell (20 hours/week part-time option). Ideal for students balancing coursework. Focus on TypeScript, web application development, and resilient APIs.",
  "content": "## Position Overview\n\nBroadcastwell is hiring a **Software Engineering Intern** for a flexible 12-week remote term requiring 20 hours of work per week.\n\nThis role provides a great balance for college students seeking paid industry software engineering experience while completing their degree.\n\n---\n\n## Key Responsibilities\n\n- Build and maintain frontend web views and backend services using TypeScript.\n- Implement reusable components and type-safe data validation routines.\n- Optimize web application loading speed and cross-browser reliability.\n- Collaborate with the core product team on weekly feature rollouts.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** batches.\n- **Skills:** TypeScript, JavaScript, modern CSS, and REST API consumption.\n- **Availability:** 20 hours per week over a 12-week period.\n\n---\n\n## Compensation & Work Terms\n\n- **Compensation:** Paid monthly internship.\n- **Duration:** 12 weeks.\n- **Location:** Remote, India.\n\n---\n\n## Official Application\n\nApply directly at [Broadcastwell Careers](https://broadcastwell.com/careers/software-engineering-intern).",
  "difficulty": "TypeScript Practical Assessment",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Broadcastwell",
    "TypeScript",
    "Frontend",
    "Backend",
    "Part-time",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "Internship"
  ],
  "is_featured": false,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Students (20 hrs/week)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "Paid Internship (20 hrs/week)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Broadcastwell",
  "source_location": "Remote, India",
  "action_text": "Apply at Broadcastwell Careers →",
  "deadline_text": "12-Week Term (20 hrs/week)",
  "canonical_url": "https://broadcastwell.com/careers/software-engineering-intern",
  "official_url": "https://broadcastwell.com/careers/software-engineering-intern",
  "opportunity_data": {
    "organization": "Broadcastwell",
    "role": "Software Engineering Intern",
    "eligibility": "Engineering students with strong TypeScript and modern web development skills",
    "deadline": "Rolling Applications",
    "location": "Remote, India",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "Paid (Part-time 20 hrs/week)",
    "officialUrl": "https://broadcastwell.com/careers/software-engineering-intern",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "urbanizer-software-engineer-intern",
  "category_slug": "jobs",
  "title": "Software Engineer Intern - Urbanizer (2026 & 2027 Passouts)",
  "summary": "Remote software engineering internship at Urbanizer open to 2026 and 2027 passouts. Gain real-world software engineering practice, collaborative git workflows, and mentorship across modern full-stack development.",
  "content": "## Position Overview\n\nUrbanizer is accepting applications from **2026 and 2027 passouts** for a **Software Engineer Internship** in a remote setting.\n\nThis program offers students looking to build their professional portfolios an opportunity to write production code, participate in code reviews, and earn formal experience letters and performance incentives.\n\n---\n\n## Key Responsibilities\n\n- Assist in the development of web portals and backend APIs.\n- Write responsive HTML/CSS/JavaScript and React components.\n- Collaborate with senior engineers via Git branching, pull requests, and issue tracking.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduating students.\n- **Skills:** Basic full-stack web development knowledge and enthusiasm to learn.\n\n---\n\n## Official Application\n\nApply at the [Urbanizer Careers Page](https://urbanizer.in/careers/software-engineer-intern/).",
  "difficulty": "Portfolio & Code Review",
  "read_time": "4 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Urbanizer",
    "Full Stack",
    "Web Development",
    "Git",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Internship"
  ],
  "is_featured": false,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (2026 & 2027 Passouts)",
  "opportunity_type": "Internship",
  "work_arrangement": "Remote",
  "stipend_amount": "Unpaid / Performance-Based Incentives",
  "is_stipend_paid": false,
  "salary_currency": "INR",
  "source_name": "Urbanizer",
  "source_location": "Remote",
  "action_text": "Apply at Urbanizer Careers →",
  "deadline_text": "Rolling Admissions (2026/2027)",
  "canonical_url": "https://urbanizer.in/careers/software-engineer-intern/",
  "official_url": "https://urbanizer.in/careers/software-engineer-intern/",
  "opportunity_data": {
    "organization": "Urbanizer",
    "role": "Software Engineer Intern",
    "eligibility": "2026 and 2027 passouts in engineering/computer science",
    "deadline": "Rolling Admissions",
    "location": "Remote",
    "workMode": "Remote",
    "jobType": "Internship",
    "stipend": "Unpaid (Certificate & Performance Incentives)",
    "officialUrl": "https://urbanizer.in/careers/software-engineer-intern/",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "perceptive-apprentice-software-engineer-hyderabad",
  "category_slug": "jobs",
  "title": "Apprentice Software Engineer - Perceptive (Hyderabad, NATS)",
  "summary": "12-month apprentice software engineer training program at Perceptive in Hyderabad under NATS (National Apprenticeship Training Scheme). Zero prior experience required. Structured engineering rotation with government-mandated stipend.",
  "content": "## Program Overview\n\nPerceptive is recruiting **Apprentice Software Engineers** for a 12-month structured program under the Government of India's **National Apprenticeship Training Scheme (NATS)** based at its Hyderabad facility (Job ID: **JR104836**).\n\nThis program is specifically created for fresh graduates without prior work experience, providing immersive, real-world software engineering mentorship.\n\n---\n\n## What You Will Do\n\n- Undergo intensive training on enterprise software engineering methodologies.\n- Collaborate with software development teams on coding, testing, and debugging.\n- Learn CI/CD deployment, cloud platforms, and enterprise life-sciences compliance.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates with degree in Computer Science, IT, or related fields.\n- **Prerequisite:** Valid registration on the National Apprenticeship Training Scheme (NATS) portal.\n- **Experience:** No prior experience needed (entry-level apprenticeship).\n\n---\n\n## Program Details\n\n- **Duration:** 12 Months.\n- **Compensation:** Government-mandated NATS monthly stipend.\n- **Location:** Hyderabad, Telangana.\n\n---\n\n## Official Application\n\nSubmit your profile on the [Perceptive Workday Career Portal](https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836).",
  "difficulty": "Aptitude & Technical Basics",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Perceptive",
    "Apprenticeship",
    "NATS",
    "Hyderabad",
    "On-site",
    "2026 Batch",
    "2027 Batch",
    "Paid",
    "Fresher",
    "Mentorship"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (No Prior Experience Required; NATS Registration Required)",
  "opportunity_type": "Apprenticeship",
  "work_arrangement": "On-site",
  "stipend_amount": "NATS Government Apprenticeship Stipend (Paid)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Perceptive",
  "source_location": "Hyderabad, Telangana, India",
  "action_text": "Apply on Workday Portal →",
  "deadline_text": "Requisition: JR104836 (NATS Registered)",
  "canonical_url": "https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836",
  "official_url": "https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836",
  "opportunity_data": {
    "organization": "Perceptive",
    "role": "Apprentice Software Engineer (Req: JR104836)",
    "eligibility": "Recent graduates with valid NATS registration; zero prior experience required",
    "deadline": "Active Requisition",
    "location": "Hyderabad, Telangana, India",
    "workMode": "On-site",
    "jobType": "Apprenticeship",
    "stipend": "Government Apprenticeship Stipend",
    "officialUrl": "https://calyx.wd1.myworkdayjobs.com/en-US/Perceptive/job/Hyderabad-India/Apprentice-Software-Engineer_JR104836",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "amgen-associate-software-engineer-genai-hyderabad",
  "category_slug": "jobs",
  "title": "Associate Software Engineer (GenAI) - Amgen (Hyderabad)",
  "summary": "Global biotechnology leader Amgen is hiring Associate Software Engineers in Hyderabad focusing on early-career Generative AI engineering. Work on LLM architectures, Python data pipelines, and enterprise life-sciences cloud solutions.",
  "content": "## Position Overview\n\n**Amgen**, one of the world's leading biotechnology enterprises, is hiring for an **Associate Software Engineer** focusing on early-career **Generative AI engineering** at its Hyderabad innovation hub (Job ID: **100307758640**).\n\nThis position combines deep enterprise software development with cutting-edge artificial intelligence, empowering digital health and life-sciences breakthroughs.\n\n---\n\n## Key Responsibilities\n\n- Build and maintain Generative AI workflows, prompting systems, and model inference pipelines.\n- Implement backend data engineering pipelines in Python and modern cloud architectures (AWS/Azure).\n- Ensure strict adherence to high security, compliance, and automated testing standards.\n- Collaborate with global data science, bioinformatics, and product teams.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduating engineers.\n- **Degrees:** B.Tech / B.E. / M.Tech in Computer Science, AI, Data Science, or related disciplines.\n- **Skills:** Strong Python programming, foundational understanding of LLMs, transformers, RAG, and cloud computing.\n\n---\n\n## Compensation & Culture\n\n- **Compensation:** Highly competitive enterprise salary with comprehensive medical, wellness, and retirement benefits.\n- **Location:** Hyderabad (Hybrid work model).\n\n---\n\n## Official Application\n\nApply directly on the [Amgen Careers Portal](https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640).",
  "difficulty": "GenAI & Machine Learning Assessment",
  "read_time": "6 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Amgen",
    "GenAI",
    "AI/ML",
    "Python",
    "Cloud",
    "Data Engineering",
    "Hyderabad",
    "Hybrid",
    "2026 Batch",
    "2027 Batch",
    "Full-time",
    "Biotech"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Early-Career (2026 & 2027 Batches)",
  "opportunity_type": "Full-time",
  "work_arrangement": "Hybrid",
  "stipend_amount": "Competitive Industry Package (FTE)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Amgen",
  "source_location": "Hyderabad, Telangana, India",
  "action_text": "Apply on Amgen Careers →",
  "deadline_text": "Early-Career Requisition (Job: 100307758640)",
  "canonical_url": "https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640",
  "official_url": "https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640",
  "opportunity_data": {
    "organization": "Amgen",
    "role": "Associate Software Engineer (Early-Career GenAI)",
    "eligibility": "BE / B.Tech / ME / M.Tech in CS, IT, AI/ML (2026 & 2027 Batches)",
    "deadline": "Rolling Window",
    "location": "Hyderabad, Telangana, India",
    "workMode": "Hybrid",
    "jobType": "Full-time",
    "stipend": "Competitive Enterprise Package",
    "officialUrl": "https://careers.amgen.com/en/job/hyderabad/associate-software-engineer/87/100307758640",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "trinet-associate-software-engineer-hyderabad",
  "category_slug": "jobs",
  "title": "Associate Software Engineer - TriNet (Hyderabad)",
  "summary": "TriNet is hiring Associate Software Engineers in Hyderabad for candidates with under 2 years experience (freshers welcome). Core technologies include Java, Python, REST microservices, and exposure to GenAI & RAG systems.",
  "content": "## Position Overview\n\nTriNet is recruiting an **Associate Software Engineer** in Hyderabad for early-career developers with under 2 years of experience (freshers are actively invited to apply).\n\nThe role focuses on building scalable enterprise cloud platforms, REST APIs, and integrating GenAI/RAG technologies into enterprise HR and fintech software.\n\n---\n\n## Key Responsibilities\n\n- Develop modular software components in Java and Python.\n- Build and optimize microservices, relational databases, and secure APIs.\n- Participate in designing and experimenting with GenAI retrieval-augmented generation (RAG) models.\n- Support automated testing, agile sprints, and production bug triage.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (0–2 years experience).\n- **Core Stacks:** Java, Python, SQL, REST APIs, and interest in GenAI/RAG.\n- **Location:** Hyderabad (Hybrid work model).\n\n---\n\n## Compensation & Highlights\n\n- **Compensation:** Competitive market compensation package with enterprise perks.\n- **Location:** Hyderabad, Telangana.\n\n---\n\n## Official Application\n\nView listing and apply at the [JobsInHyd TriNet Portal](https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/).",
  "difficulty": "Java/Python & System Foundations",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "TriNet",
    "Java",
    "Python",
    "GenAI",
    "RAG",
    "Microservices",
    "Hyderabad",
    "Hybrid",
    "2026 Batch",
    "2027 Batch",
    "Full-time"
  ],
  "is_featured": false,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Under 2 Years (0–2 Years)",
  "opportunity_type": "Full-time",
  "work_arrangement": "Hybrid",
  "stipend_amount": "Competitive Industry Package (FTE)",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "TriNet",
  "source_location": "Hyderabad, Telangana, India",
  "action_text": "Apply on JobsInHyd Portal →",
  "deadline_text": "Rolling Admissions",
  "canonical_url": "https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/",
  "official_url": "https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/",
  "opportunity_data": {
    "organization": "TriNet",
    "role": "Associate Software Engineer",
    "eligibility": "Graduates with under 2 years experience; freshers welcome (2026 & 2027 Batches)",
    "deadline": "Rolling Admissions",
    "location": "Hyderabad, Telangana, India",
    "workMode": "Hybrid",
    "jobType": "Full-time",
    "stipend": "Competitive Market CTC",
    "officialUrl": "https://jobsinhyd.in/job/associate-software-engineer-trinet-hyderabad/",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "foundation-ai-associate-software-engineer-hyderabad",
  "category_slug": "jobs",
  "title": "Associate Software Engineer - Foundation AI (Hyderabad)",
  "summary": "Entry-level Associate Software Engineer opening at Foundation AI in Hyderabad (0–1 year experience). Build cutting-edge machine learning and intelligent document processing platforms using Python and cloud architectures.",
  "content": "## Position Overview\n\nFoundation AI is seeking an **Associate Software Engineer** in Hyderabad for an entry-level engineering role (0–1 year experience).\n\nYou will join a dynamic artificial intelligence engineering team developing automated document intelligence, computer vision, and NLP systems.\n\n---\n\n## Key Responsibilities\n\n- Implement machine learning models, inference APIs, and data processing workflows using Python.\n- Develop and deploy scalable microservices on cloud infrastructure.\n- Optimize computer vision and NLP model pipelines for high throughput and low latency.\n- Collaborate with AI researchers and frontend developers to ship cohesive user products.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (0–1 year experience).\n- **Core Skills:** Python, object-oriented design, machine learning fundamentals, and REST API development.\n- **Degrees:** B.Tech / B.E. / M.Tech in Computer Science, AI, or allied disciplines.\n\n---\n\n## Official Application\n\nApply directly on the [Foundation AI Application Page](https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India).",
  "difficulty": "Python & ML Problem Solving",
  "read_time": "5 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Foundation AI",
    "AI/ML",
    "Python",
    "Computer Vision",
    "NLP",
    "Hyderabad",
    "Hybrid",
    "2026 Batch",
    "2027 Batch",
    "Full-time"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher (0–1 Year, Entry-Level)",
  "opportunity_type": "Full-time",
  "work_arrangement": "Hybrid",
  "stipend_amount": "Competitive AI Industry Package",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Foundation AI",
  "source_location": "Hyderabad, Telangana, India",
  "action_text": "Apply on Foundation AI Portal →",
  "deadline_text": "Rolling Admissions",
  "canonical_url": "https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India",
  "official_url": "https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India",
  "opportunity_data": {
    "organization": "Foundation AI",
    "role": "Associate Software Engineer",
    "eligibility": "Entry-level freshers and early engineers (0–1 year, 2026 & 2027 Batches)",
    "deadline": "Rolling Admissions",
    "location": "Hyderabad, Telangana, India",
    "workMode": "Hybrid",
    "jobType": "Full-time",
    "stipend": "Competitive Market CTC",
    "officialUrl": "https://foundationai.applytojob.com/apply/EDQnhh4kgL/Associate-Software-Engineer-India",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
{
  "slug": "heizen-associate-software-engineer-hyderabad",
  "category_slug": "jobs",
  "title": "Associate Software Engineer - Heizen (Remote / Hyderabad)",
  "summary": "Full-time Associate Software Engineer role at Heizen offering ₹6–8 LPA advertised compensation. Supports Remote / Hyderabad applicants with 0–2 years experience. Work across Python, React, Next.js, and cloud microservices.",
  "content": "## Position Overview\n\nHeizen is hiring an **Associate Software Engineer** offering an advertised salary package of **₹6–8 LPA**.\n\nThe position explicitly welcomes Remote and Hyderabad-based applicants with 0–2 years of experience who want to build high-scale, modern software products.\n\n---\n\n## Key Responsibilities\n\n- Develop responsive, accessible web interfaces using React and Next.js.\n- Build high-concurrency microservices, API endpoints, and business logic with Python.\n- Design database architectures and write performant queries for scalable data storage.\n- Collaborate with senior architects on continuous delivery, automated tests, and cloud orchestration.\n\n---\n\n## Eligibility Criteria\n\n- **Batches:** **2026 and 2027** graduates (0–2 years experience).\n- **Core Skills:** Python, React, Next.js, Cloud APIs, SQL, and Git.\n- **Mindset:** Strong product sense, velocity in execution, and solid code discipline.\n\n---\n\n## Compensation & Highlights\n\n- **Package:** **₹6,00,000 – ₹8,00,000 per annum (₹6–8 LPA)** advertised.\n- **Work Model:** Remote / Hyderabad, India.\n- **Hiring Window:** Rolling evaluation.\n\n---\n\n## Official Application\n\nView the listing and apply on the [JobSociety Portal](https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/).",
  "difficulty": "Full-Stack Engineering Assessment",
  "read_time": "6 min read",
  "author": "Raju Perumalla",
  "published_date": "2026-10-31",
  "updated_date": "2026-10-31",
  "tags": [
    "Heizen",
    "Software Engineer",
    "Python",
    "React",
    "Next.js",
    "Cloud APIs",
    "Hyderabad",
    "Remote",
    "2026 Batch",
    "2027 Batch",
    "Full-time",
    "High CTC"
  ],
  "is_featured": true,
  "published": true,
  "status": "active",
  "application_deadline": null,
  "eligible_batches": [
    2026,
    2027
  ],
  "experience_level": "Fresher / Early-Career (0–2 Years)",
  "opportunity_type": "Full-time",
  "work_arrangement": "Remote",
  "stipend_amount": "₹6,00,000 - ₹8,00,000 / Year Advertised",
  "is_stipend_paid": true,
  "salary_currency": "INR",
  "source_name": "Heizen",
  "source_location": "Remote / Hyderabad, India",
  "action_text": "Apply on JobSociety Portal →",
  "deadline_text": "Rolling Window (₹6–8 LPA)",
  "canonical_url": "https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/",
  "official_url": "https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/",
  "opportunity_data": {
    "organization": "Heizen",
    "role": "Associate Software Engineer",
    "eligibility": "Freshers and engineers with 0–2 years experience (2026 & 2027 Batches)",
    "deadline": "Rolling Window",
    "location": "Remote / Hyderabad, India",
    "workMode": "Remote",
    "jobType": "Full-time",
    "stipend": "₹6 - ₹8 LPA CTC",
    "officialUrl": "https://jobsociety.in/job/hyderabad-full-time-heizen-associate-software-engineer/",
    "eligibleBatches": [
      2026,
      2027
    ],
    "isVerified": true
  }
},
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
  {
    slug: 'recruit-crm-customer-success-associate-2027',
    category_slug: 'jobs',
    title: 'Customer Success Associate - Recruit CRM (2027 Graduates)',
    summary: 'Official Recruit CRM hiring for 2027 graduates. Fully remote Customer Success Associate role with 6-month traineeship at ₹20,000/month followed by full-time conversion at ₹8 LPA CTC (₹6 LPA base + ₹2 LPA performance pay).',
    content: `## Company Overview

**Recruit CRM** is one of the few fully bootstrapped, remote-first SaaS companies to surpass **$11.6M in Annual Recurring Revenue (ARR)** while remaining profitable every year since inception. Growing at **40%+ YoY** with a **30% annual profit margin**, Recruit CRM powers executive search and recruitment firms across 100+ countries with corporate entities in the US, Ireland, India, and Dubai. Ranked **#1 in its category by Gartner** and rated **4.9/5 on Capterra & G2**.

Discover more about the company at [www.recruitcrm.io](https://recruitcrm.io/).

---

## Position Overview

Recruit CRM is hiring passionate **2027 Graduates** for the **Customer Success Associate** program (Requisition ID: **17915624986970157266mLh**). This opportunity allows upcoming graduates to gain hands-on customer success experience, master enterprise B2B SaaS workflows, and earn a direct transition into a full-time Associate Customer Success role with high-growth compensation.

- **Total Open Positions:** 10
- **Location:** Fully Remote (Work From Home)
- **Joining Timeline:** Immediate

---

## Training Journey & Compensation

- **Traineeship Program (First 6 Months):**
  - **Duration & Hours:** 6 months; 8.5 hours per day (Monday to Friday).
  - **Stipend:** **₹20,000 per month**.
  - **Initial Shift:** Primary Europe shift (12:00 PM / Noon – 10:00 PM IST).
- **Full-Time Opportunity (FTE Conversion):**
  - Upon successful completion of the training program and performance evaluation, you will be offered a full-time position as **Customer Success — Associate**.
  - **CTC:** **₹8,00,000 per annum** (**₹6,00,000 fixed base salary + ₹2,00,000 yearly performance pay**).
  - **Post-Training Shift Options:** Europe, Asia Pacific, North America, or Middle East (aligned to business requirements).

---

## Why Join Recruit CRM?

- **100% Fully Remote:** Freedom to work anywhere across India.
- **ARR-Linked Performance Bonus:** After 1 year as a full-time employee, you become eligible for our ARR-Linked Performance Bonus, announced every January 1st.
- **Sponsored L&D Programs:** Full sponsorship for continuous professional growth and skill building.
- **Company-Paid Team Outbounds:** Regular funded company meetups and retreats.
- **Full Insurance Coverage:** Health benefits and competitive total rewards.

---

## What You Will Do

- Learn the Recruit CRM platform inside and out and master global recruitment operations.
- Handle inbound customer queries and platform troubleshooting via chat, email, and video calls.
- Empathize with users, resolve complex challenges, and offer creative workarounds.
- Advocate for user needs by channeling customer feedback directly to Product and Engineering teams.
- Build and nurture long-term client relationships across 100+ countries.

---

## Who Can Apply?

- **Eligible Batches:** Exclusively open to freshers completing **Graduation / Post-Graduation in 2027**.
- **Specialization:** All degrees and specializations welcome (B.Tech / B.E., B.Sc, BCA, MCA, BBA, B.Com, M.Tech, etc.).
- **Skills Required:**
  - Exceptional verbal and written English communication skills.
  - Quick learner with natural curiosity for software and technology.
  - Proactive problem-solving attitude with strong client empathy.

---

## Selection Process (100% Virtual)

1. **Online Assessment (MCQ):** Testing analytical aptitude, situational problem-solving, and logic.
2. **Practical Case Assignment:** Hands-on scenario exercise to evaluate communication and solutioning.
3. **Virtual Interviews:** In-depth evaluation with the Customer Success and talent leadership.

---

## Official Links & Documents

- **Official Job Description Document:** [CSA India - JD (Google Drive)](https://drive.google.com/file/d/1BwUJOYtAq8I3Fm25_ZmqzgFqryhHYMux/view?usp=sharing)
- **Application Deadline:** November 18, 2026 (Apply early for immediate batch processing)
- **Direct Application:** [Apply on Recruit CRM Careers Portal](https://careers.recruitcrm.io/17915624986970157266mLh?utm_source=internal+hiring+&utm_medium=job+candidate+&utm_campaign=hiring+)`,
    difficulty: 'Online MCQ & Virtual Assessment',
    read_time: '5 min read',
    author: 'Raju Perumalla',
    published_date: '2026-10-20',
    updated_date: '2026-10-20',
    tags: ['Recruit CRM', 'Customer Success', 'SaaS', 'Remote', '2027 Batch', 'Fresher', 'Paid', 'High CTC'],
    is_featured: true,
    published: true,
    status: 'active',
    application_deadline: '2026-11-18T23:59:59.999Z',
    eligible_batches: [2027],
    experience_level: 'Fresher (2027 Batch)',
    opportunity_type: 'Internship / Full-time',
    work_arrangement: 'Remote',
    stipend_amount: '₹20,000 / Month (Training) → ₹8,00,000 / Year (FTE CTC)',
    is_stipend_paid: true,
    salary_currency: 'INR',
    source_name: 'Recruit CRM',
    source_location: 'Fully Remote (Work From Home, India)',
    action_text: 'Apply at Recruit CRM Careers →',
    deadline_text: 'Immediate Joining (Batch 2027)',
    canonical_url: 'https://careers.recruitcrm.io/17915624986970157266mLh',
    official_url: 'https://careers.recruitcrm.io/17915624986970157266mLh?utm_source=internal+hiring+&utm_medium=job+candidate+&utm_campaign=hiring+',
    opportunity_data: {
      organization: 'Recruit CRM',
      role: 'Customer Success Associate - 2027 Graduates (Req: 17915624986970157266mLh)',
      eligibility: 'Freshers completing graduation/post-graduation in 2027 (Any stream/specialization)',
      deadline: 'November 18, 2026 (Immediate Joining)',
      location: 'Fully Remote (Work From Home)',
      workMode: 'Remote',
      jobType: 'Traineeship / Internship + Full-Time',
      stipend: '₹20,000/month (6-mo Training) → ₹8,00,000 CTC Full-Time',
      officialUrl: 'https://careers.recruitcrm.io/17915624986970157266mLh?utm_source=internal+hiring+&utm_medium=job+candidate+&utm_campaign=hiring+',
      eligibleBatches: [2027],
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
