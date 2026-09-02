/* ============================================================
   LetsUpgrade — Learning Engine
   Curriculum-agnostic platform infrastructure shared by every program:
   stage model, skill graph, practice engine, assessments, mastery
   scoring, nudges, opportunity matching and the grounded AI tutor.

   Curriculum lives in src/lib/data/programs.js. Everything here works off that
   shape, so adding a program means adding curriculum + an optional kit.
   ============================================================ */

import { BOOTCAMPS } from "@/lib/data/bootcamps"
import { PROGRAMS } from "@/lib/data/programs"

/* * Every module runs the same shape: Learn → See → Try → Check → Recap.
     The learner only ever needs to understand one pattern, and because the ids
     never change, progress saved under the older labels still counts. */
const STAGES = [
	{ blurb: "Understand the idea", id: "concept", label: "Learn" },
	{ blurb: "Watch it done", id: "demo", label: "See" },
	{ blurb: "Do it with support", id: "guided", label: "Try together" },
	{ blurb: "Do it yourself", id: "task", label: "Try alone" },
	{ blurb: "Prove you can apply it", id: "quiz", label: "Check" },
	{ blurb: "Lock it in", id: "reflect", label: "Recap" },
]

/* * Assessment names are deliberately low-stakes until the very last one, so a
     learner is not psyched out by the word "examination" in week two. */
const ASSESSMENT_NAMES = {
	baseline: "Starting Point Check",
	checkpoint: "Practice Test",
	exam: "Certification Assessment",
	quiz: "Knowledge Check",
	task: "Skill Challenge",
}

/* * An application moves along one visible pipeline. */
const APPLICATION_STAGES = ["Applied", "Shortlisted", "Interview", "Selected"]

/* * Skill mastery replaces course completion as the headline metric. */
const MASTERY_LEVELS = [
	{ id: "not-started", label: "Not Started", min: 0 },
	{ id: "learning", label: "Learning", min: 1 },
	{ id: "practicing", label: "Practicing", min: 40 },
	{ id: "proficient", label: "Proficient", min: 65 },
	{ id: "verified", label: "Verified", min: 85 },
]

/* * Which modules build which skill. Index = position in the curriculum array. */
const SKILL_GRAPH = {
	"generative-ai": [
		{ id: "fundamentals", modules: [0, 1], name: "AI Fundamentals" },
		{ id: "prompting", modules: [2, 3], name: "Prompt Engineering" },
		{ id: "research", modules: [4], name: "AI Research" },
		{ id: "productivity", modules: [5], name: "Productivity" },
		{ id: "data", modules: [6], name: "Data Analysis with AI" },
		{ id: "career", modules: [7], name: "Career & Employability" },
		{ id: "creativity", modules: [8], name: "Content & Creativity" },
		{ id: "responsible", modules: [9], name: "Responsible AI" },
	],
}

/* * Baseline diagnostic — one question per skill, run before the first lesson. */
const DIAGNOSTICS = {
	"generative-ai": [
		{
			answer: 0,
			options: [
				"The model hallucinated a plausible-looking citation",
				"The paper exists but is behind a paywall",
				"The model was trained on private data",
				"The model made an arithmetic error",
			],
			q: "An AI confidently cites a 2023 research paper you cannot find anywhere. What is the most accurate description of what happened?",
			skill: "fundamentals",
		},
		{
			answer: 1,
			options: [
				"Write about digital marketing.",
				"Act as a marketing trainer. Explain performance marketing to a BBA student using one Indian e-commerce example, in four sections: definition, funnel, metrics, example campaign.",
				"Explain performance marketing in detail with everything I need to know.",
				"Give me marketing notes, make them good.",
			],
			q: "Which prompt is most likely to return usable output on the first attempt?",
			skill: "prompting",
		},
		{
			answer: 2,
			options: [
				"Use it — the model is usually right",
				"Ask the same model to confirm it is correct",
				"Trace it to a primary source and verify the number independently",
				"Rephrase it so it sounds less specific",
			],
			q: "An AI gives you a statistic with no source. What do you do before using it in a college submission?",
			skill: "research",
		},
		{
			answer: 2,
			options: [
				"Write an email about the delay",
				"Write an apology email",
				"Role, recipient, what happened, new committed date, tone and length",
				"Make it sound polite",
			],
			q: "You need a follow-up email after a missed deadline. Which input produces the most professional draft?",
			skill: "productivity",
		},
		{
			answer: 2,
			options: [
				"What was the total revenue?",
				"Which region had the drop?",
				"Which segment inside that region declined, and what changed at the same time?",
				"How many orders were placed?",
			],
			q: "Sales dropped 18% in one region. Which question moves you from reporting to analysis?",
			skill: "data",
		},
		{
			answer: 1,
			options: [
				"Ask it to write a new resume from scratch",
				"Extract required skills, compare them to your resume and list the gaps",
				"Ask whether you will get the job",
				"Ask it to make your resume longer",
			],
			q: "What is the most effective way to use AI against a job description?",
			skill: "career",
		},
		{
			answer: 1,
			options: [
				"A longer subject description",
				"Composition, lighting, camera angle, mood and style",
				"A higher resolution request",
				"More adjectives",
			],
			q: "An image prompt keeps producing flat, generic visuals. What is usually missing?",
			skill: "creativity",
		},
		{
			answer: 2,
			options: [
				"A customer list with phone numbers",
				"Your company\u2019s unreleased pricing sheet",
				"A public annual report you want summarised",
				"A colleague\u2019s salary details",
			],
			q: "Which of these is safe to paste into a public AI tool?",
			skill: "responsible",
		},
	],
}

/* * Per-module delivery kit: demo script, guided lab, independent tasks,
     application quiz and reflection prompts. */
const MODULE_KITS = {
	"generative-ai": {
		0: {
			demo: {
				steps: [
					'Instructor asks ChatGPT, Gemini and Claude the same question: "Explain token limits to a first-year student in 100 words."',
					"Compare structure, depth, and whether each model invents a source.",
					"Spot the hallucination deliberately planted in one of the three answers.",
				],
				title: "One question, three models",
			},
			guided: {
				brief: "Pick any topic from your own syllabus and put the same question to three AI tools.",
				starter:
					"Explain [your topic] to a first-year student in under 150 words. List any assumption you are making, and mark anything you are unsure about.",
				steps: [
					"Write one question you already know the correct answer to.",
					"Ask ChatGPT, Gemini and one more tool the identical question.",
					"Score each answer on accuracy, structure, depth and sources out of 5.",
					"Mark every claim you could not verify.",
				],
				title: "Run the three-model comparison yourself",
			},
			quiz: [
				{
					answer: 2,
					options: [
						"Trust it, the model rarely errs",
						"Ask the same model if it is sure",
						"Verify against a primary source and drop the claim if unverifiable",
						"Rephrase the claim more vaguely",
					],
					q: "An AI cites a paper that does not exist. What is the correct next step?",
					skill: "fundamentals",
					why: "Asking the same model to self-confirm reproduces the same hallucination. Verification has to come from outside the model.",
				},
				{
					answer: 1,
					options: [
						"The model is biased",
						"The content exceeded the context window",
						"The file was corrupted",
						"The model needs a longer prompt",
					],
					q: "You paste a 60-page report and the summary silently ignores the last 20 pages. Most likely cause?",
					skill: "fundamentals",
					why: "Context windows are finite. Beyond the limit, content is truncated rather than refused, which is why the failure is silent.",
				},
				{
					answer: 2,
					options: [
						"Calculating GST on an invoice",
						"Blocking logins after three failed attempts",
						"Drafting five tone variations of a customer apology",
						"Sorting a list alphabetically",
					],
					q: "Which task genuinely needs a generative model rather than a rule-based system?",
					skill: "fundamentals",
					why: "Deterministic, rule-shaped work belongs in ordinary software. Generation of open-ended language is where an LLM earns its cost.",
				},
			],
			reflection: [
				"Where did AI get something wrong for you today, and how did you catch it?",
				"Which limitation — hallucination, staleness, bias or false reasoning — will hurt your work most?",
			],
			tasks: [
				{
					brief: "Ask an AI for five statistics with sources on any topic. Verify each one. Report how many were real, how many were distorted and how many were invented.",
					id: "hallucination-hunt",
					minutes: 20,
					skill: "fundamentals",
					title: "Hallucination hunt",
				},
				{
					brief: "Paste a long document, ask for a summary, then ask what it left out. Explain what you saw using tokens and context windows.",
					id: "context-window",
					minutes: 15,
					skill: "fundamentals",
					title: "Break the context window",
				},
				{
					brief: "Write 150 words explaining AI vs Machine Learning vs Generative AI to a non-technical friend. No buzzwords allowed.",
					id: "explain-genai",
					minutes: 15,
					skill: "fundamentals",
					title: "Explain GenAI without jargon",
				},
			],
		},

		1: {
			demo: {
				steps: [
					"One research brief is run through ChatGPT, Gemini, Claude, Perplexity, NotebookLM and Copilot.",
					"Watch which tool cites sources, which handles the 40-page PDF and which invents detail.",
					"Instructor builds the tool-selection matrix live from the results.",
				],
				title: "Same brief, six tools",
			},
			guided: {
				brief: "Map eight task types to the tool you would actually reach for, with a one-line reason each.",
				starter:
					"I need to [task] with [input type]. Ask me three clarifying questions, then tell me the strongest approach and where you are likely to be unreliable.",
				steps: [
					"List your eight most common tasks — research, writing, study notes, data, slides and so on.",
					"Run two of them through two different tools.",
					"Record which tool won and why, in one line.",
					"Keep the matrix; you will reuse it all program.",
				],
				title: "Build your tool-selection matrix",
			},
			quiz: [
				{
					answer: 1,
					options: [
						"A general chat model with no files",
						"NotebookLM or another source-grounded tool",
						"An image generator",
						"A spreadsheet formula",
					],
					q: "You must summarise 12 lecture PDFs and answer questions strictly from those files. Best tool?",
					skill: "fundamentals",
					why: "Source-grounded tools answer only from what you uploaded, which is exactly the guarantee you need for study material.",
				},
				{
					answer: 1,
					options: [
						"An offline model",
						"A search-native AI like Perplexity",
						"A code assistant",
						"A slide generator",
					],
					q: "You need current market numbers with links you can open. Best tool?",
					skill: "research",
					why: "Search-native tools retrieve live pages and expose citations you can verify yourself.",
				},
				{
					answer: 2,
					options: [
						"They need a paid plan",
						"They need longer prompts",
						"They are not matching the tool to the task",
						"They need faster internet",
					],
					q: "Your teammate uses one tool for everything and output quality is inconsistent. The core problem is:",
					skill: "fundamentals",
					why: "Tool fit determines the ceiling of the output. No amount of prompting fixes a tool that cannot see your sources.",
				},
			],
			reflection: [
				"Which tool surprised you, and on what kind of task?",
				"Which task will you stop doing manually from this week?",
			],
			tasks: [
				{
					brief: "Summarise the same PDF in NotebookLM and in a general chat tool. Compare which stayed grounded in the source and which drifted.",
					id: "pdf-showdown",
					minutes: 20,
					skill: "fundamentals",
					title: "Summarise a PDF two ways",
				},
				{
					brief: "Research one topic in Perplexity. Open three cited sources and confirm each one actually says what the summary claims.",
					id: "cited-research",
					minutes: 20,
					skill: "research",
					title: "Research with citations",
				},
				{
					brief: "Produce a one-page cheat sheet: task type, chosen tool, reason, known weakness.",
					id: "tool-cheatsheet",
					minutes: 15,
					skill: "fundamentals",
					title: "Personal tool cheat sheet",
				},
			],
		},

		2: {
			demo: {
				steps: [
					"Instructor runs the weak prompt and shows the generic result.",
					"Role, Context, Task, Format and Examples are added one at a time.",
					"Class watches the output improve at each of the five steps.",
				],
				title: '"Explain marketing" becomes a professional prompt',
			},
			guided: {
				brief: "Take three vague prompts and rebuild each one with all five RCTFE elements.",
				starter:
					"Role: You are a [expertise].\nContext: [audience, objective, constraints].\nTask: [one clear objective].\nFormat: [table / bullets / email / report].\nExpectations: [tone, length, quality bar].",
				steps: [
					"Write the weak version and run it. Save the output.",
					"Add Role and Context. Run again.",
					"Add Task, Format and Expectations. Run again.",
					"Compare version one and version three side by side.",
				],
				title: "Rewrite three weak prompts with RCTFE",
			},
			quiz: [
				{
					answer: 2,
					options: ["Role", "Context", "Format", "Task"],
					q: '"Act as a data analyst. Summarise this sales data." The output is a wall of text you cannot paste into a deck. What is missing?',
					skill: "prompting",
					why: "Role and Task were present. Without a specified Format, the model picks one for you — usually prose.",
				},
				{
					answer: 0,
					options: [
						"Context — state who the reader is",
						"Longer task description",
						"Asking twice",
						"Adding more keywords",
					],
					q: "Your prompt returns technically correct answers that are far too advanced for your audience. Which element fixes it fastest?",
					skill: "prompting",
					why: "Audience is Context. Naming the reader changes vocabulary, depth and examples in one move.",
				},
				{
					answer: 1,
					options: [
						'Saying "make it good"',
						"Pasting one well-written past output as the pattern to match",
						"Asking for more detail",
						"Setting a word limit",
					],
					q: "Which is the strongest use of the Examples element?",
					skill: "prompting",
					why: "A concrete sample communicates tone, structure and quality bar more precisely than any adjective.",
				},
			],
			reflection: [
				"Which RCTFE element do you skip most often, and what does it cost you?",
				"Which repeated task will you convert into a template this week?",
			],
			tasks: [
				{
					brief: "Take the 10 weak prompts from the lab sheet and rewrite every one using RCTFE. Submit both versions.",
					id: "ten-rewrites",
					minutes: 40,
					skill: "prompting",
					title: "Rewrite 10 bad prompts",
				},
				{
					brief: "Pick the task you repeat most often and turn it into a template with [variables] you can refill each time.",
					id: "rctfe-template",
					minutes: 20,
					skill: "prompting",
					title: "Build one reusable RCTFE template",
				},
				{
					brief: "Run a vague and a structured prompt for the same job. Document what specifically improved: accuracy, structure, tone or usability.",
					id: "ab-test",
					minutes: 20,
					skill: "prompting",
					title: "A/B test vague vs structured",
				},
			],
		},

		3: {
			demo: {
				steps: [
					"Research → Analyse → Generate options → Compare → Recommend, one prompt per stage.",
					"Each stage receives the previous stage\u2019s output as input.",
					"Instructor shows what breaks when you try to do all five in one prompt.",
				],
				title: "A five-stage prompt chain, built live",
			},
			guided: {
				brief: "Decompose one real task into three sequential prompts with a checkpoint between each.",
				starter:
					"Stage 1 — Research: [inputs] → produce a source-backed brief.\nStage 2 — Analyse: use the Stage 1 brief → produce findings with confidence levels.\nStage 3 — Recommend: use Stage 2 findings → produce three options with trade-offs.",
				steps: [
					"Write the end deliverable first, then work backwards into stages.",
					"Define the input and output of each stage.",
					"Add a checkpoint: what must be true before moving on.",
					"Run the chain and note where it degraded.",
				],
				title: "Build a three-stage chain",
			},
			quiz: [
				{
					answer: 1,
					options: [
						"Repeat the prompt louder with caps",
						"Decompose into a chain with checkpoints",
						"Use a bigger model and hope",
						"Remove all constraints",
					],
					q: "A long, multi-part prompt keeps dropping requirements near the end. Best fix?",
					skill: "prompting",
					why: "Instruction density is the failure mode. Splitting into stages keeps each step small enough to be followed completely.",
				},
				{
					answer: 1,
					options: [
						"Zero-shot prompting",
						"Few-shot with three strong examples",
						"Asking for creativity",
						"Increasing length",
					],
					q: "You need 40 product descriptions in an identical house style. Which technique matters most?",
					skill: "prompting",
					why: "Examples pin down style. Consistency across a batch is exactly what few-shot prompting buys you.",
				},
				{
					answer: 1,
					options: [
						"Free prose",
						"A JSON object with fixed keys",
						"A poem",
						"A screenshot",
					],
					q: "Which output format is most appropriate when another system will consume the result?",
					skill: "prompting",
					why: "Machine consumers need predictable keys. Prose forces someone downstream to parse it by hand.",
				},
			],
			reflection: [
				"Which stage of your chain produced the weakest output, and why?",
				"What will you standardise into your prompt library after this module?",
			],
			tasks: [
				{
					brief: "Take an actual assignment or work task and complete it through a documented five-stage chain. Submit each stage\u2019s prompt and output.",
					id: "real-chain",
					minutes: 35,
					skill: "prompting",
					title: "Chain a real task",
				},
				{
					brief: "Generate 5 outputs zero-shot, then 5 with three examples. Measure how much more consistent the few-shot batch is.",
					id: "few-shot",
					minutes: 25,
					skill: "prompting",
					title: "Few-shot consistency test",
				},
				{
					brief: "Make the model critique its own answer against your criteria, then rewrite. Submit the before, the critique and the after.",
					id: "self-critique",
					minutes: 20,
					skill: "prompting",
					title: "Self-critique loop",
				},
				{
					brief: "Get the same task returned as a table, then as JSON with fixed keys. Note what breaks the structure.",
					id: "json-output",
					minutes: 15,
					skill: "prompting",
					title: "Force a structured output",
				},
			],
		},

		4: {
			demo: {
				steps: [
					"Define the research question, then generate a research plan.",
					"Collect claims from three sources and mark each as verified or unverified.",
					"Instructor shows a confident, entirely fabricated statistic getting caught.",
				],
				title: "Research brief in 12 minutes — with verification",
			},
			guided: {
				brief: "Produce a one-page brief on a topic in your field where every claim carries a source.",
				starter:
					"Act as a research assistant. My question is [question]. Before answering, give me a research plan: what to look for, which source types are reliable here, and what commonly gets misreported on this topic.",
				steps: [
					"Write the research question in one sentence.",
					"Ask AI for a research plan, not an answer.",
					"Collect five claims. Open every source.",
					"Delete or flag anything you could not verify.",
				],
				title: "Source-checked research brief",
			},
			quiz: [
				{
					answer: 2,
					options: [
						"It sounds confident",
						"It is long and detailed",
						"Its citations open and actually say what was claimed",
						"It uses technical vocabulary",
					],
					q: "The strongest signal that an AI research summary is trustworthy is:",
					skill: "research",
					why: "Confidence, length and jargon are all free to fake. A citation that survives being opened is not.",
				},
				{
					answer: 1,
					options: [
						"Generate answers to copy",
						"Have it quiz you and mark your weak areas",
						"Ask it to predict the paper",
						"Ask it to summarise everything at once",
					],
					q: "Best use of AI the night before an exam?",
					skill: "research",
					why: "Retrieval practice is what moves knowledge into recall. Reading a summary feels productive and mostly is not.",
				},
				{
					answer: 2,
					options: [
						"You use it to brainstorm",
						"You use it to check grammar",
						"You submit its output as your own work without disclosure or authorship",
						"You use it to find sources",
					],
					q: "Using AI to draft an assignment crosses into academic dishonesty when:",
					skill: "responsible",
					why: "Assistance is fine and usually encouraged. Passing off generated text as your own authored work is not.",
				},
			],
			reflection: [
				"What did your fact-check hit rate tell you about trusting AI research?",
				"Where does AI genuinely speed up your studying, and where does it fake progress?",
			],
			tasks: [
				{
					brief: "One page, five claims, every claim with an opened and checked source. Flag anything that failed verification.",
					id: "verified-brief",
					minutes: 40,
					skill: "research",
					title: "Verified research brief",
				},
				{
					brief: "Take five confident AI statements and verify each independently. Report the hit rate.",
					id: "fact-check-5",
					minutes: 25,
					skill: "research",
					title: "Fact-check five AI claims",
				},
				{
					brief: "Create a reusable tutor prompt for one subject: explains at two levels, uses analogies, then quizzes you and marks your answers.",
					id: "personal-tutor",
					minutes: 35,
					skill: "research",
					title: "Build your Personal AI Tutor",
				},
				{
					brief: "Generate 10 MCQs, 10 flashcards and a 7-day revision plan for one subject. Verify the answer key yourself.",
					id: "revision-kit",
					minutes: 25,
					skill: "research",
					title: "Exam revision kit",
				},
			],
		},

		5: {
			demo: {
				steps: [
					"An escalation email, a report summary, a meeting agenda and a slide outline — built live.",
					"Same context block reused across all four, only Task and Format change.",
					"Instructor shows the edit pass that makes AI output sound human.",
				],
				title: "Four workplace artifacts in one session",
			},
			guided: {
				brief: "Write a reusable context block about your role and company, then generate four different artifacts from it.",
				starter:
					"Context: I am a [role] at [company]. My audience is [audience]. Tone: [tone]. Constraints: [constraints].\nTask: [what you need].\nFormat: [format].",
				steps: [
					"Write 5 lines of context you will reuse: role, company, audience, tone, constraints.",
					"Generate an email from it.",
					"Generate a meeting agenda from the same block.",
					"Edit both by hand and note what you changed.",
				],
				title: "One context block, four outputs",
			},
			quiz: [
				{
					answer: 1,
					options: [
						'Ask for "more human" writing',
						"Supply a sample of your own past email as the style reference",
						"Use a longer prompt",
						"Switch tools",
					],
					q: "Your AI-drafted emails all sound identical and slightly robotic. The most effective fix is:",
					skill: "productivity",
					why: "Vague adjectives produce a vague average. Your own writing sample gives the model a concrete target to imitate.",
				},
				{
					answer: 1,
					options: [
						"Chronological narrative of your work",
						"Insight, implication, recommendation",
						"A list of everything you found",
						"A description of your method",
					],
					q: "Best structure for an executive summary aimed at a busy manager?",
					skill: "productivity",
					why: "Decision makers need the so-what and the ask. Process belongs in the appendix.",
				},
				{
					answer: 1,
					options: [
						"A paragraph summary",
						"Decisions, action items with owners, and dates",
						"A transcript",
						"Bullet notes with no owners",
					],
					q: "You are preparing minutes. Which output format is most useful the next day?",
					skill: "productivity",
					why: "Minutes exist to drive follow-through. Without owners and dates, nothing gets done.",
				},
			],
			reflection: [
				"Which weekly task did AI actually make faster, measured honestly?",
				"Where did you still have to rewrite the output yourself, and why?",
			],
			tasks: [
				{
					brief: "Draft a professional escalation email about a missed deadline: what happened, impact, new committed date, ask. Under 150 words.",
					id: "escalation-email",
					minutes: 15,
					skill: "productivity",
					title: "Escalation email",
				},
				{
					brief: "Turn a long document into a one-page report with a five-line executive summary a manager could read in the lift.",
					id: "report-summary",
					minutes: 30,
					skill: "productivity",
					title: "Report + executive summary",
				},
				{
					brief: "Produce an agenda before a real meeting and minutes with action items and owners after it.",
					id: "meeting-kit",
					minutes: 20,
					skill: "productivity",
					title: "Meeting agenda and minutes",
				},
				{
					brief: "Build a 10-slide outline: slide title, three bullets and a speaker note per slide.",
					id: "deck-outline",
					minutes: 25,
					skill: "productivity",
					title: "Presentation outline with speaker notes",
				},
			],
		},

		6: {
			demo: {
				steps: [
					"A raw sales CSV is uploaded and interrogated live.",
					"Trend, outlier and segment questions are asked in sequence.",
					"The session ends with one Insight → Implication → Recommendation summary.",
				],
				title: "Spreadsheet to boardroom insight",
			},
			guided: {
				brief: "Take the provided sales dataset and move from description to analysis to recommendation.",
				starter:
					"You are a business analyst. Here is a sales dataset. First describe the columns and any data quality problems. Do not analyse yet. Then wait for my next instruction.",
				steps: [
					"Ask the model to describe the columns and flag data quality issues first.",
					"Ask what changed, then why it might have changed.",
					"Identify the best and worst performing segment.",
					"Write one recommendation with the number that supports it.",
				],
				title: "Interrogate a dataset properly",
			},
			quiz: [
				{
					answer: 1,
					options: [
						"An insight",
						"An observation that still needs a why and a so-what",
						"A recommendation",
						"An implication",
					],
					q: 'The AI reports "revenue fell 18% in the West". That is:',
					skill: "data",
					why: "A number is description. It becomes an insight only when you attach cause and consequence.",
				},
				{
					answer: 1,
					options: [
						"Pie chart",
						"Line chart",
						"Word cloud",
						"Scatter plot of unrelated variables",
					],
					q: "You want to show how one metric moved over 12 months. Best chart?",
					skill: "data",
					why: "Lines encode change over ordered time. Pies encode composition at one moment and are almost always the wrong reflex.",
				},
				{
					answer: 1,
					options: [
						"Use it, formulas are deterministic",
						"Recalculate on a small sample by hand",
						"Ask for a longer formula",
						"Change the chart",
					],
					q: "AI generates a formula that returns a suspiciously round number. First move?",
					skill: "data",
					why: "The formula may be valid while pointing at the wrong range. A manual spot-check on a few rows catches it immediately.",
				},
			],
			reflection: [
				"Which of your five insights would actually change a decision?",
				"Where did the AI\u2019s analysis need correcting by you?",
			],
			tasks: [
				{
					brief: "Analyse the sales dataset and produce five insights, each with the specific number that supports it.",
					id: "five-insights",
					minutes: 40,
					skill: "data",
					title: "Five insights from real data",
				},
				{
					brief: "Build three charts and justify each chart type in one line. Note one chart you rejected and why.",
					id: "chart-choice",
					minutes: 20,
					skill: "data",
					title: "Right chart, right reason",
				},
				{
					brief: "Compress your analysis into one executive summary using the three-part formula. Maximum 200 words.",
					id: "exec-summary",
					minutes: 25,
					skill: "data",
					title: "Insight → Implication → Recommendation",
				},
				{
					brief: "Take a 20+ page report and extract a structured table of the key figures, then verify three of them against the source.",
					id: "doc-extract",
					minutes: 20,
					skill: "data",
					title: "Extract from a long document",
				},
			],
		},

		7: {
			demo: {
				steps: [
					"A real JD is parsed into skills, responsibilities and keywords.",
					"A resume is scored against it and the gaps are named.",
					"A live STAR-format mock interview answer is built and improved.",
				],
				title: "A job description, taken apart",
			},
			guided: {
				brief: "Pick a real job description you would apply for and measure yourself against it honestly.",
				starter:
					"Act as a hiring manager for this role. Here is the job description and my resume. List the top 5 gaps between them, ranked by how much each one would hurt my chances, and tell me what evidence would close each gap.",
				steps: [
					"Paste the JD and extract skills, must-haves and keywords.",
					"Paste your resume and ask for a gap list, ranked by importance.",
					"Pick the top three gaps.",
					"Write what you will do about each one in the next 30 days.",
				],
				title: "Run your own skill-gap analysis",
			},
			quiz: [
				{
					answer: 2,
					options: [
						"Responsible for social media",
						"Handled social media accounts daily",
						"Grew Instagram engagement 42% in 3 months by shifting to short-form video",
						"Passionate about social media marketing",
					],
					q: "Which resume bullet is strongest?",
					skill: "career",
					why: "Outcome, number and mechanism. The other three describe presence, not impact.",
				},
				{
					answer: 1,
					options: [
						"Memorising generated answers word for word",
						"Running mock interviews and having your answers critiqued",
						"Asking it to guess the questions",
						"Generating fake experience",
					],
					q: "The best use of AI in interview prep is:",
					skill: "career",
					why: "Rehearsal plus feedback improves delivery. Memorised scripts collapse the moment the question is rephrased.",
				},
				{
					answer: 1,
					options: [
						"Add the skill to your resume anyway",
						"Build a small project that demonstrates it, then list the project",
						"Avoid applying forever",
						"Ask AI to write around it",
					],
					q: "You have a genuine skill gap for a role you want. The honest move is:",
					skill: "career",
					why: "Proof closes gaps. Claiming an untrue skill survives exactly until the first technical question.",
				},
			],
			reflection: [
				"What is the single biggest gap between you and the role you want?",
				"Which piece of proof will you build first to close it?",
			],
			tasks: [
				{
					brief: "Analyse a real JD against your resume. Submit the ranked gap list and your 30-day plan.",
					id: "jd-gap",
					minutes: 30,
					skill: "career",
					title: "JD skill-gap analysis",
				},
				{
					brief: "Convert five duty-style bullets into outcome-style bullets with numbers. Submit before and after.",
					id: "resume-bullets",
					minutes: 25,
					skill: "career",
					title: "Rewrite five resume bullets",
				},
				{
					brief: "Run a 10-question mock interview. Answer in STAR, then have the AI critique each answer and rewrite your weakest one.",
					id: "mock-interview",
					minutes: 35,
					skill: "career",
					title: "AI mock interview with STAR",
				},
				{
					brief: "Rewrite your headline and About section around outcomes and proof, not adjectives.",
					id: "linkedin-refresh",
					minutes: 20,
					skill: "career",
					title: "LinkedIn headline and About",
				},
			],
		},

		8: {
			demo: {
				steps: [
					"A single campaign brief becomes a post, a hero image, a slide visual and a video script.",
					"The image prompt is built element by element: subject, environment, composition, lighting, mood, style.",
					"Two iterations show how critique-and-improve tightens the creative.",
				],
				title: "One brief, four creative outputs",
			},
			guided: {
				brief: "Start with a bare subject and add one element at a time, generating after each addition.",
				starter:
					"Subject: [what]. Environment: [where]. Composition: [framing]. Lighting: [quality and direction]. Mood: [feeling]. Style: [visual reference]. Aspect ratio: [ratio].",
				steps: [
					"Generate with subject only. Save it.",
					"Add environment and composition. Generate again.",
					"Add lighting, mood and style. Generate again.",
					"Compare version one and version three.",
				],
				title: "Build an image prompt element by element",
			},
			quiz: [
				{
					answer: 1,
					options: [
						"More adjectives",
						"Composition, lighting and style references",
						"A higher resolution request",
						"A longer subject description",
					],
					q: "Your generated images look generic. The highest-leverage addition is:",
					skill: "creativity",
					why: "Generic output comes from an unspecified camera and unspecified light. Those two decisions define the image.",
				},
				{
					answer: 1,
					options: [
						"Generating them on the same day",
						"A fixed style block reused in every prompt",
						"Using five different tools",
						"Adding the brand name to each prompt",
					],
					q: "You need five assets that look like one brand. What matters most?",
					skill: "creativity",
					why: "Consistency is a reusable specification problem, not a luck problem.",
				},
				{
					answer: 1,
					options: [
						"Which model should I use?",
						"Who is reading this and what should they do next?",
						"How long should it be?",
						"What tone is trending?",
					],
					q: "The most useful first question before writing any content prompt is:",
					skill: "creativity",
					why: "Audience and desired action determine everything downstream, including tone and length.",
				},
			],
			reflection: [
				"Which creative output would you actually publish, and which needed you to rescue it?",
				"What did iteration change that a better first prompt could have prevented?",
			],
			tasks: [
				{
					brief: "From a single brief produce one social post, one hero image, one slide visual and one 30-second video script.",
					id: "mini-campaign",
					minutes: 40,
					skill: "creativity",
					title: "Mini campaign from one brief",
				},
				{
					brief: "Write an image prompt using all eight elements and show the before and after against a bare prompt.",
					id: "image-elements",
					minutes: 20,
					skill: "creativity",
					title: "Eight-element image prompt",
				},
				{
					brief: "Produce five assets that clearly belong to the same brand. Document how you enforced consistency.",
					id: "style-consistency",
					minutes: 25,
					skill: "creativity",
					title: "Hold a style across five outputs",
				},
			],
		},

		9: {
			demo: {
				steps: [
					"A polished, confident AI report is put on screen.",
					"It is audited live for hallucinations, bias, privacy leakage and copyright exposure.",
					"Three separate problems surface in a document that looked perfect.",
				],
				title: "Auditing an AI deliverable in public",
			},
			guided: {
				brief: "Take something you produced earlier in this program and audit it against all four risks.",
				starter:
					"Review this document as a compliance reviewer. List every unverified factual claim, every potential bias, any privacy risk in how it was produced, and any copyright exposure. Be specific and do not reassure me.",
				steps: [
					"List every factual claim and mark verified or unverified.",
					"Check what data you pasted into the tool and whether you should have.",
					"Look for one-sided framing or missing perspectives.",
					"Note any content you cannot claim ownership of.",
				],
				title: "Audit your own work",
			},
			quiz: [
				{
					answer: 1,
					options: [
						"Fine, it is only formatting",
						"A privacy violation regardless of the intent",
						"Fine if they delete the chat afterwards",
						"Fine if the tool is popular",
					],
					q: "A colleague pastes a customer contact list into a public AI tool to clean formatting. This is:",
					skill: "responsible",
					why: "The exposure happens on upload. Deleting the conversation afterwards does not undo it.",
				},
				{
					answer: 2,
					options: [
						"Using a newer model",
						"Asking the model to be accurate",
						"A human verification step before anything ships",
						"Longer prompts",
					],
					q: "The most reliable defence against hallucinations in professional work is:",
					skill: "responsible",
					why: "Every model hallucinates at some rate. Only a verification step in the workflow reliably catches it.",
				},
				{
					answer: 2,
					options: [
						"The AI vendor",
						"Nobody, it was automated",
						"The person who submitted the report",
						"The training data",
					],
					q: "Who is accountable when an AI-assisted report contains a false claim?",
					skill: "responsible",
					why: "AI assists, a human verifies, and that human remains accountable. This does not change because a tool was involved.",
				},
			],
			reflection: [
				"What did your audit find that you would have shipped without checking?",
				"What is your personal rule for when AI output is allowed to leave your desk?",
			],
			tasks: [
				{
					brief: "Audit one of your own AI deliverables for hallucination, bias, privacy and copyright. Document the fixes you made.",
					id: "four-risk-audit",
					minutes: 30,
					skill: "responsible",
					title: "Four-risk audit",
				},
				{
					brief: "Write the list of things you will never paste into a public AI tool, with the reason beside each.",
					id: "red-lines",
					minutes: 15,
					skill: "responsible",
					title: "Your personal red-line list",
				},
				{
					brief: "Take a viral image or clip and attempt to verify it. Document the checks you ran and your conclusion.",
					id: "verify-media",
					minutes: 20,
					skill: "responsible",
					title: "Verify a suspicious image or clip",
				},
			],
		},
	},
}

/* * Capstone deliverables mirror the curriculum's capstone module. */
const CAPSTONE = {
	"generative-ai": {
		parts: [
			{
				id: "research",
				must: "Research, compare sources, summarise and verify claims.",
				name: "Research Assistant",
			},
			{
				id: "learning",
				must: "Explain concepts, generate quizzes, create notes, test understanding.",
				name: "Learning Assistant",
			},
			{
				id: "productivity",
				must: "Plan tasks, generate documents, manage workflows.",
				name: "Productivity Assistant",
			},
			{
				id: "career",
				must: "Analyse jobs, improve a resume, run mock interviews.",
				name: "Career Assistant",
			},
			{
				id: "analysis",
				must: "Analyse a dataset or document, find insights, recommend actions.",
				name: "Data / Analysis Assistant",
			},
		],
		personas: [
			"College Student",
			"Developer",
			"Data Analyst",
			"Digital Marketer",
			"Sales Professional",
			"HR Professional",
			"Finance Professional",
			"Entrepreneur",
		],
		portfolioFields: [
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
		portfolioTarget: 15,
		submission: [
			"Working AI Operating System",
			"Documentation",
			"Screenshots and examples",
			"3–5 minute demo video",
			"Reflection on what worked and failed",
		],
		title: "Personal AI Operating System",
	},
}

/* * Final examination blueprint, mirroring the program page. */
const EXAM_BLUEPRINT = {
	"generative-ai": {
		parts: [
			{
				id: "A",
				marks: 10,
				name: "AI Fundamentals",
				skill: "fundamentals",
			},
			{ id: "B", marks: 10, name: "AI Tools", skill: "fundamentals" },
			{
				id: "C",
				marks: 20,
				name: "Prompt Engineering",
				skill: "prompting",
			},
			{
				id: "D",
				marks: 10,
				name: "Research, Data & Productivity",
				skill: "research",
			},
			{
				id: "E",
				marks: 10,
				name: "Responsible AI",
				skill: "responsible",
			},
			{
				id: "F",
				marks: 20,
				name: "Practical Prompt Challenge",
				skill: "prompting",
			},
			{ id: "G", marks: 20, name: "Case Study", skill: "data" },
		],
		passMark: 60,
		scenario:
			"You join an internship at an e-commerce company. Your manager hands you a sales spreadsheet, competitor websites and a 30-page market report, and asks for a management presentation. Analyse the documents and dataset, research competitors, identify insights, build recommendations, structure the presentation — then show every prompt you used and explain how you verified the output.",
		total: 100,
	},
}

/* * Opportunity pool. Requirements are expressed as skill thresholds. */
const OPPORTUNITIES = [
	{
		company: "Insight Labs",
		desc: "Run source-checked research briefs for a market intelligence team using AI tooling.",
		id: "ai-research-intern",
		location: "Remote · 3 months",
		pay: "₹15,000/month",
		requires: { prompting: 60, research: 65, responsible: 55 },
		role: "AI Research Assistant Intern",
		type: "Internship",
	},
	{
		company: "Northwind AI",
		desc: "Build and maintain the prompt library that powers a customer support product.",
		id: "prompt-ops",
		location: "Bengaluru · Hybrid",
		pay: "₹20,000/month",
		requires: { fundamentals: 60, prompting: 75 },
		role: "Prompt Operations Intern",
		type: "Internship",
	},
	{
		company: "Kestrel Commerce",
		desc: "Turn weekly sales data into insight decks for category managers.",
		id: "biz-analyst-intern",
		location: "Mumbai · On-site",
		pay: "₹18,000/month",
		requires: { data: 70, productivity: 60 },
		role: "Business Analyst Intern (AI-assisted)",
		type: "Internship",
	},
	{
		company: "Bright Studio",
		desc: "Produce campaign copy and visuals with AI, held to a brand style guide.",
		id: "ai-content-assoc",
		location: "Remote",
		pay: "₹4.5–6 LPA",
		requires: { creativity: 70, prompting: 65 },
		role: "AI Content Associate",
		type: "Job",
	},
	{
		company: "Meridian Services",
		desc: "Own AI-assisted workflows across support and operations, including the verification layer.",
		id: "ai-ops-analyst",
		location: "Pune · Hybrid",
		pay: "₹5–7 LPA",
		requires: { fundamentals: 70, productivity: 70, responsible: 70 },
		role: "AI Operations Analyst",
		type: "Job",
	},
	{
		company: "Fablewood Technologies",
		desc: "Design prompt workflows for internal teams and train staff on responsible usage.",
		id: "genai-associate",
		location: "Hyderabad",
		pay: "₹6–8 LPA",
		requires: { data: 65, prompting: 80, research: 70, responsible: 70 },
		role: "Generative AI Associate",
		type: "Job",
	},
]

/* * What to learn next once this certification is done. */
const NEXT_PROGRAM = {
	"generative-ai": {
		slug: "ai-agents",
		why: "You can now use AI. The natural next step is making AI do the work for you — agents, automations and APIs.",
	},
}

/* * Seeded cohort activity so the community never looks abandoned. */
const COMMUNITY_SEED = [
	{
		author: "Ruchitha U.",
		body: "RCTFE on my internship reporting task cut a 40-minute job to 8 minutes. The Format line did most of the work — I asked for a table with fixed columns and stopped getting essays.",
		initials: "RU",
		tag: "Prompt share",
		when: "2h ago",
	},
	{
		author: "Angeshwar",
		body: 'Fact-check hit rate on my research brief was 3/5. Two "statistics" did not exist anywhere. Verification step is now permanent in my workflow.',
		initials: "AN",
		tag: "Challenge",
		when: "5h ago",
	},
	{
		author: "Chandrashekar R.",
		body: "Finished the Learning Assistant part of my AI OS. It quizzes me and marks the answers. Genuinely using it for my own semester exams now.",
		initials: "CR",
		tag: "Project",
		when: "Yesterday",
	},
]

/* * Weekly cohort challenge shown in the community panel. */
const COMMUNITY_CHALLENGE = {
	body: "Post one question, the three model answers, and which one you would actually submit. Best comparison gets featured in the next live session.",
	title: "Challenge of the week — the 3-model showdown",
}

/* ============================================================
   Engine — pure functions over a program state object
   ============================================================ */

const Engine = {
	APPLICATION_STAGES,
	ASSESSMENT_NAMES,

	/* * Mock recruiter movement so the tracker has something to show. In a real
       build this comes from the employer side. */
	advanceApplication(state, id) {
		const app = this.application(state, id)
		if (!app) return null
		const at = APPLICATION_STAGES.indexOf(app.stage)
		if (at < 0 || at === APPLICATION_STAGES.length - 1) return app
		app.stage = APPLICATION_STAGES[at + 1]
		if (app.stage === "Interview") {
			const when = new Date(Date.now() + 6 * 864e5)
			app.interviewOn = when.toISOString().slice(0, 10)
		}
		return app
	},

	allTasks(slug) {
		if (this.isSelfPaced(slug)) return []
		return this.teachingModules(slug).flatMap(({ index }) =>
			this.tasksFor(slug, index).map(task => ({
				...task,
				module: index,
			})),
		)
	},

	/* ---------- applications ---------- */

	application(state, id) {
		return (state.applications || []).find(a => a.id === id) || null
	},

	applicationDetails(state) {
		return (state.applications || [])
			.map(app => ({
				...app,
				opportunity: OPPORTUNITIES.find(o => o.id === app.id) || null,
			}))
			.filter(a => a.opportunity)
	},

	apply(state, id) {
		state.applications = state.applications || []
		if (this.application(state, id)) return
		state.applications.push({
			at: Date.now(),
			id,
			interviewOn: null,
			stage: "Applied",
		})
	},

	/* Compares like with like: only skills the learner has actually started.
     Averaging untouched skills against their diagnostic estimate would
     report a loss for work simply not attempted yet. */
	baselineDelta(slug, state) {
		if (!state.baseline) return null
		const started = this.skillReport(slug, state).filter(s => s.score > 0)
		if (!started.length) return { delta: 0, started: 0 }
		const now =
			started.reduce((sum, s) => sum + s.score, 0) / started.length
		const before =
			started.reduce((sum, s) => sum + (s.baseline || 0), 0) /
			started.length
		return { delta: Math.round(now - before), started: started.length }
	},

	/* Fresh per-program state. */
	blankState() {
		return {
			activeVideo: 0,
			activity: {},
			applications: [],
			baseline: null,
			checkpoint: null,
			exam: null,
			portfolio: [],
			project: { link: "", parts: {}, persona: "", submitted: false },
			quiz: {},
			reflect: {},
			sessions: 0,
			stages: {},
			tasks: {},
			watched: [],
		}
	},

	capstone(slug) {
		return CAPSTONE[slug] || null
	},

	/* ---------- certification ---------- */

	certificateStatus(slug, state) {
		const learning = this.learningPct(slug, state)
		if (this.isSelfPaced(slug)) {
			const total = this.teachingModules(slug).length
			const watched = this.watchedSet(state).size
			const criteria = [
				{
					label: "Watch every recorded lesson",
					met: learning >= 100,
					value: `${watched} of ${total}`,
				},
			]
			return {
				criteria,
				earned: learning >= 100,
				finalScore: learning,
				grade: learning >= 100 ? "Completed" : null,
			}
		}
		const examScore = state.exam ? state.exam.score : 0
		const project = state.project.submitted
		const criteria = [
			{
				label: "70% learning completion",
				met: learning >= 70,
				value: `${learning}%`,
			},
			{
				label: `60% in the ${ASSESSMENT_NAMES.exam}`,
				met: examScore >= 60,
				value: state.exam ? `${examScore}%` : "Not attempted",
			},
			{
				label: "Capstone submitted",
				met: project,
				value: project ? "Submitted" : "Pending",
			},
		]
		const earned = criteria.every(c => c.met)
		const finalScore = Math.round(
			this.quizStats(slug, state).avg * 0.1 +
				(this.taskStats(slug, state).done /
					Math.max(1, this.taskStats(slug, state).total)) *
					100 *
					0.3 +
				this.projectPct(slug, state) * 0.3 +
				examScore * 0.3,
		)
		let grade = null
		if (earned) {
			if (finalScore >= 90) grade = "Certified with Distinction"
			else if (finalScore >= 75) grade = "Certified with Merit"
			else grade = "Certified"
		}
		return { criteria, earned, finalScore, grade }
	},

	/* Live tracks and recorded bootcamps share this lookup. */
	courseOf(slug) {
		if (!slug) return null
		if (PROGRAMS[slug]) return PROGRAMS[slug]
		if (BOOTCAMPS[slug]) return BOOTCAMPS[slug]
		return null
	},

	diagnostic(slug) {
		return DIAGNOSTICS[slug] || []
	},

	exam(slug) {
		return EXAM_BLUEPRINT[slug] || null
	},

	examReadiness(slug, state) {
		const learning = this.learningPct(slug, state)
		const quiz = this.quizStats(slug, state)
		const tasks = this.taskStats(slug, state)
		const score = Math.round(
			learning * 0.4 +
				quiz.avg * 0.35 +
				(tasks.done / Math.max(1, tasks.total)) * 100 * 0.25,
		)
		let label = "Not ready"
		if (score >= 80) label = "Exam ready"
		else if (score >= 60) label = "Nearly ready"
		else if (score >= 30) label = "Keep going"
		return { label, score }
	},

	findTopic(slug, query) {
		const words = query.split(/\s+/).filter(w => w.length > 3)
		if (!words.length) return null
		let best = null

		const course = this.courseOf(slug)
		;(course?.curriculum || []).forEach(lesson => {
			const scoreOf = text => {
				const lower = text.toLowerCase()
				return words.reduce(
					(sum, w) => sum + (lower.includes(w) ? w.length : 0),
					0,
				)
			}

			const titleScore = scoreOf(lesson.title) * 2
			if (titleScore && (!best || titleScore > best.score)) {
				best = { lesson, score: titleScore, section: null }
			}
			;(lesson.sections || []).forEach(section => {
				const score =
					scoreOf(section.name) * 2 +
					scoreOf(section.points.join(" "))
				if (score && (!best || score > best.score)) {
					best = { lesson, score, section }
				}
			})
		})

		return best
	},

	/* * Once a learner is selected, the product switches from "get an internship"
       to "do well in it", which is a different set of actions entirely. */
	internship(state) {
		const selected = this.applicationDetails(state).find(
			a => a.stage === "Selected",
		)
		return selected || null
	},

	isSelfPaced(slug) {
		const course = this.courseOf(slug)
		return !!(course && course.kind === "self-paced")
	},

	kit(slug, index) {
		const authored = MODULE_KITS[slug]?.[index]
		if (authored) return authored

		// * Derived kit so unauthored programs still get the full stage flow.
		const course = this.courseOf(slug)
		const lesson = course?.curriculum ? course.curriculum[index] : null
		if (!lesson) return null
		const firstSkill = this.skills(slug).find(s =>
			s.modules.includes(index),
		)?.id
		return {
			demo: {
				steps: (lesson.sections || [])
					.slice(0, 3)
					.map(s => `Instructor demo: ${s.name}`),
				title: `Live walkthrough — ${lesson.title}`,
			},
			guided: {
				brief: lesson.activity || lesson.detail,
				starter: "",
				steps: (lesson.sections || [])
					.slice(0, 4)
					.map(s => `Work through ${s.name}`),
				title: `Guided practice — ${lesson.title}`,
			},
			quiz: [],
			reflection: [
				"What was the hardest part of this module?",
				"Where will you apply this in the next seven days?",
			],
			tasks: [
				{
					brief:
						lesson.activity ||
						(lesson.outcome
							? `Produce one piece of work that proves you can: ${lesson.outcome}`
							: `Apply this module to a real task and document what you produced.`),
					id: `${index}-activity`,
					minutes: 30,
					skill: firstSkill,
					title: `Apply ${lesson.title}`,
				},
			],
		}
	},

	learningPct(slug, state) {
		const modules = this.teachingModules(slug)
		if (!modules.length) return 0
		if (this.isSelfPaced(slug)) {
			const watched = this.watchedSet(state)
			return Math.round(
				(modules.filter(({ index }) => watched.has(index)).length /
					modules.length) *
					100,
			)
		}
		const total = modules.length * STAGES.length
		const done = modules.reduce(
			(sum, { index }) => sum + this.stagesDone(state, index).size,
			0,
		)
		return Math.round((done / total) * 100)
	},
	MASTERY_LEVELS,

	markWatched(state, index) {
		state.watched = Array.isArray(state.watched) ? state.watched : []
		const n = Number(index)
		if (!state.watched.includes(n)) state.watched.push(n)
		return state
	},

	masteryFor(score, hasAssessment) {
		// ! Verified is an assessed state — it cannot be reached by watching alone.
		if (score >= 85 && !hasAssessment) {
			return MASTERY_LEVELS.find(l => l.id === "proficient")
		}
		return [...MASTERY_LEVELS].reverse().find(level => score >= level.min)
	},

	/* A module counts as complete only when all six stages are done. */
	moduleComplete(slug, state, index) {
		if (this.isSelfPaced(slug)) return this.watchedSet(state).has(index)
		const done = this.stagesDone(state, index)
		return STAGES.every(stage => done.has(stage.id))
	},

	nextProgram(slug) {
		const next = NEXT_PROGRAM[slug]
		const program = next ? this.courseOf(next.slug) : null
		if (!(next && program)) return null
		return { program, slug: next.slug, why: next.why }
	},

	/* Next unfinished module and the stage waiting inside it. */
	nextStep(slug, state) {
		const modules = this.teachingModules(slug)
		if (this.isSelfPaced(slug)) {
			const watched = this.watchedSet(state)
			for (const { lesson, index } of modules) {
				if (!watched.has(index)) {
					return {
						index,
						lesson,
						stage: { id: "watch", label: "Watch" },
					}
				}
			}
			return null
		}
		for (const { lesson, index } of modules) {
			const done = this.stagesDone(state, index)
			const stage = STAGES.find(s => !done.has(s.id))
			if (stage) return { index, lesson, stage }
		}
		return null
	},

	/* ---------- the "what do I do next" spine ----------
     The home screen answers one question, so the ordering here is the product:
     finish the module you are inside, then practise, then build, then prove. */

	nextSteps(slug, state) {
		const steps = []
		const next = this.nextStep(slug, state)
		const tasks = this.taskStats(slug, state)
		const capstone = this.capstone(slug)
		const cert = this.certificateStatus(slug, state)

		if (this.isSelfPaced(slug)) {
			if (next) {
				steps.push({
					detail: "Recorded lesson in your Learning Centre",
					done: false,
					go: { sub: "modules", tab: "learn", type: "tab" },
					label: `Watch ${next.lesson.title}`,
				})
			} else {
				steps.push({
					detail: "Every recorded lesson marked watched",
					done: true,
					go: { sub: "modules", tab: "learn", type: "tab" },
					label: "Playlist complete",
				})
			}
			steps.push({
				detail: cert.earned
					? cert.grade
					: `${this.learningPct(slug, state)}% watched`,
				done: !!cert.earned,
				go: { sub: "assessments", tab: "career", type: "tab" },
				label: cert.earned
					? "Certificate unlocked"
					: "Finish the playlist to certify",
			})
			return steps
		}

		if (next) {
			steps.push({
				detail: `You are at the ${next.stage.label} step`,
				done: false,
				go: { index: next.index, stage: next.stage.id, type: "module" },
				label: `Finish ${next.lesson.title}`,
			})
		} else {
			steps.push({
				detail: "Nothing left to watch",
				done: true,
				go: { tab: "learn", type: "tab" },
				label: "Every module complete",
			})
		}

		steps.push({
			detail: `${tasks.done} of ${tasks.total} submitted`,
			done: tasks.total > 0 && tasks.pending === 0,
			go: { sub: "practice", tab: "learn", type: "tab" },
			label: tasks.pending
				? `Clear ${tasks.pending} ${ASSESSMENT_NAMES.task}${tasks.pending === 1 ? "" : "s"}`
				: `All ${ASSESSMENT_NAMES.task}s cleared`,
		})

		if (capstone) {
			const pct = this.projectPct(slug, state)
			steps.push({
				detail: state.project.submitted
					? `Evaluated at ${state.project.score}%`
					: `${pct}% built`,
				done: !!state.project.submitted,
				go: { sub: "project", tab: "learn", type: "tab" },
				label: state.project.submitted
					? "Capstone submitted"
					: `Build ${capstone.title}`,
			})
		}

		steps.push({
			detail: cert.earned
				? cert.grade
				: `${cert.criteria.filter(c => c.met).length} of ${cert.criteria.length} criteria met`,
			done: !!cert.earned,
			go: { sub: "assessments", tab: "career", type: "tab" },
			label: cert.earned
				? "Certificate unlocked"
				: "Unlock your certificate",
		})

		return steps
	},

	/* Older builds stored a bare array of completed lesson indices. */
	normalise(raw) {
		const state = this.blankState()
		if (!raw) return state
		if (Array.isArray(raw)) {
			raw.forEach(i => {
				state.stages[i] = STAGES.map(s => s.id)
			})
			return state
		}
		Object.assign(state, raw, {
			project: Object.assign(state.project, raw.project || {}),
		})
		state.watched = Array.isArray(raw.watched)
			? raw.watched.map(Number)
			: []
		// * Applications used to be a bare list of opportunity ids.
		state.applications = (raw.applications || []).map(entry =>
			typeof entry === "string"
				? {
						at: Date.now(),
						id: entry,
						interviewOn: null,
						stage: "Applied",
					}
				: entry,
		)
		return state
	},

	/* ---------- nudges ---------- */

	nudges(slug, state) {
		const list = []
		const learning = this.learningPct(slug, state)
		const tasks = this.taskStats(slug, state)
		const next = this.nextStep(slug, state)

		if (this.isSelfPaced(slug)) {
			if (next) {
				list.push({
					action: { go: "learning", label: "Continue watching" },
					text: `Next lesson: ${next.lesson.title}.`,
					tone: "next",
				})
			} else if (learning >= 100) {
				list.push({
					action: { go: "assessments", label: "View certificate" },
					text: "You finished the playlist. Your completion certificate is ready.",
					tone: "prove",
				})
			}
			return list.slice(0, 3)
		}

		if (!state.baseline) {
			list.push({
				action: { go: "diagnostic", label: "Start diagnostic" },
				text: "Take your 3-minute baseline diagnostic so we can measure how far you actually move.",
				tone: "start",
			})
		}

		// ! The most valuable nudge: completed the learning but failed to apply it.
		this.teachingModules(slug).forEach(({ lesson, index }) => {
			const quiz = state.quiz[String(index)]
			const done = this.stagesDone(state, index)
			if (quiz && quiz.score < 60) {
				const weakTask = this.tasksFor(slug, index)[0]
				list.push({
					action: weakTask
						? {
								go: "practice",
								label: `Practice: ${weakTask.title}`,
							}
						: { go: "learning", label: "Open module" },
					text: `You completed ${Math.round((done.size / STAGES.length) * 100)}% of ${lesson.title} but scored ${quiz.score}% on its quiz. Redo the quiz after one practice task.`,
					tone: "fix",
				})
			}
		})

		if (tasks.pending > 0 && learning > 0) {
			list.push({
				action: { go: "practice", label: "Open practice" },
				text: `${tasks.pending} practice ${tasks.pending === 1 ? "task is" : "tasks are"} still pending. Practice is 30% of your final score.`,
				tone: "practice",
			})
		}

		if (learning >= 60 && !state.project.persona) {
			list.push({
				action: { go: "project", label: "Start capstone" },
				text: "You are past the halfway mark. Pick your capstone persona now so you build as you learn instead of cramming at the end.",
				tone: "build",
			})
		}

		const readiness = this.examReadiness(slug, state)
		if (readiness.score >= 80 && !state.exam) {
			list.push({
				action: { go: "assessments", label: "Go to assessments" },
				text: `You are ready at ${readiness.score}%. Book your ${ASSESSMENT_NAMES.exam}.`,
				tone: "prove",
			})
		}

		if (next && list.length < 3) {
			list.push({
				action: { go: "learning", label: "Continue learning" },
				text: `Next up: ${next.stage.label} in ${next.lesson.title}.`,
				tone: "next",
			})
		}

		return list.slice(0, 3)
	},

	/* ---------- opportunity matching ---------- */

	opportunities(slug, state) {
		const report = this.skillReport(slug, state)
		const scoreOf = id =>
			(report.find(s => s.id === id) || { score: 0 }).score

		return OPPORTUNITIES.map(opp => {
			const needs = Object.entries(opp.requires)
			const ratios = needs.map(([id, need]) =>
				Math.min(scoreOf(id) / need, 1),
			)
			const match = Math.round(
				(ratios.reduce((a, b) => a + b, 0) / ratios.length) * 100,
			)
			const gaps = needs
				.filter(([id, need]) => scoreOf(id) < need)
				.map(([id, need]) => ({
					have: scoreOf(id),
					need,
					skill: report.find(s => s.id === id)?.name || id,
				}))
			// * "Why matched" reads better as met requirements than as a bare score.
			const met = needs
				.filter(([id, need]) => scoreOf(id) >= need)
				.map(([id]) => report.find(s => s.id === id)?.name || id)
			return { ...opp, gaps, match, met, unlocked: gaps.length === 0 }
		}).sort((a, b) => b.match - a.match)
	},

	overallSkillScore(slug, state) {
		const report = this.skillReport(slug, state)
		if (!report.length) return 0
		return Math.round(
			report.reduce((sum, s) => sum + s.score, 0) / report.length,
		)
	},

	/* ---------- career passport ---------- */

	/* * Profile strength is only useful if it says what to fix, so every missing
       item ships with the action that closes it. */
	profileStrength(user, slug, state) {
		const cert = this.certificateStatus(slug, state)
		const report = this.skillReport(slug, state)
		if (this.isSelfPaced(slug)) {
			const checks = [
				{
					label: "Complete your profile",
					met: !!(user.name && user.city && user.education),
					weight: 20,
				},
				{
					label: "Watch half the lessons",
					met: this.learningPct(slug, state) >= 50,
					weight: 30,
				},
				{
					label: "Finish the playlist",
					met: this.learningPct(slug, state) >= 100,
					weight: 35,
				},
				{
					label: "Earn your certificate",
					met: !!cert.earned,
					weight: 15,
				},
			]
			const pct = checks
				.filter(c => c.met)
				.reduce((sum, c) => sum + c.weight, 0)
			return { checks, missing: checks.filter(c => !c.met), pct }
		}
		const checks = [
			{
				label: "Complete your profile",
				met: !!(user.name && user.city && user.education),
				weight: 10,
			},
			{
				label: "Take the Starting Point Check",
				met: !!state.baseline,
				weight: 10,
			},
			{
				label: "Finish half the modules",
				met: this.learningPct(slug, state) >= 50,
				weight: 15,
			},
			{
				label: "Submit five Skill Challenges",
				met: this.taskStats(slug, state).done >= 5,
				weight: 15,
			},
			{
				label: "Verify one skill",
				met: report.some(s => s.mastery.id === "verified"),
				weight: 15,
			},
			{
				label: "Submit your capstone project",
				met: !!state.project.submitted,
				weight: 20,
			},
			{ label: "Earn your certificate", met: !!cert.earned, weight: 15 },
		]
		const pct = checks
			.filter(c => c.met)
			.reduce((sum, c) => sum + c.weight, 0)
		return { checks, missing: checks.filter(c => !c.met), pct }
	},

	projectPct(slug, state) {
		const capstone = this.capstone(slug)
		if (!capstone) return 0
		const partsDone = capstone.parts.filter(
			part => state.project.parts[part.id],
		).length
		const partsPct = (partsDone / capstone.parts.length) * 70
		const portfolioPct =
			Math.min(state.portfolio.length / capstone.portfolioTarget, 1) * 30
		return Math.round(partsPct + portfolioPct)
	},

	quizStats(slug, state) {
		const modules = this.teachingModules(slug)
		const taken = modules.filter(({ index }) => state.quiz[String(index)])
		const avg = taken.length
			? Math.round(
					taken.reduce(
						(sum, { index }) =>
							sum + state.quiz[String(index)].score,
						0,
					) / taken.length,
				)
			: 0
		return { avg, taken: taken.length, total: modules.length }
	},

	/* * Two or three suggestions, never a catalogue. */
	recommendations(slug, state) {
		const list = []
		const weak = this.weakestSkill(slug, state)
		const matches = this.opportunities(slug, state)
		const top = matches[0]
		const nextProgram = this.nextProgram(slug)

		if (this.isSelfPaced(slug)) {
			const next = this.nextStep(slug, state)
			const learning = this.learningPct(slug, state)
			if (next) {
				list.push({
					body: "Watch this recorded lesson next. Progress is the playlist you finish.",
					cta: "Open lessons",
					go: { sub: "modules", tab: "learn", type: "tab" },
					kind: "Lesson",
					title: next.lesson.title,
				})
			}
			if (learning >= 100) {
				list.push({
					body: "You finished every recorded lesson. Your completion certificate is ready.",
					cta: "View certificate",
					go: { sub: "assessments", tab: "career", type: "tab" },
					kind: "Certificate",
					title: "Playlist complete",
				})
				list.push({
					body: "Bootcamps are the entry point. Live tracks add projects, assessments and internships.",
					cta: "Browse tracks",
					go: { href: "programs.html", type: "link" },
					kind: "Next step",
					title: "Take a live career track",
				})
			}
			return list.slice(0, 3)
		}

		if (!state.baseline) {
			list.push({
				body: "Six questions, no pass mark. It sets the baseline we measure your growth against.",
				cta: "Take the check",
				go: { type: "diagnostic" },
				kind: ASSESSMENT_NAMES.baseline,
				title: "Find out where you are starting from",
			})
		}

		if (weak && weak.score < 65) {
			list.push({
				body: `It is your lowest evidenced skill at ${weak.score}/100, and it is blocking the most opportunities.`,
				cta: "Practise it",
				go: { sub: "practice", tab: "learn", type: "tab" },
				kind: "Practice",
				title: `Bring up ${weak.name}`,
			})
		}

		if (top && top.match >= 50) {
			list.push({
				body: top.unlocked
					? "You meet every requirement listed for this role."
					: `Close. ${top.gaps.map(g => g.skill).join(" and ")} still short.`,
				cta: top.unlocked ? "Apply" : "See what is missing",
				go: { tab: "opportunities", type: "tab" },
				kind: top.type,
				title: `${top.role} — ${top.match}% match`,
			})
		}

		if (
			list.length < 3 &&
			nextProgram &&
			this.certificateStatus(slug, state).earned
		) {
			list.push({
				body: nextProgram.why,
				cta: "Explore it",
				go: {
					href: `program.html?id=${nextProgram.slug}`,
					type: "link",
				},
				kind: "Next certification",
				title: nextProgram.program.title,
			})
		}

		return list.slice(0, 3)
	},
	STAGES,

	skillReport(slug, state) {
		return this.skills(slug).map(skill => {
			const score = this.skillScore(slug, state, skill)
			const hasAssessment =
				skill.modules.some(i => state.quiz[String(i)]) ||
				Boolean(state.exam)
			const baseline = state.baseline
				? state.baseline.perSkill[skill.id] || 0
				: null
			return {
				...skill,
				baseline,
				delta: baseline === null ? null : score - baseline,
				mastery: this.masteryFor(score, hasAssessment),
				score,
			}
		})
	},

	/* ---------- skill mastery ---------- */

	/* Weighted evidence: learning 25, practice 25, quiz 30, proof 20. */
	skillScore(slug, state, skill) {
		const modules = skill.modules
		if (!modules.length) return 0
		if (this.isSelfPaced(slug)) {
			const watched = this.watchedSet(state)
			return Math.round(
				(modules.filter(i => watched.has(i)).length / modules.length) *
					100,
			)
		}

		const stageTotal = modules.length * STAGES.length
		const stageDone = modules.reduce(
			(sum, i) => sum + this.stagesDone(state, i).size,
			0,
		)
		const learning = (stageDone / stageTotal) * 25

		const tasks = this.allTasks(slug).filter(
			task => task.skill === skill.id,
		)
		const tasksDone = tasks.filter(task => state.tasks[task.id]).length
		const practice = tasks.length ? (tasksDone / tasks.length) * 25 : 0

		const quizzes = modules.map(i => state.quiz[String(i)]).filter(Boolean)
		const quizAvg = quizzes.length
			? quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length
			: 0
		const quiz = (quizAvg / 100) * 30

		let proof = 0
		if (state.project.submitted) proof += 10
		if (state.exam) proof += (state.exam.score / 100) * 10

		// * Programs without an authored quiz bank redistribute that 30 across learning and practice.
		const kit = this.kit(slug, modules[0])
		const hasQuizBank = Boolean(kit?.quiz?.length)
		const raw = hasQuizBank
			? learning + practice + quiz + proof
			: (learning + practice) * 1.6 + proof

		return Math.min(100, Math.round(raw))
	},

	skills(slug) {
		if (SKILL_GRAPH[slug]) return SKILL_GRAPH[slug]
		// * Fallback: one skill per teaching module, named from the module title.
		return this.teachingModules(slug).map(({ lesson, index }) => ({
			id: `m${index}`,
			modules: [index],
			name: lesson.title,
		}))
	},

	/* ---------- progress ---------- */

	stagesDone(state, index) {
		const stages = state?.stages ? state.stages : {}
		return new Set(stages[String(index)] || [])
	},

	taskStats(slug, state) {
		const all = this.allTasks(slug)
		const submitted = all.filter(task => state.tasks[task.id])
		return {
			done: submitted.length,
			pending: all.length - submitted.length,
			total: all.length,
		}
	},

	tasksFor(slug, index) {
		const kit = this.kit(slug, index)
		return kit ? kit.tasks : []
	},

	/* ---------- curriculum shape ---------- */

	/* Modules that run the six-stage flow; capstone/portfolio/exam are handled separately. */
	teachingModules(slug) {
		const course = this.courseOf(slug)
		if (!(course && Array.isArray(course.curriculum))) return []
		const mapped = course.curriculum.map((lesson, index) => ({
			index,
			lesson,
		}))
		if (course.kind === "self-paced") return mapped
		return mapped.filter(
			({ lesson }) =>
				!["Capstone", "Portfolio", "Final Exam", "Exam"].includes(
					lesson.week,
				),
		)
	},

	tutorReply(slug, state, question) {
		const q = question.toLowerCase().trim()
		const course = this.courseOf(slug)
		const curriculum = course?.curriculum || []
		const next = this.nextStep(slug, state)
		const weak = this.weakestSkill(slug, state)

		const progressLine = () => {
			const learning = this.learningPct(slug, state)
			const quiz = this.quizStats(slug, state)
			const tasks = this.taskStats(slug, state)
			return `You are at ${learning}% learning completion, ${tasks.done}/${tasks.total} practice tasks submitted and a ${quiz.avg}% quiz average across ${quiz.taken} of ${quiz.total} modules.`
		}

		if (/how am i|my progress|doing/.test(q)) {
			const lines = [progressLine()]
			if (weak)
				lines.push(
					`Your weakest skill right now is ${weak.name} at ${weak.score}/100 (${weak.mastery.label}).`,
				)
			if (next)
				lines.push(
					`The next thing to finish is ${next.stage.label} in ${next.lesson.title}.`,
				)
			return { body: lines, source: "Your progress data" }
		}

		if (/revise|weak|improve|struggl/.test(q)) {
			if (!weak)
				return {
					body: [
						"You have not generated enough evidence yet. Finish one module — concept through quiz — and I will be able to tell you exactly what to revise.",
					],
					source: "Your progress data",
				}
			const modules = weak.modules.map(i => curriculum[i]).filter(Boolean)
			const failed = weak.modules
				.map(i => ({ i, quiz: state.quiz[String(i)] }))
				.filter(x => x.quiz && x.quiz.score < 70)
			const lines = [
				`Revise ${weak.name} first — you are at ${weak.score}/100.`,
			]
			modules.forEach(m => {
				lines.push(
					`Re-read ${m.title}: ${(m.sections || [])
						.slice(0, 3)
						.map(s => s.name)
						.join(", ")}.`,
				)
			})
			if (failed.length) {
				lines.push(
					`You scored below 70% on ${failed.map(f => curriculum[f.i].title).join(" and ")}. Retake those quizzes after one practice task.`,
				)
			}
			const pending = this.allTasks(slug).filter(
				t => t.skill === weak.id && !state.tasks[t.id],
			)
			if (pending.length)
				lines.push(
					`Pending practice for this skill: ${pending.map(t => t.title).join(", ")}.`,
				)
			return {
				body: lines,
				source: `${weak.name} · your quiz and practice record`,
			}
		}

		if (/practice|exercise|task/.test(q)) {
			const target = weak ? weak.id : null
			const pending = this.allTasks(slug).filter(
				t => !state.tasks[t.id] && (!target || t.skill === target),
			)
			const pick =
				pending[0] || this.allTasks(slug).find(t => !state.tasks[t.id])
			if (!pick)
				return {
					body: [
						"Every practice task is submitted. Move to the capstone — that is where the remaining 30% of your score sits.",
					],
					source: "Your practice record",
				}
			return {
				body: [
					`Do this next: ${pick.title} (${pick.minutes} min).`,
					pick.brief,
					`It sits in ${curriculum[pick.module].title}.`,
				],
				source: "Practice engine",
			}
		}

		if (/capstone|project/.test(q)) {
			const capstone = this.capstone(slug)
			const pct = this.projectPct(slug, state)
			if (!capstone)
				return {
					body: [
						"This program does not have a capstone configured yet.",
					],
					source: "Curriculum",
				}
			const missing = capstone.parts.filter(
				p => !state.project.parts[p.id],
			)
			const lines = [`Your capstone is ${pct}% complete.`]
			if (!state.project.persona)
				lines.push(
					"You have not picked a persona yet. That decision shapes all five assistants.",
				)
			if (missing.length)
				lines.push(
					`Still to build: ${missing.map(p => p.name).join(", ")}.`,
				)
			lines.push(
				`Prompt portfolio: ${state.portfolio.length}/${capstone.portfolioTarget} documented.`,
			)
			return { body: lines, source: "Capstone tracker" }
		}

		if (/exam|ready|certificate/.test(q)) {
			const readiness = this.examReadiness(slug, state)
			const cert = this.certificateStatus(slug, state)
			const lines = [
				`Exam readiness: ${readiness.score}% — ${readiness.label}.`,
			]
			cert.criteria.forEach(c => {
				lines.push(
					`${c.met ? "Met" : "Not met"}: ${c.label} (${c.value}).`,
				)
			})
			return { body: lines, source: "Assessment record" }
		}

		if (/job|internship|career|opportunit/.test(q)) {
			const top = this.opportunities(slug, state)[0]
			const lines = [
				`Your closest match right now is ${top.role} at ${top.company} — ${top.match}% match.`,
			]
			if (top.gaps.length) {
				top.gaps.forEach(g => {
					lines.push(
						`Raise ${g.skill} from ${g.have} to ${g.need} to unlock it.`,
					)
				})
			} else {
				lines.push(
					"You meet every requirement. Apply from the Opportunities panel.",
				)
			}
			return { body: lines, source: "Opportunity matching" }
		}

		// * Topic lookup across the curriculum, matched on module titles and sub-topics.
		const hit = this.findTopic(slug, q)
		if (hit) {
			const lines = [`${hit.lesson.title} — ${hit.lesson.detail}`]
			if (hit.section) {
				lines.push(
					`${hit.section.name}: ${hit.section.points.join("; ")}.`,
				)
			} else {
				;(hit.lesson.sections || []).slice(0, 3).forEach(s => {
					lines.push(`${s.name}: ${s.points.slice(0, 3).join("; ")}.`)
				})
			}
			if (hit.lesson.outcome)
				lines.push(
					`What you should be able to do: ${hit.lesson.outcome}`,
				)
			if (hit.lesson.activity)
				lines.push(`Practise it: ${hit.lesson.activity}`)
			return {
				body: lines,
				source: `${hit.lesson.week} · ${hit.lesson.title}`,
			}
		}

		return {
			body: [
				"I answer from your curriculum and your own progress record, so I could not match that to a topic in this program.",
				progressLine(),
				"Try asking about a module topic, or ask: what should I revise, give me practice, how is my capstone, or am I exam ready.",
			],
			source: "Tutor fallback",
		}
	},

	/* ---------- grounded AI tutor ----------
     Rules-based and honest: it answers from the curriculum and the learner's
     own state rather than pretending to be a live model. */

	tutorSuggestions(slug, state) {
		const next = this.nextStep(slug, state)
		const weak = this.weakestSkill(slug, state)
		const suggestions = ["How am I doing?", "What should I revise?"]
		if (next) suggestions.push(`Explain ${next.lesson.title}`)
		if (weak) suggestions.push(`Give me practice on ${weak.name}`)
		return suggestions
	},

	watchedSet(state) {
		return new Set((state?.watched || []).map(Number))
	},

	weakestSkill(slug, state) {
		const started = this.skillReport(slug, state).filter(s => s.score > 0)
		if (!started.length) return null
		return started.reduce((low, s) => (s.score < low.score ? s : low))
	},
}

export {
	APPLICATION_STAGES,
	ASSESSMENT_NAMES,
	COMMUNITY_CHALLENGE,
	COMMUNITY_SEED,
	Engine,
	MASTERY_LEVELS,
	STAGES,
}
