// Project data sourced directly from the original portfolio codebase
// Tech stacks are accurate — no assumptions

export const projects = [

  // ─── DEPLOYED / BUILT ──────────────────────────────────────────────────────

  {
    id: "quarantine",
    caseNo: "CASE-Q1",
    name: "Quarantine",
    status: "ACTIVE",
    classification: "FLAGSHIP",
    tech: ["Python", "Docker", "KVM", "YARA", "EMBER", "Flask", "SQLite"],
    problem:
      "Analyzing malicious Windows binaries safely requires complete environment isolation to prevent infection breakout, combined with multi-stage evaluation (static signature matching, dynamic behavior observation, and ML scoring) to ensure high detection accuracy.",
    description:
      "A malware analysis and detection platform featuring isolated analysis environments. Leverages KVM hypervisors and Docker containers to run files securely, performing static PE parsing, dynamic analysis, and ML-based detection to return a detailed classification verdict.",
    architecture:
      "Multi-tier security architecture. Utilizes Docker containers and KVM virtual machines for safe sandboxed execution of Windows executables. Integrates EMBER Random Forest classifiers for ML-based scoring, YARA for static signature scanning, and Flask for backend API routing and reporting.",
    skills: ["Malware Analysis", "Sandbox Isolation", "Virtualization (KVM)", "Docker", "Machine Learning (EMBER)", "YARA Rules"],
    github: "https://github.com/mishu1507/Quarantine",
    live: null,
    pinColor: "red",
    rotation: -1.8,
  },

  {
    id: "authenti-hire",
    caseNo: "CASE-AH1",
    name: "AuthentiHire",
    status: "ACTIVE",
    classification: "FLAGSHIP",
    tech: ["Python", "Flask", "Vercel", "Tailwind CSS", "HTML", "JavaScript", "AI APIs"],
    problem:
      "Online recruitment is plagued by fake internships, phishing job offers, and fraudulent hiring postings that exploit job seekers. Spotting these scams requires real-time intelligence and automated analysis of job posting patterns.",
    description:
      "An AI-powered job and internship fraud detection platform. Analyzes job details, posting channels, and employer credentials using custom rules and AI models to assign a risk score and alert job seekers to potential employment scams.",
    architecture:
      "Full-stack web application with a Flask-based detection engine and a Vercel-deployed serverless frontend. Integrates custom text classifiers and AI APIs to analyze text structure, contact information, and domain authenticity.",
    skills: ["Job Fraud Detection", "Natural Language Processing", "AI Integration", "Web Application Security", "Serverless Deployment"],
    github: "https://github.com/mishu1507/AuthentiHire",
    live: "https://authenti-hire.vercel.app/",
    pinColor: "yellow",
    rotation: 1.4,
  },

  {
    id: "forensic-lens",
    caseNo: "CASE-FL2",
    name: "ForensicLens V2",
    status: "ACTIVE",
    classification: "FLAGSHIP",
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    problem:
      "Digital forensic investigations lack structured frameworks for log analysis, event correlation, and attack timeline reconstruction. Most tools detect attacks but fail to explain attacker behavior or model end-to-end investigation workflows used in Security Operations Centers.",
    description:
      "Modular investigation framework with pipeline architecture: log ingestion → event normalization → behavioral correlation engine → timeline reconstruction → structured report generation. Each module operates independently but feeds into a unified investigation dashboard.",
    architecture:
      "Microservice-inspired architecture with dedicated modules for log parsing, event correlation using temporal and behavioral analysis, and visual timeline reconstruction. Graph-based approach to map relationships between security events.",
    skills: ["Cybersecurity", "Log Analysis", "Incident Response Modeling", "Backend Architecture", "Behavioral Correlation"],
    github: "https://github.com/mishu1507/ForensicLens",
    live: "https://forensiclens.vercel.app/",
    pinColor: "red",
    rotation: -2.5,
  },

  {
    id: "mernverse-os",
    caseNo: "CASE-MV1",
    name: "MERNVerseOS",
    status: "ACTIVE",
    classification: "FLAGSHIP",
    tech: ["React", "Tailwind CSS", "Vercel"],
    problem:
      "Learning system architecture concepts through theory alone is ineffective. Engineers need simulation-based environments to understand how frontend, backend, and infrastructure components interact as a connected ecosystem.",
    description:
      "OS-like simulation environment that visualizes real software engineering workflows. Models how system components interact, helping learners understand architecture as a connected ecosystem rather than isolated tutorials.",
    architecture:
      "Single-page application with OS-simulation layer built on React. Implements virtual filesystem, process manager, and task scheduler components. Uses state machines to manage application lifecycle.",
    skills: ["Full-Stack Development", "System Design", "Educational Engineering", "State Machines", "Architecture Abstraction"],
    github: "https://github.com/mishu1507/MernVerseOS",
    live: "https://mernverseos.vercel.app/",
    pinColor: "yellow",
    rotation: 1.8,
  },

  {
    id: "brainsparkz",
    caseNo: "CASE-BS1",
    name: "BrainSparkz",
    status: "ACTIVE",
    classification: "FLAGSHIP",
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS"],
    problem:
      "Traditional learning platforms focus on content delivery rather than cognitive development. They fail to engage users in analytical reasoning through interactive, gamified experiences that actually improve thinking ability.",
    description:
      "Gamified learning engine with progressive difficulty scaling, real-time feedback loops, and cognitive challenge modules. Explores how engagement and game mechanics can enhance technical learning outcomes.",
    architecture:
      "Full-stack Flask application with SQLite database engine. Implements modular cognitive challenge logic and user progress analytics. Python for backend processing and session management.",
    skills: ["Full-Stack Development", "Backend Integration", "UX Design", "Database Management", "Gamification"],
    github: "https://github.com/mishu1507",
    live: "https://brainsparkz.onrender.com/",
    pinColor: "red",
    rotation: -1.2,
  },

  {
    id: "screenshot-action-ai",
    caseNo: "CASE-SAI",
    name: "Screenshot_Action_AI",
    status: "ACTIVE",
    classification: "EXPERIMENTAL",
    tech: ["Python", "AI APIs", "Image Processing", "Automation"],
    problem:
      "Traditional UI interactions require manual navigation. Users spend time decoding what's on screen instead of acting on it. No bridge between visual context and executable workflows.",
    description:
      "Intelligent automation tool that interprets screenshots and generates actionable insights using AI. Screenshot → AI detects intent → suggests actions. Transforms visual inputs into executable workflows.",
    architecture:
      "AI pipeline combining image analysis with context-aware action generation. Interprets screen content (error screenshots → debugging suggestions, dashboards → anomaly detection).",
    skills: ["AI Integration", "Automation Thinking", "UX Innovation", "Human-Computer Interaction"],
    github: "https://github.com/mishu1507",
    live: null,
    pinColor: "yellow",
    rotation: 2.3,
  },

  {
    id: "help-you-study",
    caseNo: "CASE-HYS",
    name: "HelpYouStudy",
    status: "CLOSED",
    classification: "UTILITY",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    problem:
      "Students struggle with organizing study workflows. Most solutions treat studying as a motivation problem rather than a system problem that can be optimized through structured planning.",
    description:
      "Productivity-focused platform to help students organize study sessions, manage learning workflows, and maintain structured academic progress. Emphasizes clarity, planning, and efficiency.",
    architecture:
      "Web application with local-first data storage, task scheduling engine, and study session analytics dashboard.",
    skills: ["Web Development", "UX Thinking", "Problem Modeling", "Workflow Design"],
    github: "https://github.com/mishu1507",
    live: null,
    pinColor: "red",
    rotation: -0.8,
  },

  {
    id: "zip-unzip",
    caseNo: "CASE-ZU1",
    name: "Zip_Unzip",
    status: "CLOSED",
    classification: "UTILITY",
    tech: ["Python", "File I/O", "Compression Algorithms"],
    problem:
      "Understanding file compression algorithms and system-level I/O operations requires hands-on implementation.",
    description:
      "Lightweight file compression and decompression utility exploring how operating systems manage files and data packaging through scripting logic and command-line workflows.",
    architecture:
      "Command-line utility with modular compression/decompression engines. Implements buffered I/O for handling large files and explores automation fundamentals in system-level operations.",
    skills: ["Python", "File Systems", "Automation Logic", "System Programming"],
    github: "https://github.com/mishu1507",
    live: null,
    pinColor: "yellow",
    rotation: 1.5,
  },

  // ─── CONCEPTS / IN PROGRESS ────────────────────────────────────────────────

  {
    id: "threat-scope",
    caseNo: "CASE-TS1",
    name: "ThreatScope",
    status: "CONCEPT",
    classification: "FLAGSHIP",
    tech: ["React", "D3.js", "Python", "Graph Database"],
    problem:
      "Security tools show alerts and logs, but rarely tell the story of an attack. Analysts need visual attack path reconstruction.",
    description:
      "Platform that converts raw security logs into interactive visual attack paths — parsing logs, building attacker journey graphs, visualizing lateral movement, and highlighting compromised nodes.",
    architecture:
      "Graph-based visualization engine with log parsing pipeline, attacker behavior modeling, and interactive node-link diagrams showing the full attack narrative.",
    skills: ["Graph Visualization", "Security Analytics", "Data Modeling", "Attack Storytelling"],
    github: "https://github.com/mishu1507",
    live: null,
    pinColor: "red",
    rotation: -2.1,
  },

  {
    id: "prompt-shield",
    caseNo: "CASE-PS1",
    name: "PromptShield",
    status: "CONCEPT",
    classification: "EXPERIMENTAL",
    tech: ["Python", "AI APIs", "Security Testing"],
    problem:
      "AI systems are increasingly vulnerable to prompt injection and unsafe outputs. There's a need for tools that test AI prompts for security vulnerabilities.",
    description:
      "AI security testing toolkit that runs prompt attack simulations, scores output risk levels, and performs AI safety checks — combining cybersecurity investigation with modern AI security.",
    architecture:
      "Testing pipeline with prompt injection simulation engine, output risk scoring module, and AI safety validation framework.",
    skills: ["AI Security", "Prompt Engineering", "Risk Assessment", "Security Testing"],
    github: "https://github.com/mishu1507/PromptShield",
    live: null,
    pinColor: "yellow",
    rotation: 1.2,
  },

  {
    id: "system-mapper",
    caseNo: "CASE-SM1",
    name: "SystemMapper",
    status: "CONCEPT",
    classification: "STANDARD",
    tech: ["Python", "AST Parsing", "D3.js", "Graph Algorithms"],
    problem:
      "Understanding a project's architecture requires manual documentation that quickly becomes outdated. Developers need automated architecture visualization from their actual codebase.",
    description:
      "Upload a project → auto-generate system architecture diagram. Analyzes repository structure, dependency mapping, and component relationships to produce visual architecture documentation.",
    architecture:
      "Code analysis pipeline with repo parser, dependency graph builder, and auto-generated architecture diagram renderer. Extension of MERNVerseOS philosophy — explaining systems automatically.",
    skills: ["Architecture Analysis", "Code Parsing", "Visualization", "Developer Tools"],
    github: "https://github.com/mishu1507/SystemMapper",
    live: null,
    pinColor: "red",
    rotation: -1.5,
  },

  {
    id: "auto-soc-lite",
    caseNo: "CASE-SOC",
    name: "AutoSOC Lite",
    status: "CONCEPT",
    classification: "FLAGSHIP",
    tech: ["React", "Node.js", "WebSockets", "Simulation Engine"],
    problem:
      "Students learning cybersecurity rarely get hands-on SOC experience. There's no accessible way to simulate real Security Operations Center workflows.",
    description:
      "Mini Security Operations Center simulator where alerts appear and users investigate incidents — implementing severity scoring, investigation workflows, and incident closure procedures.",
    architecture:
      "Dashboard-based simulation with alert generation engine, severity scoring system, guided investigation workflow, and incident lifecycle management.",
    skills: ["SOC Operations", "Alert Investigation", "Incident Management", "Security Simulation"],
    github: "https://github.com/mishu1507",
    live: null,
    pinColor: "yellow",
    rotation: 2.0,
  },

  {
    id: "log-mind",
    caseNo: "CASE-LM1",
    name: "LogMind",
    status: "CONCEPT",
    classification: "STANDARD",
    tech: ["Python", "AI APIs", "Log Parsing", "NLP"],
    problem:
      "Reading and interpreting security logs requires expertise most students and junior analysts lack. No accessible tool explains what happened, why it happened, and the risk level.",
    description:
      "AI log explanation assistant — paste logs → AI explains what happened, why it happened, and assigns a risk level. Perfect companion to ForensicLens.",
    architecture:
      "AI-powered log analysis pipeline with natural language explanation engine, risk classification module, and contextual incident narrative generator.",
    skills: ["AI Integration", "Log Analysis", "Natural Language Generation", "Risk Assessment"],
    github: "https://github.com/mishu1507",
    live: null,
    pinColor: "red",
    rotation: -2.8,
  },
];

// Position grid for folders on the board
// 4-column layout: 265px column pitch, 300px row pitch
// Left margin 60px, first row starts at 360px from top
export const FOLDER_POSITIONS = [
  { top: 660, left:  60 },   // 0 Quarantine
  { top: 660, left: 325 },   // 1 AuthentiHire
  { top: 660, left: 590 },   // 2 ForensicLens V2
  { top: 960, left:  60 },   // 3 MERNVerseOS
  { top: 960, left: 325 },   // 4 BrainSparkz
  { top: 960, left: 590 },   // 5 Screenshot_Action_AI
  { top: 1260, left:  60 },  // 6 HelpYouStudy
  { top: 1260, left: 325 },  // 7 Zip_Unzip
  { top: 1260, left: 590 },  // 8 ThreatScope
  { top: 1560, left:  60 },  // 9 PromptShield
  { top: 1560, left: 325 },  // 10 SystemMapper
  { top: 1560, left: 590 },  // 11 AutoSOC Lite
  { top: 1860, left:  60 },  // 12 LogMind
];
