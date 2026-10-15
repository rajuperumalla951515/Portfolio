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

