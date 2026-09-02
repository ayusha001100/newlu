export const COLLEGE_CONTACT_URL = "https://www.letsupgrade.in/contact"

const crumbs = (current, hub = false) =>
	hub
		? [{ href: "/", label: "Home" }, { label: "For Colleges" }]
		: [
				{ href: "/", label: "Home" },
				{ href: "/colleges", label: "For Colleges" },
				{ label: current },
			]

const SKILL_PATHWAYS = [
	{
		code: "AI",
		copy: "Responsible prompting, research workflows, automation and practical assistants.",
		title: "Generative AI & AI Agents",
	},
	{
		code: "DA",
		copy: "Excel, SQL, Power BI, data quality and decision-focused reporting.",
		title: "Data Analytics",
	},
	{
		code: "DV",
		copy: "Web foundations, application building, deployment and AI-assisted workflows.",
		title: "Development",
	},
	{
		code: "CS",
		copy: "Security fundamentals, practical labs, cloud concepts and DevOps workflows.",
		title: "Cybersecurity & Cloud",
	},
	{
		code: "DM",
		copy: "Audience, content, channels, measurement and responsible AI assistance.",
		title: "Digital Marketing",
	},
	{
		code: "GT",
		copy: "Research, outreach, discovery, pipeline thinking and communication practice.",
		title: "Sales & Go-to-Market",
	},
]

const CERT_TRACKS = [
	{
		code: "GA",
		copy: "AI foundations, prompting, source-aware research, productivity and responsible use.",
		title: "Generative AI & Prompt Engineering",
	},
	{
		code: "AA",
		copy: "Agent concepts, workflow design, tool use, evaluation and practical automation.",
		title: "AI Agents & Automation",
	},
	{
		code: "DA",
		copy: "Excel, SQL, Power BI, data quality, visualisation and business interpretation.",
		title: "Data Analytics",
	},
	{
		code: "DV",
		copy: "Web foundations, interface building, deployment and AI-assisted development.",
		title: "Websites & Applications with AI",
	},
	{
		code: "CY",
		copy: "Security foundations, threat awareness, defensive thinking and practical labs.",
		title: "Cybersecurity & Ethical Hacking",
	},
	{
		code: "CD",
		copy: "Cloud concepts, delivery workflows, automation, observability and reliability.",
		title: "Cloud & DevOps",
	},
	{
		code: "DM",
		copy: "Audience, content, channels, campaigns, measurement and responsible AI workflows.",
		title: "Digital Marketing with AI",
	},
	{
		code: "SG",
		copy: "Customer research, outreach, discovery, pipeline thinking and communication.",
		title: "Sales & Go-to-Market",
	},
]

const ROLE_PATHWAYS = [
	{
		code: "AI",
		copy: "Prompt workflows, AI agents, evaluation, automation and responsible implementation.",
		title: "AI & Automation",
	},
	{
		code: "DA",
		copy: "Data preparation, SQL, dashboards, interpretation and stakeholder communication.",
		title: "Data Analyst",
	},
	{
		code: "SD",
		copy: "Web development, application workflows, deployment and project explanation.",
		title: "Software Developer",
	},
	{
		code: "CY",
		copy: "Security foundations, threat analysis, defensive practice and lab evidence.",
		title: "Cybersecurity",
	},
	{
		code: "CD",
		copy: "Cloud foundations, delivery pipelines, automation and operational thinking.",
		title: "Cloud & DevOps",
	},
	{
		code: "BG",
		copy: "Digital marketing, customer research, sales communication and measurement.",
		title: "Business Growth",
	},
]

const SOLUTION_CARDS = [
	{
		code: "UP",
		copy: "Live, guided skill cohorts that move students from baseline concepts to applied work in a defined pathway.",
		href: "/colleges/student-upskilling",
		link: "Explore upskilling",
		title: "Student upskilling",
	},
	{
		code: "CR",
		copy: "Certification pathways with curriculum, practice, assessment and project evidence across tech and business.",
		href: "/colleges/certifications",
		link: "Explore certifications",
		title: "Industry certifications",
	},
	{
		code: "PT",
		copy: "Role discovery, resume evidence, interview practice and application readiness connected to actual student work.",
		href: "/colleges/placement-training",
		link: "Explore placement training",
		title: "Placement training",
	},
	{
		code: "HR",
		copy: "Role-aligned learning pathways that combine skills, projects, evaluation and career-readiness checkpoints.",
		href: "/colleges/hire-ready-programs",
		link: "Explore hire-ready programs",
		title: "Hire-ready programs",
	},
	{
		code: "CT",
		copy: "Combine selected tracks, timelines and evidence requirements around departments, student levels and goals.",
		href: "/colleges/contact-partnerships",
		link: "Scope a pathway",
		title: "Custom campus pathway",
	},
	{
		code: "PC",
		copy: "Bring your current curriculum, placement priorities and cohort context to a structured scoping conversation.",
		href: "/colleges/contact-partnerships",
		link: "Prepare the conversation",
		title: "Partnership consultation",
	},
]

const EXPLORE_CARDS = SOLUTION_CARDS.slice(0, 4).map(card => ({
	...card,
	copy:
		card.code === "UP"
			? "Live, applied skill cohorts for departments and student groups."
			: card.code === "CR"
				? "Structured pathways with curriculum, assessment and project evidence."
				: card.code === "PT"
					? "Role, resume, portfolio, interview and application preparation."
					: "One pathway connecting role skills, evidence and career communication.",
	link: "Explore",
	title:
		card.code === "CR"
			? "Certifications"
			: card.code === "HR"
				? "Hire-ready programs"
				: card.title,
}))

export const COLLEGE_PAGES = {
	certifications: {
		canonical: "https://letsupgrade.in/colleges/certifications",
		cta: {
			href: "/colleges/contact-partnerships",
			kicker: "Choose the evidence first",
			label: "Discuss Certifications",
			title: "Design a certification pathway students can explain, not merely list.",
		},
		description:
			"Offer project-led certification programs for college students across AI, data analytics, development, cybersecurity, cloud, marketing and sales.",
		hero: {
			actions: [
				{
					href: "/colleges/contact-partnerships",
					label: "Build a Certification Plan",
					variant: "default",
				},
				{
					href: "#catalogue",
					label: "View Skill Tracks",
					variant: "outline",
				},
			],
			alt: "Two students reviewing coursework together on a laptop and notebook",
			crumbs: crumbs("Certifications"),
			eyebrow: "College certifications",
			headline: "A certificate backed by",
			highlight: "work completed.",
			image: "/assets/colleges/certification-study.jpg",
			lead: "Give students a structured skill pathway where completion connects to live learning, practice, assessment and a project they can explain beyond the certificate itself.",
			panel: {
				badge: "Beyond attendance",
				label: "Certification evidence",
				steps: [
					{
						n: "01",
						text: "A defined sequence of concepts and applied skills.",
						title: "Curriculum",
					},
					{
						n: "02",
						text: "Tasks and checkpoints throughout the learning journey.",
						title: "Practice",
					},
					{
						n: "03",
						text: "A clear completion standard configured for the pathway.",
						title: "Assessment",
					},
					{
						n: "04",
						text: "Practical evidence that makes the skill easier to discuss.",
						title: "Project",
					},
				],
				title: "Completion with context",
			},
			priority: true,
		},
		proof: {
			items: [
				"Defined curriculum",
				"Applied tasks",
				"Assessment criteria",
				"Project evidence",
			],
			label: "Four parts of credible completion",
			title: "Four parts of credible completion",
		},
		sections: [
			{
				copy: "Each track can serve as a focused cohort or form part of a broader upskilling and placement-readiness plan.",
				eyebrow: "Certification catalogue",
				id: "catalogue",
				programs: CERT_TRACKS,
				title: "Choose pathways aligned with student direction.",
				type: "programs",
			},
			{
				alt: true,
				copy: "The track establishes the skill destination. Partnership scoping aligns prerequisites, project depth, timeline and review points with the students involved.",
				cta: {
					href: "/colleges/contact-partnerships",
					label: "Discuss Your Cohort",
				},
				eyebrow: "Program configuration",
				items: [
					{
						copy: "Clarify year, department, prerequisites and any required baseline support.",
						title: "Cohort eligibility",
					},
					{
						copy: "Plan live sessions, practice windows and completion dates around academic commitments.",
						title: "Delivery rhythm",
					},
					{
						copy: "Agree what students must submit, demonstrate or pass before completion.",
						title: "Evidence standard",
					},
					{
						copy: "Define the progress and completion signals required for institutional review.",
						title: "College visibility",
					},
				],
				title: "Keep a shared standard without ignoring cohort context.",
				type: "split-list",
			},
			{
				centered: true,
				eyebrow: "Certification journey",
				items: [
					{
						copy: "Set expectations, explain the learning journey and establish prerequisites.",
						title: "Orient",
					},
					{
						copy: "Complete live sessions and guided practice across the curriculum.",
						title: "Learn",
					},
					{
						copy: "Complete the assessment and required project or portfolio artifact.",
						title: "Demonstrate",
					},
					{
						copy: "Use the completed work in a resume, portfolio and interview explanation.",
						title: "Translate",
					},
				],
				title: "From enrolment to evidence.",
				type: "process",
			},
		],
		title: "Industry Certification Programs for Colleges",
	},
	"contact-partnerships": {
		canonical: "https://letsupgrade.in/colleges/contact-partnerships",
		cta: {
			external: true,
			href: COLLEGE_CONTACT_URL,
			kicker: "Official contact route",
			label: "Start a Business Enquiry",
			lead: "Select “business-related queries” on the LetsUpgrade contact portal.",
			title: "Ready with your cohort, outcome and timeline?",
		},
		description:
			"Prepare and start a college partnership conversation with LetsUpgrade for student upskilling, certifications, placement training or hire-ready programs.",
		hero: {
			actions: [
				{
					external: true,
					href: COLLEGE_CONTACT_URL,
					label: "Start a Business Enquiry",
					variant: "default",
				},
				{
					href: "#prepare",
					label: "Prepare Your Brief",
					variant: "outline",
				},
			],
			alt: "A handshake closing a college partnership discussion",
			crumbs: crumbs("Contact Partnerships"),
			eyebrow: "Partnership contact",
			headline: "Start with the campus outcome you need to",
			highlight: "improve.",
			image: "/assets/colleges/partnership-handshake.jpg",
			lead: "Prepare a focused partnership brief, then use LetsUpgrade’s official contact portal and select the business-related query option. This keeps your enquiry in the established support workflow.",
			note: "The official contact portal opens in a new tab.",
			panel: {
				badge: "Three inputs",
				label: "Partnership enquiry steps",
				steps: [
					{
						n: "01",
						text: "Institution, department, year and approximate student group.",
						title: "Cohort",
					},
					{
						n: "02",
						text: "Skills, certification, placement or role-readiness priority.",
						title: "Outcome",
					},
					{
						n: "03",
						text: "Preferred academic period, constraints and decision timeline.",
						title: "Window",
					},
				],
				title: "Fastest route to a useful discussion",
			},
			priority: true,
		},
		proof: {
			items: [
				"No invented contact details",
				"Clear campus context",
				"Focused partnership brief",
				"Established support portal",
			],
			label: "Use the official business-query route",
			title: "Use the official business-query route",
		},
		sections: [
			{
				brief: [
					"Institution name, campus location and your role.",
					"Department, student year and approximate cohort size.",
					"Primary outcome: upskilling, certification, placements or a role-aligned pathway.",
					"Priority skills or target roles, if already identified.",
					"Preferred delivery window and academic constraints.",
					"How your team would like progress and completion to be reviewed.",
				],
				copy: "You do not need a finished program specification. A short description of the cohort, priority and timeline is enough to begin scoping.",
				eyebrow: "Prepare the enquiry",
				id: "prepare",
				routes: [
					{
						copy: "For live skill cohorts and practical student development.",
						title: "Upskilling",
					},
					{
						copy: "For structured certification pathways with project evidence.",
						title: "Certification",
					},
					{
						copy: "For resume, portfolio, interview and application readiness.",
						title: "Placements",
					},
					{
						copy: "For a connected role-to-evidence student program.",
						title: "Hire-ready pathway",
					},
				],
				title: "Bring enough context to make the first conversation useful.",
				type: "contact",
			},
			{
				alt: true,
				centered: true,
				eyebrow: "What happens next",
				items: [
					{
						copy: "Send the campus context through the official business-query contact route.",
						title: "Submit",
					},
					{
						copy: "Discuss the student audience, current gap, desired outcome and practical constraints.",
						title: "Clarify",
					},
					{
						copy: "Map the suitable track, delivery model, evidence requirements and review cadence.",
						title: "Scope",
					},
					{
						copy: "Review the proposed pathway against academic priorities and operational fit.",
						title: "Decide",
					},
				],
				title: "A partnership starts with fit, not a fixed package.",
				type: "process",
			},
			{
				cards: EXPLORE_CARDS,
				cols: 2,
				copy: "If the requirement is still broad, review the solution pages before preparing your business enquiry.",
				eyebrow: "Explore before contacting",
				split: true,
				title: "Choose the closest starting point.",
				type: "capabilities",
			},
		],
		title: "Contact LetsUpgrade for College Partnerships",
	},
	"hire-ready-programs": {
		canonical: "https://letsupgrade.in/colleges/hire-ready-programs",
		cta: {
			href: "/colleges/contact-partnerships",
			kicker: "Start with the target role",
			label: "Design a Program",
			title: "Map the skills, projects and career evidence your student cohort needs next.",
		},
		description:
			"Build role-aligned college programs combining skill development, projects, assessments, portfolio evidence and placement preparation for students.",
		hero: {
			actions: [
				{
					href: "/colleges/contact-partnerships",
					label: "Design a Hire-Ready Program",
					variant: "default",
				},
				{
					href: "#architecture",
					label: "See the Architecture",
					variant: "outline",
				},
			],
			alt: "Faculty and industry partners celebrating a successful working session",
			crumbs: crumbs("Hire-Ready Programs"),
			eyebrow: "Hire-ready pathways",
			headline: "Connect a target role to the work students must",
			highlight: "prove.",
			image: "/assets/colleges/hire-ready-team.jpg",
			lead: "Build one pathway across role fundamentals, applied projects, evaluation, portfolio communication and placement preparation instead of treating each as a separate intervention.",
			panel: {
				badge: "One connected pathway",
				label: "Hire-ready architecture",
				steps: [
					{
						n: "01",
						text: "Define entry-level responsibilities and recurring skill expectations.",
						title: "Role",
					},
					{
						n: "02",
						text: "Build the foundations required to perform representative work.",
						title: "Skill",
					},
					{
						n: "03",
						text: "Use projects and assessments to make application visible.",
						title: "Evidence",
					},
					{
						n: "04",
						text: "Practise presenting, defending and improving that evidence.",
						title: "Readiness",
					},
				],
				title: "Role-to-evidence map",
			},
			priority: true,
		},
		proof: {
			items: [
				"Role-aligned curriculum",
				"Practical projects",
				"Evaluation checkpoints",
				"Career translation",
			],
			label: "A connected readiness model",
			title: "A connected readiness model",
		},
		sections: [
			{
				cards: [
					{
						code: "RB",
						copy: "What work does an entry-level candidate perform, and what does good performance look like?",
						title: "Role brief",
					},
					{
						code: "SF",
						copy: "Which concepts and tools must students understand before they can attempt representative work?",
						title: "Skill foundations",
					},
					{
						code: "GW",
						copy: "Where can students practise with support before making independent project decisions?",
						title: "Guided work",
					},
					{
						code: "PE",
						copy: "What can a student build, analyse or present that resembles a meaningful part of the role?",
						title: "Project evidence",
					},
					{
						code: "EV",
						copy: "Which rubric, assessment and review signals show completion without relying on attendance alone?",
						title: "Evaluation",
					},
					{
						code: "CT",
						copy: "Can the student turn the work into a clear resume claim and defend decisions in an interview?",
						title: "Career translation",
					},
				],
				copy: "The pathway becomes measurable when each stage has an explicit purpose and a defined artifact, checkpoint or demonstration.",
				eyebrow: "Program architecture",
				id: "architecture",
				title: "Every stage answers a different readiness question.",
				type: "features",
			},
			{
				alt: true,
				copy: "A role direction gives the pathway focus. The institution and LetsUpgrade then scope prerequisite support, projects, evaluation and career preparation for the cohort.",
				cta: {
					href: "/colleges/contact-partnerships",
					label: "Scope a Role Pathway",
				},
				eyebrow: "Role pathways",
				programs: ROLE_PATHWAYS,
				title: "Configure depth around the target outcome.",
				type: "split-programs",
			},
			{
				centered: true,
				eyebrow: "Readiness gates",
				items: [
					{
						copy: "Confirm students can use the core concepts and tools required for guided work.",
						title: "Foundation gate",
					},
					{
						copy: "Review whether students can complete representative tasks with decreasing support.",
						title: "Application gate",
					},
					{
						copy: "Assess the project, decisions, documentation and stated limitations.",
						title: "Evidence gate",
					},
					{
						copy: "Check whether students can present the work clearly in resumes and interviews.",
						title: "Career gate",
					},
				],
				title: "Progress when the evidence is ready.",
				type: "process",
			},
		],
		title: "Hire-Ready Programs for College Students",
	},
	hub: {
		canonical: "https://letsupgrade.in/colleges",
		cta: {
			href: "/colleges/contact-partnerships",
			kicker: "Start with your campus context",
			label: "Plan a Partnership",
			title: "Bring the student cohort, target outcome and timeline. We will shape the pathway around them.",
		},
		description:
			"Partner with LetsUpgrade for live student upskilling, industry certifications, portfolio projects and placement preparation across tech and business skills.",
		hero: {
			actions: [
				{
					href: "/colleges/contact-partnerships",
					label: "Discuss a Partnership",
					variant: "default",
				},
				{
					href: "#solutions",
					label: "Explore Solutions",
					variant: "outline",
				},
			],
			alt: "College students collaborating around laptops during a project session",
			crumbs: crumbs("For Colleges", true),
			eyebrow: "College partnerships",
			headline: "Turn student learning into visible",
			highlight: "career evidence.",
			image: "/assets/colleges/campus-collaboration.jpg",
			lead: "Design a campus upskilling journey that connects live instruction with projects, certifications, portfolio proof and placement preparation — configured around your students and academic calendar.",
			note: "For universities, autonomous colleges, departments and placement cells.",
			panel: {
				badge: "Configured for your cohort",
				label: "Partnership journey",
				steps: [
					{
						n: "01",
						text: "Map student level, target roles and curriculum gaps.",
						title: "Baseline",
					},
					{
						n: "02",
						text: "Deliver guided cohorts with practice and mentor context.",
						title: "Learn live",
					},
					{
						n: "03",
						text: "Complete projects, assessments and verified milestones.",
						title: "Build proof",
					},
					{
						n: "04",
						text: "Translate learning into portfolios and interview stories.",
						title: "Prepare",
					},
				],
				title: "One connected student journey",
			},
			priority: true,
		},
		proof: {
			items: [
				"Live cohort delivery",
				"Portfolio evidence",
				"Progress visibility",
				"Career preparation",
			],
			label: "Partnership capabilities",
			title: "Designed around measurable student work",
		},
		sections: [
			{
				cards: SOLUTION_CARDS,
				copy: "Use one focused intervention or connect multiple solutions into a semester, department or institution-level pathway.",
				eyebrow: "Partnership solutions",
				id: "solutions",
				title: "Start with the outcome your campus needs.",
				type: "capabilities",
			},
			{
				alt: true,
				copy: "Participation matters, but career readiness needs stronger evidence. A partnership can define what students complete, build, explain and improve at each stage.",
				cta: {
					href: "/colleges/hire-ready-programs",
					label: "See the hire-ready model",
				},
				eyebrow: "What changes",
				image: "/assets/colleges/campus-planning.jpg",
				imageAlt:
					"Campus teams reviewing notes and plans together on laptops",
				items: [
					{
						copy: "Align the audience, prerequisite level, role direction and success criteria.",
						title: "Before the cohort",
					},
					{
						copy: "Use live practice, assignments and checkpoints to find gaps while there is time to intervene.",
						title: "During learning",
					},
					{
						copy: "Require a project, assessment or portfolio artifact that makes skill application visible.",
						title: "At completion",
					},
					{
						copy: "Help students turn their work into clear resume bullets, demonstrations and interview examples.",
						title: "Before placements",
					},
				],
				title: "Move beyond attendance as the only signal.",
				type: "split-list",
			},
			{
				centered: true,
				eyebrow: "Partnership process",
				items: [
					{
						copy: "Understand students, departments, existing initiatives and placement priorities.",
						title: "Discover",
					},
					{
						copy: "Choose tracks, delivery model, evidence checkpoints, schedule and review cadence.",
						title: "Design",
					},
					{
						copy: "Run the agreed learning journey with live guidance, practice and learner support.",
						title: "Deliver",
					},
					{
						copy: "Evaluate completion, project evidence, assessment signals and next-step readiness.",
						title: "Review",
					},
				],
				title: "A clear route from scope to review.",
				type: "process",
			},
			{
				alt: true,
				centered: true,
				eyebrow: "Common questions",
				faqs: [
					{
						answer: "Yes. Cohort, skill track, schedule, project depth and career preparation can be scoped around the participating department, year and intended outcomes.",
						question:
							"Can the pathway be configured for a specific department or year?",
					},
					{
						answer: "A partnership can define completion checkpoints across live learning, assignments, projects and assessments so college teams can review progress against the agreed plan.",
						question: "How is student progress made visible?",
					},
					{
						answer: "No. Available pathways span technical and business skills, including AI, data, development, cybersecurity, cloud, digital marketing and sales.",
						question:
							"Are college programs limited to technical skills?",
					},
				],
				title: "Before we scope a partnership.",
				type: "faq",
			},
		],
		title: "College Upskilling & Placement Partnerships",
	},
	"placement-training": {
		canonical: "https://letsupgrade.in/colleges/placement-training",
		cta: {
			href: "/colleges/contact-partnerships",
			kicker: "Prepare before opportunity arrives",
			label: "Plan Placement Training",
			title: "Build a placement-readiness plan around your roles, student evidence and recruitment calendar.",
		},
		description:
			"Prepare college students for placements with role targeting, resume evidence, portfolio reviews, interview practice and focused application readiness.",
		hero: {
			actions: [
				{
					href: "/colleges/contact-partnerships",
					label: "Plan Placement Training",
					variant: "default",
				},
				{
					href: "#readiness",
					label: "See Readiness Areas",
					variant: "outline",
				},
			],
			alt: "A student in a professional interview conversation across a desk",
			crumbs: crumbs("Placement Training"),
			eyebrow: "Placement preparation",
			headline: "Help students explain why they are",
			highlight: "ready.",
			image: "/assets/colleges/placement-interview.jpg",
			lead: "Connect role discovery, project evidence, resume writing, interview practice and application habits into one structured placement-preparation journey.",
			panel: {
				badge: "Built before interviews",
				label: "Placement readiness",
				steps: [
					{
						n: "01",
						text: "Choose realistic role families and understand their work.",
						title: "Target",
					},
					{
						n: "02",
						text: "Select projects and activities that demonstrate relevant skills.",
						title: "Prove",
					},
					{
						n: "03",
						text: "Turn evidence into clear resume bullets and portfolio stories.",
						title: "Present",
					},
					{
						n: "04",
						text: "Answer role, project and behavioural questions with examples.",
						title: "Practise",
					},
				],
				title: "Career evidence stack",
			},
			priority: true,
		},
		proof: {
			items: [
				"Role clarity",
				"Resume relevance",
				"Project narratives",
				"Interview practice",
			],
			label: "Preparation built around evidence",
			title: "Preparation built around evidence",
		},
		sections: [
			{
				cards: [
					{
						code: "RT",
						copy: "Compare role families, entry-level expectations and recurring skills before writing generic applications.",
						title: "Role targeting",
					},
					{
						code: "RE",
						copy: "Replace adjectives with project scope, actions, tools, outputs and honest results.",
						title: "Resume evidence",
					},
					{
						code: "PF",
						copy: "Make projects easy to understand, open and discuss, with decisions and limitations documented.",
						title: "Portfolio review",
					},
					{
						code: "TI",
						copy: "Practise explaining foundations, solving unfamiliar problems and checking assumptions aloud.",
						title: "Technical interviews",
					},
					{
						code: "BI",
						copy: "Build concise examples from projects, teamwork, setbacks, initiative and learning.",
						title: "Behavioural interviews",
					},
					{
						code: "AP",
						copy: "Use fit checks, tailored evidence and an application tracker to create a repeatable process.",
						title: "Application practice",
					},
				],
				copy: "Students need repeated opportunities to connect their own work to the role, improve the explanation and respond when a question goes deeper.",
				eyebrow: "Readiness areas",
				id: "readiness",
				title: "Placement preparation is more than one mock interview.",
				type: "features",
			},
			{
				alt: true,
				copy: "A structured sequence helps identify whether students are blocked by missing evidence, unclear communication or gaps in role fundamentals while support can still be targeted.",
				cta: {
					href: "/colleges/hire-ready-programs",
					label: "See Hire-ready Programs",
				},
				eyebrow: "Placement-cell view",
				image: "/assets/colleges/placement-coaching.jpg",
				imageAlt:
					"A mentor and student reviewing interview notes in a professional setting",
				items: [
					{
						copy: "The student can explain what the role does and which evidence is relevant.",
						title: "Role brief understood",
					},
					{
						copy: "Claims connect to work the student can demonstrate and defend.",
						title: "Resume evidence reviewed",
					},
					{
						copy: "The student can explain problem, process, result, trade-offs and next improvement.",
						title: "Project walkthrough practised",
					},
					{
						copy: "Practice produces specific next actions rather than only a readiness label.",
						title: "Interview gaps recorded",
					},
				],
				title: "Use readiness checkpoints before the hiring event.",
				type: "split-list",
			},
			{
				centered: true,
				eyebrow: "Training sequence",
				items: [
					{
						copy: "Map target roles, existing projects and the cohort's current readiness gaps.",
						title: "Diagnose",
					},
					{
						copy: "Improve resumes, project documentation and concise career introductions.",
						title: "Build evidence",
					},
					{
						copy: "Practise role-specific, technical, project and behavioural conversations.",
						title: "Simulate",
					},
					{
						copy: "Turn feedback into a focused plan before the next interview opportunity.",
						title: "Improve",
					},
				],
				title: "Prepare, practise, review, repeat.",
				type: "process",
			},
		],
		title: "Placement Training for College Students",
	},
	"student-upskilling": {
		canonical: "https://letsupgrade.in/colleges/student-upskilling",
		cta: {
			href: "/colleges/contact-partnerships",
			kicker: "Build the right starting point",
			label: "Plan a Cohort",
			title: "Share the department, student year and target skills. Scope a cohort around the real gap.",
		},
		description:
			"Run live, project-led student upskilling programs for college cohorts across AI, data, development, cybersecurity, cloud and business skills.",
		hero: {
			actions: [
				{
					href: "/colleges/contact-partnerships",
					label: "Plan an Upskilling Cohort",
					variant: "default",
				},
				{ href: "#model", label: "See the Model", variant: "outline" },
			],
			alt: "Students pair-programming in a college computer lab",
			crumbs: crumbs("Student Upskilling"),
			eyebrow: "Student upskilling",
			headline: "Build skills students can",
			highlight: "demonstrate.",
			image: "/assets/colleges/upskilling-lab.jpg",
			lead: "Give a department or campus cohort a guided path from baseline knowledge to applied projects, with live instruction, structured practice and visible completion checkpoints.",
			panel: {
				badge: "Applied throughout",
				label: "Upskilling model",
				steps: [
					{
						n: "01",
						text: "Concepts connected to relevant student and career contexts.",
						title: "Understand",
					},
					{
						n: "02",
						text: "Guided tasks that reveal misunderstanding early.",
						title: "Practise",
					},
					{
						n: "03",
						text: "Projects that require decisions rather than repetition.",
						title: "Apply",
					},
					{
						n: "04",
						text: "Portfolio stories students can defend in an interview.",
						title: "Explain",
					},
				],
				title: "Cohort learning loop",
			},
			priority: true,
		},
		proof: {
			items: [
				"Live guidance",
				"Structured practice",
				"Applied projects",
				"Completion checkpoints",
			],
			label: "Designed for practical participation",
			title: "Designed for practical participation",
		},
		sections: [
			{
				cards: [
					{
						code: "BL",
						copy: "Identify prerequisite gaps and group the cohort around an appropriate starting point instead of assuming equal readiness.",
						title: "Baseline mapping",
					},
					{
						code: "LV",
						copy: "Use instructor-led sessions for explanation, demonstration, questions and guided decision-making.",
						title: "Live learning",
					},
					{
						code: "PR",
						copy: "Connect each concept to a task, checkpoint or reflection rather than waiting for one final assessment.",
						title: "Practice rhythm",
					},
					{
						code: "PJ",
						copy: "Finish with an artifact that makes the learner's process, output and limitations visible.",
						title: "Project evidence",
					},
					{
						code: "RV",
						copy: "Track agreed completion and assessment milestones so campus teams can identify support needs.",
						title: "Review signals",
					},
					{
						code: "CR",
						copy: "Help students explain what they built, the skills used and the problem the work addresses.",
						title: "Career translation",
					},
				],
				copy: "The delivery model can be configured to match student level and timetable while preserving the work students need to complete.",
				eyebrow: "Cohort design",
				id: "model",
				title: "Four layers make learning actionable.",
				type: "features",
			},
			{
				alt: true,
				copy: "Select one focused skill track or combine pathways for different departments and career directions.",
				cta: {
					href: "/colleges/certifications",
					label: "Explore Certifications",
				},
				eyebrow: "Available pathways",
				image: "/assets/colleges/upskilling-classroom.jpg",
				imageAlt:
					"Students working at desktop computers in a bright classroom",
				programs: SKILL_PATHWAYS,
				title: "Technical and business skills in one partnership model.",
				type: "split-programs",
			},
			{
				centered: true,
				eyebrow: "Delivery journey",
				items: [
					{
						copy: "Confirm audience, outcomes, starting level, delivery window and constraints.",
						title: "Scope",
					},
					{
						copy: "Orient students to expectations, schedule, platform and required evidence.",
						title: "Onboard",
					},
					{
						copy: "Deliver live sessions, guided work, projects and agreed progress reviews.",
						title: "Run the cohort",
					},
					{
						copy: "Review completion, project evidence and the next career-readiness step.",
						title: "Close the loop",
					},
				],
				title: "Configured around the academic calendar.",
				type: "process",
			},
		],
		title: "Student Upskilling Programs for Colleges",
	},
}

export const COLLEGE_SLUGS = Object.keys(COLLEGE_PAGES).filter(
	slug => slug !== "hub",
)

export const getCollegePage = slug => COLLEGE_PAGES[slug] || null
