export const NAV_SECTIONS = [
	{
		groups: [
			{
				items: [
					{ href: "/programs", label: "All programs" },
					{
						href: "/program/generative-ai",
						label: "AI & Prompt Engineering",
					},
					{
						href: "/program/ai-agents",
						label: "AI Agents & Automation",
					},
					{
						href: "/program/data-analytics",
						label: "Data Analytics",
					},
					{
						href: "/program/websites-apps-ai",
						label: "AI App Development",
					},
					{ href: "/program/cybersecurity", label: "Cybersecurity" },
					{ href: "/program/cloud-devops", label: "Cloud & DevOps" },
					{
						href: "/program/digital-marketing",
						label: "Digital Marketing",
					},
					{ href: "/program/sales-gtm", label: "Sales & GTM" },
				],
				title: "Live certifications",
			},
			{
				items: [
					{ href: "/bootcamp/html", label: "HTML Bootcamp" },
					{ href: "/bootcamp/python", label: "Python Certification" },
					{ href: "/bootcamp/sql", label: "SQL Certification" },
					{ href: "/bootcamp/excel", label: "Excel Certification" },
					{
						href: "/programs?format=self-paced",
						label: "All recorded programs",
					},
				],
				title: "Entry-level bootcamps",
			},
		],
		id: "learn",
		label: "Learn",
		layout: "mega",
		lead: {
			cta: "Browse all programs",
			href: "/programs",
			text: "Live certification tracks plus recorded entry-level bootcamps — filter the full catalogue and enrol from one page.",
			title: "All programs",
		},
	},
	{
		id: "internships",
		items: [
			{ href: "/internships", label: "Browse All Internships" },
			{ href: "/internships?category=AI", label: "AI Internships" },
			{ href: "/internships?category=Data", label: "Data Internships" },
			{
				href: "/internships?category=Development",
				label: "Development Internships",
			},
			{ href: "/internships?mode=Remote", label: "Remote Internships" },
			{ href: "/learn#career", label: "Report Card" },
		],
		label: "Internships",
		layout: "list",
	},
	{
		id: "jobs",
		items: [
			{ href: "/jobs", label: "Browse All Jobs" },
			{ href: "/jobs?experience=Fresher", label: "Fresher Jobs" },
			{ href: "/jobs?category=AI", label: "AI Jobs" },
			{ href: "/jobs?category=Development", label: "Development Jobs" },
			{ href: "/jobs?mode=Remote", label: "Remote Jobs" },
			{ href: "/learn#career", label: "Career Preparation" },
		],
		label: "Jobs",
		layout: "list",
	},
	{
		groupTitle: "Roles",
		id: "tracks",
		items: [
			{
				href: "/program/ai-agents",
				label: "AI Engineer / AI Professional",
			},
			{ href: "/program/data-analytics", label: "Data Analyst" },
			{
				href: "/program/websites-apps-ai",
				label: "Software Developer",
			},
			{
				href: "/program/cybersecurity",
				label: "Cybersecurity Professional",
			},
			{
				href: "/program/cloud-devops",
				label: "Cloud & DevOps Engineer",
			},
			{ href: "/program/digital-marketing", label: "Digital Marketer" },
			{
				href: "/program/sales-gtm",
				label: "Sales / Business Development",
			},
			{
				href: "/program/generative-ai",
				label: "AI Productivity Professional",
			},
		],
		label: "Career Tracks",
		layout: "mega",
		lead: {
			cta: "Browse all programs",
			href: "/programs",
			text: "Pick the role you are aiming for and we will map the certification, projects and internships that get you there.",
			title: "What do you want to become?",
		},
	},
	{
		id: "stories",
		items: [
			{ href: "/#success", label: "Student Stories" },
			{ label: "Projects", soon: true },
			{ label: "Placements", soon: true },
			{ label: "Internship Stories", soon: true },
			{ label: "Certificates Earned", soon: true },
		],
		label: "Success Stories",
		layout: "list",
	},
	{
		id: "colleges",
		items: [
			{ href: "/colleges", label: "Campus Partnerships" },
			{
				href: "/colleges/student-upskilling",
				label: "Student Upskilling",
			},
			{ href: "/colleges/certifications", label: "Certifications" },
			{
				href: "/colleges/placement-training",
				label: "Placement Training",
			},
			{
				href: "/colleges/hire-ready-programs",
				label: "Hire-ready Programs",
			},
			{
				href: "/colleges/contact-partnerships",
				label: "Contact Partnerships",
			},
		],
		label: "For Colleges",
		layout: "list",
	},
	{
		id: "resources",
		items: [
			{ href: "/blog", label: "Blog & Guides" },
			{ href: "/resources/career-guides", label: "Career Guides" },
			{
				href: "/resources/skill-assessments",
				label: "Skill Assessments",
			},
			{ href: "/resources/events", label: "Events" },
			{ href: "/resources/community", label: "Community" },
			{ href: "/refer", label: "Refer & Earn" },
			{ href: "/resources/help-center", label: "Help Center" },
		],
		label: "Resources",
		layout: "list",
	},
]

export const WORDMARK_SRC =
	"https://lucdn.letsupgrade.net/assets/wordmark_light_fb44b8b9d2.png"
