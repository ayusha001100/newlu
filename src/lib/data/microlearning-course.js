/* ============================================================
   Adaptive Microlearning Engine — Course Data
   Topic: AI Product Management & Generative AI
   Pedagogy: Duolingo / Brilliant 2-phase active recall model
   ============================================================ */

export const COURSE_METADATA = {
	author: "LetsUpgrade AI Institute",
	bannerTag: "Career-Ready Track 🔥",
	description:
		"Master the transition from traditional software PM to AI Product Manager. Learn prompt architecture, model evaluation, AI UX patterns, and launch real-world AI applications.",
	duration: "7 Days • 10-15 min/day",
	id: "ai-product-management",
	level: "Beginner to Career-Ready",
	subtitle: "Build, evaluate, and launch AI products in 7 days",
	title: "AI Product Management & Generative AI",
}

export const RANKS = [
	{
		color: "#10B981",
		emoji: "🌱",
		level: 1,
		minXp: 0,
		title: "Curious Intern",
	},
	{
		color: "#3B82F6",
		emoji: "🧭",
		level: 2,
		minXp: 200,
		title: "Junior PM Scout",
	},
	{
		color: "#8B5CF6",
		emoji: "🚀",
		level: 3,
		minXp: 500,
		title: "AI Product Associate",
	},
	{
		color: "#F59E0B",
		emoji: "⚡",
		level: 4,
		minXp: 1000,
		title: "Senior AI Strategist",
	},
	{
		color: "#EC4899",
		emoji: "👑",
		level: 5,
		minXp: 1800,
		title: "Principal Product Lead",
	},
	{
		color: "#FFB300",
		emoji: "🏆",
		level: 6,
		minXp: 2800,
		title: "Head of Product & AI",
	},
]

export const BADGES = [
	{
		condition: state => state.firstTryCount >= 1,
		desc: "Answered your first active recall correctly on first try.",
		id: "first_blood",
		title: "First Blood 🎯",
	},
	{
		condition: state => state.maxStreak >= 3,
		desc: "Maintained a 3+ correct answer momentum streak.",
		id: "on_fire",
		title: "Streak Master 🔥",
	},
	{
		condition: state => state.completedNodes?.length >= 2,
		desc: "Completed a lesson node in under 3 minutes.",
		id: "speed_demon",
		title: "Speed Demon ⚡",
	},
	{
		condition: state =>
			state.remedialCount >= 1 || state.completedNodes?.length >= 3,
		desc: "Explored a remedial adaptive branch or visual comparison.",
		id: "deep_dive",
		title: "Deep Dive 📚",
	},
	{
		condition: state => state.completedModules?.includes(0),
		desc: "Unlocked your first real-world internship opportunity.",
		id: "career_unlocked",
		title: "Career Vault Hunter 💼",
	},
	{
		condition: state => state.completedModules?.length >= 7,
		desc: "Completed the entire 7-day AI PM curriculum.",
		id: "capstone_ready",
		title: "AI PM Champion 🏆",
	},
]

export const REASSURANCE_MESSAGES = [
	"💡 68% of senior PMs get this wrong on their first try!",
	"🔥 You are in the top 10% of learners today for accuracy!",
	"🧠 Learning happens through active retrieval, not passive watching.",
	"⚡ Momentum unlocked! Your brain is forming new neural connections.",
	"🎯 Great intuition! That is the exact mindset top AI product teams look for.",
	"🌱 Making mistakes is part of learning. Let's see why this nuance matters!",
]

export const COURSE_MODULES = [
	{
		career_unlock: {
			company: "HyperGrowth Labs (Remote)",
			deadline: "Rolling Admissions",
			skills: ["LLM Fundamentals", "User Need Framing", "PRD Writing"],
			status: "Locked until Module 1 is finished",
			stipend: "₹25,000 / month",
			title: "Junior AI Product Associate Internship",
		},
		day: 1,
		icon: "Sparkles",
		id: 0,
		module_id: "MOD-01",
		nodes: [
			{
				duration: "3 min",
				node_id: "N01-01",
				screens: [
					{
						content: {
							body: "They do not write the production code. They do not design pixel-perfect icons. They decide what problems are worth solving, for whom, and why.",
							comparison_table: {
								headers: [
									"Role",
									"Primary Focus",
									"Key Artifact",
								],
								rows: [
									[
										"Product Manager",
										"Why & What to build",
										"PRD & Product Roadmap",
									],
									[
										"Product Designer",
										"User Experience & UI",
										"Figma wireframes & flows",
									],
									[
										"Software Engineer",
										"Architecture & Code",
										"Production software & APIs",
									],
								],
							},
							headline:
								"A Product Manager owns the 'Why' and 'What' of a product.",
							visual_hint:
								"🎯 Product Triad: PM (Why & What) + Designer (How it feels) + Engineer (How it works)",
						},
						difficulty_level: 1,
						emotional_tone: "calm",
						feedback: {
							correct:
								"Spot on! PMs define what gets built and why. Engineering teams decide the tech stack and code architecture.",
							incorrect:
								"Not quite. Even in technical AI teams, the PM defines the problem and product requirements, not the production code.",
						},
						interaction: {
							correct_answer: "No",
							hint: "Remember: PMs own strategy and requirements ('Why & What'), while engineers own implementation ('How').",
							options: ["Yes", "No"],
							prompt: "Does an AI Product Manager write production software code for the product?",
							type: "yes_no",
						},
						next_screen_logic: {
							if_correct: "S01-01-02",
							if_incorrect: "S01-01-01-RETRY",
							if_skipped: "S01-01-02",
						},
						reading_time: "30 sec read",
						screen_id: "S01-01-01",
						screen_type: "concept",
						social_proof: "💡 94% of learners master this on day 1",
					},
					{
						content: {
							body: "In traditional coding: `if (user == valid) login()`. In Generative AI: the output is non-deterministic and varies based on probabilities and temperature.",
							headline:
								"Traditional Software is Deterministic; AI is Probabilistic.",
							visual_hint:
								"🎲 Deterministic (Code) = 2 + 2 is ALWAYS 4. Probabilistic (AI) = 'Write a poem' produces infinite variations.",
						},
						difficulty_level: 1,
						emotional_tone: "curious",
						feedback: {
							correct:
								"Exact! LLMs predict the next most probable token, which makes them creative and flexible, but also prone to variations.",
							incorrect:
								"Look at Option B. Large Language Models pick words based on probability matrices, not fixed deterministic rules.",
						},
						interaction: {
							correct_answer: "B",
							hint: "Think about why temperature and token prediction introduce creativity vs rigid logic.",
							options: [
								{
									id: "A",
									text: "Because servers overheat at random intervals",
								},
								{
									id: "B",
									text: "Because LLMs generate tokens based on probability distributions",
								},
								{
									id: "C",
									text: "Because the internet latency changes constantly",
								},
								{
									id: "D",
									text: "Because users never type English words properly",
								},
							],
							prompt: "Why can't an AI PM guarantee that an LLM feature will output the exact same sentence every time?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "S01-01-03",
							if_incorrect: "S01-01-03",
							if_skipped: "S01-01-03",
						},
						reading_time: "45 sec read",
						screen_id: "S01-01-02",
						screen_type: "concept",
					},
					{
						content: {
							body: "You now understand the fundamental distinction between classical software PM and AI Product Management.",
							headline: "Quick Milestone Reflection",
						},
						difficulty_level: 1,
						emotional_tone: "celebratory",
						feedback: {
							correct:
								"Awesome reflection recorded! +15 XP added to your Career Vault balance.",
							incorrect: "",
						},
						interaction: {
							correct_answer: null,
							options: [
								"🌱 Just getting started, need more examples",
								"👍 Good intuition, ready for prompt architecture",
								"🚀 Crystal clear! I can teach this right now",
							],
							prompt: "How confident do you feel explaining the difference between 'deterministic code' and 'probabilistic AI' to a team member?",
							type: "quick_reflection",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "20 sec check",
						screen_id: "S01-01-03",
						screen_type: "reflection",
					},
				],
				title: "The PM Role vs Engineers & Designers",
			},
			{
				duration: "4 min",
				node_id: "N01-02",
				screens: [
					{
						content: {
							body: "When an LLM doesn't have ground truth, it doesn't say 'I do not know' by default. It generates text that sounds grammatically flawless and completely confident.",
							headline:
								"Hallucinations are not bugs; they are how LLMs operate.",
							visual_hint:
								"⚠️ Plausibility ≠ Factual Truth. An AI can fabricate a legal citation with complete confidence.",
						},
						difficulty_level: 2,
						emotional_tone: "intense",
						feedback: {
							correct:
								"Brilliant! RAG (Retrieval-Augmented Generation) feeds the actual company policy directly into the prompt context.",
							incorrect:
								"Think about RAG (Option B). Providing the exact verified company docs in context prevents the model from guessing.",
						},
						interaction: {
							correct_answer: "B",
							hint: "RAG anchors the model to verified internal documents before generating an answer.",
							options: [
								{
									id: "A",
									text: "Tell customer support to apologize manually every time",
								},
								{
									id: "B",
									text: "Implement Retrieval-Augmented Generation (RAG) with ground-truth docs",
								},
								{
									id: "C",
									text: "Lower the server bandwidth to slow down output",
								},
								{
									id: "D",
									text: "Delete the customer's account immediately",
								},
							],
							prompt: "If an AI chat assistant quotes a fake refund policy clause to a customer, what is the PM's best architectural fix?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "S01-02-02",
							if_incorrect: "S01-02-02",
							if_skipped: "S01-02-02",
						},
						reading_time: "35 sec read",
						screen_id: "S01-02-01",
						screen_type: "concept",
						social_proof:
							"💡 72% of learners find this question tricky",
					},
					{
						content: {
							body: "Before building an expensive custom AI model, smart product teams validate the user need in 3 sequential steps.",
							headline: "Ordering the AI Problem Validation Flow",
						},
						difficulty_level: 2,
						emotional_tone: "curious",
						feedback: {
							correct:
								"Mastery! Never build custom AI infrastructure before proving that users actually want the feature with simple APIs.",
							incorrect:
								"Review the sequence: 1. User problem ➔ 2. Fast LLM API prototype ➔ 3. Fine-tuning / custom infrastructure.",
						},
						interaction: {
							correct_answer: "B",
							hint: "Always start with user problem first, fast API prototype second, and expensive custom infrastructure last.",
							options: [
								{
									id: "A",
									text: "Build custom GPUs ➔ Train from scratch ➔ Ask users if they want it",
								},
								{
									id: "B",
									text: "1. Define user friction ➔ 2. Fast LLM API prototype ➔ 3. Scale infrastructure",
								},
								{
									id: "C",
									text: "Hire 50 prompt engineers before writing any product requirements",
								},
								{
									id: "D",
									text: "Launch in production without testing",
								},
							],
							prompt: "What is the recommended 3-step order for validating an AI product feature?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "30 sec read",
						screen_id: "S01-02-02",
						screen_type: "concept",
					},
				],
				title: "The AI Product Triad & Hallucinations",
			},
		],
		tagline: "What changes when software can hallucinate?",
		title: "PM Foundations & The AI Shift",
		xp_reward: 100,
	},
	{
		career_unlock: {
			company: "ProductLab Resources",
			deadline: "Permanent Access",
			skills: [
				"Feasibility Scoring",
				"Cost-Per-Token Estimation",
				"Latency Budgets",
			],
			status: "Locked until Module 2 is finished",
			stipend: "Industry Standard Asset",
			title: "AI PRD & Opportunity Spec Template",
		},
		day: 2,
		icon: "Compass",
		id: 1,
		module_id: "MOD-02",
		nodes: [
			{
				duration: "3 min",
				node_id: "N02-01",
				screens: [
					{
						content: {
							body: "AI adds latency (2-5 seconds) and cost (API token pricing). Use AI for unstructured data, synthesis, translation, and reasoning — not basic filters.",
							comparison_table: {
								headers: ["Task", "Best Approach", "Why"],
								rows: [
									[
										"Filter products by price < $50",
										"SQL / Database index",
										"Instant (5ms), zero cost, 100% accurate",
									],
									[
										"Summarize 50 customer reviews",
										"LLM (Generative AI)",
										"Synthesizes messy human sentiment",
									],
									[
										"Sort a table by date",
										"Frontend sort",
										"Zero API cost, deterministic",
									],
								],
							},
							headline:
								"Don't use an LLM when a SQL query or dropdown works faster.",
						},
						difficulty_level: 2,
						emotional_tone: "calm",
						feedback: {
							correct:
								"100% Correct! Senior AI PMs ruthlessly reject using AI for things standard deterministic algorithms solve better.",
							incorrect:
								"Option B is correct. Never add 2 seconds of API delay and token costs for a basic arithmetic sort.",
						},
						interaction: {
							correct_answer: "B",
							hint: "Think about cost, latency, and reliability. Is AI overkill for numeric sorting?",
							options: [
								{
									id: "A",
									text: "Yes, because everything in 2026 must use AI",
								},
								{
									id: "B",
									text: "No, a standard database query or frontend sort is instant, free, and 100% reliable",
								},
								{
									id: "C",
									text: "Yes, but only with temperature set to 0.9",
								},
								{
									id: "D",
									text: "No, price sorting is impossible in web browsers",
								},
							],
							prompt: "A startup wants to let users sort their shopping list by price (low to high). Should they call OpenAI's API?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "S02-01-02",
							if_incorrect: "S02-01-02",
							if_skipped: "S02-01-02",
						},
						reading_time: "35 sec read",
						screen_id: "S02-01-01",
						screen_type: "concept",
					},
					{
						content: {
							body: "Unlike traditional APIs where you pay per server instance, Generative AI models charge you based on the number of processed input and output units.",
							headline:
								"Filling in the Blank: AI Cost Architecture",
						},
						difficulty_level: 2,
						emotional_tone: "curious",
						feedback: {
							correct:
								"Bullseye! 'Token' is the fundamental currency of LLMs. PMs must budget both Input Tokens and Output Tokens.",
							incorrect:
								"The answer is 'Token' (or 'Tokens'). LLMs parse text into numeric tokens for processing and billing.",
						},
						interaction: {
							correct_answer: "C",
							hint: "Starts with 't' and rhymes with 'broken'. (e.g. 1000 tokens ≈ 750 words).",
							options: [
								{ id: "A", text: "Pixels" },
								{ id: "B", text: "Megabytes" },
								{ id: "C", text: "Tokens" },
								{ id: "D", text: "Frames" },
							],
							prompt: "What is the fundamental text unit used to bill and process LLM input and output?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "30 sec read",
						screen_id: "S02-01-02",
						screen_type: "concept",
					},
				],
				title: "The AI Feasibility vs Value Matrix",
			},
		],
		tagline: "Should this feature be AI, or just a simple dropdown?",
		title: "Problem Discovery & AI Feasibility",
		xp_reward: 120,
	},
	{
		career_unlock: {
			company: "AI PM Playbook",
			deadline: "Unlocked",
			skills: ["Model Benchmarking", "Cost Optimization", "SLAs"],
			status: "Locked until Module 3 is finished",
			stipend: "Exclusive Download",
			title: "LLM Selection & Latency vs Cost Cheat Sheet",
		},
		day: 3,
		icon: "Cpu",
		id: 2,
		module_id: "MOD-03",
		nodes: [
			{
				duration: "4 min",
				node_id: "N03-01",
				screens: [
					{
						content: {
							body: "For instant autocomplete or search re-ranking, you need <300ms latency. For complex financial analysis or legal drafting, you can afford 8 seconds for deeper reasoning.",
							headline:
								"Small Fast Models (Gemini Flash / GPT-4o mini) vs Frontier Reasoning Models (o1 / Sonnet).",
						},
						difficulty_level: 2,
						emotional_tone: "calm",
						feedback: {
							correct:
								"Superb! Fast sub-second models deliver seamless UI responsiveness for inline typing hints.",
							incorrect:
								"Think about user experience: users cannot wait 15 seconds while typing a sentence. Option B is right.",
						},
						interaction: {
							correct_answer: "B",
							hint: "Real-time interactive typing requires instant tokens (streaming under 300ms).",
							options: [
								{
									id: "A",
									text: "A heavy reasoning model like OpenAI o1 with 15-second response time",
								},
								{
									id: "B",
									text: "A fast, lightweight model (e.g., Gemini 1.5 Flash or GPT-4o mini) with sub-second streaming",
								},
								{
									id: "C",
									text: "An offline manual human transcription service",
								},
								{
									id: "D",
									text: "A model that sleeps 5 seconds between each keystroke",
								},
							],
							prompt: "You are building real-time auto-suggestions as a user types an email. Which model tier should you choose?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "30 sec read",
						screen_id: "S03-01-01",
						screen_type: "concept",
					},
				],
				title: "Latency vs Intelligence Trade-offs",
			},
		],
		tagline:
			"Choosing between GPT-4o, Claude 3.5 Sonnet, Gemini Flash, and Open Weights",
		title: "LLM Capabilities, Trade-offs & Models",
		xp_reward: 120,
	},
	{
		career_unlock: {
			company: "OpenAI PM Community",
			deadline: "Permanent Access",
			skills: [
				"Few-Shot Prompting",
				"JSON Schema Enforcement",
				"Guardrail Prompts",
			],
			status: "Locked until Module 4 is finished",
			stipend: "Industry Vault Asset",
			title: "Production System Prompt Repository (50+ Real PM Prompts)",
		},
		day: 4,
		icon: "Code",
		id: 3,
		module_id: "MOD-04",
		nodes: [
			{
				duration: "3 min",
				node_id: "N04-01",
				screens: [
					{
						content: {
							body: "When your frontend needs to show cards, buttons, or charts, enforce JSON Schema Output (Structured Outputs). This guarantees 100% valid JSON keys every single time.",
							headline:
								"Never let an LLM return unstructured conversational text if your backend needs to render UI components.",
							visual_hint:
								"🔧 Raw chat text breaks frontend JSON.parse(). Structured JSON Schema ensures type safety.",
						},
						difficulty_level: 2,
						emotional_tone: "curious",
						feedback: {
							correct:
								"Exactly right! Structured outputs strip conversational chatter and return clean, parseable JSON payloads for frontend components.",
							incorrect:
								"Yes it does! Structured outputs constrain token selection to strictly match valid JSON formatting.",
						},
						interaction: {
							correct_answer: "Yes",
							hint: "JSON mode forces the model to strictly adhere to the defined schema without extra conversational greeting words.",
							options: ["Yes", "No"],
							prompt: "Does enabling Structured JSON Outputs prevent the AI from wrapping responses in conversational fluff like 'Sure, here is your answer:'?",
							type: "yes_no",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "40 sec read",
						screen_id: "S04-01-01",
						screen_type: "concept",
					},
				],
				title: "System Prompts & Structured JSON Outputs",
			},
		],
		tagline:
			"System prompts, Few-Shot examples, and Structured Outputs (JSON Mode)",
		title: "Prompt Engineering & Context Architecture",
		xp_reward: 130,
	},
	{
		career_unlock: {
			company: "LetsUpgrade Design Studio",
			deadline: "Unlocked",
			skills: [
				"Streaming UX",
				"Progressive Disclosure",
				"Feedback Loops",
			],
			status: "Locked until Module 5 is finished",
			stipend: "Design System Kit",
			title: "AI UX Figma Component Library (React & Tailwind ready)",
		},
		day: 5,
		icon: "Layers",
		id: 4,
		module_id: "MOD-05",
		nodes: [
			{
				duration: "3 min",
				node_id: "N05-01",
				screens: [
					{
						content: {
							body: "Users perceive a 5-second wait as slow and broken. But when tokens start appearing in 200ms (Time to First Token), users feel the app is lightning fast because they can read in real-time.",
							headline:
								"Why Streaming Tokens beats a 5-second spinner every time.",
						},
						difficulty_level: 2,
						emotional_tone: "calm",
						feedback: {
							correct:
								"Boom! TTFT (Time to First Token) is the gold standard metric for conversational & generative AI UX.",
							incorrect:
								"Option A is correct: TTFT (Time to First Token) dictates perceived speed and keeps user attention engaged.",
						},
						interaction: {
							correct_answer: "A",
							hint: "Think about how fast the first word starts rendering on the screen.",
							options: [
								{ id: "A", text: "TTFT (Time to First Token)" },
								{
									id: "B",
									text: "Total server hard drive capacity",
								},
								{
									id: "C",
									text: "Number of CSS animations loaded",
								},
								{
									id: "D",
									text: "Size of the browser tab icon",
								},
							],
							prompt: "What is the headline metric for measuring user-perceived responsiveness in generative AI interfaces?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "35 sec read",
						screen_id: "S05-01-01",
						screen_type: "concept",
					},
				],
				title: "Perceived Latency & Streaming UX",
			},
		],
		tagline:
			"Streaming tokens, optimistic UI, skeleton loaders, and human-in-the-loop",
		title: "AI UX & Two-Phase Design Patterns",
		xp_reward: 140,
	},
	{
		career_unlock: {
			company: "Guardrail Systems Inc",
			deadline: "Permanent Access",
			skills: [
				"LLM-as-a-Judge",
				"Prompt Injection Defense",
				"Hallucination Benchmark",
			],
			status: "Locked until Module 6 is finished",
			stipend: "Framework Code",
			title: "Enterprise AI Safety & LLM Evaluation Test Suite",
		},
		day: 6,
		icon: "ShieldCheck",
		id: 5,
		module_id: "MOD-06",
		nodes: [
			{
				duration: "4 min",
				node_id: "N06-01",
				screens: [
					{
						content: {
							body: "A junior PM tests 3 prompts manually in ChatGPT and says 'looks good'. A senior AI PM maintains a golden dataset of 100+ edge cases and runs automated evals on every prompt change.",
							headline:
								"Vibe checks are not enough: You need an Eval test set.",
						},
						difficulty_level: 3,
						emotional_tone: "intense",
						feedback: {
							correct:
								"Master class! LLM-as-a-Judge allows product teams to score thousands of test outputs automatically in minutes.",
							incorrect:
								"Option B is correct. It uses a top-tier model with precise scoring rubrics to evaluate output quality at scale.",
						},
						interaction: {
							correct_answer: "B",
							hint: "Automated scoring at scale uses frontier models evaluating specific quality criteria (e.g., relevance, conciseness, accuracy).",
							options: [
								{
									id: "A",
									text: "Using a judge in a real courtroom to read computer screens",
								},
								{
									id: "B",
									text: "Using a stronger model (like GPT-4o) with a rubric to automatically score the quality of a smaller model's outputs",
								},
								{
									id: "C",
									text: "Allowing users to sue the AI if it gives bad advice",
								},
								{
									id: "D",
									text: "Writing code in Java instead of JavaScript",
								},
							],
							prompt: "What is 'LLM-as-a-Judge' evaluation in production AI product development?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "NEXT_NODE",
							if_incorrect: "NEXT_NODE",
							if_skipped: "NEXT_NODE",
						},
						reading_time: "40 sec read",
						screen_id: "S06-01-01",
						screen_type: "concept",
					},
				],
				title: "Building LLM Evals as a PM",
			},
		],
		tagline:
			"Automated test suites (Evals), toxicity filters, and measuring accuracy",
		title: "Metrics, Evals & Responsible AI Guardrails",
		xp_reward: 150,
	},
	{
		career_unlock: {
			company: "LetsUpgrade & Partner Ecosystem",
			deadline: "Lifetime Verified Credential",
			skills: [
				"Full AI Product Lifecycle",
				"GTM Strategy",
				"Production Evals",
			],
			status: "Locked until Module 7 is finished",
			stipend: "Direct Referral to Hiring Partners",
			title: "Official AI Product Manager Certificate & Portfolio Capstone",
		},
		day: 7,
		icon: "Award",
		id: 6,
		module_id: "MOD-07",
		nodes: [
			{
				duration: "4 min",
				node_id: "N07-01",
				screens: [
					{
						content: {
							body: "1. Verified User Need ➔ 2. Cost & Latency Budget ➔ 3. Automated Eval Suite ➔ 4. Fallback & Graceful Error Handling.",
							headline:
								"The 4 Pillars of a Launch-Ready AI Product.",
						},
						difficulty_level: 3,
						emotional_tone: "celebratory",
						feedback: {
							correct:
								"Flawless! You have mastered the entire modern AI Product Management operational lifecycle.",
							incorrect:
								"Sequence check: 1. Discovery ➔ 2. Prototyping & Evals ➔ 3. Beta Launch ➔ 4. Monitoring.",
						},
						interaction: {
							correct_answer: "B",
							hint: "Follow the sequence from initial user discovery through prototyping, launch, and live telemetry.",
							options: [
								{
									id: "A",
									text: "Launch ➔ Advertise ➔ Write Code ➔ Discover user problem",
								},
								{
									id: "B",
									text: "1. Discovery ➔ 2. Prototyping & Evals ➔ 3. Beta Launch ➔ 4. Telemetry Monitoring",
								},
								{
									id: "C",
									text: "Fine-tune 10 models before talking to any customer",
								},
								{
									id: "D",
									text: "Deploy directly to all enterprise customers on day 1",
								},
							],
							prompt: "What is the complete 4-pillar AI Product Lifecycle from inception to scale?",
							type: "mcq",
						},
						next_screen_logic: {
							if_correct: "S07-01-02",
							if_incorrect: "S07-01-02",
							if_skipped: "S07-01-02",
						},
						reading_time: "30 sec read",
						screen_id: "S07-01-01",
						screen_type: "concept",
					},
					{
						content: {
							body: "Congratulations! You have completed the 7-Day AI Product Management Track. Your Career Vault is now fully unlocked.",
							headline: "Capstone Completion & Career Unlocks",
						},
						difficulty_level: 1,
						emotional_tone: "celebratory",
						feedback: {
							correct:
								"🎉 Incredible accomplishment! You have earned the AI PM Champion badge and verified portfolio unlocks.",
							incorrect: "",
						},
						interaction: {
							correct_answer: null,
							options: [
								"🧠 Probabilistic AI vs Deterministic Code",
								"⚡ Latency vs Intelligence & Streaming UX",
								"🛡️ LLM Evals, RAG & Hallucination Defense",
								"🚀 Full End-to-End AI Product Launch Strategy",
							],
							prompt: "What was the most impactful AI product concept you mastered in this 7-day sprint?",
							type: "quick_reflection",
						},
						next_screen_logic: {
							if_correct: "COMPLETED",
							if_incorrect: "COMPLETED",
							if_skipped: "COMPLETED",
						},
						reading_time: "20 sec check",
						screen_id: "S07-01-02",
						screen_type: "reflection",
					},
				],
				title: "The Final AI PM Synthesis",
			},
		],
		tagline:
			"Unit economics, user onboarding, telemetry, and portfolio capstone",
		title: "Capstone: Launching an AI Product to Market",
		xp_reward: 200,
	},
]
