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
  // 3. JOBS & INTERNSHIPS (VERIFIED)
  // ==========================================
  {
    id: 'job-clearview-data-analyst',
    slug: 'clearview-healthcare-data-analyst-advanced-analytics',
    category: 'jobs',
    title: 'Data Analyst - Advanced Analytics',
    summary: 'Analytics and statistical modelling for life sciences strategy, clinical dataset synthesis, and data-driven consulting engagements.',
    difficulty: 'Entry Level / 0-2 Years',
    readTime: '6 min read',
    publishedDate: '4 months ago',
    updatedDate: '2026-03-20',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'ClearView Healthcare Partners',
    sourceLocation: 'Gurgaon, Haryana, India',
    actionText: 'Apply →',
    deadlineText: 'Actively recruiting candidates',
    tags: ['Data Analytics', 'Python', 'SQL', 'Healthcare', 'Consulting'],
    opportunity: {
      organization: 'ClearView Healthcare Partners',
      role: 'Data Analyst - Advanced Analytics',
      eligibility: 'B.Tech / B.E / B.Sc in CS, IT, Data Science or quantitative fields',
      deadline: 'Rolling applications',
      location: 'Gurgaon, Haryana, India',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      applicantsCount: 'Over 100 people clicked apply',
      responseText: 'Responses managed off LinkedIn',
      stipend: 'Competitive industry compensation',
      officialUrl: 'https://www.clearviewhcp.com/careers/',
      isVerified: true,
    },
    content: `## Position Summary

ClearView Healthcare Partners is a premier life sciences strategy consulting firm. The Advanced Analytics team leverages real-world clinical datasets, statistical modeling, and data engineering to inform biopharma commercialization, market access, and clinical asset development.

---

## Core Responsibilities
- Analyze complex healthcare and claims datasets using Python, SQL, and R.
- Build predictive algorithms and interactive executive dashboards for pharmaceutical decision-makers.
- Collaborate with multidisciplinary strategy consultants to synthesize clinical insights.

---

## Candidate Qualifications
- Proficiency in Python (Pandas, NumPy, Scikit-learn) and relational SQL queries.
- Strong quantitative foundation in statistical hypothesis testing and data storytelling.
- Bachelor's or Master's degree in Computer Science, Data Science, Bioinformatics, or Engineering.

---

## Official Application
Apply directly through the [ClearView Healthcare Partners Careers Portal](https://www.clearviewhcp.com/careers/).`,
  },
  {
    id: 'job-gsoc',
    slug: 'google-summer-of-code-internship-guide',
    category: 'jobs',
    title: 'Google Summer of Code (GSoC) Internship Program',
    summary: 'Stipend-backed international open-source internship program. Learn eligibility criteria, proposal drafting, timeline, and mentor outreach.',
    difficulty: 'Open to College Students',
    readTime: '10 min guide',
    publishedDate: '1 month ago',
    updatedDate: '2026-03-10',
    author: 'Raju Perumalla',
    logoKey: 'google',
    sourceName: 'Google Open Source',
    sourceLocation: 'Remote · Global',
    actionText: 'Apply →',
    deadlineText: 'Annual March-April proposal window',
    tags: ['GSoC', 'Google', 'Internship', 'Open Source', 'Remote', 'Stipend'],
    opportunity: {
      organization: 'Google Open Source',
      role: 'Open Source Contributor Intern',
      eligibility: 'College Students & Beginners (18+)',
      deadline: 'Annual March-April Proposal Window',
      location: 'Remote · Global',
      workMode: 'Remote',
      jobType: 'Internship',
      applicantsCount: 'Over 5,000 students apply annually',
      responseText: 'Direct Google Open Source Portal',
      stipend: 'Stipend provided based on contributor country purchasing power',
      officialUrl: 'https://summerofcode.withgoogle.com/',
      isVerified: true,
    },
    content: `## Program Overview

Google Summer of Code is a global, online program bringing student contributors into open source software development. Contributors work with open source organizations on a 12+ week programming project under the guidance of industry mentors.

---

## Key Details
- **Organizer**: Google LLC (Open Source Programs Office)
- **Mode**: 100% Remote
- **Stipend**: Financial stipend disbursed upon milestone evaluations
- **Eligibility**: Any enrolled student or beginner (18+)

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
    difficulty: 'Pre-Final / Final Year Students',
    readTime: '7 min read',
    publishedDate: '2 weeks ago',
    updatedDate: '2026-03-25',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Microsoft',
    sourceLocation: 'Hyderabad / Bangalore, India',
    actionText: 'Apply →',
    deadlineText: 'Rolling campus intake',
    tags: ['Microsoft', 'Azure', 'C++', 'Python', 'Cloud', 'Internship'],
    opportunity: {
      organization: 'Microsoft',
      role: 'Software Engineering Intern',
      eligibility: 'Enrolled B.Tech / M.Tech in Computer Science or related branches',
      deadline: 'Rolling Campus Intake 2026',
      location: 'Hyderabad / Bangalore, India',
      workMode: 'Hybrid',
      jobType: 'Internship',
      applicantsCount: 'Over 350 people clicked apply',
      responseText: 'Direct Microsoft Careers Portal',
      stipend: 'Monthly internship stipend with housing assistance',
      officialUrl: 'https://careers.microsoft.com/',
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
    difficulty: 'Intermediate to Advanced',
    readTime: '9 min guide',
    publishedDate: '3 weeks ago',
    updatedDate: '2026-03-12',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'The Linux Foundation',
    sourceLocation: 'Remote · Global',
    actionText: 'Apply →',
    deadlineText: 'Spring, Summer & Fall cohorts',
    tags: ['Linux Foundation', 'LFX', 'Kubernetes', 'Cloud Native', 'Internship'],
    opportunity: {
      organization: 'The Linux Foundation',
      role: 'Software Engineering Mentee',
      eligibility: 'University Students & Early-Career Developers',
      deadline: 'Three Cohorts Annually (Spring, Summer, Fall)',
      location: 'Remote · Global',
      workMode: 'Remote',
      jobType: 'Internship',
      applicantsCount: 'Over 1,200 applicants last cohort',
      responseText: 'Official Linux Foundation Portal',
      stipend: 'Funded Stipend per Mentorship Term',
      officialUrl: 'https://lfx.linuxfoundation.org/tools/mentorship/',
      isVerified: true,
    },
    content: `## Program Structure

The Linux Foundation Mentorship program provides paid, remote internships for developers to work directly with core maintainers of global infrastructure projects like Kubernetes, Hyperledger, and the Linux kernel.

---

## Cohorts
- **Spring**: March – May
- **Summer**: June – August
- **Fall**: September – November

---

## How to Apply
1. Browse active projects on the LFX platform.
2. Complete any prerequisite code challenges or issue submissions.
3. Submit your application and resume.

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
    difficulty: 'Intermediate',
    readTime: '8 min guide',
    publishedDate: '1 month ago',
    updatedDate: '2026-03-15',
    author: 'Raju Perumalla',
    logoKey: null,
    sourceName: 'Major League Hacking',
    sourceLocation: 'Remote · Global',
    actionText: 'Apply →',
    deadlineText: 'Rolling applications',
    tags: ['MLH Fellowship', 'Internship', 'Open Source', 'Software Engineering'],
    opportunity: {
      organization: 'Major League Hacking',
      role: 'Software Engineering Fellow',
      eligibility: 'Enrolled College Students & Recent Graduates',
      deadline: 'Rolling Admissions for Upcoming Batches',
      location: 'Remote · Global',
      workMode: 'Remote',
      jobType: 'Fellowship',
      applicantsCount: 'Over 3,000 applicants per batch',
      responseText: 'Direct MLH Application Portal',
      stipend: 'Need-based Educational Stipend Available',
      officialUrl: 'https://fellowship.mlh.io/',
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
