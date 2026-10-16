// Master Structured Data Source of Truth for Decode
// Curated by Raju Perumalla (Google Student Ambassador '26, SAP Innovation Marathon Finalist, Capgemini Tech Challenge Winner)

export const decodeCategories = [
  {
    id: 'study-material',
    slug: 'study-material',
    title: 'Study Materials',
    shortTitle: 'Study Materials',
    description: 'Core computer science notes, subject guides, and exam preparation sheets.',
    icon: 'BookOpen',
    badge: 'Study Materials',
    metaDescription: 'Access curated academic notes, core computer science subjects, OS, DBMS, computer networks, and revision sheets for engineering students.',
  },
  {
    id: 'roadmaps',
    slug: 'roadmaps',
    title: 'Learning Roadmaps',
    shortTitle: 'Roadmaps',
    description: 'Step-by-step developer learning paths for full-stack, AI/ML, and cloud engineering.',
    icon: 'Compass',
    badge: 'Roadmaps',
    metaDescription: 'Step-by-step developer learning roadmaps for Full-Stack Web Development, AI/Machine Learning, and Cloud DevOps engineering.',
  },
  {
    id: 'jobs',
    slug: 'jobs',
    title: 'Jobs & Internships',
    shortTitle: 'Jobs & Internships',
    description: 'Verified student internships, open-source programs, and entry-level developer roles.',
    icon: 'Briefcase',
    badge: 'Internships',
    metaDescription: 'Discover verified student internships, Google Summer of Code, Linux Foundation Mentorship, and graduate software engineering opportunities.',
  },
  {
    id: 'hackathons',
    slug: 'hackathons',
    title: 'Hackathons',
    shortTitle: 'Hackathons',
    description: 'National competitions, enterprise hackathons, eligibility details, and winning strategies.',
    icon: 'Trophy',
    badge: 'Hackathons',
    metaDescription: 'Explore Smart India Hackathon (SIH), enterprise hackathons, winning pitch strategies, and hackathon preparation guides.',
  },
  {
    id: 'final-year-projects',
    slug: 'final-year-projects',
    title: 'Final-Year Projects',
    shortTitle: 'Final-Year Projects',
    description: 'Capstone project blueprints, problem statements, architectures, and implementation guides.',
    icon: 'Cpu',
    badge: 'Projects',
    metaDescription: 'Production-ready final-year engineering capstone project ideas, system architectures, FastAPI/IoT implementations, and datasets.',
  },
  {
    id: 'freelancing',
    slug: 'freelancing',
    title: 'Freelancing',
    shortTitle: 'Freelancing',
    description: 'Client acquisition, portfolio building, proposal writing, and pricing for students.',
    icon: 'DollarSign',
    badge: 'Freelancing',
    metaDescription: 'Practical freelancing guides for college students: landing first clients, pricing contracts, proposals, and portfolio building.',
  },
  {
    id: 'references',
    slug: 'references',
    title: 'References',
    shortTitle: 'References',
    description: 'Official API documentation, trusted developer cheat-sheets, and public datasets.',
    icon: 'Bookmark',
    badge: 'References',
    metaDescription: 'Official React, Python, FastAPI documentation references, verified public datasets, and developer specifications.',
  },
  {
    id: 'career-guidance',
    slug: 'career-guidance',
    title: 'Career Guidance',
    shortTitle: 'Career Guidance',
    description: 'Resume templates, technical interview patterns, and campus placement preparation.',
    icon: 'GraduationCap',
    badge: 'Career Guidance',
    metaDescription: 'Campus placement preparation, technical interview DSA patterns, system design for freshers, and ATS-friendly resume strategies.',
  },
  {
    id: 'developer-tools',
    slug: 'developer-tools',
    title: 'Developer Tools',
    shortTitle: 'Developer Tools',
    description: 'Productivity toolchains, free student packs, and software engineering utilities.',
    icon: 'Wrench',
    badge: 'Developer Tools',
    metaDescription: 'Curated developer toolchains, GitHub Student Developer Pack guide, terminal setups, and AI-assisted programming tools.',
  },
];

export const decodeResources = [
  // ==========================================
  // 1. STUDY MATERIALS
  // ==========================================
  {
    id: 'sm-python-programming',
    slug: 'python-programming-data-structures',
    category: 'study-material',
    title: 'Python Programming & Data Structures Notes',
    summary: 'Comprehensive notes covering Python core semantics, Big-O algorithmic complexity, custom linked lists, binary search trees, and hash maps.',
    difficulty: 'Beginner to Intermediate',
    readTime: '12 min read',
    publishedDate: '2026-01-10',
    updatedDate: '2026-03-15',
    author: 'Raju Perumalla',
    logoKey: 'python',
    sourceName: 'Python Core',
    sourceLocation: 'Computer Science Notes',
    actionText: 'Open notes →',
    deadlineText: 'Updated March 2026',
    tags: ['Python', 'Data Structures', 'Algorithms', 'Computer Science'],
    content: `## Overview & Core Concepts

Python is a primary language for algorithms, machine learning, and rapid prototyping. In university exams and technical interviews, students are expected to implement data structures from scratch and analyze asymptotic runtime complexity.

---

## 1. Asymptotic Complexity (Big-O)

| Data Structure | Access | Search | Insertion | Deletion | Space Complexity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Dynamic Array (List) | O(1) | O(n) | O(1) amortized | O(n) | O(n) |
| Singly Linked List | O(n) | O(n) | O(1) at head | O(1) with pointer | O(n) |
| Hash Map (Dict) | N/A | O(1) avg / O(n) worst | O(1) avg / O(n) worst | O(1) avg | O(n) |
| Binary Search Tree | O(log n) avg | O(log n) avg | O(log n) avg | O(log n) avg | O(n) |

---

## 2. Doubly Linked List Implementation

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self._size = 0

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self._size += 1
\`\`\`

---

## 3. Key Revision Takeaways
- Dynamic arrays provide cache-friendly contiguous memory.
- Linked lists avoid reallocation overhead but incur pointer memory overhead.
- Use Python generators (\`yield\`) for memory-efficient iteration over large datasets.`,
  },
  {
    id: 'sm-operating-systems',
    slug: 'operating-systems-concurrency-fundamentals',
    category: 'study-material',
    title: 'Operating Systems: Processes, Threads & Concurrency',
    summary: 'A structured revision guide covering processes vs threads, virtual memory, paging, CPU scheduling algorithms, and deadlock conditions.',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    publishedDate: '2026-01-18',
    updatedDate: '2026-03-20',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Operating Systems',
    sourceLocation: 'Core CS Curriculum',
    actionText: 'Open notes →',
    deadlineText: 'Updated March 2026',
    tags: ['Operating Systems', 'Concurrency', 'Memory Management', 'Computer Science'],
    content: `## Core Syllabus Topics

Operating Systems coordinate user programs with CPU registers, kernel space, and hardware controllers.

---

## 1. Process vs Thread

- **Process**: An instance of a program in execution with private virtual address space (Text, Data, Heap, Stack).
- **Thread**: Unit of CPU execution within a process. Shares code and data segments, but maintains its own stack and registers.

---

## 2. Concurrency Primitives

- **Mutex**: Lock with ownership. Only the acquiring thread can release it.
- **Semaphore**: Signaling mechanism with an integer counter. \`wait()\` decrements; \`signal()\` increments.

---

## 3. Deadlock (Coffman Conditions)
All four must hold simultaneously:
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait`,
  },
  {
    id: 'sm-computer-networks',
    slug: 'computer-networks-protocols-architecture',
    category: 'study-material',
    title: 'Computer Networks: OSI Model, TCP/IP & Protocols',
    summary: 'Clear reference on the 7-layer OSI model, TCP 3-way handshake, DNS resolution, HTTP/2 vs HTTP/3, and WebSocket architectures.',
    difficulty: 'Intermediate',
    readTime: '11 min read',
    publishedDate: '2026-02-01',
    updatedDate: '2026-03-22',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Networking Standards',
    sourceLocation: 'Protocol Reference',
    actionText: 'Open notes →',
    deadlineText: 'Updated March 2026',
    tags: ['Computer Networks', 'TCP/IP', 'WebSockets', 'HTTP', 'Security'],
    content: `## The Modern Internet Protocol Stack

Every backend request and telemetry event relies on network protocols.

---

## 1. OSI 7-Layer vs TCP/IP

| Layer | OSI Model | TCP/IP Model | Protocols |
| :--- | :--- | :--- | :--- |
| 7 | Application | Application | HTTP, DNS, SSH, WebSocket |
| 4 | Transport | Transport | TCP (reliable), UDP (datagram) |
| 3 | Network | Internet | IPv4, IPv6, ICMP |
| 2 | Data Link | Network Access | Ethernet, Wi-Fi 802.11, ARP |

---

## 2. TCP 3-Way Handshake
1. Client sends **SYN (seq = x)**
2. Server replies with **SYN-ACK (seq = y, ack = x + 1)**
3. Client responds with **ACK (seq = x + 1, ack = y + 1)**`,
  },
  {
    id: 'sm-dbms-sql-guide',
    slug: 'dbms-sql-query-optimization-guide',
    category: 'study-material',
    title: 'Database Management Systems & SQL Optimization',
    summary: 'Relational algebra, 1NF to BCNF normalization rules, B-Tree indexes, execution plans, and transaction ACID properties.',
    difficulty: 'Intermediate',
    readTime: '9 min read',
    publishedDate: '2026-02-12',
    updatedDate: '2026-03-25',
    author: 'Raju Perumalla',
    logoKey: 'sql',
    sourceName: 'Database Systems',
    sourceLocation: 'PostgreSQL & SQL',
    actionText: 'Open notes →',
    deadlineText: 'Updated March 2026',
    tags: ['DBMS', 'PostgreSQL', 'SQL', 'Database Design', 'Indexing'],
    content: `## Database Theory & Production Practice

Relational databases power transactional enterprise software. Designing schemas that avoid data anomalies while executing sub-10ms queries requires mastery of normalization and indexing.

---

## 1. Normalization Summary
- **1NF**: Atomic values; no repeating groups.
- **2NF**: In 1NF + No partial dependencies on composite keys.
- **3NF**: In 2NF + No transitive dependencies between non-key attributes.
- **BCNF**: For every functional dependency $X \rightarrow Y$, $X$ must be a super key.

---

## 2. B-Tree Indexes & Execution Plans

\`\`\`sql
-- Analyze query performance before index
EXPLAIN ANALYZE SELECT * FROM telemetry_events WHERE vehicle_id = 'VEH_4091';

-- Create B-Tree index for O(log n) lookup
CREATE INDEX idx_telemetry_vehicle ON telemetry_events (vehicle_id);
\`\`\``,
  },

  // ==========================================
  // 2. LEARNING ROADMAPS
  // ==========================================
  {
    id: 'rm-full-stack',
    slug: 'full-stack-web-development',
    category: 'roadmaps',
    title: 'Full-Stack Web Development Learning Roadmap',
    summary: 'A step-by-step path covering modern HTML/CSS, JavaScript/TypeScript, React 19, FastAPI, Node.js, PostgreSQL, Docker, and cloud hosting.',
    difficulty: 'All Levels',
    readTime: '14 min read',
    publishedDate: '2026-01-05',
    updatedDate: '2026-03-18',
    author: 'Raju Perumalla',
    logoKey: 'javascript',
    sourceName: 'Full-Stack Roadmap',
    sourceLocation: 'Frontend & Backend',
    actionText: 'View roadmap →',
    deadlineText: 'Updated March 2026',
    tags: ['Full-Stack', 'React', 'FastAPI', 'Node.js', 'PostgreSQL', 'Docker'],
    content: `## The Full-Stack Engineer Roadmap

Building production web applications requires full lifecycle understanding: user interface responsiveness, typing safety, stateless API scaling, database indexing, and automated deployment.

---

## Stage 1: Web Fundamentals & JavaScript Core
- Semantic HTML5 structure and accessible ARIA attributes
- Modern CSS Flexbox and Grid layouts without framework crutches
- ES6+ JavaScript: Closures, Promises, \`async/await\`, Event Loop

## Stage 2: Modern Frontend Architecture
- React 19: Hooks, custom state managers, component lifecycles
- Client routing with React Router
- Utility CSS architecture with Tailwind CSS

## Stage 3: Backend & Databases
- RESTful APIs with FastAPI or Node.js Express
- PostgreSQL schema modeling, foreign keys, and indexes
- In-memory caching with Redis

## Stage 4: DevOps & Cloud Deployments
- Docker multi-stage containerization
- GitHub Actions CI/CD automation
- Serverless edge deployments with Cloudflare Workers`,
  },
  {
    id: 'rm-ai-ml',
    slug: 'artificial-intelligence-machine-learning',
    category: 'roadmaps',
    title: 'Artificial Intelligence & Machine Learning Roadmap',
    summary: 'From mathematical foundations (linear algebra, calculus) to classical scikit-learn, deep learning with PyTorch, computer vision, and model inference.',
    difficulty: 'Intermediate to Advanced',
    readTime: '15 min read',
    publishedDate: '2026-01-22',
    updatedDate: '2026-03-24',
    author: 'Raju Perumalla',
    logoKey: 'python',
    sourceName: 'AI & ML Roadmap',
    sourceLocation: 'Mathematics & PyTorch',
    actionText: 'View roadmap →',
    deadlineText: 'Updated March 2026',
    tags: ['Machine Learning', 'Python', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    content: `## From Mathematical Foundations to Production Inference

Machine learning engineering requires understanding underlying gradient descent mechanics, loss landscapes, and memory constraints during inference.

---

## Stage 1: Mathematical Foundations
- Linear algebra: Vectors, dot products, matrix decomposition (SVD)
- Multivariable calculus: Gradients and partial derivatives (backpropagation)
- NumPy and Pandas for data manipulation

## Stage 2: Classical Machine Learning
- Supervised: Linear/Logistic Regression, Random Forests, XGBoost
- Evaluation: Precision, Recall, F1-Score, ROC-AUC, K-Fold Validation

## Stage 3: Deep Learning & Vision (PyTorch)
- Custom PyTorch \`nn.Module\` implementations and autograd
- Convolutional Neural Networks (CNNs) and ResNet architectures
- Computer vision pipelines: OpenCV face-mesh detection

## Stage 4: Model Serving
- Quantization with ONNX runtime for CPU inference
- Wrapping models in async FastAPI endpoints`,
  },
  {
    id: 'rm-cloud-devops',
    slug: 'cloud-devops-system-engineering',
    category: 'roadmaps',
    title: 'Cloud & DevOps Engineering Roadmap',
    summary: 'Essential guide to Linux shell administration, Docker containerization, GitHub Actions CI/CD pipelines, and serverless edge hosting.',
    difficulty: 'Intermediate',
    readTime: '12 min read',
    publishedDate: '2026-02-15',
    updatedDate: '2026-03-26',
    author: 'Raju Perumalla',
    logoKey: 'docker',
    sourceName: 'DevOps Roadmap',
    sourceLocation: 'Linux, Containers & Cloud',
    actionText: 'View roadmap →',
    deadlineText: 'Updated March 2026',
    tags: ['DevOps', 'Cloud', 'Docker', 'CI/CD', 'Linux', 'Cloudflare Workers'],
    content: `## Modern Infrastructure as Code & Edge Computing

Today software teams ship updates multiple times a day. To do so reliably, engineers must understand Linux administration, automated container builds, and edge routing.

---

## Stage 1: Linux Administration
- Bash scripting, process monitoring (\`top\`, \`ps aux\`), user permissions
- Networking: SSH keys, reverse proxies with NGINX, SSL certificates

## Stage 2: Containers
- Writing lean multi-stage Dockerfiles
- Local multi-service orchestration with Docker Compose

## Stage 3: CI/CD Pipelines
- GitHub Actions workflows for automated tests and linter checks
- Automated deployment triggers on pull request merge

## Stage 4: Serverless & Edge
- Deploying frontends to Cloudflare Workers and V8 isolates`,
  },

  // ==========================================
  // 3. JOBS & INTERNSHIPS (VERIFIED 2026 & 2027 FRESHER ROLES)
  // ==========================================
  {
    id: 'job-ibm-intern-associate-engineer-137023',
    slug: 'ibm-intern-associate-engineer-bangalore-137023',
    category: 'jobs',
    title: 'Intern / Associate Engineer - IBM (Job ID: 137023)',
    summary: 'Official IBM India hiring requisition for 2026 & 2027 graduating batches. Join IBM Cloud, Infrastructure & AI systems teams in Bangalore with competitive stipend and direct FTE conversion opportunities.',
    difficulty: 'Fresher Engineering Assessment',
    readTime: '6 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-16',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'IBM India',
    sourceLocation: 'Bangalore, Karnataka, India',
    actionText: 'Apply at IBM Careers →',
    deadlineText: 'Rolling Applications (Job ID: 137023)',
    tags: ['IBM', 'Software Engineering', 'Cloud', 'AI', 'Bangalore', '2026 Batch', '2027 Batch', 'Paid'],
    status: 'active',
    applicationDeadline: null,
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹40,000 - ₹50,000 / Month (Competitive Stipend)',
    isStipendPaid: true,
    opportunity: {
      organization: 'IBM',
      role: 'Intern / Associate Engineer',
      eligibility: 'BE / B.Tech / ME / M.Tech (CS, IT, ECE, EE) - 2026 & 2027 Batches',
      deadline: 'Actively Hiring / Rolling Window',
      location: 'Bangalore, Karnataka, India (Hybrid)',
      workMode: 'Hybrid',
      jobType: 'Internship / Graduate Trainee',
      stipend: '₹40,000 - ₹50,000 / Month (Competitive Stipend)',
      officialUrl: 'https://careers.ibm.com/en_US/careers/JobDetail?jobId=137023&source=SN_LinkedIn',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
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
  },
  {
    id: 'job-salesforce-summer-2027-ui-ux',
    slug: 'salesforce-summer-2027-intern-ui-ux-designer',
    category: 'jobs',
    title: 'Summer 2027 Intern - UI/UX Designer (Salesforce Futureforce)',
    summary: '6-month prestigious Futureforce design internship at Salesforce India (Hyderabad/Bangalore). Work on AI Agentforce workflows, design systems, and enterprise UI/UX.',
    difficulty: 'Portfolio & Design Challenge',
    readTime: '7 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-16',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Salesforce',
    sourceLocation: 'Hyderabad / Bangalore, India',
    actionText: 'Apply at Salesforce Futureforce →',
    deadlineText: 'Valid for Class of 2027',
    tags: ['Salesforce', 'UI/UX Designer', 'Futureforce', 'Agentforce', 'Figma', 'Hyderabad', 'Bangalore', '2027 Batch', 'Paid'],
    status: 'active',
    applicationDeadline: '2026-10-31T23:59:59.999Z',
    eligibleBatches: [2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher / Pre-final Year',
    workArrangement: 'Hybrid',
    stipendAmount: '₹60,000 - ₹80,000 / Month (Industry Leading)',
    isStipendPaid: true,
    opportunity: {
      organization: 'Salesforce',
      role: 'Summer 2027 Intern - UI/UX Designer (6 Months)',
      eligibility: 'Class of 2027 only: M.Des, B.Des, or UG/Engineering with UI/UX portfolio',
      deadline: '2027 Summer Cohort / Apply Promptly',
      location: 'Hyderabad / Bangalore, India (Hybrid)',
      workMode: 'Hybrid',
      jobType: 'Internship',
      stipend: '₹60,000 - ₹80,000 / Month',
      officialUrl: 'https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/India---Hyderabad/Summer-2027-Intern---UI-UX-Designer_JR363342?utm_source=chatgpt.com',
      eligibleBatches: [2027],
      isVerified: true,
    },
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
  },
  {
    id: 'job-honeywell-mechanical-eng-2027',
    slug: 'honeywell-intern-bachelors-mechanical-eng-2027',
    category: 'jobs',
    title: 'Intern Bachelors Mechanical Eng - Honeywell',
    summary: 'Hands-on engineering internship in mechanical systems design, CAD modeling, and industrial automation at Honeywell Hyderabad. High conversion potential to full-time engineering role.',
    difficulty: 'Engineering Technical Interview',
    readTime: '5 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-16',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Honeywell',
    sourceLocation: 'Hyderabad, India',
    actionText: 'Apply at Honeywell Portal →',
    deadlineText: 'Apply Before Late October 2026',
    tags: ['Honeywell', 'Mechanical Engineering', 'CAD', 'Design', 'Automation', 'Hyderabad', '2027 Batch', 'Paid'],
    status: 'active',
    applicationDeadline: '2026-10-25T23:59:59.999Z',
    eligibleBatches: [2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'On-site',
    stipendAmount: '₹40,000 / Month (Stipend)',
    isStipendPaid: true,
    opportunity: {
      organization: 'Honeywell',
      role: 'Intern Bachelors Mechanical Eng (Internship + FTE)',
      eligibility: 'Degree in Mechanical Engineering - 2027 Graduating Batch',
      deadline: 'October 2026',
      location: 'Hyderabad, India',
      workMode: 'On-site',
      jobType: 'Internship',
      stipend: '₹40,000 / Month (Stipend)',
      officialUrl: 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6504&utm_source=chatgpt.com',
      eligibleBatches: [2027],
      isVerified: true,
    },
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
  },
  {
    id: 'job-pwc-business-ai-engineer-2027',
    slug: 'pwc-business-ai-engineer-intern-2027',
    category: 'jobs',
    title: 'Business AI Engineer - Intern - PwC',
    summary: 'Enterprise AI & automation internship at PwC Acceleration Centers. Work on LLM fine-tuning, retrieval-augmented generation (RAG), and generative AI solutions for Fortune 500 clients.',
    difficulty: 'AI / Python Technical Interview',
    readTime: '6 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-16',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'PwC',
    sourceLocation: 'Bengaluru & Hyderabad, India',
    actionText: 'Apply at PwC Careers →',
    deadlineText: 'Rolling Applications (2027 Batch)',
    tags: ['PwC', 'AI', 'Machine Learning', 'GenAI', 'LLM', 'Python', 'Bengaluru', 'Hyderabad', '2027 Batch', 'Paid'],
    status: 'active',
    applicationDeadline: null,
    eligibleBatches: [2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹35,000 - ₹45,000 / Month',
    isStipendPaid: true,
    opportunity: {
      organization: 'PwC',
      role: 'Business AI Engineer - Intern',
      eligibility: 'B.Tech / BE in Computer Science, Data Science, AI or allied tech - 2027 Batch',
      deadline: 'Rolling Admissions',
      location: 'Bengaluru, Hyderabad, India (Hybrid)',
      workMode: 'Hybrid',
      jobType: 'Internship',
      stipend: '₹35,000 - ₹45,000 / Month',
      officialUrl: 'https://thejobcompany.co.in/frontend/job_details.php?job_id=6501&utm_source=chatgpt.com',
      eligibleBatches: [2027],
      isVerified: true,
    },
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
  },
  {
    id: 'job-hsbc-intern-apprentice-12m',
    slug: 'hsbc-intern-apprentice-12-months-gurugram',
    category: 'jobs',
    title: 'Intern (Apprentice - 12 Months) - HSBC Banking Operations',
    summary: '12-month paid government-certified banking apprenticeship at HSBC Corporate & Institutional Banking in Gurugram under the Apprentices Act & NATS portal. Receive Govt. Certificate of Proficiency.',
    difficulty: 'Aptitude & Video Interview',
    readTime: '6 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-16',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'HSBC',
    sourceLocation: 'Gurugram, Haryana, India',
    actionText: 'Apply at HSBC Portal →',
    deadlineText: 'Valid Through April 2027',
    tags: ['HSBC', 'Banking', 'Apprenticeship', 'Credit & Lending', 'NATS', 'Gurugram', '2026 Batch', '2027 Batch', 'Paid'],
    status: 'active',
    applicationDeadline: '2027-04-07T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Apprenticeship',
    experienceLevel: 'Fresher Apprentice',
    workArrangement: 'Hybrid',
    stipendAmount: 'NATS Government & HSBC Banking Stipend',
    isStipendPaid: true,
    opportunity: {
      organization: 'HSBC',
      role: 'Intern (Apprentice - 12 Months, NATS)',
      eligibility: 'Bachelor degree in Business, Finance, CS or allied (2026 & 2027 Batches)',
      deadline: '2027-04-07',
      location: 'Gurugram, Haryana, India',
      workMode: 'Hybrid',
      jobType: 'Apprenticeship',
      stipend: 'Official NATS Apprentice Stipend',
      officialUrl: 'https://portal.careers.hsbc.com/careers/job/563774612428195-intern-apprentice-12-months--gurugram-haryana-india?domain=hsbc.com&utm_source=chatgpt.com',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
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
  },
  {
    id: 'job-standard-chartered-operations-2026',
    slug: 'standard-chartered-apprentice-operations-gbs-india-2026',
    category: 'jobs',
    title: 'Apprentice Operations GBS India 2026 - Standard Chartered',
    summary: 'Early career banking operations apprenticeship at Standard Chartered Global Business Services (GBS) in Chennai. Gain comprehensive hands-on training in transaction banking, financial controls, and risk.',
    difficulty: 'Entry Level Assessment',
    readTime: '5 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-16',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Standard Chartered Bank',
    sourceLocation: 'Chennai, Tamil Nadu, India',
    actionText: 'Apply at Standard Chartered →',
    deadlineText: 'Active for 2026 Batch',
    tags: ['Standard Chartered', 'Banking', 'Operations', 'GBS', 'Chennai', 'Apprenticeship', '2026 Batch', 'Paid'],
    status: 'active',
    applicationDeadline: null,
    eligibleBatches: [2026],
    opportunityType: 'Apprenticeship',
    experienceLevel: 'Fresher Apprentice',
    workArrangement: 'Hybrid',
    stipendAmount: 'Standard Chartered Monthly Banking Stipend',
    isStipendPaid: true,
    opportunity: {
      organization: 'Standard Chartered',
      role: 'Apprentice Operations GBS India 2026 (Req: 58757)',
      eligibility: 'Undergraduate Degree (B.Com, BBA, BBM, BMS, BSc) - 2024, 2025, 2026 Batches',
      deadline: 'Rolling Admissions (2026 Batch)',
      location: 'Chennai, Tamil Nadu, India',
      workMode: 'Hybrid',
      jobType: 'Apprenticeship',
      stipend: 'Official Bank Apprentice Stipend',
      officialUrl: 'https://jobs.standardchartered.com/job/Apprentice-Operations-GBS-India-2026/58757-en_GB?utm_source=lilimitedlistings&feedid=363857',
      eligibleBatches: [2026],
      isVerified: true,
    },
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
  },
  {
    id: 'job-clearview-data-analyst',
    slug: 'clearview-healthcare-data-analyst-advanced-analytics',
    category: 'jobs',
    title: 'Data Analyst - Advanced Analytics',
    summary: 'Analytics and statistical modelling for life sciences strategy, clinical dataset synthesis, and data-driven consulting engagements.',
    difficulty: 'Entry Level / 0-2 Years',
    readTime: '6 min read',
    publishedDate: '2026-03-20',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'ClearView Healthcare Partners',
    sourceLocation: 'Gurgaon, Haryana, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: May 31, 2026',
    tags: ['Data Analytics', 'Python', 'SQL', 'Healthcare', 'Consulting'],
    status: 'active',
    applicationDeadline: '2026-05-31T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Full-time',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹8 - 12 LPA',
    isStipendPaid: true,
    opportunity: {
      organization: 'ClearView Healthcare Partners',
      role: 'Data Analyst - Advanced Analytics',
      eligibility: '2026 Graduating B.Tech / B.E / B.Sc in CS, IT, Data Science or quantitative fields',
      deadline: 'May 31, 2026',
      location: 'Gurgaon, Haryana, India',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      applicantsCount: 'Over 120 applicants',
      responseText: 'Responses managed via Careers Portal',
      stipend: 'Competitive industry compensation (₹8 - 12 LPA)',
      officialUrl: 'https://www.clearviewhcp.com/careers/',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Position Summary

ClearView Healthcare Partners is a premier life sciences strategy consulting firm. The Advanced Analytics team leverages real-world clinical datasets, statistical modeling, and data engineering to inform biopharma commercialization, market access, and clinical asset development.

---

## Eligibility & Batch Criteria
- **Target Batch**: 2026 Graduating Batch (Final-Year Students)
- **Experience**: 0 Years / Fresher
- **Degree**: B.Tech / B.E / B.Sc in Computer Science, Data Science, or related quantitative domains.

---

## Core Responsibilities
- Analyze complex healthcare and claims datasets using Python, SQL, and R.
- Build predictive algorithms and interactive executive dashboards for pharmaceutical decision-makers.
- Collaborate with multidisciplinary strategy consultants to synthesize clinical insights.

---

## Official Application
Apply directly through the [ClearView Healthcare Partners Careers Portal](https://www.clearviewhcp.com/careers/).`,
  },
  {
    id: 'job-cisco-get-2026',
    slug: 'cisco-graduate-engineer-trainee-2026',
    category: 'jobs',
    title: 'Graduate Engineer Trainee (GET) - Software Development',
    summary: 'Core networking, cloud infrastructure, and distributed systems engineering for 2026 graduating batch freshers.',
    difficulty: 'Fresher / 2026 Batch',
    readTime: '6 min read',
    publishedDate: '2026-03-25',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Cisco Systems',
    sourceLocation: 'Bangalore, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: May 31, 2026',
    tags: ['Cisco', 'Networking', 'Python', 'C++', 'Cloud', 'Graduate Trainee'],
    status: 'active',
    applicationDeadline: '2026-05-31T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Graduate Trainee',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹14 - 18 LPA',
    isStipendPaid: true,
    opportunity: {
      organization: 'Cisco Systems',
      role: 'Graduate Engineer Trainee (GET)',
      eligibility: '2026 graduating B.Tech / B.E in CS, IT, ECE with minimum 7.0 CGPA',
      deadline: 'May 31, 2026',
      location: 'Bangalore, India',
      workMode: 'Hybrid',
      jobType: 'Graduate Trainee',
      applicantsCount: 'Over 280 applicants',
      responseText: 'Direct Cisco Career Gateway',
      stipend: '₹14 - 18 LPA with full benefits',
      officialUrl: 'https://jobs.cisco.com/',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Program Overview

Cisco India Development Center is hiring Graduate Engineer Trainees (GET) for the 2026 batch to engineer internet-scale routing, cloud networking protocols, and enterprise security platforms.

---

## Eligibility Criteria
- **Graduating Batch**: 2026 Graduates only (Final Year B.Tech / B.E)
- **Minimum Criteria**: 7.0 CGPA with no active backlogs
- **Key Skills**: C/C++, Python, Linux OS internals, TCP/IP networking stack.

---

## Official Application
Apply directly via the [Official Cisco Careers Portal](https://jobs.cisco.com/).`,
  },
  {
    id: 'job-amazon-sde-intern-2027',
    slug: 'amazon-software-dev-engineer-intern-2027',
    category: 'jobs',
    title: 'Software Development Engineer Intern (Summer 2026 / Pre-Final Year)',
    summary: 'Design high-scale distributed backend systems, AWS microservices, and customer-facing algorithms for 2027 graduating students.',
    difficulty: 'Pre-Final Year / 2027 Batch',
    readTime: '7 min read',
    publishedDate: '2026-03-24',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Amazon',
    sourceLocation: 'Hyderabad / Bangalore, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: June 20, 2026',
    tags: ['Amazon', 'AWS', 'Java', 'Data Structures', 'Algorithms', 'Internship'],
    status: 'active',
    applicationDeadline: '2026-06-20T23:59:59.999Z',
    eligibleBatches: [2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹80,000 / month',
    isStipendPaid: true,
    opportunity: {
      organization: 'Amazon',
      role: 'Software Development Engineer Intern',
      eligibility: 'Enrolled college students graduating in 2027 (Pre-final year)',
      deadline: 'June 20, 2026',
      location: 'Hyderabad / Bangalore, India',
      workMode: 'Hybrid',
      jobType: 'Internship',
      applicantsCount: 'Over 400 applicants',
      responseText: 'Direct Amazon Jobs Portal',
      stipend: '₹80,000 / month + Accommodation assistance',
      officialUrl: 'https://www.amazon.jobs/',
      eligibleBatches: [2027],
      isVerified: true,
    },
    content: `## Role Overview

Amazon is looking for ambitious Software Development Engineer Interns from the 2027 graduating batch to spend their summer solving planet-scale computational problems.

---

## Eligibility Criteria
- **Graduating Batch**: 2027 Batches (Currently in 3rd Year / Pre-Final Year)
- **Degree**: Enrolled in Bachelor's or Master's in Computer Science, Software Engineering, or related fields.
- **Skills**: Strong foundation in Data Structures, Algorithms, Object-Oriented Design (Java/C++/Python).

---

## Official Application
Apply via the official [Amazon Student Jobs Portal](https://www.amazon.jobs/).`,
  },
  {
    id: 'job-tcs-digital-2026',
    slug: 'tcs-digital-associate-software-engineer-2026',
    category: 'jobs',
    title: 'Associate Software Engineer - Digital Systems',
    summary: 'Full-stack software engineering, cloud applications, and AI workflows for 2026 graduates.',
    difficulty: 'Entry Level / 2026 Batch',
    readTime: '6 min read',
    publishedDate: '2026-03-22',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Tata Consultancy Services',
    sourceLocation: 'Pan India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: May 28, 2026',
    tags: ['TCS', 'Digital', 'Java', 'Full-Stack', 'Fresher', 'Full-time'],
    status: 'active',
    applicationDeadline: '2026-05-28T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Full-time',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹7.0 - 9.0 LPA',
    isStipendPaid: true,
    opportunity: {
      organization: 'Tata Consultancy Services',
      role: 'Associate Software Engineer (Digital)',
      eligibility: '2026 graduating B.Tech / B.E with 60% or 6.0 CGPA throughout academics',
      deadline: 'May 28, 2026',
      location: 'Pan India',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      applicantsCount: 'Over 500 applicants',
      responseText: 'TCS NextStep Portal',
      stipend: '₹7.0 - 9.0 LPA',
      officialUrl: 'https://www.tcs.com/careers',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Role Overview

TCS Digital invites applications from 2026 graduating batch students to build cutting-edge enterprise cloud, AI, and modern web software.

---

## Eligibility Criteria
- **Graduating Batch**: 2026 Only
- **Criteria**: Minimum 60% throughout Class 10, 12, and Graduation.
- **Skills**: Core Java, Python, SQL, REST APIs, and basic Cloud principles.

---

## Official Application
Register and apply through the official [TCS Careers Portal](https://www.tcs.com/careers).`,
  },
  {
    id: 'job-goldman-sachs-intern-2027',
    slug: 'goldman-sachs-engineering-summer-analyst-2027',
    category: 'jobs',
    title: 'Engineering Summer Analyst Intern',
    summary: 'Low-latency financial systems, quant analytics, and distributed cloud computing for 2027 pre-final year students.',
    difficulty: 'Pre-Final Year / 2027 Batch',
    readTime: '7 min read',
    publishedDate: '2026-03-21',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Goldman Sachs',
    sourceLocation: 'Bengaluru / Hyderabad, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: May 20, 2026',
    tags: ['Goldman Sachs', 'C++', 'Java', 'FinTech', 'Internship', '2027 Batch'],
    status: 'active',
    applicationDeadline: '2026-05-20T23:59:59.999Z',
    eligibleBatches: [2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹1,00,000 / month',
    isStipendPaid: true,
    opportunity: {
      organization: 'Goldman Sachs',
      role: 'Engineering Summer Analyst',
      eligibility: 'Pre-final year students graduating in 2027',
      deadline: 'May 20, 2026',
      location: 'Bengaluru / Hyderabad, India',
      workMode: 'Hybrid',
      jobType: 'Internship',
      applicantsCount: 'Over 300 applicants',
      responseText: 'Direct Goldman Sachs Portal',
      stipend: '₹1,00,000 / month stipend',
      officialUrl: 'https://www.goldmansachs.com/careers',
      eligibleBatches: [2027],
      isVerified: true,
    },
    content: `## Program Overview

Goldman Sachs Engineering Summer Analyst program allows pre-final year engineering students to solve mission-critical quantitative and distributed computing challenges.

---

## Eligibility Criteria
- **Graduating Batch**: 2027 Graduates (Currently enrolled in penultimate year of study)
- **Skills**: Strong algorithmic thinking, C++, Java, Python, and system fundamentals.

---

## Official Application
Apply via the official [Goldman Sachs Careers Portal](https://www.goldmansachs.com/careers).`,
  },
  {
    id: 'job-gsoc',
    slug: 'google-summer-of-code-internship-guide',
    category: 'jobs',
    title: 'Google Summer of Code (GSoC) Internship Program',
    summary: 'Stipend-backed international open-source internship program. Learn eligibility criteria, proposal drafting, timeline, and mentor outreach.',
    difficulty: 'Open to 2026 & 2027 Batches',
    readTime: '10 min guide',
    publishedDate: '2026-03-10',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: 'google',
    sourceName: 'Google Open Source',
    sourceLocation: 'Remote · Global',
    actionText: 'Apply →',
    deadlineText: 'Deadline: June 15, 2026',
    tags: ['GSoC', 'Google', 'Internship', 'Open Source', 'Remote', 'Stipend'],
    status: 'active',
    applicationDeadline: '2026-06-15T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Remote',
    stipendAmount: '$1,500 - $3,000 stipend',
    isStipendPaid: true,
    opportunity: {
      organization: 'Google Open Source',
      role: 'Open Source Contributor Intern',
      eligibility: 'College Students (2026 & 2027 Batches) & Beginners (18+)',
      deadline: 'June 15, 2026',
      location: 'Remote · Global',
      workMode: 'Remote',
      jobType: 'Internship',
      applicantsCount: 'Over 5,000 students apply annually',
      responseText: 'Direct Google Open Source Portal',
      stipend: 'Stipend provided based on contributor country purchasing power ($1,500 - $3,000)',
      officialUrl: 'https://summerofcode.withgoogle.com/',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
    content: `## Program Overview

Google Summer of Code is a global, online program bringing student contributors into open source software development. Contributors work with open source organizations on a 12+ week programming project under the guidance of industry mentors.

---

## Key Details
- **Organizer**: Google LLC (Open Source Programs Office)
- **Target Cohorts**: 2026 & 2027 graduating students and open-source contributors (18+)
- **Mode**: 100% Remote
- **Stipend**: Financial stipend disbursed upon milestone evaluations

---

## Preparation Steps
1. **Identify Organizations Early**: Shortlist participating organizations (e.g. Python, Apache, Linux Foundation, TensorFlow).
2. **Solve First Issues**: Submit 2-3 small pull requests to demonstrate code quality and communication.
3. **Draft a Clear Technical Proposal**: Detail architecture, milestones, deliverables, and exam buffer weeks.

---

## Official Link
[Official Google Summer of Code Portal](https://summerofcode.withgoogle.com/)`,
  },
  {
    id: 'job-microsoft-swe',
    slug: 'microsoft-software-engineering-internship-2026',
    category: 'jobs',
    title: 'Software Engineering Intern - Cloud & AI',
    summary: 'Core engineering internship designing distributed cloud backend services, Azure infrastructure, and developer platform features.',
    difficulty: '2026 & 2027 Batches',
    readTime: '7 min read',
    publishedDate: '2026-03-25',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Microsoft',
    sourceLocation: 'Hyderabad / Bangalore, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: May 25, 2026',
    tags: ['Microsoft', 'Azure', 'C++', 'Python', 'Cloud', 'Internship'],
    status: 'active',
    applicationDeadline: '2026-05-25T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Hybrid',
    stipendAmount: '₹85,000 / month',
    isStipendPaid: true,
    opportunity: {
      organization: 'Microsoft',
      role: 'Software Engineering Intern',
      eligibility: 'Enrolled B.Tech / M.Tech in CS or related branches (2026 & 2027 Batches)',
      deadline: 'May 25, 2026',
      location: 'Hyderabad / Bangalore, India',
      workMode: 'Hybrid',
      jobType: 'Internship',
      applicantsCount: 'Over 350 applicants',
      responseText: 'Direct Microsoft Careers Portal',
      stipend: '₹85,000 / month internship stipend with housing assistance',
      officialUrl: 'https://careers.microsoft.com/',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
    content: `## Role Overview

Microsoft India Development Center hires student interns to build planetary-scale cloud services, developer productivity tools, and generative AI features powering Microsoft 365, Azure, and Windows.

---

## Technical Expectations
- Solid foundations in Data Structures, Algorithms, and Object-Oriented Design (C++, Java, or Python).
- Understanding of concurrency, memory management, and asynchronous networking.
- Ability to write clean, testable, and maintainable production code.

---

## Official Application
Apply via the official [Microsoft Careers Portal](https://careers.microsoft.com/).`,
  },
  {
    id: 'job-lfx-mentorship',
    slug: 'lfx-mentorship-open-source-internship',
    category: 'jobs',
    title: 'Linux Foundation Mentorship (LFX) Program',
    summary: 'Paid remote open source internships across Linux kernel, Kubernetes, Cloud Native (CNCF), and hyperledger ecosystems.',
    difficulty: '2026 & 2027 Batches',
    readTime: '9 min guide',
    publishedDate: '2026-03-12',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'The Linux Foundation',
    sourceLocation: 'Remote · Global',
    actionText: 'Apply →',
    deadlineText: 'Deadline: May 30, 2026',
    tags: ['Linux Foundation', 'LFX', 'Kubernetes', 'Cloud Native', 'Internship'],
    status: 'active',
    applicationDeadline: '2026-05-30T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Remote',
    stipendAmount: '$3,000 - $6,000 per term',
    isStipendPaid: true,
    opportunity: {
      organization: 'The Linux Foundation',
      role: 'Software Engineering Mentee',
      eligibility: 'University Students (2026 & 2027 Batches) & Early-Career Developers',
      deadline: 'May 30, 2026',
      location: 'Remote · Global',
      workMode: 'Remote',
      jobType: 'Internship',
      applicantsCount: 'Over 1,200 applicants',
      responseText: 'Official Linux Foundation Portal',
      stipend: 'Funded Stipend ($3,000 - $6,000 per term)',
      officialUrl: 'https://lfx.linuxfoundation.org/tools/mentorship/',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
    content: `## Program Structure

The Linux Foundation Mentorship program provides paid, remote internships for developers to work directly with core maintainers of global infrastructure projects like Kubernetes, Hyperledger, and the Linux kernel.

---

## Eligibility
- **Enrolled cohorts**: 2026 and 2027 college students and emerging open source contributors.
- **Modality**: 100% Remote

---

## Official Link
[Official Linux Foundation Mentorship Portal](https://lfx.linuxfoundation.org/tools/mentorship/)`,
  },
  {
    id: 'job-mlh-fellowship',
    slug: 'mlh-fellowship-software-engineering',
    category: 'jobs',
    title: 'Major League Hacking (MLH) Fellowship',
    summary: 'A 12-week remote educational internship contributing to real-world open-source software with industry mentorship and educational stipends.',
    difficulty: '2026 & 2027 Batches',
    readTime: '8 min guide',
    publishedDate: '2026-03-15',
    updatedDate: '2026-03-28',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Major League Hacking',
    sourceLocation: 'Remote · Global',
    actionText: 'Apply →',
    deadlineText: 'Deadline: June 30, 2026',
    tags: ['MLH Fellowship', 'Internship', 'Open Source', 'Software Engineering'],
    status: 'active',
    applicationDeadline: '2026-06-30T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher',
    workArrangement: 'Remote',
    stipendAmount: 'Need-based Educational Stipend',
    isStipendPaid: true,
    opportunity: {
      organization: 'Major League Hacking',
      role: 'Software Engineering Fellow',
      eligibility: 'Enrolled College Students (2026 & 2027 Batches)',
      deadline: 'June 30, 2026',
      location: 'Remote · Global',
      workMode: 'Remote',
      jobType: 'Fellowship',
      applicantsCount: 'Over 3,000 applicants per batch',
      responseText: 'Direct MLH Application Portal',
      stipend: 'Need-based Educational Stipend Available',
      officialUrl: 'https://fellowship.mlh.io/',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
    content: `## About the MLH Fellowship

The MLH Fellowship is a remote 12-week internship alternative where fellows contribute to open-source software used by millions worldwide.

---

## Program Tracks
- **Open Source Track**: Contribute to major public repositories.
- **Software Engineering Track**: Build features for sponsor organizations.
- **Site Reliability Engineering (SRE)**: Learn cloud infrastructure and monitoring.

---

## Official Link
[Official MLH Fellowship Portal](https://fellowship.mlh.io/)`,
  },
  {
    id: 'job-citi-java-fullstack-chennai',
    slug: 'citi-java-fullstack-developer-chennai',
    category: 'jobs',
    title: 'Java Fullstack Developer (Early Career)',
    summary: 'Develop high-scale enterprise microservices, transactional backend systems, and modern web applications at Citi Technology.',
    difficulty: '0-2 Years / 2026 Batch Eligible',
    readTime: '6 min read',
    publishedDate: '2026-10-14',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Citi Careers',
    sourceLocation: 'Chennai, Tamil Nadu, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: November 30, 2026',
    tags: ['Citi', 'Java', 'Spring Boot', 'Microservices', 'Early Career', 'SQL', 'Chennai'],
    status: 'active',
    applicationDeadline: '2026-11-30T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Full-time',
    experienceLevel: 'Fresher / Early Career',
    workArrangement: 'Hybrid',
    stipendAmount: '₹12 - 18 LPA (Industry Standard)',
    isStipendPaid: true,
    opportunity: {
      organization: 'Citi (Citigroup)',
      role: 'Java Fullstack Developer (Applications Development Programmer Analyst)',
      eligibility: 'Bachelor’s / University degree in CS, IT or equivalent (0-2 years experience / 2026 graduates eligible)',
      deadline: 'November 30, 2026',
      location: 'Chennai, Tamil Nadu, India',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      applicantsCount: 'Early application window open',
      responseText: 'Direct Citi Careers Workday Portal',
      stipend: '₹12 - 18 LPA with comprehensive health & retirement benefits',
      officialUrl: 'https://jobs.citi.com/job/chennai/java-fullstack-developer/287/101944267120',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Position Summary

Citi is hiring an Applications Development Programmer Analyst for its Chennai Technology Center. This role participates in the development and enhancement of mission-critical banking and financial applications.

---

## Eligibility Criteria
- **Graduating Batch**: 2026 Graduates & Early Career (0–2 Years Experience)
- **Education**: Bachelor’s or University degree in Computer Science, IT, or related engineering discipline
- **Key Skills**: Java, Spring Boot, Microservices, REST APIs, SQL, UNIX/Linux

---

## Core Technical Responsibilities
- Design and code robust application modules using Core Java, J2EE, Spring Boot, and JDBC.
- Develop RESTful microservices and WebSockets for low-latency financial transaction workflows.
- Write unit and integration test suites using JUnit, TestNG, and Mockito.
- Participate in CI/CD pipeline deployments and agile sprint ceremonies.

---

## Official Application
Apply directly through the [Citi Careers Portal](https://jobs.citi.com/job/chennai/java-fullstack-developer/287/101944267120).`,
  },
  {
    id: 'job-aguttaa-associate-software-intern',
    slug: 'aguttaa-associate-software-intern-remote',
    category: 'jobs',
    title: 'Associate Software Intern (Web, Mobile & Backend)',
    summary: '6-month software engineering internship spanning React, Node.js, Python, and SQL with senior mentorship and permanent PPO conversion.',
    difficulty: '0-1 Years / 2026 & 2027 Batches',
    readTime: '5 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Aguttaa',
    sourceLocation: 'Remote (Work From Home)',
    actionText: 'Apply →',
    deadlineText: 'Deadline: December 15, 2026',
    tags: ['Aguttaa', 'React', 'Node.js', 'Python', 'SQL', 'Internship', 'Remote'],
    status: 'active',
    applicationDeadline: '2026-12-15T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher / Intern',
    workArrangement: 'Remote',
    stipendAmount: '₹5,000 - ₹10,000 / month (Converts to ₹3 LPA+ permanent role)',
    isStipendPaid: true,
    opportunity: {
      organization: 'Aguttaa',
      role: 'Associate Software Intern',
      eligibility: 'Enrolled or graduating college students (2026 & 2027 Batches) with core programming fundamentals',
      deadline: 'December 15, 2026',
      location: 'Remote · Work From Home',
      workMode: 'Remote',
      jobType: 'Internship',
      applicantsCount: 'Screened via TalentScope AI',
      responseText: 'Response within 5 working days',
      stipend: '₹5,000 - ₹10,000 / month performance stipend with ₹3 LPA+ permanent offer',
      officialUrl: 'https://aguttaa.com/careers/associate-software-intern',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
    content: `## Program Overview

Aguttaa is a recruitment tech firm built around TalentScope, its AI-powered candidate evaluation platform. As an Associate Software Intern, you will work alongside senior software engineers on delivery work across web, mobile, and backend microservices.

---

## Internship Structure
- **Months 1–3**: Guided training and hands-on codebase orientation.
- **Months 4–6**: Performance-based stipend of ₹5,000–₹10,000/month working on live features.
- **Post-Internship**: Eligible for permanent full-time conversion starting from ₹3 LPA+.

---

## Eligibility Criteria
- **Target Batches**: 2026 (Final Year) & 2027 (Pre-Final Year)
- **Skills**: Basic knowledge of HTML, CSS, JavaScript, React, Node.js, Python, or SQL
- **Format**: 100% Remote, work from home

---

## Official Application
Apply in 2 minutes without resume via the [Aguttaa Careers Portal](https://aguttaa.com/careers/associate-software-intern).`,
  },
  {
    id: 'job-aguttaa-hr-recruiter-intern',
    slug: 'aguttaa-hr-recruiter-intern-remote',
    category: 'jobs',
    title: 'HR Recruiter Intern (Talent Acquisition & Sourcing)',
    summary: 'Remote human resources internship managing candidate sourcing, LinkedIn talent mapping, screening, and interview coordination.',
    difficulty: '0-1 Years / 2026 & 2027 Batches',
    readTime: '5 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Aguttaa',
    sourceLocation: 'Remote (Work From Home)',
    actionText: 'Apply →',
    deadlineText: 'Deadline: December 15, 2026',
    tags: ['Aguttaa', 'HR', 'Recruitment', 'Talent Acquisition', 'LinkedIn', 'Internship', 'Remote'],
    status: 'active',
    applicationDeadline: '2026-12-15T23:59:59.999Z',
    eligibleBatches: [2026, 2027],
    opportunityType: 'Internship',
    experienceLevel: 'Fresher / Intern',
    workArrangement: 'Remote',
    stipendAmount: '₹5,000 - ₹10,000 / month (Converts to ₹3 LPA+ permanent role)',
    isStipendPaid: true,
    opportunity: {
      organization: 'Aguttaa',
      role: 'HR Recruiter Intern',
      eligibility: 'Graduating or enrolled students (2026 & 2027 Batches) across any degree (B.Tech, BBA, MBA, B.Com, BA)',
      deadline: 'December 15, 2026',
      location: 'Remote · Work From Home',
      workMode: 'Remote',
      jobType: 'Internship',
      applicantsCount: 'Screened via TalentScope AI',
      responseText: 'Response within 5 working days',
      stipend: '₹5,000 - ₹10,000 / month performance stipend with ₹3 LPA+ permanent offer',
      officialUrl: 'https://aguttaa.com/careers/hr-recruiter-intern',
      eligibleBatches: [2026, 2027],
      isVerified: true,
    },
    content: `## Program Overview

Join Aguttaa's recruitment and talent solutions division as an HR Recruiter Intern. You will gain practical exposure across IT and non-IT hiring, candidate communication, screening calls, and interview pipeline coordination.

---

## Internship Structure
- **Duration**: 6-Month Remote Internship
- **Stipend**: Performance-based stipend of ₹5,000–₹10,000/month after training.
- **Career Growth**: Direct eligibility for a permanent HR Specialist role starting at ₹3 LPA+.

---

## Key Responsibilities
- Source potential candidates across job boards, LinkedIn, and internal database pipelines.
- Conduct initial candidate telephone screening calls and verify job alignment.
- Coordinate interview schedules between candidates and technical evaluation panels.
- Maintain tracking spreadsheets and candidate databases.

---

## Official Application
Apply directly via the [Aguttaa HR Careers Portal](https://aguttaa.com/careers/hr-recruiter-intern).`,
  },
  {
    id: 'job-cognizant-data-mapping-process',
    slug: 'cognizant-fresher-customer-support-data-mapping',
    category: 'jobs',
    title: 'Customer Support Executive (Data - Mapping Process)',
    summary: 'Analyze, validate, and maintain geospatial and mapping data accuracy within Cognizant’s digital operations center.',
    difficulty: 'Fresher / 2026 Batch & Recent Graduates',
    readTime: '5 min read',
    publishedDate: '2026-09-25',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Cognizant',
    sourceLocation: 'Hyderabad, Telangana, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: November 15, 2026',
    tags: ['Cognizant', 'Data Mapping', 'Customer Support', 'Operations', 'Fresher', 'Hyderabad'],
    status: 'active',
    applicationDeadline: '2026-11-15T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Full-time',
    experienceLevel: 'Fresher (0 to 0 years)',
    workArrangement: 'On-site',
    stipendAmount: '₹2.5 - 3.5 LPA + Shift Allowances',
    isStipendPaid: true,
    opportunity: {
      organization: 'Cognizant',
      role: 'Customer Support Executive - Data Mapping Process',
      eligibility: 'Any Graduate (2026 Batch or recent graduates) with 0 years experience and good analytical communication skills',
      deadline: 'November 15, 2026',
      location: 'Hyderabad (HYD), Telangana, India',
      workMode: 'On-site (Work From Office)',
      jobType: 'Full-time',
      applicantsCount: 'High volume fresher drive',
      responseText: 'Direct hiring cycle via Cognizant partner gateways',
      stipend: '₹2.5 - 3.5 LPA + rotational shift allowance and transportation',
      officialUrl: 'https://bebee.com/in/jobs/fresher-customer-support-data-mapping-process-cognizant-hyderabad--t7xk-853218746',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Role Overview

Cognizant Hyderabad is recruiting freshers for its Data Mapping Operations team. The role focuses on verifying, updating, and auditing geo-navigation and mapping datasets for global enterprise clients.

---

## Eligibility Criteria
- **Experience**: Freshers Eligible (0 to 0 years experience)
- **Batch**: 2026 Graduating Batch & Recent Graduates
- **Location**: Hyderabad (Work From Office)
- **Work Shifts**: 24/7 Rotational shifts with company-provided transport

---

## Core Responsibilities
- Analyze and validate map data attributes including roads, points of interest, and navigational pathways.
- Ensure strict adherence to client quality benchmarks and data hygiene standards.
- Troubleshoot mapping anomalies and flag discrepancies for engineering review.

---

## Official Application
View full job specifications and apply via the [Cognizant / BeBee Career Gateway](https://bebee.com/in/jobs/fresher-customer-support-data-mapping-process-cognizant-hyderabad--t7xk-853218746).`,
  },
  {
    id: 'job-virtual-drive-voice-process-bangalore',
    slug: 'fresher-process-associate-voice-process-bangalore',
    category: 'jobs',
    title: 'Process Associate - Voice Process (Mega Virtual Drive)',
    summary: 'Virtual hiring drive for non-engineering freshers for voice customer support and communication operations in Bangalore.',
    difficulty: 'Fresher / Non-Engineering Graduates',
    readTime: '5 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Mega Virtual Hiring Drive',
    sourceLocation: 'Bangalore, Karnataka, India',
    actionText: 'Register →',
    deadlineText: 'Deadline: November 10, 2026',
    tags: ['Voice Process', 'Customer Support', 'BPO', 'Mega Drive', 'Fresher', 'Bangalore'],
    status: 'active',
    applicationDeadline: '2026-11-10T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Full-time',
    experienceLevel: 'Fresher',
    workArrangement: 'On-site',
    stipendAmount: '₹2.8 - 3.6 LPA + Night Shift Allowances',
    isStipendPaid: true,
    opportunity: {
      organization: 'Enterprise Operations Drive',
      role: 'Process Associate - Voice Process',
      eligibility: 'Non-tech graduates (B.Com, BBA, BA, B.Sc); note: B.Tech / BE / MCA are not eligible',
      deadline: 'November 10, 2026',
      location: 'Bangalore, Karnataka, India',
      workMode: 'On-site (Night Shifts)',
      jobType: 'Full-time',
      applicantsCount: 'Online registration drive',
      responseText: 'Direct Microsoft Forms registration',
      stipend: 'Competitive fresher compensation + night shift allowances',
      officialUrl: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-edGDrJWk-LaG9MqZQZEjMyU26NbD5BgSc_JO7O4FVUQUlWQUE3UVhXOVhLNTRJM0I1N0tOUVNFMC4u',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Program Overview

A Mega Virtual Hiring Drive is currently underway for Process Associate positions in Bangalore. The role entails providing high-quality voice support, resolving customer inquiries, and managing inbound communication channels.

---

## Eligibility & Exclusions
- **Target Qualification**: B.Com, BBA, BA, B.Sc, and other non-technical bachelor degrees.
- **Exclusion**: Candidates with B.Tech, B.E, MCA, or IT technical degrees are **not** eligible for this specific drive.
- **Shift Requirements**: Must be comfortable working rotational night shifts.
- **Location**: Bangalore, Karnataka (On-site).

---

## Key Skills
- Excellent verbal and written English communication.
- Strong active listening and empathetic customer resolution skills.
- Basic computer and data entry fluency.

---

## Official Registration Link
Register directly through the official [Microsoft Forms Registration Page](https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-edGDrJWk-LaG9MqZQZEjMyU26NbD5BgSc_JO7O4FVUQUlWQUE3UVhXOVhLNTRJM0I1N0tOUVNFMC4u).`,
  },
  {
    id: 'job-citi-fullstack-cards-chennai',
    slug: 'citi-full-stack-java-developer-commercial-cards',
    category: 'jobs',
    title: 'Full Stack Java Developer (Commercial Cards & Payments)',
    summary: 'Design high-volume card transaction architectures, Spring Boot microservices, and modern web applications for Citibank Commercial Cards.',
    difficulty: 'Early Career / Software Engineer',
    readTime: '6 min read',
    publishedDate: '2026-10-14',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Citi Careers',
    sourceLocation: 'Chennai, Tamil Nadu, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: November 30, 2026',
    tags: ['Citi', 'Java', 'Spring Boot', 'Angular', 'React', 'Payment Systems', 'Microservices'],
    status: 'active',
    applicationDeadline: '2026-11-30T23:59:59.999Z',
    eligibleBatches: [2026],
    opportunityType: 'Full-time',
    experienceLevel: 'Early Career / Software Engineer',
    workArrangement: 'Hybrid',
    stipendAmount: '₹14 - 22 LPA Industry Package',
    isStipendPaid: true,
    opportunity: {
      organization: 'Citi (Citigroup)',
      role: 'Full Stack Java Developer (Commercial Cards Technology)',
      eligibility: 'B.Tech / B.E in CS, IT, or related degree with practical experience in Java, Spring Boot, and modern web frameworks',
      deadline: 'November 30, 2026',
      location: 'Chennai, Tamil Nadu, India',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      applicantsCount: 'Early applications open',
      responseText: 'Direct Citi Careers Workday Portal',
      stipend: 'Comprehensive compensation with global health and bonus incentives',
      officialUrl: 'https://jobs.citi.com/job/chennai/full-stack-java-developer/287/101956556992',
      eligibleBatches: [2026],
      isVerified: true,
    },
    content: `## Position Summary

Citibank Commercial Cards powers card-based payment solutions for large corporations, state and federal governments worldwide. This engineering team designs and scales high-availability transactional architectures and customer-facing management dashboards.

---

## Technical Stack & Qualifications
- **Backend**: Core Java, J2EE, Spring Boot, JPA/Hibernate, Microservices, REST APIs, JMS / Message Queues.
- **Frontend**: Modern JavaScript, HTML5/CSS3, Angular or React.
- **Database**: Oracle, DB2, or SQL with query optimization.
- **Testing**: Test-driven development (TDD) using JUnit and Mockito.

---

## Key Responsibilities
- Architect high-throughput, low-latency financial transaction pipelines.
- Implement microservices with service registry and discovery patterns.
- Partner with global cross-functional product teams across LATAM, EMEA, and ASPAC.

---

## Official Application
Apply directly on the [Citi Careers Portal](https://jobs.citi.com/job/chennai/full-stack-java-developer/287/101956556992).`,
  },
  {
    id: 'job-citi-sap-fieldglass-analyst-chennai',
    slug: 'citi-sap-cte-fieldglass-senior-business-analyst',
    category: 'jobs',
    title: 'SAP CTE / Fieldglass Senior Business Analyst (AVP)',
    summary: 'Lead enterprise procurement, Concur Travel & Expense (CTE), and SAP Fieldglass integrations within Citi Technology & Supply Chain.',
    difficulty: 'Experienced / AVP',
    readTime: '6 min read',
    publishedDate: '2026-10-09',
    updatedDate: '2026-10-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Citi Careers',
    sourceLocation: 'Chennai, Tamil Nadu, India',
    actionText: 'Apply →',
    deadlineText: 'Deadline: November 30, 2026',
    tags: ['Citi', 'SAP', 'Fieldglass', 'Concur', 'Business Analyst', 'Supply Chain', 'AVP'],
    status: 'active',
    applicationDeadline: '2026-11-30T23:59:59.999Z',
    eligibleBatches: [],
    opportunityType: 'Full-time',
    experienceLevel: 'Experienced (AVP / Senior)',
    workArrangement: 'Hybrid',
    stipendAmount: 'Senior Executive Compensation (₹25 - 40 LPA)',
    isStipendPaid: true,
    opportunity: {
      organization: 'Citi (Citigroup)',
      role: 'SAP CTE / Fieldglass Senior Business Analyst (AVP)',
      eligibility: 'Bachelor’s / University degree with expertise in Enterprise SAP platforms, Concur Travel & Expense, and Fieldglass',
      deadline: 'November 30, 2026',
      location: 'Chennai, Tamil Nadu, India',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      applicantsCount: 'Executive hiring track',
      responseText: 'Direct Citi Careers Portal',
      stipend: 'Competitive leadership compensation package',
      officialUrl: 'https://jobs.citi.com/job/chennai/sap-cte-fieldglass-senior-business-analyst-avp/287/101736842464',
      eligibleBatches: [],
      isVerified: true,
    },
    content: `## Position Summary

The SAP CTE / Fieldglass Senior Business Analyst (AVP) is an executive technologist position responsible for bridging global business operations, supply chain management, and SAP enterprise platforms.

---

## Core Focus Areas
- **Platforms**: SAP Platform tools, Concur and Travel Expenses (CTE), SAP Fieldglass, and enterprise data warehousing.
- **Integration**: Middleware tools, data pipelines, electronic workflows, and automated P2P processes.
- **Delivery**: Managing BRD signoffs, testing support, UAT resolution, and production migration workflows.

---

## Qualifications
- Deep domain knowledge in enterprise procurement, travel & expense management, and contractor workforce management.
- Proficiency in writing complex SQL and PL/SQL analytical queries.
- Proven leadership in liaising with senior stakeholders and global cross-functional delivery teams.

---

## Official Application
Apply directly on the [Citi Careers Portal](https://jobs.citi.com/job/chennai/sap-cte-fieldglass-senior-business-analyst-avp/287/101736842464).`,
  },

  // ==========================================
  // 4. HACKATHONS
  // ==========================================
  {
    id: 'hack-sih-strategy',
    slug: 'smart-india-hackathon-sih-strategy',
    category: 'hackathons',
    title: 'Smart India Hackathon (SIH) Preparation Strategy',
    summary: 'Practical guide for SIH software and hardware editions: team formation rules, problem statement selection, and grand finale preparation.',
    difficulty: 'Team Contest (6 Members)',
    readTime: '13 min guide',
    publishedDate: '2026-01-15',
    updatedDate: '2026-03-20',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Ministry of Education & AICTE',
    sourceLocation: 'National Hackathon · India',
    actionText: 'View guide →',
    deadlineText: 'Annual national cycle',
    tags: ['SIH', 'Hackathon', 'Government of India', 'Innovation', 'Teamwork'],
    opportunity: {
      organization: 'Ministry of Education & AICTE, Government of India',
      role: 'Software Innovator / Team Lead',
      eligibility: 'Enrolled College Students in India (Mandatory 1 female member per team)',
      deadline: 'Annual National Calendar',
      location: 'Nodal Centers Across India',
      stipend: '₹1,00,000 Cash Prize per Problem Statement (Winners)',
      officialUrl: 'https://www.sih.gov.in/',
      isVerified: true,
    },
    content: `## The SIH Preparation Guide

Smart India Hackathon is a national open innovation initiative solving challenges for government ministries and industry leaders.

---

## 1. Team Rules
- Exactly 6 students with at least 1 female teammate.
- Balanced roles: 1 Lead/Presenter, 2 Backend developers, 2 Frontend engineers, 1 ML/IoT specialist.

---

## 2. Problem Statement Selection
- Prioritize high-impact ministry problem statements (Transportation, Healthcare, Agriculture, Space).
- Focus on feasibility and offline-first capabilities for rural use cases.

---

## 3. Grand Finale Tips
- Act on mentor feedback in Round 2 promptly.
- A functional deployed prototype wins over complex slideware every time.`,
  },
  {
    id: 'hack-sap-innovation-marathon',
    slug: 'sap-innovation-marathon-guide',
    category: 'hackathons',
    title: 'SAP Innovation Marathon: Architecture & Pitch Guide',
    summary: 'System architecture patterns and presentation strategies from an enterprise hackathon National Finalist.',
    difficulty: 'Enterprise Architecture',
    readTime: '11 min guide',
    publishedDate: '2026-02-10',
    updatedDate: '2026-03-22',
    author: 'Raju Perumalla',
    logoKey: 'sap',
    sourceName: 'SAP India',
    sourceLocation: 'National Enterprise Challenge',
    actionText: 'View guide →',
    deadlineText: 'Annual Innovation Marathon',
    tags: ['SAP', 'Enterprise Hackathon', 'Cloud', 'SAP BTP', 'Architecture'],
    opportunity: {
      organization: 'SAP India',
      role: 'Enterprise Hackathon Finalist',
      eligibility: 'Pre-Final & Final-Year Engineering Students',
      deadline: 'Annual Innovation Marathon Schedule',
      location: 'Hybrid / SAP Labs Bangalore',
      stipend: 'Recognition, Mentorship & Prizes',
      officialUrl: 'https://www.sap.com/',
      isVerified: true,
    },
    content: `## Engineering for Enterprise

Enterprise hackathons prioritize system resilience, data governance, and Clean Core architecture over superficial UI animations.

---

## 1. Clean Core Architecture
- Extensions reside on cloud platforms (e.g. SAP BTP) via public REST/OData APIs.
- Core enterprise transactional records remain untouched and clean.

---

## 2. Evaluation Criteria
1. **Feasibility at Scale**: Can the system support high-throughput telemetry?
2. **Fault Tolerance**: Offline buffers for intermittent network conditions.
3. **Data Security**: Signed payloads with TLS 1.3 encryption.`,
  },
  {
    id: 'hack-capgemini-tech-challenge',
    slug: 'capgemini-tech-challenge-handbook',
    category: 'hackathons',
    title: 'Capgemini Tech Challenge: Preparation from a Podium Winner',
    summary: 'Stage-by-stage preparation for aptitude screening, domain-specific coding rounds, and the 24-hour national grand finale.',
    difficulty: 'National Challenge',
    readTime: '10 min guide',
    publishedDate: '2026-02-20',
    updatedDate: '2026-03-25',
    author: 'Raju Perumalla',
    logoKey: 'capgemini',
    sourceName: 'Capgemini India',
    sourceLocation: 'National Tech Challenge',
    actionText: 'View guide →',
    deadlineText: 'Annual Tech Challenge Window',
    tags: ['Capgemini', 'Tech Challenge', 'Hackathon', 'Coding Competition'],
    opportunity: {
      organization: 'Capgemini India',
      role: 'National 2nd Runner-Up Winner',
      eligibility: 'Engineering & IT Students and Professionals',
      deadline: 'Annual Tech Challenge Window',
      location: 'Online Screening + Onsite Finale',
      stipend: 'Cash Prizes up to ₹15+ Lakhs',
      officialUrl: 'https://techchallenge.in.capgemini.com/',
      isVerified: true,
    },
    content: `## Capgemini Tech Challenge Strategy

Capgemini Tech Challenge is one of India's largest corporate tech competitions, with over 50,000+ engineers participating annually.

---

## 1. Round 1: Domain Aptitude
- Timed multiple-choice questions on system design, SQL indexes, and algorithmic time complexity.
- Accuracy is paramount; avoid guessing on negative-marking questions.

---

## 2. Round 2: Coding Challenge
- Solve practical algorithmic challenges under strict time bounds. Test corner cases (empty inputs, memory limit bounds).

---

## 3. Grand Finale Hackathon (24 Hours)
- Hour 0–3: Finalize API contracts, ER diagram, and wireframes.
- Hour 4–18: Parallel backend and frontend development.
- Hour 19–22: Integration and end-to-end testing on staging.
- Hour 23–24: Rehearse presentation and live demo.`,
  },

  // ==========================================
  // 5. FINAL-YEAR PROJECTS (CAPSTONE BLUEPRINTS)
  // ==========================================
  {
    id: 'proj-smartguardian',
    slug: 'smartguardian-ai-accident-prevention',
    category: 'final-year-projects',
    title: 'SmartGuardian: AI Accident Prevention & Telemetry System',
    summary: 'Complete capstone blueprint: MPU6050 accelerometer heuristics, computer vision driver drowsiness detection, and FastAPI cloud emergency dispatch.',
    difficulty: 'Hardware & Cloud Capstone',
    readTime: '16 min guide',
    publishedDate: '2026-01-08',
    updatedDate: '2026-03-20',
    author: 'Raju Perumalla',
    logoKey: 'smartguardian',
    sourceName: 'IoT & AI Capstone',
    sourceLocation: 'FastAPI · ESP32 · Computer Vision',
    actionText: 'View project guide →',
    deadlineText: 'Updated March 2026',
    tags: ['IoT', 'Computer Vision', 'FastAPI', 'Accident Detection', 'Capstone', 'Hardware'],
    projectSpec: {
      domain: 'Intelligent Transportation Systems & Edge AI',
      problemStatement: 'Over 1.3 million road accident fatalities occur globally each year. Delays in emergency response during the Golden Hour drastically increase mortality.',
      techStack: ['Python', 'FastAPI', 'OpenCV', 'ESP32', 'MPU6050', 'NEO-6M GPS', 'Flutter', 'PostgreSQL', 'Redis'],
      hardwareBOM: [
        'ESP32 Development Module',
        'MPU6050 6-Axis IMU (Accelerometer + Gyroscope)',
        'NEO-6M GPS Receiver Module',
        'ESP32-CAM or USB Camera for Eye-Aspect Ratio',
        'Piezo Buzzer & Indicator LEDs',
        '12V to 5V DC Buck Converter',
      ],
      difficultyLevel: 'Capstone Project',
    },
    content: `## Problem Formulation

In emergency medical logistics, the **Golden Hour** refers to the first 60 minutes after a vehicular collision. When accidents occur on highways, unconscious drivers cannot call for help.

SmartGuardian addresses this with two layers:
1. **Accident Prevention**: Monitors driver eye-aspect ratio (EAR) using edge computer vision to alert drowsy drivers.
2. **Accident Detection**: Analyzes G-force shock vectors and sudden velocity drops to instantly transmit GPS coordinates to emergency dispatchers.

---

## Crash Validation Algorithm

\`\`\`python
import math

def analyze_crash_signature(accel_x: float, accel_y: float, accel_z: float,
                            speed_before_kmh: float, speed_after_kmh: float) -> dict:
    total_g = math.sqrt(accel_x**2 + accel_y**2 + accel_z**2)
    speed_delta = speed_before_kmh - speed_after_kmh
    
    # Anomaly conditions: Deceleration > 35 km/h combined with severe G-shock (> 3.8G)
    is_confirmed_crash = total_g > 3.8 and speed_delta > 35.0
    
    return {
        "impact_g": round(total_g, 2),
        "speed_drop_kmh": round(speed_delta, 1),
        "trigger_rescue": is_confirmed_crash
    }
\`\`\``,
  },
  {
    id: 'proj-cipherdoc',
    slug: 'cipherdoc-tamper-proof-exam-distribution',
    category: 'final-year-projects',
    title: 'CipherDoc: Tamper-Proof Exam Distribution with Hybrid Cryptography',
    summary: 'Cryptographic architecture preventing academic paper leaks using time-locked digital envelopes, NTP synchronization, and in-memory decryption.',
    difficulty: 'Cybersecurity Capstone',
    readTime: '14 min guide',
    publishedDate: '2026-01-28',
    updatedDate: '2026-03-22',
    author: 'Raju Perumalla',
    logoKey: 'cipherdoc',
    sourceName: 'Applied Cryptography',
    sourceLocation: 'RSA-4096 · AES-GCM · Python',
    actionText: 'View project guide →',
    deadlineText: 'Updated March 2026',
    tags: ['Cybersecurity', 'Cryptography', 'RSA', 'AES', 'Security Architecture', 'Capstone'],
    projectSpec: {
      domain: 'Applied Cryptography & Data Security',
      problemStatement: 'Academic examination papers are vulnerable to illicit leaks during physical transit and unencrypted digital transmission across university branches.',
      techStack: ['Python', 'Cryptography (hazmat)', 'RSA-4096', 'AES-256-GCM', 'React 19', 'FastAPI', 'PostgreSQL'],
      hardwareBOM: ['Exam Center Decryption Workstation'],
      difficultyLevel: 'Capstone Project',
    },
    content: `## Threat Model & Architecture

CipherDoc eliminates transit leakage through **Hybrid Envelope Encryption**:
- The central board encrypts the exam PDF using an ephemeral AES-256-GCM session key.
- The AES key is encrypted with the authorized exam superintendent's RSA-4096 public key.
- Decryption is locked until a verified network time-window prior to exam commencement.

---

## Key Security Features
1. **Zero Plaintext on Disk**: Decrypted files exist only in volatile RAM streams (\`io.BytesIO\`).
2. **Authenticated AEAD Tag**: AES-256-GCM provides authenticated data integrity.
3. **Immutable Audit Trail**: Decryption attempts are cryptographically signed.`,
  },
  {
    id: 'proj-nutrixa',
    slug: 'nutrixa-ai-nutrition-prescription-analyzer',
    category: 'final-year-projects',
    title: 'Nutrixa: OCR-Based Prescription & Dietary Anomaly Detection',
    summary: 'Healthcare engineering project converting clinical prescriptions and food labels into dietary warnings using computer vision and NLP.',
    difficulty: 'Computer Vision Capstone',
    readTime: '13 min guide',
    publishedDate: '2026-02-18',
    updatedDate: '2026-03-24',
    author: 'Raju Perumalla',
    logoKey: 'nutrixa',
    sourceName: 'Healthcare AI',
    sourceLocation: 'OCR · Computer Vision · FastAPI',
    actionText: 'View project guide →',
    deadlineText: 'Updated March 2026',
    tags: ['Healthcare AI', 'OCR', 'Computer Vision', 'NLP', 'FastAPI', 'Capstone'],
    projectSpec: {
      domain: 'Computer Vision & Healthcare Informatics',
      problemStatement: 'Patients with chronic conditions frequently consume packaged foods containing contraindicated ingredients or conflicting drug formulations.',
      techStack: ['Python', 'Tesseract OCR', 'FastAPI', 'React', 'PostgreSQL', 'Scikit-learn'],
      hardwareBOM: ['Camera Device'],
      difficultyLevel: 'Capstone Project',
    },
    content: `## Pipeline & Architecture

Nutrixa parses physician prescriptions and food nutrition labels to flag dietary contraindications.

---

## Preprocessing Pipeline in Python

\`\`\`python
import cv2
import numpy as np

def preprocess_medical_label(image_path: str) -> np.ndarray:
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    denoised = cv2.bilateralFilter(gray, 9, 75, 75)
    binary = cv2.adaptiveThreshold(
        denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY, 11, 2
    )
    return binary
\`\`\``,
  },

  // ==========================================
  // 6. FREELANCING
  // ==========================================
  {
    id: 'free-landing-clients',
    slug: 'landing-first-freelance-client-student-guide',
    category: 'freelancing',
    title: 'Landing Your First Tech Freelance Client as a Student',
    summary: 'How to transition from zero commercial experience to paid freelance projects using proof-of-work repositories and targeted outreach.',
    difficulty: 'Beginner',
    readTime: '10 min read',
    publishedDate: '2026-01-14',
    updatedDate: '2026-03-16',
    author: 'Raju Perumalla',
    logoKey: 'github',
    sourceName: 'Freelance Playbook',
    sourceLocation: 'Client Acquisition Guide',
    actionText: 'Read guide →',
    deadlineText: 'Updated March 2026',
    tags: ['Freelancing', 'Client Acquisition', 'Portfolio', 'Career', 'Remote Work'],
    content: `## Proof of Work Over Resumes

Clients hire freelance developers who demonstrate they can solve business problems without hand-holding.

---

## 3-Step Inbound System
1. **Build a Living Portfolio**: Create 2 production-grade applications that solve real business problems.
2. **Record 60-Second Video Demos**: Send short video walkthroughs showing exactly how the application functions.
3. **Value-Add Cold Outreach**: Identify a specific friction point on a business website (e.g., slow mobile checkout) and propose a clean solution.`,
  },
  {
    id: 'free-pricing-contracts',
    slug: 'pricing-contracts-invoicing-for-freelancers',
    category: 'freelancing',
    title: 'Freelance Pricing, Scope Protection & Payment Security',
    summary: 'Avoid scope creep and non-payment: Milestone-based billing, 50% upfront deposits, and scope-of-work agreements.',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    publishedDate: '2026-02-08',
    updatedDate: '2026-03-18',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Contracts & Pricing',
    sourceLocation: 'Freelance Legal Basics',
    actionText: 'Read guide →',
    deadlineText: 'Updated March 2026',
    tags: ['Pricing', 'Contracts', 'Invoicing', 'Freelancing', 'Legal Basics'],
    content: `## The 50/25/25 Payment Rule

Never write code for a client without a secured deposit:
- **50% Upfront**: Non-refundable kickoff deposit before development starts.
- **25% at Staging Milestone**: When core features are working on private staging.
- **25% Final Payment**: Upon transferring repository ownership and production deployment.`,
  },

  // ==========================================
  // 7. REFERENCES
  // ==========================================
  {
    id: 'ref-react-docs',
    slug: 'react-modern-web-ecosystem-reference',
    category: 'references',
    title: 'Official React 19 & Web Standards Reference',
    summary: 'Curated collection of official documentation, component lifecycle specifications, and performance optimization guidelines.',
    difficulty: 'All Levels',
    readTime: '9 min read',
    publishedDate: '2026-01-25',
    updatedDate: '2026-03-22',
    author: 'Raju Perumalla',
    logoKey: 'react',
    sourceName: 'React.dev & MDN',
    sourceLocation: 'Official Web Standards',
    actionText: 'Open reference →',
    deadlineText: 'Updated March 2026',
    tags: ['React', 'Web Standards', 'MDN', 'Vite', 'Frontend'],
    referenceInfo: {
      primarySource: 'React.dev & MDN Web Docs',
      officialUrl: 'https://react.dev/',
      specification: 'ECMAScript & W3C Standards',
    },
    content: `## Authoritative References
- **React Official Docs**: [https://react.dev/](https://react.dev/)
- **MDN Web Docs**: [https://developer.mozilla.org/](https://developer.mozilla.org/)
- **Vite Build Tool**: [https://vite.dev/](https://vite.dev/)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)`,
  },
  {
    id: 'ref-fastapi-docs',
    slug: 'python-fastapi-backend-reference',
    category: 'references',
    title: 'High-Performance Python & FastAPI Backend Reference',
    summary: 'ASGI specifications, Pydantic v2 validation idioms, Uvicorn concurrency configuration, and connection pooling best practices.',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    publishedDate: '2026-02-12',
    updatedDate: '2026-03-24',
    author: 'Raju Perumalla',
    logoKey: 'python',
    sourceName: 'FastAPI Docs',
    sourceLocation: 'ASGI & REST APIs',
    actionText: 'Open reference →',
    deadlineText: 'Updated March 2026',
    tags: ['FastAPI', 'Python', 'ASGI', 'REST API', 'Backend Architecture'],
    referenceInfo: {
      primarySource: 'FastAPI & Pydantic Official Docs',
      officialUrl: 'https://fastapi.tiangolo.com/',
      specification: 'ASGI 3.0 / OpenAPI 3.1.0',
    },
    content: `## FastAPI References
- **FastAPI Documentation**: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
- **Pydantic Validation**: [https://docs.pydantic.dev/latest/](https://docs.pydantic.dev/latest/)
- **Uvicorn ASGI Server**: [https://www.uvicorn.org/](https://www.uvicorn.org/)`,
  },
  {
    id: 'ref-public-datasets',
    slug: 'verified-public-datasets-for-student-projects',
    category: 'references',
    title: 'Directory of Verified Public Datasets & Free APIs',
    summary: 'Reliable, rate-limit friendly APIs and research datasets covering transportation, weather telemetry, open government data, and computer vision.',
    difficulty: 'All Levels',
    readTime: '8 min read',
    publishedDate: '2026-02-25',
    updatedDate: '2026-03-26',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Open Data Repositories',
    sourceLocation: 'Kaggle & Gov Data',
    actionText: 'Open directory →',
    deadlineText: 'Updated March 2026',
    tags: ['Datasets', 'APIs', 'Open Data', 'Machine Learning', 'Research'],
    referenceInfo: {
      primarySource: 'Kaggle & Data.gov.in',
      officialUrl: 'https://kaggle.com/datasets',
      specification: 'Open Data Commons / RESTful APIs',
    },
    content: `## Reliable Datasets & Free APIs
- **Kaggle Datasets**: [https://www.kaggle.com/datasets](https://www.kaggle.com/datasets)
- **Hugging Face Datasets**: [https://huggingface.co/datasets](https://huggingface.co/datasets)
- **Open Government Data India**: [https://data.gov.in/](https://data.gov.in/)
- **Open-Meteo Weather API**: [https://open-meteo.com/](https://open-meteo.com/)`,
  },

  // ==========================================
  // 8. CAREER GUIDANCE
  // ==========================================
  {
    id: 'career-dsa-mastery',
    slug: 'technical-interview-dsa-mastery-plan',
    category: 'career-guidance',
    title: 'Technical Interview & DSA: 14 Core Algorithmic Patterns',
    summary: 'A structured preparation framework focusing on 14 recurring problem patterns rather than memorizing random solutions.',
    difficulty: 'Intermediate',
    readTime: '12 min read',
    publishedDate: '2026-01-16',
    updatedDate: '2026-03-18',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Placement Preparation',
    sourceLocation: 'Coding Interviews & DSA',
    actionText: 'View plan →',
    deadlineText: 'Updated March 2026',
    tags: ['DSA', 'Coding Interviews', 'Algorithms', 'Placement Preparation'],
    content: `## The 14 Essential Patterns
1. Two Pointers
2. Sliding Window
3. Fast & Slow Pointers (Floyd's Cycle)
4. Merge Intervals
5. Cyclic Sort
6. In-place Reversal of a LinkedList
7. Tree BFS & DFS
8. Two Heaps
9. Subsets & Backtracking
10. Modified Binary Search
11. Top K Elements
12. K-way Merge
13. 0/1 Knapsack & Dynamic Programming
14. Topological Sort`,
  },
  {
    id: 'career-swe-resume',
    slug: 'crafting-high-impact-swe-resume',
    category: 'career-guidance',
    title: 'Crafting a High-Impact Software Engineering Resume',
    summary: 'How to format student projects using the Google XYZ formula (Accomplished [X] measured by [Y] by doing [Z]) and pass ATS filters.',
    difficulty: 'All Levels',
    readTime: '9 min read',
    publishedDate: '2026-02-02',
    updatedDate: '2026-03-20',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Career Guidance',
    sourceLocation: 'ATS-Compliant Formatting',
    actionText: 'Read guide →',
    deadlineText: 'Updated March 2026',
    tags: ['Resume', 'ATS', 'Career Guidance', 'Campus Placements', 'Job Search'],
    content: `## The Google XYZ Formula

Structure project bullet points as:
> **Accomplished [X] as measured by [Y] by doing [Z]**

### Guidelines
- Single-page format only for university students
- Single-column layout for ATS parsing compatibility
- Clickable links to GitHub repositories and live deployments`,
  },
  {
    id: 'career-system-design',
    slug: 'system-design-essentials-for-freshers',
    category: 'career-guidance',
    title: 'System Design Essentials for Junior Engineering Interviews',
    summary: 'Core scalability principles: vertical vs horizontal scaling, the CAP theorem, Redis caching layers, and database sharding.',
    difficulty: 'Intermediate',
    readTime: '11 min read',
    publishedDate: '2026-02-22',
    updatedDate: '2026-03-25',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Software Architecture',
    sourceLocation: 'Scalability & System Design',
    actionText: 'Read guide →',
    deadlineText: 'Updated March 2026',
    tags: ['System Design', 'Scalability', 'Microservices', 'Redis', 'Architecture'],
    content: `## Foundational Concepts
- **Vertical vs Horizontal Scaling**: Adding resources to one machine vs distributing load across stateless instances.
- **The CAP Theorem**: Consistency, Availability, Partition Tolerance trade-offs.
- **Caching**: Cache-aside pattern with Redis to protect databases from read spikes.`,
  },

  // ==========================================
  // 9. DEVELOPER TOOLS
  // ==========================================
  {
    id: 'tools-github-pack',
    slug: 'github-student-developer-pack-guide',
    category: 'developer-tools',
    title: 'GitHub Student Developer Pack: Verification & Perks Guide',
    summary: 'Verification guide for university students to claim free GitHub Copilot, JetBrains, DigitalOcean, Azure, and domain subscriptions.',
    difficulty: 'All Enrolled Students',
    readTime: '9 min read',
    publishedDate: '2026-01-18',
    updatedDate: '2026-03-15',
    author: 'Raju Perumalla',
    logoKey: 'github',
    sourceName: 'GitHub Education',
    sourceLocation: 'Free Student Benefits',
    actionText: 'View perks guide →',
    deadlineText: 'Active while enrolled in college',
    tags: ['GitHub Education', 'Student Perks', 'Free Cloud', 'Developer Tools'],
    toolPerks: {
      provider: 'GitHub Education',
      eligibleAudience: 'Any student enrolled in a degree-granting course',
      estimatedValue: 'Free access to industry IDEs and cloud credits',
      officialUrl: 'https://education.github.com/pack',
      isVerified: true,
    },
    content: `## Unlocked Benefits
1. **GitHub Pro & GitHub Copilot**: Free AI code completion.
2. **JetBrains Educational Pack**: Full access to IntelliJ, PyCharm, WebStorm.
3. **Cloud Credits**: $200 DigitalOcean credit, $100 Azure student credit.
4. **Free Domain**: 1 free \`.me\` domain via Namecheap.

---

## Verification
Apply at [https://education.github.com/pack](https://education.github.com/pack) using an official college \`.edu\` or \`.ac.in\` email address or valid student ID card.`,
  },
  {
    id: 'tools-terminal-toolchain',
    slug: 'essential-modern-developer-terminal-toolchain',
    category: 'developer-tools',
    title: 'Modern Developer Toolchain: Terminal, Git CLI & Bruno',
    summary: 'Productivity setup with Git aliases, Ripgrep, FZF, and the open-source, Git-friendly Bruno API client.',
    difficulty: 'All Levels',
    readTime: '9 min read',
    publishedDate: '2026-02-14',
    updatedDate: '2026-03-20',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Developer Toolchain',
    sourceLocation: 'CLI & API Utilities',
    actionText: 'Open guide →',
    deadlineText: 'Updated March 2026',
    tags: ['Developer Tools', 'Git', 'Terminal', 'Docker', 'Productivity'],
    content: `## Key Tools
- **Bruno**: Fast, open-source API client storing collections as plain text in Git.
- **Ripgrep (\`rg\`)**: High-speed recursive code search.
- **Git Aliases**: \`git s\` (status), \`git co\` (checkout), \`git ci\` (commit).`,
  },
  {
    id: 'tools-ai-assisted-coding',
    slug: 'ai-assisted-coding-and-engineering-workflow',
    category: 'developer-tools',
    title: 'AI-Assisted Software Engineering Workflow & Guardrails',
    summary: 'How developers leverage AI tools for unit test generation, error explanations, and code reviews without leaking secrets or introducing bugs.',
    difficulty: 'All Levels',
    readTime: '10 min read',
    publishedDate: '2026-03-01',
    updatedDate: '2026-03-24',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Engineering Workflow',
    sourceLocation: 'AI Coding & Review Best Practices',
    actionText: 'Open guide →',
    deadlineText: 'Updated March 2026',
    tags: ['AI Tools', 'Productivity', 'Code Review', 'Prompt Engineering'],
    content: `## Best Practices
- Use AI for unit test boundary cases and regular expression generation.
- Never paste API secrets or private database credentials into web LLMs.
- Always review generated code for SQL injection risks and edge-case exceptions.`,
  },
];

// Helper Query Functions
export const getCategoryBySlug = (slug) => {
  return decodeCategories.find((cat) => cat.slug === slug || cat.id === slug);
};

export const getResourcesByCategory = (categorySlug) => {
  return decodeResources.filter((res) => res.category === categorySlug);
};

export const getResourceBySlug = (categorySlug, slug) => {
  const targetSlug = slug || categorySlug;
  const targetCategory = slug ? categorySlug : null;

  if (!targetSlug) return null;

  if (!targetCategory || targetCategory === 'all') {
    return decodeResources.find((res) => res.slug === targetSlug) || null;
  }

  return (
    decodeResources.find((res) => res.category === targetCategory && res.slug === targetSlug) ||
    decodeResources.find((res) => res.slug === targetSlug) ||
    null
  );
};

export const getFallbackResource = getResourceBySlug;

export const getFeaturedResources = () => {
  const featuredIds = [
    'proj-smartguardian',
    'job-gsoc',
    'rm-full-stack',
    'hack-sih-strategy',
    'sm-python-programming',
    'tools-github-pack',
  ];
  return decodeResources.filter((r) => featuredIds.includes(r.id));
};

export const getRecentResources = (limit = 6) => {
  return [...decodeResources]
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    .slice(0, limit);
};

export const searchDecode = (query = '', categoryFilter = 'all') => {
  const cleanQ = query.trim().toLowerCase();
  return decodeResources.filter((res) => {
    const matchesCategory =
      categoryFilter === 'all' || res.category === categoryFilter;
    if (!cleanQ) return matchesCategory;

    const matchesTitle = res.title.toLowerCase().includes(cleanQ);
    const matchesSummary = res.summary.toLowerCase().includes(cleanQ);
    const matchesTags = res.tags.some((t) => t.toLowerCase().includes(cleanQ));
    const matchesSource = res.sourceName?.toLowerCase().includes(cleanQ);

    return matchesCategory && (matchesTitle || matchesSummary || matchesTags || matchesSource);
  });
};

/**
 * Determine if a job listing has expired using reliable UTC deadline & freshness policy.
 */
export const isJobExpired = (resource, referenceTime = null) => {
  if (!resource || resource.category !== 'jobs') return false;

  // 1. Explicit status check
  if (resource.status === 'expired' || resource.status === 'closed' || resource.status === 'flagged_for_review') {
    return true;
  }

  const now = referenceTime ? new Date(referenceTime) : new Date();

  // 2. Fixed deadline check (evaluated at end of day UTC)
  const deadlineStr = resource.applicationDeadline || resource.application_deadline || resource.opportunity?.deadline;
  if (deadlineStr) {
    const trimmed = String(deadlineStr).trim();
    // Check if fixed date format
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
      const deadlineDate = new Date(trimmed.length === 10 ? `${trimmed}T23:59:59.999Z` : trimmed);
      if (!isNaN(deadlineDate.getTime()) && deadlineDate.getTime() < now.getTime()) {
        return true;
      }
    }
  }

  // 3. Freshness window check for undated listings (45 days)
  if (!deadlineStr || String(deadlineStr).toLowerCase().includes('rolling')) {
    const pubDateStr = resource.lastVerifiedAt || resource.last_verified_at || resource.updatedDate || resource.publishedDate;
    if (pubDateStr) {
      const pubDate = new Date(pubDateStr);
      if (!isNaN(pubDate.getTime())) {
        const ageDays = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays > 45) {
          return true; // Exceeded freshness window without re-verification
        }
      }
    }
  }

  return false;
};

/**
 * Formats batch eligibility array into human-readable label
 */
export const getBatchLabel = (batches) => {
  if (!Array.isArray(batches) || batches.length === 0) {
    return 'Unknown (Check Source)';
  }
  const sorted = [...batches].map(Number).sort();
  if (sorted.includes(2026) && sorted.includes(2027)) {
    return '2026 & 2027 Batches';
  }
  if (sorted.includes(2026)) return '2026 Batch';
  if (sorted.includes(2027)) return '2027 Batch';
  return `${sorted.join(', ')} Batch`;
};

/**
 * Filter jobs by batch (2026 / 2027), opportunity type, work mode, stipend, and query
 */
export const filterActiveJobs = (resources, filters = {}) => {
  const {
    batch = 'all',
    type = 'all',
    mode = 'all',
    stipend = 'all',
    query = '',
    includeExpired = false,
  } = filters;

  const now = new Date();

  return resources
    .filter((res) => res.category === 'jobs')
    .filter((res) => {
      // Expiry filter
      if (!includeExpired && isJobExpired(res, now)) {
        return false;
      }

      // Batch filter
      if (batch && batch !== 'all') {
        const target = parseInt(batch, 10);
        const batches = res.eligibleBatches || res.opportunity?.eligibleBatches || [];
        if (!batches.includes(target)) {
          return false;
        }
      }

      // Type filter (Internship / Full-time / Graduate Trainee)
      if (type && type !== 'all') {
        const oppType = (res.opportunityType || res.opportunity?.jobType || '').toLowerCase();
        if (!oppType.includes(type.toLowerCase())) {
          return false;
        }
      }

      // Work mode filter (Remote / Hybrid / On-site)
      if (mode && mode !== 'all') {
        const workArr = (res.workArrangement || res.opportunity?.workMode || '').toLowerCase();
        if (!workArr.includes(mode.toLowerCase())) {
          return false;
        }
      }

      // Stipend filter
      if (stipend === 'paid') {
        const stText = (res.stipendAmount || res.opportunity?.stipend || '').toLowerCase();
        if (stText.includes('unpaid') || stText.includes('voluntary')) {
          return false;
        }
      }

      // Query filter
      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        const title = (res.title || '').toLowerCase();
        const org = (res.sourceName || res.opportunity?.organization || '').toLowerCase();
        const tags = Array.isArray(res.tags) ? res.tags.join(' ').toLowerCase() : '';
        const summary = (res.summary || '').toLowerCase();
        if (!title.includes(q) && !org.includes(q) && !tags.includes(q) && !summary.includes(q)) {
          return false;
        }
      }

      return true;
    });
};

