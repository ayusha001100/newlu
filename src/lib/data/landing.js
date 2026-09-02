export const AUDIENCE_TABS = [
	{ key: "students", label: "Students" },
	{ key: "developers", label: "Developers" },
	{ key: "marketing", label: "Marketing" },
	{ key: "sales", label: "Sales" },
	{ key: "hr", label: "HR" },
	{ key: "finance", label: "Finance" },
	{ key: "management", label: "Management" },
]

export const AUDIENCES = {
	developers: [
		"Get oriented in an unfamiliar codebase without booking a senior",
		"Draft the tests you were quietly planning to skip",
		"Describe a bug in plain English and get somewhere useful",
	],
	finance: [
		"Ask a spreadsheet what changed last quarter, and why",
		"Draft a variance summary someone senior will actually read",
		"Sanity-check a model before it reaches a partner",
	],
	hr: [
		"Write a JD that describes the job rather than the ideal human",
		"Screen a stack of resumes against criteria you defined first",
		"Ask interview questions that test the skill, not the vocabulary",
	],
	management: [
		"Get to the second-order question faster",
		"Turn a messy meeting into decisions with names against them",
		"Lay three options side by side with the trade-offs written down",
	],
	marketing: [
		"Write ten ad variants, then argue for the two worth testing",
		"Flatten five competitor pricing pages into one comparison table",
		"Turn campaign numbers into a story your manager follows",
	],
	sales: [
		"Research a prospect properly in five minutes instead of fifty",
		"Rewrite the cold email everyone is currently ignoring",
		"Build discovery questions out of the prospect’s own website",
	],
	students: [
		"Turn a 40-page report into notes you can actually revise from",
		"Outline an assignment, then fact-check every claim it made",
		"Run a mock viva the night before",
		"Build a tutor for the one subject that keeps beating you",
	],
}

export const GENERATIVE_AI_FAQS = [
	{
		answer: "Free the whole way. The live classes, the exercises, the project review, the exam and the certificate all cost nothing, and you never enter card details.",
		question: "Is it actually free, or free until the certificate?",
	},
	{
		answer: "None. Everything here happens in a browser tab. If you can use Google Docs you can do this course.",
		question: "Do I need coding experience?",
	},
	{
		answer: "Anyone who wants to fine-tune models, build RAG pipelines or ship agents against an API. That is a different LetsUpgrade certification — AI Agents & Automation — and it assumes you have already done this one.",
		question: "Who is this not for?",
	},
	{
		answer: "Watch the recording and do the module exercises in your own time. Attendance is not the thing being graded; the quizzes, activities, capstone and exam are.",
		question: "What happens if I miss a live session?",
	},
	{
		answer: "Roughly the live session plus an hour or two of practice. The capstone needs a longer sitting towards the end, so plan a free weekend for it.",
		question: "How much time does it take each week?",
	},
	{
		answer: "70% of the learning completed, 60% in the final exam, and a capstone scored at 60% or above. Below that you can retake the exam with the next cohort.",
		question: "What exactly do I have to pass?",
	},
	{
		answer: "Your name, the certification name, a credential ID, a verification URL and your final score. It is issued in collaboration with NSDC and ITM Edutech Training, and you can add it to LinkedIn once it lands.",
		question: "What is on the certificate?",
	},
	{
		answer: "On its own, no, and treat any course that promises otherwise with suspicion. It gives you a project to talk about, a score to point at, and access to the openings and interview prep inside your Learning Centre. The interview is still yours to win.",
		question: "Will this get me an internship or a job?",
	},
	{
		answer: "That is the entire point of it. You build it around a persona you actually are, so it keeps working after the certificate is issued.",
		question: "Can I use the capstone in my portfolio?",
	},
]

export const ASSESSMENT_STEPS = [
	{
		body: "Attend the live sessions, or watch them back.",
		num: "01",
		title: "Learn",
	},
	{
		body: "Finish the exercises inside each module.",
		num: "02",
		title: "Practice",
	},
	{
		body: "Submit the capstone and your prompt portfolio.",
		num: "03",
		title: "Build",
	},
	{
		body: "Sit the 100-mark final examination.",
		num: "04",
		title: "Prove",
	},
]

export const DEFAULT_GRADING = [
	{ label: "Module Quizzes", weight: "10%" },
	{ label: "Hands-on Activities", weight: "15%" },
	{ label: "Practical Assignments", weight: "15%" },
	{ label: "Capstone Project", weight: "30%" },
	{ label: "Final Examination", weight: "30%" },
]

export const EXAM_PARTS = [
	{ label: "AI Fundamentals", marks: "10", part: "Part A" },
	{ label: "AI Tools", marks: "10", part: "Part B" },
	{ label: "Prompt Engineering", marks: "20", part: "Part C" },
	{ label: "Research, Data & Productivity", marks: "10", part: "Part D" },
	{ label: "Responsible AI", marks: "10", part: "Part E" },
	{ label: "Practical Prompt Challenge", marks: "20", part: "Part F" },
	{ label: "Case Study", marks: "20", part: "Part G" },
]

export const EXAM_SCENARIO =
	"You join an internship at an e-commerce company. Your manager gives you a sales spreadsheet, competitor websites and a 30-page market report, and asks for a management presentation. You use AI to analyse the documents and dataset, research competitors, identify insights and build recommendations — then show the prompts you used and explain how you verified every output."

export const GRADE_BANDS = [
	{ label: "Certified", range: "60–74%" },
	{ label: "Certified with Merit", range: "75–89%" },
	{ label: "Certified with Distinction", range: "90%+" },
]

export const CERT_INCLUDES = [
	"Student Name",
	"Certification Name",
	"Credential ID",
	"Verification URL",
	"Final Score",
	"Skill Level",
]

export const PROJECT_SUBMIT = [
	"The finished working project",
	"A written walkthrough of your decisions",
	"Evidence of testing and improvements",
	"A short demonstration you can share",
]

export const BOOTCAMP_STEPS = [
	{
		body: "Create an account once. The bootcamp is added to your Learning Centre.",
		num: "01",
		title: "Enrol free",
	},
	{
		body: "Lessons load from the YouTube or Vimeo playlist attached to this program.",
		num: "02",
		title: "Watch the playlist",
	},
	{
		body: "Progress is the videos you complete, not a live attendance sheet.",
		num: "03",
		title: "Mark what you finish",
	},
	{
		body: "Take a live career track next if you want internships and a graded capstone.",
		num: "04",
		title: "Use the skill",
	},
]

export function programFaqs(slug, program) {
	if (slug === "generative-ai") return GENERATIVE_AI_FAQS

	const certName = program.certName || program.title
	const projects = program.projects || []
	const tools = program.tools || []
	const roles = program.roles || []

	return [
		{
			answer: "Yes. The live classes, exercises, project, assessment and certificate are free, and registration does not require card details.",
			question: `Is the ${certName} certification free?`,
		},
		{
			answer: (program.whoFor || []).join(" "),
			question: "Who should take this program?",
		},
		{
			answer: projects
				.map(project => `${project.title}: ${project.desc}`)
				.join(" "),
			question: "What will I build?",
		},
		{
			answer: `The program uses ${tools.join(", ")} across the live sessions, exercises and project.`,
			question: "Which tools will I use?",
		},
		{
			answer: program.salary,
			question: "What do I need to earn the certificate?",
		},
		{
			answer: `The certificate alone does not guarantee a role. It gives you evidence for ${roles.join(", ")} applications through assessed skills and portfolio work.`,
			question: "Can this help with internships and jobs?",
		},
	]
}

export function bootcampFaqs(program) {
	return [
		{
			answer: "No. This is a recorded entry-level program. The eight career tracks are the live certifications. Enrol here if you want to start a single skill on your own time.",
			question: "Is this live?",
		},
		{
			answer: "After you enrol, the Learning Centre plays the YouTube or Vimeo playlist attached to this program. The curriculum on this page is the outline of those lessons.",
			question: "Where are the videos?",
		},
		{
			answer: `${program.audience}. ${program.about}`,
			question: "Do I need prior experience?",
		},
		{
			answer: "Yes. Enrolment, the recorded lessons and the certificate for finishing the playlist do not require card details.",
			question: "Is it free?",
		},
	]
}
