export const RESOURCE_CONTACT_URL = "https://www.letsupgrade.in/contact"
export const RESOURCE_COMMUNITY_URL = "https://www.letsupgrade.in/community"
export const RESOURCE_YOUTUBE_URL = "https://www.youtube.com/@letsupgrade_in"
export const RESOURCE_LINKEDIN_URL =
	"https://www.linkedin.com/company/letsupgrade-in"

const crumbs = current => [
	{ href: "/", label: "Home" },
	{ label: "Resources" },
	{ label: current },
]

export const SKILL_FIT_QUESTIONS = [
	{
		hint: "Choose the work itself, not the job title that sounds most familiar.",
		options: [
			{
				label: "Turning an unclear request into a useful AI-assisted workflow",
				scores: { ai: 3, development: 1 },
			},
			{
				label: "Finding the reason behind a change in a dataset",
				scores: { business: 1, data: 3 },
			},
			{
				label: "Building an interface or application people can use",
				scores: { ai: 1, development: 3 },
			},
			{
				label: "Understanding an audience and improving how a solution reaches them",
				scores: { business: 3, data: 1 },
			},
		],
		text: "Which kind of problem would you most enjoy working through?",
	},
	{
		hint: "Think about assignments or personal projects you have enjoyed.",
		options: [
			{
				label: "A tested prompt system, assistant or automation",
				scores: { ai: 3 },
			},
			{
				label: "A dashboard, analysis or evidence-backed recommendation",
				scores: { data: 3 },
			},
			{
				label: "A deployed page, feature or working prototype",
				scores: { development: 3 },
			},
			{
				label: "A campaign, pitch, growth plan or customer insight",
				scores: { business: 3 },
			},
		],
		text: "What type of output feels most satisfying to complete?",
	},
	{
		hint: "There is no better option; each reflects a different working style.",
		options: [
			{
				label: "Check the instructions, context and evaluation criteria",
				scores: { ai: 3, business: 1 },
			},
			{
				label: "Inspect the source, assumptions and calculation",
				scores: { data: 3 },
			},
			{
				label: "Reproduce the issue and trace the system step by step",
				scores: { development: 3 },
			},
			{
				label: "Revisit the audience, message and decision process",
				scores: { business: 3 },
			},
		],
		text: "When something fails, which investigation sounds most natural?",
	},
	{
		hint: "Select what you would realistically start, not what you think you should choose.",
		options: [
			{
				label: "Compare AI outputs and improve the workflow",
				scores: { ai: 3 },
			},
			{
				label: "Explore a public dataset and explain one pattern",
				scores: { data: 3 },
			},
			{
				label: "Rebuild a small product interaction",
				scores: { development: 3 },
			},
			{
				label: "Analyse how a real product attracts and converts users",
				scores: { business: 3 },
			},
		],
		text: "Which learning activity would you choose for a free afternoon?",
	},
	{
		hint: "This can be an aspiration rather than a skill you already have.",
		options: [
			{
				label: "Designing reliable human-and-AI workflows",
				scores: { ai: 3 },
			},
			{
				label: "Turning evidence into a clear decision",
				scores: { data: 3 },
			},
			{
				label: "Turning ideas into dependable software",
				scores: { development: 3 },
			},
			{
				label: "Understanding people and communicating value",
				scores: { business: 3 },
			},
		],
		text: "Which strength do you most want to develop?",
	},
	{
		hint: "Pick the evidence you would most like to discuss in an interview.",
		options: [
			{
				label: "I can use AI responsibly and evaluate the result",
				scores: { ai: 3 },
			},
			{
				label: "I can clean information and defend a conclusion",
				scores: { data: 3 },
			},
			{
				label: "I can build, test and deploy a working solution",
				scores: { development: 3 },
			},
			{
				label: "I can research a market and design a practical growth action",
				scores: { business: 3 },
			},
		],
		text: "What should your next project help you prove?",
	},
]

export const SKILL_FIT_PATHS = {
	ai: {
		action: "Explore the AI pathway",
		description:
			"Your choices lean toward designing instructions, evaluating outputs and connecting AI tools into useful workflows.",
		href: "/program/generative-ai",
		mark: "AI",
		title: "AI & Automation",
	},
	business: {
		action: "Explore business growth",
		description:
			"Your choices lean toward understanding audiences, communicating value and improving how solutions reach people.",
		href: "/program/digital-marketing",
		mark: "BG",
		title: "Business Growth",
	},
	data: {
		action: "Explore data analytics",
		description:
			"Your choices lean toward evidence, structured investigation and turning data into a decision someone can use.",
		href: "/program/data-analytics",
		mark: "DA",
		title: "Data Analytics",
	},
	development: {
		action: "Explore development",
		description:
			"Your choices lean toward building, debugging and delivering working digital products through an iterative process.",
		href: "/program/websites-apps-ai",
		mark: "DV",
		title: "Software Development",
	},
}

export function filterResourceItems(items, { filter, query }) {
	const words = (query || "").toLowerCase().split(/\s+/).filter(Boolean)

	return items.filter(item => {
		const categories = item.categories || []
		const haystack = (item.search || "").toLowerCase()
		const filterOk = filter === "all" || categories.includes(filter)
		const searchOk = words.every(word => haystack.includes(word))
		return filterOk && searchOk
	})
}

export const RESOURCE_PAGES = {
	"career-guides": {
		canonical: "https://letsupgrade.in/resources/career-guides",
		cta: {
			href: "/resources/skill-assessments",
			kicker: "Unsure where to begin?",
			label: "Take the Assessment",
			title: "Use the six-question skill-fit check to choose a starting direction.",
		},
		description:
			"Explore practical career guides for students and freshers covering role roadmaps, portfolio projects, internships, resumes and interview preparation.",
		hero: {
			actions: [
				{ href: "#guides", label: "Browse Guides", variant: "default" },
				{
					href: "/resources/skill-assessments",
					label: "Take the Skill-fit Check",
					variant: "outline",
				},
			],
			alt: "A student sketching a plan on paper at a desk",
			card: {
				copy: "A roadmap becomes useful only when it changes what you do next.",
				items: [
					"Choose one target direction.",
					"Build one relevant piece of evidence.",
					"Practise explaining the decisions.",
				],
				kicker: "Use every guide in three passes",
				title: "Choose. Build. Explain.",
			},
			crumbs: crumbs("Career Guides"),
			eyebrow: "Career guides",
			headline: "Move from “what should I learn?” to",
			highlight: "what can I prove?",
			image: "/assets/resources/career-study.jpg",
			lead: "Use practical roadmaps to choose a direction, sequence your learning, build portfolio evidence and prepare for internships or fresher roles.",
		},
		sections: [
			{
				copy: "Filter by role direction or search for the skill, project or career stage you need next.",
				emptyCopy: "Try a broader skill or choose “All guides”.",
				emptyTitle: "No guide matches that search",
				eyebrow: "Guide library",
				filters: [
					{ id: "all", label: "All guides" },
					{ id: "ai", label: "AI" },
					{ id: "data", label: "Data" },
					{ id: "development", label: "Development" },
					{ id: "career", label: "Career preparation" },
				],
				id: "guides",
				items: [
					{
						categories: ["ai", "career"],
						copy: "Use AI for studying, research and career preparation without giving up verification or independent thinking.",
						href: "/blog/generative-ai-for-students",
						link: "Read guide",
						meta: ["12 min", "Beginner"],
						search: "Generative AI for students AI foundations studying research",
						tag: "AI foundations",
						title: "Generative AI for students",
					},
					{
						categories: ["ai"],
						copy: "Apply a five-part brief, test representative inputs and improve the instruction linked to each failure.",
						href: "/blog/prompt-engineering-guide",
						link: "Read guide",
						meta: ["15 min", "Practical"],
						search: "Write prompts that produce usable work prompt engineering",
						tag: "Prompt engineering",
						title: "Write prompts that produce usable work",
					},
					{
						categories: ["data", "career"],
						copy: "Sequence Excel, SQL, Power BI and project work into evidence you can explain in an interview.",
						href: "/blog/data-analyst-roadmap",
						link: "Read roadmap",
						meta: ["14 min", "Roadmap"],
						search: "Data analyst roadmap Excel SQL Power BI",
						tag: "Role roadmap",
						title: "Data analyst roadmap",
					},
					{
						categories: ["career"],
						copy: "Choose a target role, build proof, write a relevant resume and use application feedback to improve.",
						href: "/blog/how-to-get-an-internship",
						link: "Read guide",
						meta: ["13 min", "Action plan"],
						search: "Get an internship with no experience internships resume",
						tag: "Internships",
						title: "Get an internship with no experience",
					},
					{
						categories: ["development", "career"],
						copy: "Move from web foundations to a deployed application, with project scope and delivery decisions you can defend.",
						href: "/program/websites-apps-ai",
						link: "Explore pathway",
						meta: ["Program path", "Project-led"],
						search: "Software developer learning path development websites",
						tag: "Development",
						title: "Software developer learning path",
					},
					{
						categories: ["career"],
						copy: "Filter opportunities by category, work mode and experience, then inspect the responsibilities before applying.",
						href: "/internships",
						link: "Browse internships",
						meta: ["Opportunity hub", "Students"],
						search: "Find skill-based internships opportunity search",
						tag: "Opportunity search",
						title: "Find skill-based internships",
					},
				],
				searchLabel: "Search career guides",
				searchPlaceholder: "Search career guides",
				title: "Start with your current decision.",
				type: "library",
			},
			{
				copy: "Do not finish a roadmap with another list of saved links. Finish with a decision and a small piece of work.",
				eyebrow: "Use the guide",
				image: "/assets/resources/career-resume.jpg",
				imageAlt: "A resume on a clipboard beside a laptop",
				steps: [
					{
						copy: "Name the role family or skill problem you will focus on for the next learning cycle.",
						title: "Choose one direction",
					},
					{
						copy: "Choose a project small enough to finish and relevant enough to discuss.",
						title: "Select one project",
					},
					{
						copy: "Decide when you will inspect the work, identify the gap and choose the next step.",
						title: "Set a review date",
					},
				],
				title: "Turn reading into one visible result.",
				type: "split",
				white: true,
			},
		],
		title: "Career Guides for Students and Freshers",
	},
	community: {
		canonical: "https://letsupgrade.in/resources/community",
		cta: {
			external: true,
			href: RESOURCE_COMMUNITY_URL,
			kicker: "Join through the official route",
			label: "Open Community Hub",
			title: "Choose the community channel that matches how you want to learn.",
		},
		description:
			"Join the LetsUpgrade learning community to follow live programs, learn with peers, share project progress and discover practical technology resources.",
		hero: {
			actions: [
				{
					external: true,
					href: RESOURCE_COMMUNITY_URL,
					label: "Open Official Community",
					variant: "default",
				},
				{
					href: "#channels",
					label: "Choose a Channel",
					variant: "outline",
				},
			],
			alt: "Learners collaborating around a desk in a shared workspace",
			card: {
				copy: "The quality of a learning community depends on what each member contributes.",
				items: [
					"Show what you already tried.",
					"Credit sources and collaborators.",
					"Give specific, respectful feedback.",
				],
				kicker: "Good community participation",
				title: "Ask with context. Share with honesty.",
			},
			crumbs: crumbs("Community"),
			eyebrow: "LetsUpgrade community",
			headline: "Learn in public. Build with context. Share real",
			highlight: "progress.",
			image: "/assets/resources/workshop.jpg",
			lead: "Use the official LetsUpgrade community and social channels to follow live learning, meet peers and turn isolated practice into a consistent learning rhythm.",
		},
		sections: [
			{
				channels: [
					{
						code: "CM",
						copy: "Find the currently supported community platforms and routes for joining LetsUpgrade learners.",
						external: true,
						href: RESOURCE_COMMUNITY_URL,
						link: "Open community hub",
						primary: true,
						title: "Community hub",
					},
					{
						code: "YT",
						copy: "Follow live bootcamps, learning sessions, demonstrations and practical technology content.",
						external: true,
						href: RESOURCE_YOUTUBE_URL,
						link: "Open YouTube",
						title: "YouTube",
					},
					{
						code: "IN",
						copy: "Follow professional updates, events, partnerships and opportunities published by LetsUpgrade.",
						external: true,
						href: RESOURCE_LINKEDIN_URL,
						link: "Open LinkedIn",
						title: "LinkedIn",
					},
				],
				copy: "These links lead to official LetsUpgrade destinations. Use the central community page when you want to compare currently available channels.",
				eyebrow: "Official channels",
				id: "channels",
				title: "Choose how you want to participate.",
				type: "channels",
			},
			{
				copy: "A specific question with evidence attracts better answers than a screenshot and “not working.” Use this structure in technical, project and career discussions.",
				eyebrow: "Participate usefully",
				image: "/assets/resources/help-support.jpg",
				imageAlt:
					"Two people working through a problem together on laptops",
				steps: [
					{
						copy: "Explain what you are trying to build, understand or decide.",
						title: "State the goal",
					},
					{
						copy: "Include the smallest relevant code, output, error or decision you already tried.",
						title: "Show the attempt",
					},
					{
						copy: "Ask one focused question and separate what you know from what you assume.",
						title: "Name the gap",
					},
					{
						copy: "Share what resolved the issue so the discussion remains useful to others.",
						title: "Close the loop",
					},
				],
				title: "Make it easy for someone to help.",
				type: "split",
				white: true,
			},
			{
				cards: [
					{
						copy: "Be specific about the code, reasoning or evidence. Avoid personal attacks, mockery and discriminatory language.",
						tag: "Respect",
						title: "Critique the work, not the learner",
					},
					{
						copy: "Credit collaborators, disclose significant AI assistance and never present copied work as your own.",
						tag: "Integrity",
						title: "Represent your work honestly",
					},
					{
						copy: "Remove credentials, private records, employer material and identifying information before sharing screenshots or files.",
						tag: "Safety",
						title: "Protect private information",
					},
					{
						copy: "Keep questions connected to the channel topic and avoid repeated promotion or unsolicited messages.",
						tag: "Relevance",
						title: "Use the right channel",
					},
					{
						copy: "Share sources, steps and constraints so another learner can understand how a conclusion was reached.",
						tag: "Evidence",
						title: "Prefer reproducible help",
					},
					{
						copy: "Useful learning stories include mistakes, corrections and decisions — not only polished final outcomes.",
						tag: "Progress",
						title: "Share the unfinished middle",
					},
				],
				centered: true,
				eyebrow: "Community principles",
				title: "Create the learning space you want to enter.",
				type: "cards",
			},
		],
		title: "LetsUpgrade Learning Community for Students",
	},
	events: {
		canonical: "https://letsupgrade.in/resources/events",
		cta: {
			href: "/programs",
			kicker: "Current learning",
			label: "Explore Live Programs",
			title: "Choose a live certification track and build alongside the cohort.",
		},
		description:
			"Explore LetsUpgrade live learning formats including certification classes, codelabs, project sessions and career preparation events for students.",
		hero: {
			actions: [
				{
					href: "/programs",
					label: "View Current Programs",
					variant: "default",
				},
				{
					external: true,
					href: RESOURCE_YOUTUBE_URL,
					label: "Visit Official YouTube",
					variant: "outline",
				},
			],
			alt: "An audience watching a live learning session in an auditorium",
			card: {
				copy: "Live learning becomes more valuable when you arrive with context and leave with a next action.",
				items: [
					"Read the prerequisites.",
					"Bring one specific question.",
					"Complete the follow-up task.",
				],
				kicker: "A useful live session",
				title: "Prepare before you join.",
			},
			crumbs: crumbs("Events"),
			eyebrow: "Live learning events",
			headline: "Join with a question. Leave with something",
			highlight: "built.",
			image: "/assets/resources/events-live.jpg",
			lead: "Explore the live formats used across LetsUpgrade learning: guided certification classes, codelabs, project sessions and career preparation.",
		},
		sections: [
			{
				action: {
					href: "/resources/community",
					label: "Community Channels",
				},
				copy: "Dates and registration availability are published with the relevant live program or on official LetsUpgrade channels.",
				events: [
					{
						copy: "Follow a structured skill pathway, ask questions during the session and continue with guided practice.",
						href: "/programs",
						link: "View programs",
						tag: "Certification learning",
						title: "Live concept and demonstration sessions",
						type: "LIVE\nCLASS",
					},
					{
						copy: "Work through a defined technical outcome with checkpoints for setup, implementation and debugging.",
						href: "/programs",
						link: "Find a track",
						tag: "Hands-on build",
						title: "Guided codelabs and implementation sessions",
						type: "CODE\nLAB",
					},
					{
						copy: "Inspect how a project is scoped, built and explained, including trade-offs and next improvements.",
						href: "/blog",
						link: "Read guides",
						tag: "Proof of work",
						title: "Project walkthroughs and review sessions",
						type: "PROJECT\nROOM",
					},
					{
						copy: "Connect completed work to role requirements and practise presenting evidence clearly.",
						href: "/resources/career-guides",
						link: "Career guides",
						tag: "Career preparation",
						title: "Resume, portfolio and interview sessions",
						type: "CAREER\nCLINIC",
					},
				],
				eyebrow: "Event formats",
				title: "Choose the kind of participation you need.",
				type: "events",
			},
			{
				copy: "A session is a starting point. Capture the gap, complete the task and turn the result into evidence you can revisit.",
				eyebrow: "Before and after",
				image: "/assets/resources/events-notes.jpg",
				imageAlt: "A microphone on stage during a live session",
				steps: [
					{
						copy: "Review prerequisites and write the question you want the session to resolve.",
						title: "Before: check the starting point",
					},
					{
						copy: "Note why an approach works, not only the sequence of clicks or commands.",
						title: "During: record decisions",
					},
					{
						copy: "Repeat the task without following the demonstration line by line.",
						title: "After: reproduce independently",
					},
					{
						copy: "Save the output, difficulty and improvement as part of your learning record.",
						title: "Next: document the result",
					},
				],
				title: "Make one live hour continue working for you.",
				type: "split",
				white: true,
			},
			{
				centered: true,
				channels: [
					{
						code: "LU",
						copy: "Explore current certification tracks and enrolment journeys.",
						href: "/programs",
						link: "Browse programs",
						title: "LetsUpgrade platform",
					},
					{
						code: "YT",
						copy: "Watch live learning announcements, sessions and practical technology content.",
						external: true,
						href: RESOURCE_YOUTUBE_URL,
						link: "Open YouTube",
						title: "Official YouTube",
					},
					{
						code: "IN",
						copy: "Follow company updates, community activity and professional opportunities.",
						external: true,
						href: RESOURCE_LINKEDIN_URL,
						link: "Open LinkedIn",
						title: "Official LinkedIn",
					},
				],
				copy: "This page describes recurring learning formats. Confirm dates, speakers and registration on the relevant program page or official LetsUpgrade channel before planning attendance.",
				eyebrow: "Stay informed",
				title: "Use official channels for current schedules.",
				type: "channels",
			},
		],
		title: "Live Learning Events, Codelabs & Career Sessions",
	},
	"help-center": {
		canonical: "https://letsupgrade.in/resources/help-center",
		cta: null,
		description:
			"Find answers about LetsUpgrade accounts, live programs, recordings, projects, certificates, internships, jobs and partnership support.",
		hero: {
			actions: [
				{
					href: "#answers",
					label: "Search Answers",
					variant: "default",
				},
				{
					external: true,
					href: RESOURCE_CONTACT_URL,
					label: "Contact Official Support",
					variant: "outline",
				},
			],
			alt: "Hands typing on a laptop while looking up an answer",
			card: {
				copy: "Never include a password, OTP or full payment details.",
				items: [
					"The program or page involved.",
					"What you expected and what happened.",
					"A safe screenshot or exact error message.",
				],
				kicker: "Include this when contacting support",
				title: "Context speeds up resolution.",
			},
			crumbs: crumbs("Help Center"),
			eyebrow: "Help center",
			headline: "Find the next step without searching through",
			highlight: "everything.",
			image: "/assets/resources/help-laptop.jpg",
			lead: "Search common questions about your account, learning journey, projects, certificates, opportunities and institutional partnerships.",
		},
		sections: [
			{
				categories: [
					{
						code: "AC",
						copy: "Login, enrolment and Learning Centre access.",
						title: "Account",
					},
					{
						code: "LR",
						copy: "Live sessions, recordings, tasks and projects.",
						title: "Learning",
					},
					{
						code: "CF",
						copy: "Completion criteria, assessments and credentials.",
						title: "Certificates",
					},
					{
						code: "OP",
						copy: "Internships, fresher jobs, saving and applying.",
						title: "Opportunities",
					},
					{
						code: "CP",
						copy: "Campus partnerships and cohort programs.",
						title: "Colleges",
					},
					{
						code: "SP",
						copy: "Official contact routes and safe issue reporting.",
						title: "Support",
					},
				],
				copy: "Search all answers or narrow the list to one support area.",
				emptyCopy:
					"Try a shorter search or open the official contact portal.",
				emptyTitle: "No matching answer",
				eyebrow: "Search support",
				filters: [
					{ id: "all", label: "All answers" },
					{ id: "account", label: "Account" },
					{ id: "learning", label: "Learning" },
					{ id: "certificates", label: "Certificates" },
					{ id: "opportunities", label: "Opportunities" },
					{ id: "colleges", label: "Colleges" },
				],
				id: "answers",
				items: [
					{
						answer: "Open the program page, choose the enrolment action and complete the requested account details. The Learning Centre then shows the programs connected to your account.",
						categories: ["account", "learning"],
						question: "How do I join a free LetsUpgrade program?",
					},
					{
						answer: "Confirm that you are signed in with the same account used during enrolment. Refresh the Learning Centre and verify the program appears in your enrolled list before contacting support.",
						categories: ["account"],
						question:
							"I cannot see an enrolled program. What should I check?",
					},
					{
						answer: "When a recording is included in the program journey, it remains available through the relevant learning area so you can catch up and continue the required work.",
						categories: ["learning"],
						question: "What happens if I miss a live class?",
					},
					{
						answer: "Open the enrolled program in the Learning Centre and follow the project or portfolio submission step shown for that pathway. Requirements can differ between programs.",
						categories: ["learning"],
						question: "Where do I submit project work?",
					},
					{
						answer: "Certificate requirements depend on the program and may include defined learning stages, assessments and project work. Review the completion criteria shown inside the enrolled program.",
						categories: ["certificates", "learning"],
						question: "How do I earn a certificate?",
					},
					{
						answer: "A certificate becomes available after the required completion criteria are satisfied and processed for the program. Check the certificate area attached to your learning journey.",
						categories: ["certificates"],
						question: "When is a certificate available?",
					},
					{
						answer: "Use the dedicated Internships and Jobs pages to search and filter opportunity previews by category, work mode and experience.",
						categories: ["opportunities"],
						links: [
							{ href: "/internships", label: "Internships" },
							{ href: "/jobs", label: "Jobs" },
						],
						question:
							"Where can I find internships and fresher jobs?",
					},
					{
						answer: "No. Saving keeps the opportunity in your browser for later review. Use the Apply action and follow the stated application flow when you are ready.",
						categories: ["opportunities"],
						question:
							"Does saving an opportunity submit an application?",
					},
					{
						answer: "Review responsibilities, requirements, location, work mode and organisation details. Never pay for a job application or share passwords, OTPs or unnecessary identity documents.",
						categories: ["opportunities"],
						question: "What should I check before applying?",
					},
					{
						answer: "Yes. College teams can explore student upskilling, certifications, placement training and hire-ready pathways through the For Colleges section.",
						categories: ["colleges"],
						links: [{ href: "/colleges", label: "For Colleges" }],
						question: "Can colleges partner with LetsUpgrade?",
					},
					{
						answer: "Include the institution, department, student year, approximate cohort size, target outcome and preferred academic window. Then use the official business-query contact route.",
						categories: ["colleges"],
						question:
							"How should a college prepare a partnership enquiry?",
					},
					{
						answer: "Use the official LetsUpgrade contact portal and select the query type that best matches your request.",
						categories: [
							"account",
							"learning",
							"certificates",
							"opportunities",
							"colleges",
						],
						links: [
							{
								external: true,
								href: RESOURCE_CONTACT_URL,
								label: "official LetsUpgrade contact portal",
							},
						],
						question: "How do I contact LetsUpgrade support?",
					},
				].map(item => ({
					...item,
					search: `${item.question} ${item.answer}`,
				})),
				searchLabel: "Search help answers",
				searchPlaceholder: "Search accounts, certificates…",
				title: "What can we help you find?",
				type: "help",
			},
			{
				action: {
					external: true,
					href: RESOURCE_CONTACT_URL,
					label: "Open Contact Portal",
				},
				copy: "Choose the relevant query type and provide enough context to reproduce the issue without sharing secrets.",
				eyebrow: "Still blocked?",
				steps: [
					{
						copy: "Give the exact learning track, opportunity or account area involved.",
						title: "Name the program or page",
					},
					{
						copy: "Explain what you were trying to do and what happened instead.",
						title: "Describe the expected result",
					},
					{
						copy: "Never send passwords, OTPs, secret keys or complete payment-card information.",
						title: "Remove sensitive information",
					},
				],
				title: "Use the official support route safely.",
				type: "split",
				white: true,
			},
		],
		title: "LetsUpgrade Help Center: Programs, Accounts & Certificates",
	},
	"skill-assessments": {
		canonical: "https://letsupgrade.in/resources/skill-assessments",
		cta: {
			href: "/resources/career-guides",
			kicker: "Need more context?",
			label: "Browse Career Guides",
			title: "Compare practical career guides before choosing your first project.",
		},
		description:
			"Take a free six-question skill-fit check to explore a starting direction across AI, data analytics, software development and business growth.",
		hero: {
			actions: [
				{
					href: "#assessment",
					label: "Start the 3-Minute Check",
					variant: "default",
				},
				{
					href: "/resources/career-guides",
					label: "Browse Career Guides",
					variant: "outline",
				},
			],
			alt: "Students comparing options together on a laptop",
			card: {
				copy: "It uses work preferences to recommend a project direction you can test.",
				items: [
					"No account required.",
					"No answers are stored.",
					"Not an aptitude or hiring test.",
				],
				kicker: "What this assessment does",
				title: "Suggests a starting experiment.",
			},
			crumbs: crumbs("Skill Assessments"),
			eyebrow: "Skill-fit check",
			headline: "Choose a direction by the work you want to",
			highlight: "try.",
			image: "/assets/resources/assessment.jpg",
			lead: "Answer six practical questions and get a suggested starting pathway across AI, data analytics, software development or business growth.",
		},
		sections: [
			{
				copy: "Choose the answer that feels most realistic for you today. There are no correct answers.",
				eyebrow: "Quick assessment",
				id: "assessment",
				title: "What kind of work should you explore next?",
				type: "assessment",
			},
			{
				copy: "The result reflects your choices in six questions. Test it with a small project before making a large learning commitment.",
				eyebrow: "Use the result carefully",
				steps: [
					{
						copy: "Read the outcomes and project expectations rather than focusing only on the title.",
						title: "Open the recommended pathway",
					},
					{
						copy: "Spend one focused session on representative work from that direction.",
						title: "Try one small task",
					},
					{
						copy: "Ask whether you were curious enough to continue when the task became difficult.",
						title: "Review your response",
					},
					{
						copy: "Retake the check or deliberately test your second-choice pathway before deciding.",
						title: "Compare another direction",
					},
				],
				title: "A direction is a hypothesis, not an identity.",
				type: "split",
				white: true,
			},
			{
				cards: [
					{
						copy: "Design prompts, evaluate outputs and connect models to repeatable workflows with clear boundaries.",
						href: "/program/generative-ai",
						link: "Explore AI",
						tag: "AI",
						title: "AI & Automation",
					},
					{
						copy: "Clean information, query it, build reports and turn evidence into a recommendation.",
						href: "/program/data-analytics",
						link: "Explore data",
						tag: "Data",
						title: "Data Analytics",
					},
					{
						copy: "Build, debug, test and deploy interfaces or applications through an iterative workflow.",
						href: "/program/websites-apps-ai",
						link: "Explore development",
						tag: "Development",
						title: "Software Development",
					},
					{
						copy: "Research an audience, communicate value and improve how a solution reaches people.",
						href: "/program/digital-marketing",
						link: "Explore business growth",
						tag: "Business",
						title: "Business Growth",
					},
				],
				centered: true,
				eyebrow: "The four directions",
				title: "Each pathway creates different evidence.",
				type: "cards",
			},
		],
		title: "Free Skill-Fit Assessment for Students",
	},
}

export const RESOURCE_SLUGS = Object.keys(RESOURCE_PAGES)

export const getResourcePage = slug => RESOURCE_PAGES[slug] || null
