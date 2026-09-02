export const BLOG_FILTERS = [
	{ id: "all", label: "All guides" },
	{ id: "ai", label: "AI" },
	{ id: "data", label: "Data" },
	{ id: "career", label: "Career" },
]

export const BLOG_TOPICS = [
	{ id: "ai", label: "AI" },
	{ id: "data", label: "Data" },
	{ id: "career", label: "Internships" },
	{ filter: "career", id: "career-prep", label: "Career" },
]

export const BLOG_ARTICLES = [
	{
		canonical: "https://letsupgrade.in/blog/generative-ai-for-students",
		cardTitle:
			"How students can use Generative AI without outsourcing their thinking",
		category: "Artificial Intelligence",
		categoryId: "ai",
		cta: { href: "/program/generative-ai", label: "Learn AI free" },
		dek: "AI can shorten the distance between a question and a useful first draft. The student still has to decide what is true, what matters and what deserves to be submitted.",
		description:
			"Learn how to use Generative AI for studying, research, writing and career preparation without losing accuracy, privacy or independent thinking.",
		excerpt:
			"Use AI to learn faster while keeping verification, privacy and your own judgement in the loop.",
		featured: true,
		featuredLead:
			"A practical system for research, studying, writing and career preparation — with verification, privacy and academic integrity built in.",
		icon: "AI",
		image: "/assets/resources/blog-ai.jpg",
		imageAlt:
			"Abstract illustration of the letters AI in a digital network",
		level: "Beginner",
		linkLabel: "Read guide",
		next: {
			href: "/blog/prompt-engineering-guide",
			kicker: "Next guide",
			label: "Read the prompt guide",
			title: "Write prompts that produce usable work, not impressive-looking guesses.",
		},
		published: "17 Aug 2026",
		readTime: "12 min read",
		search: "generative AI students thinking research studying writing privacy integrity prompt",
		shortCrumb: "Generative AI for students",
		slug: "generative-ai-for-students",
		title: "How students can use Generative AI without outsourcing their thinking",
		toc: [
			{ href: "#what-ai-does", label: "What AI actually does" },
			{ href: "#learning-workflow", label: "A safe learning workflow" },
			{ href: "#study-use-cases", label: "Useful student use cases" },
			{ href: "#verification", label: "How to verify answers" },
			{ href: "#privacy", label: "Privacy and integrity" },
			{ href: "#skill-building", label: "Turn use into a skill" },
			{ href: "#faq", label: "Common questions" },
		],
		tocTitle: "In this guide",
	},
	{
		canonical: "https://letsupgrade.in/blog/data-analyst-roadmap",
		cardTitle:
			"Data analyst roadmap: Excel, SQL, Power BI and portfolio projects",
		category: "Data Analytics",
		categoryId: "data",
		cta: { href: "/program/data-analytics", label: "Learn data free" },
		dek: "The goal is not to collect tools. It is to move from a messy question to a reliable answer, then explain the answer clearly enough for someone to act on it.",
		description:
			"A skill-by-skill data analyst roadmap from Excel and SQL to Power BI, portfolio projects and interview-ready evidence.",
		excerpt:
			"A skill-by-skill route from spreadsheet fundamentals to a dashboard you can explain in an interview.",
		icon: "DA",
		level: "Roadmap",
		linkLabel: "Read roadmap",
		next: {
			href: "/blog/how-to-get-an-internship",
			kicker: "Next step",
			label: "Read the internship guide",
			title: "Turn your projects into an internship application with evidence.",
		},
		published: "17 Aug 2026",
		readTime: "14 min read",
		search: "data analyst roadmap excel sql power bi portfolio dashboard interviews",
		shortCrumb: "Data analyst roadmap",
		slug: "data-analyst-roadmap",
		title: "Data analyst roadmap: Excel, SQL, Power BI and portfolio projects",
		toc: [
			{ href: "#role", label: "What analysts actually do" },
			{ href: "#sequence", label: "The learning sequence" },
			{ href: "#excel", label: "Stage 1: Excel" },
			{ href: "#sql", label: "Stage 2: SQL" },
			{ href: "#power-bi", label: "Stage 3: Power BI" },
			{ href: "#portfolio", label: "Portfolio projects" },
			{ href: "#interviews", label: "Interview readiness" },
			{ href: "#faq", label: "Common questions" },
		],
		tocTitle: "In this roadmap",
	},
	{
		canonical: "https://letsupgrade.in/blog/how-to-get-an-internship",
		cardTitle: "How to get an internship when you have no experience",
		category: "Internships",
		categoryId: "career",
		cta: { href: "/internships", label: "Find internships" },
		dek: "“No experience” usually means no previous job title. It does not have to mean no evidence. A focused project can show the exact ability an internship is meant to develop.",
		description:
			"Get an internship with no experience by targeting one role, building proof, writing a relevant resume and applying with evidence.",
		excerpt:
			"Replace the empty-experience problem with targeted skills, small proof-of-work projects and focused applications.",
		icon: "IN",
		level: "Career",
		linkLabel: "Read guide",
		next: {
			href: "/internships",
			kicker: "Ready to apply?",
			label: "Browse internships",
			title: "Filter skill-based internships and inspect each role before applying.",
		},
		published: "17 Aug 2026",
		readTime: "13 min read",
		search: "internship no experience resume project apply interview tracker career",
		shortCrumb: "Internship with no experience",
		slug: "how-to-get-an-internship",
		title: "How to get an internship when you have no experience",
		toc: [
			{ href: "#choose-role", label: "Choose one target role" },
			{ href: "#proof", label: "Build proof of work" },
			{ href: "#resume", label: "Write a relevant resume" },
			{ href: "#search", label: "Search with intent" },
			{ href: "#apply", label: "Apply with evidence" },
			{ href: "#interview", label: "Prepare for interviews" },
			{ href: "#tracker", label: "Use a feedback loop" },
			{ href: "#faq", label: "Common questions" },
		],
		tocTitle: "In this guide",
	},
	{
		canonical: "https://letsupgrade.in/blog/prompt-engineering-guide",
		cardTitle:
			"Prompt engineering guide: write prompts that produce usable work",
		category: "Prompt Engineering",
		categoryId: "ai",
		cta: { href: "/program/generative-ai", label: "Learn prompting" },
		dek: "A good prompt is not a magic phrase. It is a compact brief: what needs to happen, what the model needs to know, what boundaries apply and how the result will be judged.",
		description:
			"A repeatable prompt engineering framework for context, constraints, examples, format and evaluation, with before-and-after prompts.",
		excerpt:
			"A repeatable framework for context, constraints, examples, format and evaluation — with before-and-after prompts.",
		icon: "PE",
		level: "Practical guide",
		linkLabel: "Read guide",
		next: {
			href: "/program/generative-ai",
			kicker: "Apply the framework",
			label: "Explore the AI program",
			title: "Build a practical AI assistant and document how you evaluate it.",
		},
		published: "17 Aug 2026",
		readTime: "15 min read",
		search: "prompt engineering framework examples evaluation portfolio constraints context",
		shortCrumb: "Prompt engineering",
		slug: "prompt-engineering-guide",
		title: "Prompt engineering guide: write prompts that produce usable work",
		toc: [
			{ href: "#definition", label: "What prompting is" },
			{ href: "#framework", label: "The five-part framework" },
			{ href: "#examples", label: "Before-and-after examples" },
			{ href: "#complex-work", label: "Complex tasks" },
			{ href: "#evaluation", label: "Evaluate the result" },
			{ href: "#mistakes", label: "Common mistakes" },
			{ href: "#portfolio", label: "Build a prompt portfolio" },
			{ href: "#faq", label: "Common questions" },
		],
		tocTitle: "In this guide",
	},
]

export const BLOG_HUB = {
	canonical: "https://letsupgrade.in/blog",
	description:
		"Practical guides on AI, data analytics, prompt engineering, projects, internships and fresher careers from LetsUpgrade.",
	headline: "Career skills, explained without the",
	highlight: "fluff.",
	image: "/assets/resources/blog-writing.jpg",
	imageAlt: "A writer taking notes beside a laptop and books",
	kicker: "LetsUpgrade editorial",
	lead: "Deep, practical guides for learning a skill, building proof and getting through the first stages of your career. No vague motivation. No copied definitions.",
	title: "Career Skills, AI & Internship Guides",
}

export const getBlogArticle = slug =>
	BLOG_ARTICLES.find(article => article.slug === slug) || null

export const filterBlogArticles = (articles, { filter, query }) => {
	const words = (query || "").toLowerCase().split(/\s+/).filter(Boolean)

	return articles.filter(article => {
		const haystack = [
			article.title,
			article.excerpt,
			article.category,
			article.search,
		]
			.join(" ")
			.toLowerCase()
		const filterOk = filter === "all" || article.categoryId === filter
		return filterOk && words.every(word => haystack.includes(word))
	})
}
