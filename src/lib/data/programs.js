export const PROGRAMS = {
	"ai-agents": {
		about: "Students design AI-powered workflows and autonomous agents capable of completing business tasks — from agent architecture and APIs to RAG, deployment and cost control. Live labs, assignments, quizzes, capstone and final exam are part of the certification path.",
		audience: "Tech + Business",
		certName: "AI Agents & Workflow Automation",
		curriculum: [
			{
				detail: "Assistants vs agents, agent architecture and workflows. Goals, instructions, memory, tools, actions, reasoning, human approval and multi-agent systems.",
				title: "AI Agents Fundamentals",
				week: "Module 1",
			},
			{
				detail: "n8n, Make and Zapier — workflow design, triggers, actions, conditions, filters and variables. Scheduled and webhook triggers, branching, data transformation and error handling.",
				title: "Workflow Automation",
				week: "Module 2",
			},
			{
				detail: "REST APIs, HTTP methods, authentication, JSON and webhooks. GET/POST/PUT/DELETE, headers, API keys, request bodies and responses.",
				title: "APIs and Webhooks",
				week: "Module 3",
			},
			{
				detail: "OpenAI, Gemini and Claude APIs — model selection, prompt input, structured output, cost optimisation, token and context management.",
				title: "Connecting AI Models",
				week: "Module 4",
			},
			{
				detail: "Email, CRM, lead management, support, HR and marketing automation — lead enrichment, follow-ups, ticket classification, meeting summaries and content generation.",
				title: "Business Automation",
				week: "Module 5",
			},
			{
				detail: "RAG fundamentals, knowledge bases, document retrieval and vector databases — ingestion, embeddings, search, retrieval and context injection.",
				title: "Knowledge-Based AI Agents",
				week: "Module 6",
			},
			{
				detail: "Testing, monitoring, security, deployment and cost management for production agents.",
				title: "Agent Deployment",
				week: "Module 7",
			},
			{
				detail: "Accept queries, search company knowledge, generate answers, categorise issues, escalate, store interactions and trigger emails. Alternatives: Sales, Recruitment, Placement or Lead Qualification agents.",
				title: "Build an AI Customer Support Agent",
				week: "Capstone",
			},
			{
				detail: "AI agents, APIs, automation workflows, webhooks, RAG, agent design, business automation and scenario-based workflow building.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 5,
		duration: "7 modules",
		format: "Live + labs + exam",
		icon: "AG",
		level: "Intermediate",
		outcomes: [
			"Understand AI agent architecture and when agents beat simple automation",
			"Build workflow automations with triggers, actions and conditions",
			"Connect APIs, webhooks and AI models to business applications",
			"Build conversational and knowledge-based agents with RAG",
			"Create automated business processes for sales, support and ops",
			"Test, monitor, secure and deploy agents responsibly",
		],
		projects: [
			{
				desc: "An agent that gathers, verifies and summarises information autonomously.",
				title: "Research agent",
			},
			{
				desc: "Automated inbound lead enrichment, scoring and routing.",
				title: "Lead qualification flow",
			},
			{
				desc: "Classifies requests and drafts contextual responses.",
				title: "Support triage agent",
			},
			{
				desc: "Capstone agent with knowledge search, escalation and notifications.",
				title: "AI Customer Support Agent",
			},
		],
		roles: [
			"AI Automation Engineer",
			"AI Solutions Associate",
			"Workflow Automation Specialist",
			"RevOps / BizOps Analyst",
			"Technical AI Consultant",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Build practical AI agents, automations and end-to-end workflows through live projects and earn a verified AI automation certificate.",
			keywords: [
				"AI agents course",
				"AI automation course",
				"workflow automation certification",
				"agentic AI",
			],
			title: "AI Agents & Automation Certification | LetsUpgrade",
		},
		tagline:
			"Wire tools together so the work happens without you. Ship an agent that runs a real business workflow end to end.",
		title: "AI Agents & Automation",
		tools: [
			"n8n",
			"Make",
			"Zapier",
			"OpenAI API",
			"Gemini API",
			"Claude API",
		],
		whoFor: [
			"Tech students and developers moving into AI engineering",
			"Business and ops professionals drowning in manual processes",
			"Founders wanting to automate before they hire",
			"Anyone who finished a GenAI course and wants the next level",
		],
	},

	"cloud-devops": {
		about: "Students learn how applications are developed, deployed and maintained with modern cloud and DevOps practices — Linux, Git, cloud infrastructure, Docker, CI/CD and monitoring. Capstone: deploy a production web application with pipeline and health checks.",
		audience: "Tech",
		certName: "Cloud & DevOps",
		curriculum: [
			{
				detail: "Linux architecture, terminal, files and processes — ls, cd, mkdir, chmod, grep, ps, top and package management.",
				title: "Linux Fundamentals",
				week: "Module 1",
			},
			{
				detail: "Version control, repositories, commits, branches, merges and pull requests.",
				title: "Git & GitHub",
				week: "Module 2",
			},
			{
				detail: "Cloud fundamentals, IaaS, PaaS and SaaS across AWS, Azure and Google Cloud.",
				title: "Cloud Computing",
				week: "Module 3",
			},
			{
				detail: "Virtual machines, storage, networking, IAM and databases.",
				title: "Cloud Infrastructure",
				week: "Module 4",
			},
			{
				detail: "Containers, images, Dockerfile and Docker Hub.",
				title: "Docker",
				week: "Module 5",
			},
			{
				detail: "Continuous Integration, Continuous Delivery and automated deployment with GitHub Actions and Jenkins fundamentals.",
				title: "CI/CD",
				week: "Module 6",
			},
			{
				detail: "Logging, monitoring, uptime and application health.",
				title: "Infrastructure and Monitoring",
				week: "Module 7",
			},
			{
				detail: "DevOps lifecycle, automation, collaboration and an introduction to Infrastructure as Code.",
				title: "DevOps Practices",
				week: "Module 8",
			},
			{
				detail: "Host code on GitHub, containerise, deploy to cloud, configure CI/CD and environment variables, and monitor application health.",
				title: "Deploy a Production Web Application",
				week: "Capstone",
			},
			{
				detail: "Linux, Git, cloud, AWS/Azure concepts, Docker, CI/CD, deployment and DevOps practices.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 3,
		duration: "8 modules",
		format: "Live + labs + exam",
		icon: "CD",
		level: "Beginner to intermediate",
		outcomes: [
			"Use Linux fundamentals for day-to-day engineering work",
			"Use Git and GitHub for version control and collaboration",
			"Understand cloud infrastructure across AWS, Azure and Google Cloud concepts",
			"Containerise applications with Docker",
			"Build CI/CD pipelines and deploy applications",
			"Monitor application health and apply DevOps practices",
		],
		projects: [
			{
				desc: "Branching, PRs and collaborative version control.",
				title: "GitHub workflow lab",
			},
			{
				desc: "Container image built and run from a Dockerfile.",
				title: "Dockerised service",
			},
			{
				desc: "Automated test-and-deploy with GitHub Actions.",
				title: "CI/CD pipeline",
			},
			{
				desc: "Capstone app live with monitoring and env config.",
				title: "Production deployment",
			},
		],
		roles: [
			"Cloud Support Associate",
			"DevOps Intern",
			"Junior SRE / Platform Associate",
			"Release Engineer",
			"IT Operations Associate",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Learn Linux, Git, Docker, cloud deployment and CI/CD through practical labs and earn a verified Cloud and DevOps certificate.",
			keywords: [
				"DevOps course",
				"cloud certification course",
				"Docker CI CD training",
				"free DevOps certification",
			],
			title: "Free Cloud & DevOps Certification Course | LetsUpgrade",
		},
		tagline:
			"Linux, Git, Docker and CI/CD. Take an application off your laptop and keep it running in the cloud.",
		title: "Cloud & DevOps",
		tools: [
			"Linux",
			"Git",
			"GitHub",
			"Docker",
			"GitHub Actions",
			"AWS",
			"Azure",
			"Google Cloud",
		],
		whoFor: [
			"Tech students aiming for cloud or DevOps roles",
			"Developers who want deployment and ops confidence",
			"IT learners moving toward modern infrastructure",
			"Anyone who wants Linux + Git + Docker + CI/CD skills",
		],
	},

	cybersecurity: {
		about: "Students understand cybersecurity fundamentals, common attack methods, security monitoring and ethical hacking — with networking, Linux, OWASP, SOC basics and responsible disclosure. Capstone is a controlled CTF-style challenge with a professional report.",
		audience: "Tech",
		certName: "Cybersecurity & Ethical Hacking",
		curriculum: [
			{
				detail: "Cybersecurity, CIA triad, threats, vulnerabilities and risks — malware, phishing, ransomware, social engineering and data breaches.",
				title: "Cybersecurity Fundamentals",
				week: "Module 1",
			},
			{
				detail: "TCP/IP, IP addresses, DNS, HTTP/HTTPS, ports and firewalls.",
				title: "Networking Fundamentals",
				week: "Module 2",
			},
			{
				detail: "Linux commands, files, permissions, processes and networking commands used in security work.",
				title: "Linux for Cybersecurity",
				week: "Module 3",
			},
			{
				detail: "Reconnaissance, scanning, enumeration and vulnerability analysis with Nmap, Burp Suite, Wireshark and Kali Linux.",
				title: "Ethical Hacking",
				week: "Module 4",
			},
			{
				detail: "OWASP and web vulnerabilities — SQL Injection, XSS, authentication attacks, broken access control and misconfiguration.",
				title: "Web Security",
				week: "Module 5",
			},
			{
				detail: "Password attacks, MFA, authentication and credential security.",
				title: "Password and Authentication Security",
				week: "Module 6",
			},
			{
				detail: "SOC, SIEM, log monitoring, incident response and threat detection.",
				title: "Security Operations",
				week: "Module 7",
			},
			{
				detail: "Responsible disclosure, legal boundaries and penetration testing ethics.",
				title: "Cybersecurity Ethics",
				week: "Module 8",
			},
			{
				detail: "Identify vulnerabilities in a controlled environment and submit a report covering findings, attack explanation, risk level and remediation.",
				title: "Cybersecurity Capture-the-Flag Challenge",
				week: "Capstone",
			},
			{
				detail: "Cybersecurity fundamentals, networking, Linux, ethical hacking, web vulnerabilities, SOC, incident response and scenario-based questions.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 4,
		duration: "8 modules",
		format: "Live + labs + exam",
		icon: "CS",
		level: "Beginner to intermediate",
		outcomes: [
			"Understand networks and security fundamentals including the CIA triad",
			"Identify vulnerabilities and perform basic penetration testing",
			"Use tools like Nmap, Burp Suite, Wireshark and Kali Linux",
			"Explain common web attacks and OWASP issues",
			"Understand SOC operations, SIEM and incident response basics",
			"Follow responsible ethical-hacking and legal boundaries",
		],
		projects: [
			{
				desc: "Map and document a lab network with tool evidence.",
				title: "Network recon lab",
			},
			{
				desc: "Find and explain OWASP issues in a weak app.",
				title: "Web vulnerability write-up",
			},
			{
				desc: "Measurable remediation for insecure configurations.",
				title: "Hardening checklist",
			},
			{
				desc: "Capstone report with risk ratings and fixes.",
				title: "CTF security report",
			},
		],
		roles: [
			"SOC Analyst (Junior)",
			"Security Associate",
			"Vulnerability Analyst",
			"IT Security Support",
			"Ethical Hacking Intern",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Learn cybersecurity fundamentals, ethical hacking and incident response in practical labs and earn a verified certificate.",
			keywords: [
				"cybersecurity course",
				"ethical hacking course",
				"free cybersecurity certification",
				"security analyst training",
			],
			title: "Free Cybersecurity & Ethical Hacking Course | LetsUpgrade",
		},
		tagline:
			"Find vulnerabilities in a lab environment, then write the report that explains how to fix them.",
		title: "Cybersecurity",
		tools: ["Kali Linux", "Nmap", "Burp Suite", "Wireshark"],
		whoFor: [
			"Tech students exploring cybersecurity careers",
			"IT learners who want offensive and defensive foundations",
			"Anyone curious about ethical hacking done the right way",
			"Candidates preparing for SOC / security associate roles",
		],
	},

	"data-analytics": {
		about: "Students clean, analyse, visualise and communicate business data using Excel, SQL and Power BI. The program ends with an e-commerce analytics capstone presented as if to a CEO, plus a final certification examination.",
		audience: "Tech + Business",
		certName: "Data Analytics with Excel, SQL & Power BI",
		curriculum: [
			{
				detail: "Analytics lifecycle, types of analytics, business questions and KPIs — descriptive, diagnostic, predictive and prescriptive analytics.",
				title: "Data Analytics Fundamentals",
				week: "Module 1",
			},
			{
				detail: "Data cleaning, formulas, functions, pivot tables and charts. IF, SUMIF, COUNTIF, XLOOKUP, INDEX/MATCH, text and date functions, conditional formatting and validation.",
				title: "Excel for Data Analytics",
				week: "Module 2",
			},
			{
				detail: "Databases, tables and queries — SELECT, WHERE, ORDER BY, GROUP BY, HAVING, aggregates, JOINs, subqueries, CASE, CTEs and window functions.",
				title: "SQL",
				week: "Module 3",
			},
			{
				detail: "Missing values, duplicate records, data types and outliers — turning messy data into analysis-ready tables.",
				title: "Data Cleaning",
				week: "Module 4",
			},
			{
				detail: "Interface, data import, Power Query, modelling and dashboards — relationships, measures, calculated columns, DAX basics, filters, slicers, KPI cards and charts.",
				title: "Power BI",
				week: "Module 5",
			},
			{
				detail: "Sales, customer, marketing and financial analytics use cases with real business questions.",
				title: "Business Analytics",
				week: "Module 6",
			},
			{
				detail: "Dashboard design, insight generation, executive communication and business recommendations.",
				title: "Data Storytelling",
				week: "Module 7",
			},
			{
				detail: "From raw business data build revenue, product, customer, regional and profitability views — then present findings as if to a CEO.",
				title: "E-commerce Business Analytics Dashboard",
				week: "Capstone",
			},
			{
				detail: "Excel, SQL, Power BI, data interpretation, business analytics, dashboard design and case-study questions.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 5,
		duration: "7 modules",
		format: "Live + labs + exam",
		icon: "DA",
		level: "Beginner friendly",
		outcomes: [
			"Analyse datasets using Excel formulas, pivots and charts",
			"Query databases using SQL including joins, CTEs and window functions",
			"Build interactive dashboards using Power BI and DAX basics",
			"Clean messy data and identify business trends and KPIs",
			"Present insights and recommendations to management",
			"Apply data storytelling for executive communication",
		],
		projects: [
			{
				desc: "Cleaned workbook with pivots, KPIs and charts.",
				title: "Excel analysis pack",
			},
			{
				desc: "Layered business questions answered across joined tables.",
				title: "SQL case study",
			},
			{
				desc: "Interactive report with measures, slicers and KPI cards.",
				title: "Power BI dashboard",
			},
			{
				desc: "Capstone with recommendations presented to stakeholders.",
				title: "E-commerce CEO dashboard",
			},
		],
		roles: [
			"Data Analyst",
			"Business Analyst",
			"Reporting Analyst",
			"Operations Analyst",
			"BI Associate",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Learn Excel, SQL and Power BI with live projects. Build an analysis portfolio and earn a verified Data Analytics certificate.",
			keywords: [
				"data analytics course",
				"Excel SQL Power BI course",
				"free data certification",
				"data analyst course",
			],
			title: "Free Data Analytics Certification Course | LetsUpgrade",
		},
		tagline:
			"Excel, SQL and Power BI. Turn a messy sales sheet into a dashboard your manager can read in ten seconds.",
		title: "Data Analytics",
		tools: ["Excel", "SQL", "Power BI", "Power Query", "DAX"],
		whoFor: [
			"Students aiming for analyst and business roles",
			"BBA/MBA learners needing practical analytics skills",
			"Working professionals moving into data-driven roles",
			"Anyone who wants Excel + SQL + Power BI as a stack",
		],
	},

	"digital-marketing": {
		about: "Students learn how businesses acquire customers across digital channels and how AI improves marketing productivity and performance — content, social, SEO, Meta/Google Ads, analytics and campaign strategy. Capstone: launch a complete digital marketing campaign plan.",
		audience: "Non-Tech + Business",
		certName: "AI-Powered Digital Marketing",
		curriculum: [
			{
				detail: "Marketing funnel, customer journey, digital channels and marketing metrics.",
				title: "Digital Marketing Fundamentals",
				week: "Module 1",
			},
			{
				detail: "Target audience, ICP, personas, competitor analysis and market research.",
				title: "Customer & Market Research",
				week: "Module 2",
			},
			{
				detail: "Content strategy, social media, copywriting and creative development — hooks, headlines, CTAs, calendars, short-form and landing-page copy.",
				title: "Content Marketing",
				week: "Module 3",
			},
			{
				detail: "Instagram, LinkedIn, YouTube and Facebook — organic growth, formats, engagement and analytics.",
				title: "Social Media Marketing",
				week: "Module 4",
			},
			{
				detail: "Meta Ads and Google Ads campaign structure — CPC, CPM, CTR, CPA, ROAS, conversion tracking, targeting and retargeting.",
				title: "Performance Marketing",
				week: "Module 5",
			},
			{
				detail: "Keywords, on-page, technical and off-page SEO, plus search intent.",
				title: "SEO",
				week: "Module 6",
			},
			{
				detail: "ChatGPT, Gemini, Canva AI and creative tools for copy, campaign ideas, persona research, ad creatives, calendars and SEO content.",
				title: "AI for Marketing",
				week: "Module 7",
			},
			{
				detail: "Google Analytics concepts, campaign performance, funnel metrics and conversion analysis.",
				title: "Marketing Analytics",
				week: "Module 8",
			},
			{
				detail: "For a real or fictional brand: persona, competitors, landing page, content calendar, Meta/Google plan, creatives, budget, funnel and analytics dashboard.",
				title: "Launch a Complete Digital Marketing Campaign",
				week: "Capstone",
			},
			{
				detail: "Marketing fundamentals, social, SEO, performance marketing, metrics, AI marketing, campaign strategy and case-study analysis.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 4,
		duration: "8 modules",
		format: "Live + labs + exam",
		icon: "DM",
		level: "Beginner friendly",
		outcomes: [
			"Build marketing campaigns and understand paid advertising",
			"Create content, copy and creatives for social and landing pages",
			"Use AI for research, copy, calendars and campaign ideas",
			"Analyse campaign performance with core marketing metrics",
			"Build marketing funnels from awareness to conversion",
			"Plan SEO and performance marketing with measurable goals",
		],
		projects: [
			{
				desc: "ICP, personas and competitive teardown.",
				title: "Persona & competitor pack",
			},
			{
				desc: "Channel plan with hooks, CTAs and formats.",
				title: "Content calendar",
			},
			{
				desc: "Meta/Google structure with metrics and budget.",
				title: "Paid campaign plan",
			},
			{
				desc: "Capstone funnel, creatives and analytics view.",
				title: "Full campaign launch kit",
			},
		],
		roles: [
			"Digital Marketing Associate",
			"Performance Marketing Intern",
			"Social Media Executive",
			"SEO Associate",
			"Growth Marketing Associate",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Learn SEO, paid advertising, analytics, content and AI-assisted marketing through a complete campaign project.",
			keywords: [
				"digital marketing course",
				"SEO course",
				"AI marketing certification",
				"performance marketing training",
			],
			title: "AI-Powered Digital Marketing Certification | LetsUpgrade",
		},
		tagline:
			"Run a campaign, read the numbers, explain why it worked. SEO, paid ads and AI-assisted content.",
		title: "Digital Marketing",
		tools: [
			"Meta Ads",
			"Google Ads",
			"ChatGPT",
			"Gemini",
			"Canva AI",
			"Google Analytics",
		],
		whoFor: [
			"Students exploring marketing and growth roles",
			"Non-tech learners who want job-ready digital skills",
			"Creators and freelancers building client services",
			"Anyone who wants AI-powered marketing productivity",
		],
	},
	"generative-ai": {
		about: "One promise: use Generative AI properly for college, internships and your first job. You learn how the models actually work, which tool to reach for, how to write prompts with the LetsUpgrade RCTFE framework, how to check what comes back, and how to read documents and datasets with AI — then prove all of it with a capstone and a 100-mark exam. API development, RAG, vector databases and agent engineering are deliberately left out; those belong in AI Agents & Automation.",
		audience: "Everyone",
		certName: "Generative AI & Prompt Engineering",
		curriculum: [
			{
				activity:
					"Ask three AI models the same question and compare accuracy, structure, depth, sources and hallucinations.",
				detail: "Understand what Generative AI actually is, how a large language model produces an answer, and where it fails — so you can judge AI output instead of trusting it blindly.",
				outcome:
					"Explain what Generative AI is, how LLMs broadly work, and where AI can fail.",
				sections: [
					{
						name: "1.1 Understanding Artificial Intelligence",
						points: [
							"What is Artificial Intelligence?",
							"How AI is used in everyday applications",
							"AI vs Machine Learning vs Deep Learning",
							"Traditional AI vs Generative AI",
							"Rule-based systems, machine learning models and neural networks",
							"Predictive AI vs Generative AI",
						],
					},
					{
						name: "1.2 What is Generative AI?",
						points: [
							"Text, image, audio, video and code generation",
							"Multimodal AI that reads text, images and files together",
							"AI-generated text and image models",
							"Voice models and video generation platforms",
							"AI coding assistants",
						],
					},
					{
						name: "1.3 Large Language Models",
						points: [
							"What is an LLM and how it learns",
							"How an LLM generates a response",
							"Training data, tokens and token prediction",
							"Parameters and context window",
							"Training vs inference",
							"Foundation models",
						],
					},
					{
						name: "1.4 Limitations of AI",
						points: [
							"Hallucinations",
							"Outdated information",
							"Incorrect reasoning",
							"Bias",
							"Lack of real understanding",
						],
					},
				],
				skills: [
					"AI Fundamentals",
					"LLM Literacy",
					"Critical Evaluation",
				],
				title: "Generative AI Foundations",
				week: "Module 1",
			},
			{
				activity:
					"Solve the same task using three different AI tools and justify which one performed best.",
				detail: "Learn what each major AI tool is genuinely good at, so you stop using one tool for every task.",
				outcome:
					"Select the right AI tool for a given task instead of defaulting to one tool for everything.",
				sections: [
					{
						name: "2.1 ChatGPT",
						points: [
							"Interface and conversations",
							"File uploads and image understanding",
							"Web research",
							"Projects and workspaces where available",
							"Applied to research, writing, learning, analysis and brainstorming",
						],
					},
					{
						name: "2.2 Google Gemini",
						points: [
							"The Gemini ecosystem",
							"Google Workspace integration",
							"File analysis and research",
							"Multimodal capabilities",
						],
					},
					{
						name: "2.3 Claude",
						points: [
							"Long-document analysis",
							"Writing and reasoning",
							"Structured outputs",
						],
					},
					{
						name: "2.4 Perplexity",
						points: [
							"AI-powered search",
							"Research with cited sources",
							"Follow-up research threads",
						],
					},
					{
						name: "2.5 NotebookLM",
						points: [
							"Source-grounded AI",
							"Uploading your own learning material",
							"Asking questions against your sources",
							"Study notes and research summaries",
						],
					},
					{
						name: "2.6 Microsoft Copilot",
						points: [
							"Productivity use cases",
							"Documents and presentations",
							"Business workflows",
						],
					},
					{
						name: "2.7 Choosing the Right AI Tool",
						points: [
							"Matching the tool to research, writing or coding",
							"Documents, images and data tasks",
							"Learning and business tasks",
							"Cost, speed and accuracy trade-offs",
						],
					},
				],
				skills: ["Tool Fluency", "Research Speed", "Document Analysis"],
				title: "Mastering Generative AI Tools",
				week: "Module 2",
			},
			{
				activity:
					"Receive 10 weak prompts and rewrite every one of them using the RCTFE framework.",
				detail: "The core module. Learn the LetsUpgrade RCTFE framework and turn vague requests into prompts that produce professional output every time.",
				outcome:
					"Convert a vague requirement into a structured, professional prompt.",
				sections: [
					{
						name: "3.1 What Makes a Good Prompt?",
						points: [
							"Clear instructions",
							"Context",
							"Inputs",
							"Constraints",
							"Output format",
							"Examples",
						],
					},
					{
						name: "3.2 The RCTFE Prompt Framework",
						points: [
							"R — Role: the persona or expertise required (career coach, data analyst, tutor)",
							"C — Context: audience, objective, existing information, constraints, business situation",
							"T — Task: one clear objective, multiple tasks, breaking tasks into steps",
							"F — Format: table, bullets, email, report, JSON, checklist, presentation outline",
							"E — Examples / Expectations: example outputs, tone, quality, length, writing style",
						],
					},
					{
						name: "3.3 Prompt Improvement",
						points: [
							'Before: "Explain marketing."',
							'After: "Act as a digital marketing trainer. Explain performance marketing to a second-year BBA student using one Indian e-commerce example. Structure the answer into definition, funnel, metrics and example campaign."',
							"Diagnosing why a weak prompt failed",
							"Rewriting for a specific audience",
						],
					},
					{
						name: "3.4 Prompt Iteration",
						points: [
							"Asking follow-up questions",
							"Refining responses",
							"Correcting assumptions",
							"Requesting more depth",
							"Changing tone or structure",
						],
					},
				],
				skills: ["RCTFE Framework", "Prompt Design", "Output Control"],
				title: "Prompt Engineering Fundamentals",
				week: "Module 3",
			},
			{
				activity:
					"Design a five-stage prompt chain for a real task and document each stage's input, output and checkpoint.",
				detail: "Move from single prompts to repeatable AI workflows — chaining, decomposition, self-critique and reusable prompt libraries.",
				outcome:
					"Build repeatable AI workflows, not just one-off prompts.",
				sections: [
					{
						name: "4.1 Zero-Shot Prompting",
						points: [
							"Asking AI without examples",
							"Appropriate use cases",
							"Limitations",
						],
					},
					{
						name: "4.2 One-Shot Prompting",
						points: [
							"Providing one example",
							"Mirroring style and structure",
						],
					},
					{
						name: "4.3 Few-Shot Prompting",
						points: [
							"Providing multiple examples",
							"Creating consistent outputs across runs",
						],
					},
					{
						name: "4.4 Role Prompting",
						points: [
							"Defining expertise",
							"Defining audience",
							"Defining behaviour",
						],
					},
					{
						name: "4.5 Constraint Prompting",
						points: [
							"Word limits",
							"Restricted sources",
							"Specific tone",
							"Required format",
							"Allowed assumptions",
						],
					},
					{
						name: "4.6 Prompt Chaining",
						points: [
							"Breaking complex tasks into stages",
							"Research → Analyse → Generate options → Compare → Recommend → Create output",
							"Passing output from one stage into the next",
						],
					},
					{
						name: "4.7 Task Decomposition",
						points: [
							"Breaking large problems into smaller ones",
							"Sequential instructions",
							"Checkpoints",
						],
					},
					{
						name: "4.8 Critique and Improve",
						points: [
							"Making AI critique its own response",
							"Identifying weaknesses",
							"Improving the answer",
							"Comparing alternatives",
						],
					},
					{
						name: "4.9 Structured Outputs",
						points: [
							"Markdown",
							"Tables",
							"CSV",
							"JSON",
							"Templates",
							"Reports",
						],
					},
					{
						name: "4.10 Prompt Libraries",
						points: [
							"Building reusable prompts",
							"Variables and placeholders",
							"Prompt templates",
							"Naming and organising prompts",
						],
					},
				],
				skills: [
					"Prompt Chaining",
					"Workflow Design",
					"Structured Outputs",
				],
				title: "Advanced Prompt Engineering",
				week: "Module 4",
			},
			{
				activity:
					"Build a Personal AI Tutor for one subject you are currently studying.",
				detail: "Use AI to research faster, verify what it tells you, and learn difficult topics — without outsourcing your thinking.",
				outcome:
					"Use AI to learn faster without outsourcing your thinking.",
				sections: [
					{
						name: "5.1 AI-Assisted Research",
						points: [
							"Defining a research question",
							"Research planning",
							"Finding information",
							"Creating effective search queries",
						],
					},
					{
						name: "5.2 Source-Based Research",
						points: [
							"Primary sources",
							"Secondary sources",
							"Judging source reliability",
							"Source comparison",
						],
					},
					{
						name: "5.3 Information Synthesis",
						points: [
							"Combining multiple sources",
							"Identifying common themes",
							"Finding contradictions",
							"Summarising research",
						],
					},
					{
						name: "5.4 Fact Checking AI",
						points: [
							"Identifying hallucinations",
							"Verifying statistics",
							"Checking citations",
							"Cross-checking claims",
						],
					},
					{
						name: "5.5 AI as a Tutor",
						points: [
							"Explaining difficult topics",
							"Beginner vs advanced explanations",
							"Analogies",
							"Socratic tutoring",
							"Asking AI to test your understanding",
						],
					},
					{
						name: "5.6 AI for Exam Preparation",
						points: [
							"Notes and flashcards",
							"MCQs and mock tests",
							"Revision plans",
							"Viva questions",
						],
					},
					{
						name: "5.7 AI for Assignments",
						points: [
							"Brainstorming",
							"Research",
							"Structuring assignments",
							"Editing",
							"Citation support",
						],
					},
					{
						name: "5.8 Academic Integrity",
						points: [
							"Plagiarism",
							"AI-generated assignments",
							"What counts as appropriate AI assistance",
							"Citation",
							"Human authorship",
						],
					},
				],
				skills: [
					"Research Design",
					"Fact Verification",
					"Self-Directed Learning",
				],
				title: "AI for Research and Learning",
				week: "Module 5",
			},
			{
				activity:
					"Produce one professional email, one report, one meeting agenda, one presentation outline and one project plan using documented AI workflows.",
				detail: "Apply AI to the everyday work that actually fills a working day — email, reports, decks, meetings and planning.",
				outcome:
					"Use AI to improve both the speed and the quality of everyday workplace tasks.",
				sections: [
					{
						name: "6.1 Professional Communication",
						points: [
							"Emails and follow-ups",
							"Meeting requests",
							"Escalation emails",
							"Professional tone",
						],
					},
					{
						name: "6.2 Reports and Documents",
						points: [
							"Creating reports",
							"Executive summaries",
							"Rewriting and editing",
							"Grammar and tone adjustment",
						],
					},
					{
						name: "6.3 Presentations",
						points: [
							"Presentation research",
							"Storyline",
							"Slide structure and content",
							"Speaker notes",
						],
					},
					{
						name: "6.4 Meetings",
						points: [
							"Meeting agendas",
							"Meeting preparation",
							"Minutes of meeting",
							"Action items and follow-ups",
						],
					},
					{
						name: "6.5 Productivity",
						points: [
							"Task prioritisation",
							"To-do lists",
							"Project planning",
							"Goal setting",
							"Decision frameworks",
						],
					},
					{
						name: "6.6 Brainstorming",
						points: [
							"Generating options",
							"Comparing alternatives",
							"Evaluating ideas",
							"Identifying risks",
						],
					},
				],
				skills: ["Business Writing", "Presentation Design", "Planning"],
				title: "AI for Workplace Productivity",
				week: "Module 6",
			},
			{
				activity:
					"Analyse a provided sales dataset and produce 5 insights, 3 charts, 3 recommendations and 1 executive summary.",
				detail: "Turn PDFs, reports and spreadsheets into insight, implication and recommendation that a manager can act on.",
				outcome: "Turn basic data into meaningful business insight.",
				sections: [
					{
						name: "7.1 Working with Documents",
						points: [
							"PDFs, reports, research papers, policies and notes",
							"Summarise and compare",
							"Extract and categorise",
							"Ask questions against a document",
						],
					},
					{
						name: "7.2 Working with Spreadsheets",
						points: [
							"CSV, Excel and tabular data",
							"Understanding columns",
							"Generating formulas",
							"Cleaning data",
							"Identifying trends and anomalies",
						],
					},
					{
						name: "7.3 AI-Assisted Analysis",
						points: [
							"Descriptive analysis",
							"Comparisons",
							"Trends",
							"Outliers",
							"Insights",
						],
					},
					{
						name: "7.4 Asking Business Questions",
						points: [
							"What changed?",
							"Why might it have changed?",
							"Which segment performs best?",
							"Where is performance declining?",
							"What action should be taken?",
						],
					},
					{
						name: "7.5 Visualisation",
						points: [
							"Choosing the right chart",
							"Chart interpretation",
							"Simple data storytelling",
						],
					},
					{
						name: "7.6 Executive Summaries",
						points: [
							"The Insight → Implication → Recommendation formula",
							"Writing for decision makers",
							"Cutting analysis down to one page",
						],
					},
				],
				skills: [
					"Document Analysis",
					"Data Interpretation",
					"Insight Writing",
				],
				title: "AI for Data, Documents and Analysis",
				week: "Module 7",
			},
			{
				activity:
					"Pick a real job description, run a skill-gap analysis, rewrite your resume against it and complete an AI mock interview.",
				detail: "Use AI across the whole internship and job-search journey — from choosing a role to clearing the interview.",
				outcome:
					"Use AI throughout the internship and job-search journey.",
				sections: [
					{
						name: "8.1 AI for Career Discovery",
						points: [
							"Understanding job roles",
							"Skill requirements",
							"Career comparison",
							"Career roadmaps",
						],
					},
					{
						name: "8.2 Resume Improvement",
						points: [
							"Resume structure",
							"Matching a resume to a JD",
							"Skill-gap identification",
							"Bullet-point improvement",
						],
					},
					{
						name: "8.3 Job Description Analysis",
						points: [
							"Extracting required skills",
							"Experience expectations",
							"Responsibilities",
							"Keywords",
							"Expected competencies",
						],
					},
					{
						name: "8.4 Interview Preparation",
						points: [
							"HR questions",
							"Technical questions",
							"Mock interviews with AI",
							"The STAR framework",
							"Improving your answers",
						],
					},
					{
						name: "8.5 LinkedIn",
						points: [
							"Headline",
							"About section",
							"Skills",
							"Projects",
							"Profile optimisation",
						],
					},
					{
						name: "8.6 Internship Preparation",
						points: [
							"Researching companies",
							"Understanding role expectations",
							"Preparing before the internship starts",
							"Using AI responsibly during an internship",
						],
					},
				],
				skills: [
					"Resume Craft",
					"Interview Readiness",
					"Personal Branding",
				],
				title: "AI for Career & Employability",
				week: "Module 8",
			},
			{
				activity:
					"Produce a mini campaign: one post, one hero image, one slide visual and one 30-second video script from a single brief.",
				detail: "Translate an idea into written and visual creative output — copy, images, slide visuals and video concepts.",
				outcome:
					"Translate an idea into visual and written creative output using AI.",
				sections: [
					{
						name: "9.1 Content Creation",
						points: [
							"Social posts",
							"Blogs",
							"Scripts",
							"Captions",
							"Marketing copy",
						],
					},
					{
						name: "9.2 Image Generation",
						points: [
							"Subject and environment",
							"Composition and camera angle",
							"Lighting and mood",
							"Style",
							"Aspect ratio",
						],
					},
					{
						name: "9.3 Presentation Visuals",
						points: [
							"Hero graphics",
							"Diagrams",
							"Illustrations",
							"Concept visuals",
						],
					},
					{
						name: "9.4 Video Ideation",
						points: [
							"Scripts",
							"Storyboards",
							"Scene planning",
							"Shot lists",
						],
					},
					{
						name: "9.5 Creative Iteration",
						points: [
							"Generating alternatives",
							"Critiquing output",
							"Improving a draft",
							"Maintaining style consistency",
						],
					},
				],
				skills: [
					"Creative Direction",
					"Visual Prompting",
					"Copywriting",
				],
				title: "AI Content & Creativity",
				week: "Module 9",
			},
			{
				activity:
					"Audit one AI-generated deliverable for hallucinations, bias, privacy risk and copyright exposure, then document the fixes.",
				detail: "AI assists. A human verifies. A human stays accountable. Learn where the real risks sit and how to work around them.",
				outcome:
					"Use AI responsibly in academic and professional environments.",
				sections: [
					{
						name: "10.1 Hallucinations",
						points: [
							"Why hallucinations happen",
							"How to identify them",
							"Verification techniques",
						],
					},
					{
						name: "10.2 Privacy",
						points: [
							"Never upload passwords",
							"Never upload private customer data",
							"Never upload company confidential information",
							"Never upload sensitive personal information",
						],
					},
					{
						name: "10.3 Bias",
						points: [
							"Dataset bias",
							"Model bias",
							"Output bias",
							"Human review",
						],
					},
					{
						name: "10.4 Copyright",
						points: [
							"AI-generated content",
							"Using copyrighted input",
							"Attribution",
							"Ownership considerations",
						],
					},
					{
						name: "10.5 Deepfakes and Misinformation",
						points: [
							"Fake images",
							"Fake audio",
							"Manipulated content",
							"Verification",
						],
					},
					{
						name: "10.6 Workplace Responsibility",
						points: [
							"AI assists",
							"Human verifies",
							"Human remains accountable",
						],
					},
				],
				skills: [
					"Verification",
					"Data Privacy",
					"Professional Judgement",
				],
				title: "Responsible AI, Privacy & Ethics",
				week: "Module 10",
			},
			{
				activity:
					"Build, document and record a demo of all five assistants for your chosen persona.",
				detail: "Choose one persona — college student, developer, data analyst, digital marketer, sales, HR, finance or entrepreneur — and build a reusable AI system of five working assistants.",
				outcome:
					"Ship a reusable AI system you can demo in an interview, not a one-off assignment.",
				sections: [
					{
						name: "1. Research Assistant",
						points: [
							"Research a topic",
							"Compare sources",
							"Summarise findings",
							"Verify claims",
						],
					},
					{
						name: "2. Learning Assistant",
						points: [
							"Explain concepts",
							"Generate quizzes",
							"Create notes",
							"Test understanding",
						],
					},
					{
						name: "3. Productivity Assistant",
						points: [
							"Plan tasks",
							"Generate documents",
							"Manage workflows",
						],
					},
					{
						name: "4. Career Assistant",
						points: [
							"Analyse jobs",
							"Improve a resume",
							"Conduct mock interviews",
						],
					},
					{
						name: "5. Data / Analysis Assistant",
						points: [
							"Analyse a dataset or document",
							"Identify insights",
							"Generate recommendations",
						],
					},
					{
						name: "Submission checklist",
						points: [
							"The working AI Operating System",
							"Your 15-prompt portfolio",
							"Documentation",
							"Screenshots and working examples",
							"A 3–5 minute demo video",
							"A reflection on what worked and what failed",
						],
					},
				],
				skills: [
					"Systems Thinking",
					"Documentation",
					"Demo & Presentation",
				],
				title: "Build Your Personal AI Operating System",
				week: "Capstone",
			},
			{
				activity:
					"Write, test and document 15 professional prompts across research, learning, productivity, career and analysis.",
				detail: "A portfolio artifact, not an assignment. Fifteen documented, reusable prompts you can hand to an employer on day one.",
				outcome:
					"Own a documented prompt library that proves your prompt engineering ability.",
				sections: [
					{
						name: "Every prompt must document",
						points: [
							"Prompt name",
							"Purpose",
							"User input",
							"Role",
							"Context",
							"Task",
							"Format",
							"Expected outcome",
							"Example output",
							"Limitations",
						],
					},
				],
				skills: [
					"Prompt Library",
					"Technical Writing",
					"Portfolio Building",
				],
				title: "Prompt Portfolio — 15 Professional Prompts",
				week: "Portfolio",
			},
			{
				activity:
					"Complete the practical case study end to end and submit your prompt trail alongside the deliverable.",
				detail: "100 marks across seven parts, combining concept testing with a live practical prompt challenge and a case study.",
				outcome:
					"Prove applied AI ability under exam conditions, not just recall.",
				sections: [
					{
						name: "Written and practical parts",
						points: [
							"Part A — AI Fundamentals · 10 marks",
							"Part B — AI Tools · 10 marks",
							"Part C — Prompt Engineering · 20 marks",
							"Part D — Research, Data & Productivity · 10 marks",
							"Part E — Responsible AI · 10 marks",
							"Part F — Practical Prompt Challenge · 20 marks",
							"Part G — Case Study · 20 marks",
						],
					},
					{
						name: "Practical exam scenario",
						points: [
							"You join an internship at an e-commerce company",
							"Your manager gives you a sales spreadsheet, competitor websites and a 30-page market report",
							"Analyse the documents and the dataset, and research the competitors",
							"Identify insights and build recommendations",
							"Structure a management presentation",
							"Show the prompts you used and explain how you verified every output",
						],
					},
				],
				skills: ["Applied AI", "Case Analysis", "Verification"],
				title: "Final Certification Examination",
				week: "Final Exam",
			},
		],
		demand: 5,
		duration: "10 modules + capstone",
		format: "Live + labs + exam",
		grading: [
			{ label: "Module Quizzes", weight: "10%" },
			{ label: "Hands-on Activities", weight: "15%" },
			{ label: "Practical Assignments", weight: "15%" },
			{ label: "Capstone Project", weight: "30%" },
			{ label: "Final Examination", weight: "30%" },
		],
		icon: "AI",
		level: "Beginner friendly",
		outcomes: [
			"Understand how Generative AI and LLMs work",
			"Use leading AI tools effectively and choose the right one per task",
			"Write structured, high-quality prompts using the RCTFE framework",
			"Research and verify information using AI",
			"Analyse documents and basic datasets",
			"Create presentations, reports, emails and content with AI",
			"Build reusable AI workflows and a prompt portfolio",
			"Use AI safely and responsibly",
			"Build and present a practical AI capstone project",
		],
		projects: [
			{
				desc: "Researches a topic, compares sources, summarises and verifies claims.",
				title: "Research Assistant",
			},
			{
				desc: "Explains concepts, generates quizzes and tests your understanding.",
				title: "Learning Assistant",
			},
			{
				desc: "Plans tasks, generates documents and manages workflows.",
				title: "Productivity Assistant",
			},
			{
				desc: "Analyses jobs, improves your resume and runs mock interviews.",
				title: "Career Assistant",
			},
			{
				desc: "Analyses a dataset or document and generates recommendations.",
				title: "Data / Analysis Assistant",
			},
		],
		promise: "Use AI properly for college, internships and your first job.",
		roles: [
			"AI Associate",
			"Prompt Engineer",
			"AI Content Specialist",
			"AI Operations Analyst",
			"Automation Executive",
		],
		salary: "Certificate criteria: 70% learning completion, 60% in the final examination and a capstone scoring 60%+. Grades: Certified 60–74%, Certified with Merit 75–89%, Certified with Distinction 90%+.",
		seo: {
			description:
				"Learn ChatGPT, Gemini, Claude and prompt engineering through free live classes, practical exercises and a verified Generative AI certificate.",
			keywords: [
				"Generative AI course",
				"prompt engineering course",
				"free AI certification",
				"ChatGPT course",
			],
			title: "Free Generative AI Certification Course | LetsUpgrade",
		},
		tagline:
			"ChatGPT, Gemini, Claude and Perplexity. Build a personal AI assistant for research, writing and interview prep.",
		title: "AI & Generative AI",
		tools: [
			"ChatGPT",
			"Google Gemini",
			"Claude",
			"Microsoft Copilot",
			"Perplexity",
			"NotebookLM",
		],
		whoFor: [
			"Students in any stream wanting an AI edge",
			"Working professionals whose roles are being reshaped by AI",
			"Non-technical learners who want AI skills without coding",
			"Anyone who has used ChatGPT casually and wants real depth",
		],
	},

	"sales-gtm": {
		about: "Students learn how companies identify prospects, generate leads, run sales conversations and convert opportunities — including CRM, negotiation and go-to-market strategy, plus AI for sales productivity. Capstone: a full sales GTM plan with a simulated pitch.",
		audience: "Business + Everyone",
		certName: "Sales, Business Development & GTM",
		curriculum: [
			{
				detail: "Sales process, B2B vs B2C, sales funnel and revenue model — lead, prospect, opportunity, customer and pipeline.",
				title: "Sales Fundamentals",
				week: "Module 1",
			},
			{
				detail: "Market segmentation, ICP and buyer persona — industry, company size, geography, buyer role and pain points.",
				title: "Ideal Customer Profile",
				week: "Module 2",
			},
			{
				detail: "LinkedIn, email, cold calling and lead databases — research, personalisation and outreach sequencing.",
				title: "Prospecting",
				week: "Module 3",
			},
			{
				detail: "Sales emails, cold messages, calling, elevator pitch and business communication.",
				title: "Sales Communication",
				week: "Module 4",
			},
			{
				detail: "BANT, SPIN and qualification — questions, pain, budget, decision makers and buying timeline.",
				title: "Discovery",
				week: "Module 5",
			},
			{
				detail: "Product pitch, value proposition, demo, storytelling and ROI communication.",
				title: "Sales Presentation",
				week: "Module 6",
			},
			{
				detail: "Common objections: too expensive, no budget, not interested, competitor, need more time, need approval.",
				title: "Objection Handling",
				week: "Module 7",
			},
			{
				detail: "Negotiation, pricing, closing, follow-up and commitment.",
				title: "Negotiation & Closing",
				week: "Module 8",
			},
			{
				detail: "HubSpot, Salesforce fundamentals and Zoho CRM — lead management, activities, pipeline, forecast and follow-up.",
				title: "CRM & Pipeline Management",
				week: "Module 9",
			},
			{
				detail: "Market selection, ICP, positioning, channels, pricing, sales strategy and partnerships.",
				title: "Go-to-Market Strategy",
				week: "Module 10",
			},
			{
				detail: "Prospect research, personalised outreach, call prep, meeting summaries, proposal generation and CRM updates.",
				title: "AI for Sales",
				week: "Module 11",
			},
			{
				detail: "Target market, ICP, 50-prospect database, outreach sequence, cold email, LinkedIn pitch, discovery script, sales deck, objection sheet, CRM pipeline, GTM strategy and a simulated sales pitch.",
				title: "Build and Execute a Sales GTM Plan",
				week: "Capstone",
			},
			{
				detail: "Sales funnel, prospecting, BANT/SPIN, discovery, objections, negotiation, CRM, GTM, AI for sales and situational selling.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 4,
		duration: "11 modules",
		format: "Live + labs + exam",
		icon: "SB",
		level: "Beginner friendly",
		outcomes: [
			"Identify target customers and build an Ideal Customer Profile",
			"Prospect using LinkedIn, email and online tools",
			"Conduct discovery calls using BANT/SPIN frameworks",
			"Present solutions, handle objections and negotiate",
			"Use CRM systems for pipeline and follow-up",
			"Build a basic go-to-market strategy and use AI for sales tasks",
		],
		projects: [
			{
				desc: "Qualified list of 50 prospects with research notes.",
				title: "ICP & prospect database",
			},
			{
				desc: "Cold email + LinkedIn multi-touch sequence.",
				title: "Outreach sequence",
			},
			{
				desc: "Call script, scorecard and objection-handling sheet.",
				title: "Discovery & objection pack",
			},
			{
				desc: "Capstone GTM package with simulated pitch.",
				title: "Sales GTM plan + pitch",
			},
		],
		roles: [
			"Sales Development Representative",
			"Business Development Associate",
			"Inside Sales Executive",
			"Account Executive (Junior)",
			"GTM / Partnerships Associate",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Learn prospecting, outreach, discovery calls, CRM workflows and go-to-market fundamentals through practical sales exercises.",
			keywords: [
				"sales course",
				"business development course",
				"GTM certification",
				"sales training for freshers",
			],
			title: "Sales & Business Development Certification | LetsUpgrade",
		},
		tagline:
			"Research a prospect, write the outreach, run the discovery call. CRM hygiene and GTM basics included.",
		title: "Sales & Business Development",
		tools: ["LinkedIn", "HubSpot", "Salesforce", "Zoho CRM", "ChatGPT"],
		whoFor: [
			"Students aiming for sales, BD and GTM roles",
			"BBA/MBA learners who want practical selling skills",
			"Founders learning outbound and pipeline discipline",
			"Anyone who wants structured sales communication",
		],
	},

	"websites-apps-ai": {
		about: "Students build and deploy modern web applications using AI-powered development tools plus traditional web concepts — frontend, backend, databases, APIs, AI features and public deployment. Capstone requires an AI-powered app live on the internet.",
		audience: "Students",
		certName: "AI Application Development",
		curriculum: [
			{
				detail: "Internet fundamentals, frontend, backend, database and APIs — HTML, CSS, JavaScript fundamentals, HTTP and browser architecture.",
				title: "Web Development Fundamentals",
				week: "Module 1",
			},
			{
				detail: "Cursor, GitHub Copilot, Lovable, Bolt and Replit — AI coding prompts, code generation, debugging and refactoring.",
				title: "AI-Assisted Development",
				week: "Module 2",
			},
			{
				detail: "HTML, CSS, JavaScript and React fundamentals — components, props, state, events, forms and responsive layouts.",
				title: "Frontend Development",
				week: "Module 3",
			},
			{
				detail: "Server-side applications, APIs, authentication and business logic.",
				title: "Backend Fundamentals",
				week: "Module 4",
			},
			{
				detail: "Supabase and Firebase — tables, CRUD, relationships and authentication.",
				title: "Databases",
				week: "Module 5",
			},
			{
				detail: "REST APIs, fetching data, API keys and error handling.",
				title: "API Integration",
				week: "Module 6",
			},
			{
				detail: "OpenAI/Gemini APIs for AI chat, text generation and document analysis inside your product.",
				title: "AI Integration",
				week: "Module 7",
			},
			{
				detail: "GitHub, Vercel and Netlify — Git, version control, environment variables and production deployment.",
				title: "Deployment",
				week: "Module 8",
			},
			{
				detail: "Examples: AI Resume Reviewer, Study Assistant, Career Advisor, Customer Support or Interview Prep. Must include auth, database, responsive UI, API + AI and public deployment.",
				title: "Build and Deploy an AI-Powered Application",
				week: "Capstone",
			},
			{
				detail: "Web fundamentals, JavaScript, React, APIs, database, Git, AI integration, deployment and debugging scenarios.",
				title: "Final Certification Examination",
				week: "Exam",
			},
		],
		demand: 4,
		duration: "8 modules",
		format: "Live + labs + exam",
		icon: "AD",
		level: "Beginner friendly",
		outcomes: [
			"Build responsive web applications with HTML, CSS, JavaScript and React basics",
			"Use AI coding assistants effectively for generation, debugging and refactoring",
			"Connect databases and authentication with tools like Supabase or Firebase",
			"Integrate REST APIs and AI functionality into products",
			"Use Git and deploy applications publicly",
			"Ship a portfolio-ready AI-powered application",
		],
		projects: [
			{
				desc: "A personal site live on a public URL.",
				title: "Responsive portfolio site",
			},
			{
				desc: "Auth + database CRUD with a clean UI.",
				title: "Full-stack mini app",
			},
			{
				desc: "App feature powered by an external AI API.",
				title: "API + AI feature",
			},
			{
				desc: "Capstone deployed publicly with auth, data and AI.",
				title: "AI-powered product",
			},
		],
		roles: [
			"Junior Web Developer",
			"AI Product Associate",
			"No-code / Low-code Builder",
			"Frontend Associate",
			"Founder / Builder",
		],
		salary: "Certificate criteria: 70% learning completion, 60% final exam, capstone with 60%+ evaluation. Grades: Certified 60–74%, Merit 75–89%, Distinction 90%+.",
		seo: {
			description:
				"Build and deploy a complete web application with authentication, a database and practical AI features through live project-based learning.",
			keywords: [
				"AI app development course",
				"web development with AI",
				"application development certification",
				"AI coding course",
			],
			title: "AI Application Development Certification | LetsUpgrade",
		},
		tagline:
			"Build a web app with login, a database and an AI feature — then deploy it to a public URL you can send anyone.",
		title: "AI App Development",
		tools: [
			"Cursor",
			"GitHub Copilot",
			"React",
			"Supabase",
			"Firebase",
			"Vercel",
			"Netlify",
		],
		whoFor: [
			"Students with little or no coding background who want to build",
			"Non-tech students needing a technical portfolio",
			"Aspiring founders who want to prototype their own ideas",
			"Anyone ready to use AI as a pair programmer",
		],
	},
}
