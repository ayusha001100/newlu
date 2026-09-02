/* ===================================================================
   ENTRY-LEVEL SELF-PACED BOOTCAMPS
   Recorded beginner programs. Fill playlist.listId / video ids with the
   official YouTube or Vimeo playlist when it is ready. Curriculum arrays
   are the current outline and can be replaced in place.
   =================================================================== */

const bootcampModule = (week, title, detail, points, duration) => ({
	detail,
	duration,
	sections: [{ name: title, points }],
	title,
	week,
})

const bootcampVideos = modules =>
	modules.map((module, _index) => ({
		duration: module.duration || "",
		title: module.title,
		vimeoId: "",
		youtubeId: "",
	}))

export const BOOTCAMPS = {
	canva: {
		about: "An entry-level Canva bootcamp. Templates are a starting point, not the finish line. You learn hierarchy, brand colours and export settings.",
		audience: "Complete beginners",
		certName: "Canva Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"Canva workspace",
				"Designs, folders and picking a size.",
				["Home vs editor", "Resize", "Pages"],
				"30 min",
			),
			bootcampModule(
				"Module 2",
				"Type and hierarchy",
				"One idea per slide or post.",
				["Headings vs body", "Contrast", "Too many fonts"],
				"40 min",
			),
			bootcampModule(
				"Module 3",
				"Images and brand",
				"Crops, backgrounds and a 2-colour kit.",
				["Uploads", "Brand colours", "Transparency"],
				"40 min",
			),
			bootcampModule(
				"Module 4",
				"Social posts",
				"A square post and a story size.",
				["Safe margins", "CTA on the graphic", "Export PNG"],
				"45 min",
			),
			bootcampModule(
				"Module 5",
				"A short deck",
				"Five slides with a consistent layout.",
				["Master layout", "Charts at a basic level", "PDF export"],
				"50 min",
			),
			bootcampModule(
				"Module 6",
				"Review checklist",
				"What makes a design look unfinished.",
				["Alignment", "Spacing", "File naming"],
				"30 min",
			),
		],
		duration: "4 hours",
		format: "Recorded · Self-paced",
		icon: "Cv",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/canva.svg",
		modulesCount: "6 modules",
		outcomes: [
			"Start from a template without looking like everyone else",
			"Control type size, contrast and alignment",
			"Build a tiny brand kit (colours + fonts)",
			"Design a carousel or a 5-slide deck",
			"Export the right size for the channel",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Export a post and a slide deck you would actually send.",
		seo: {
			description:
				"A free recorded Canva bootcamp for social posts, slide decks and simple brand-consistent designs.",
			keywords: [
				"Canva bootcamp",
				"free Canva course",
				"Canva for beginners",
			],
			title: "Free Canva Bootcamp for Beginners | LetsUpgrade",
		},
		tagline:
			"Posts, slides and simple brand kits — make something that looks finished, not like a first draft.",
		title: "Canva Bootcamp",
		tools: ["Canva"],
	},

	excel: {
		about: "An entry-level Excel certification. You learn formulas, cleaning, PivotTables and a chart you can explain in a meeting.",
		audience: "Beginners",
		certName: "Excel Certification",
		credential: "Certification",
		curriculum: [
			bootcampModule(
				"Module 1",
				"The grid",
				"Cells, sheets, freeze panes and tables.",
				["References", "Format as Table", "Freeze panes"],
				"40 min",
			),
			bootcampModule(
				"Module 2",
				"Core formulas",
				"SUM, AVERAGE, COUNT and IF.",
				["Relative vs absolute", "IF", "Nested IF lightly"],
				"55 min",
			),
			bootcampModule(
				"Module 3",
				"Lookups",
				"VLOOKUP and XLOOKUP for joining lists.",
				["Exact match", "Approximate match warning", "XLOOKUP"],
				"55 min",
			),
			bootcampModule(
				"Module 4",
				"Text and dates",
				"LEFT, TRIM, TEXT and date math.",
				["Cleaning names", "Dates as numbers", "TEXT"],
				"50 min",
			),
			bootcampModule(
				"Module 5",
				"Cleaning",
				"Duplicates, blanks, filters and sort.",
				["Remove duplicates", "Filter", "Data validation intro"],
				"50 min",
			),
			bootcampModule(
				"Module 6",
				"PivotTables",
				"Summarise without writing every formula.",
				["Create a pivot", "Rows, values, filters", "Refresh"],
				"60 min",
			),
			bootcampModule(
				"Module 7",
				"Charts",
				"One chart, one sentence.",
				["Column vs line", "Titles and axes", "What not to chart"],
				"45 min",
			),
			bootcampModule(
				"Module 8",
				"One-page brief",
				"Question, method, number, chart.",
				[
					"A messy sales sheet",
					"Pivot + chart",
					"Write the answer in two lines",
				],
				"55 min",
			),
		],
		duration: "8 hours",
		format: "Recorded · Self-paced",
		icon: "Xl",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/excel.svg",
		modulesCount: "8 modules",
		outcomes: [
			"Use SUM, IF, VLOOKUP/XLOOKUP and text functions",
			"Clean duplicates, dates and blanks",
			"Build a PivotTable from a data table",
			"Chart the number that matters",
			"Present a one-page summary",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Turn a messy sheet into a one-page answer.",
		seo: {
			description:
				"A free recorded Excel certification covering formulas, cleaning, PivotTables and charts for student and intern work.",
			keywords: [
				"Excel certification",
				"free Excel course",
				"Excel for beginners",
			],
			title: "Free Excel Certification Course for Beginners | LetsUpgrade",
		},
		tagline:
			"Formulas, pivots and charts — clean a sheet and answer a question your manager can read.",
		title: "Excel Certification",
		tools: ["Microsoft Excel or Google Sheets"],
	},

	figma: {
		about: "An entry-level Figma bootcamp. You learn the canvas, auto layout and components well enough to design one mobile or web screen.",
		audience: "Complete beginners",
		certName: "Figma Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"The Figma canvas",
				"Frames, pages and moving around without getting lost.",
				["Frames vs groups", "Zoom and pan", "Pages"],
				"40 min",
			),
			bootcampModule(
				"Module 2",
				"Shapes and text",
				"Boxes, corners, type and alignment.",
				["Fill and stroke", "Text styles", "Constraints intro"],
				"45 min",
			),
			bootcampModule(
				"Module 3",
				"Auto layout",
				"Padding, gap and hug vs fill.",
				["Auto layout", "Nested frames", "Wrapping"],
				"55 min",
			),
			bootcampModule(
				"Module 4",
				"Components",
				"A button you can reuse and override.",
				["Components", "Variants at a basic level", "Instances"],
				"50 min",
			),
			bootcampModule(
				"Module 5",
				"A full screen",
				"Header, content and a primary action.",
				["Layout a screen", "Spacing system", "Naming layers"],
				"55 min",
			),
			bootcampModule(
				"Module 6",
				"Share and inspect",
				"A link a developer can open.",
				["Share settings", "Inspect panel", "Export"],
				"40 min",
			),
		],
		duration: "5 hours",
		format: "Recorded · Self-paced",
		icon: "Fg",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/figma.svg",
		modulesCount: "6 modules",
		outcomes: [
			"Set up frames and a simple grid",
			"Use auto layout instead of manual spacing",
			"Create a reusable button component",
			"Style text and colour consistently",
			"Share a file with inspectable specs",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Hand over a Figma file another person can inspect.",
		seo: {
			description:
				"A free recorded Figma bootcamp covering frames, auto layout, components and a shareable screen design.",
			keywords: [
				"Figma bootcamp",
				"free Figma course",
				"Figma for beginners",
			],
			title: "Free Figma Bootcamp for Beginners | LetsUpgrade",
		},
		tagline:
			"Frames, auto layout and components — design a screen someone else can build from.",
		title: "Figma Bootcamp",
		tools: ["Figma"],
	},
	html: {
		about: "An entry-level HTML bootcamp. No coding background required. You watch recorded lessons, copy the exercises, and finish with a simple published page.",
		audience: "Complete beginners",
		certName: "HTML Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"How the web works",
				"Browsers, files, URLs and what HTML is responsible for.",
				[
					"What a browser does with an HTML file",
					"HTML vs CSS vs JavaScript",
					"Folders, file names and opening a page locally",
				],
				"35 min",
			),
			bootcampModule(
				"Module 2",
				"Your first HTML page",
				"Doctype, html, head, body and a title that shows in the tab.",
				[
					"Boilerplate structure",
					"head and body",
					"Saving and refreshing",
				],
				"40 min",
			),
			bootcampModule(
				"Module 3",
				"Text and headings",
				"Headings, paragraphs, emphasis and when not to fake a heading with bold.",
				["h1 to h6", "p, strong, em", "Line breaks vs new paragraphs"],
				"40 min",
			),
			bootcampModule(
				"Module 4",
				"Links and navigation",
				"Internal links, external links and opening a new tab safely.",
				[
					"Anchor tags",
					"Relative vs absolute URLs",
					"Navigation lists",
				],
				"45 min",
			),
			bootcampModule(
				"Module 5",
				"Images and media",
				"img, alt text, sizing and why broken images happen.",
				["img and alt", "File paths", "Figures and captions"],
				"40 min",
			),
			bootcampModule(
				"Module 6",
				"Lists and tables",
				"Ordered lists, unordered lists and a small data table.",
				[
					"ul, ol, li",
					"table, tr, th, td",
					"When a list is better than a table",
				],
				"45 min",
			),
			bootcampModule(
				"Module 7",
				"Forms",
				"Inputs, labels, textarea and a submit button.",
				[
					"label and input",
					"email, text, textarea",
					"Submit without a backend",
				],
				"50 min",
			),
			bootcampModule(
				"Module 8",
				"Publish your page",
				"Put the page on a public URL you can send anyone.",
				[
					"Semantic layout recap",
					"GitHub Pages publish",
					"Checking the live URL",
				],
				"50 min",
			),
		],
		duration: "6 hours",
		format: "Recorded · Self-paced",
		icon: "HT",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/html.svg",
		modulesCount: "8 modules",
		outcomes: [
			"Write a valid HTML document from a blank file",
			"Structure a page with headings, lists, links and images",
			"Build a form that collects name, email and a message",
			"Use semantic tags so the page is readable and accessible",
			"Publish the page on a public URL",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Leave with a live HTML page you built yourself.",
		seo: {
			description:
				"A free recorded HTML bootcamp for beginners. Learn tags, structure, links, images and forms, then publish a simple web page.",
			keywords: [
				"HTML bootcamp",
				"free HTML course",
				"HTML for beginners",
			],
			title: "Free HTML Bootcamp for Beginners | LetsUpgrade",
		},
		tagline:
			"Build and publish your first web page — headings, links, images, forms and semantic structure.",
		title: "HTML Bootcamp",
		tools: ["VS Code", "Chrome DevTools", "GitHub Pages"],
	},

	java: {
		about: "An entry-level Java certification. No Spring, no Android. You learn syntax, objects and a console project you can explain.",
		audience: "Beginners",
		certName: "Java Certification",
		credential: "Certification",
		curriculum: [
			bootcampModule(
				"Module 1",
				"JDK and Hello World",
				"javac, java and a main method.",
				[
					"Install JDK",
					"public static void main",
					"Classpath in one sentence",
				],
				"50 min",
			),
			bootcampModule(
				"Module 2",
				"Types and operators",
				"Primitives, strings and arithmetic.",
				["int, double, boolean", "String", "Operators"],
				"50 min",
			),
			bootcampModule(
				"Module 3",
				"Control flow",
				"if, switch, for and while.",
				["Conditions", "Loops", "break"],
				"55 min",
			),
			bootcampModule(
				"Module 4",
				"Methods",
				"Parameters, return types and overloading lightly.",
				["Method signatures", "return", "void"],
				"55 min",
			),
			bootcampModule(
				"Module 5",
				"Arrays",
				"Fixed lists of values.",
				["Declaration", "Indexing", "Looping"],
				"50 min",
			),
			bootcampModule(
				"Module 6",
				"Classes and objects",
				"new, fields and methods on an instance.",
				["Class vs object", "new", "this"],
				"70 min",
			),
			bootcampModule(
				"Module 7",
				"Constructors",
				"Set up an object correctly.",
				[
					"Default vs written constructors",
					"Overloading",
					"Encapsulation intro",
				],
				"55 min",
			),
			bootcampModule(
				"Module 8",
				"ArrayList",
				"A resizable list of objects.",
				["add, get, size", "Looping", "When arrays still win"],
				"50 min",
			),
			bootcampModule(
				"Module 9",
				"Errors",
				"Exceptions you will actually see.",
				["NullPointerException", "try/catch", "Reading the stack"],
				"45 min",
			),
			bootcampModule(
				"Module 10",
				"Mini project",
				"A student roster, quiz or expense logger in the console.",
				["Classes you need", "Main flow", "Run and demo"],
				"80 min",
			),
		],
		duration: "12 hours",
		format: "Recorded · Self-paced",
		icon: "Jv",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/java.svg",
		modulesCount: "10 modules",
		outcomes: [
			"Compile and run a Java file",
			"Use variables, arrays and control flow",
			"Write a class with fields and methods",
			"Understand new, this and a constructor",
			"Finish a small console project",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Write and run a small Java program with classes of your own.",
		seo: {
			description:
				"A free recorded Java certification covering syntax, classes, objects and small console programs.",
			keywords: [
				"Java certification",
				"free Java course",
				"Java for beginners",
			],
			title: "Free Java Certification Course for Beginners | LetsUpgrade",
		},
		tagline:
			"Classes, objects and control flow — enough Java to read beginner programs and write small ones.",
		title: "Java Certification",
		tools: ["JDK", "VS Code or IntelliJ Community", "Terminal"],
	},

	photoshop: {
		about: "An entry-level Photoshop bootcamp. You learn layers and masks well enough to finish a simple professional-looking file.",
		audience: "Beginners",
		certName: "Photoshop Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"Workspace and files",
				"Panels, zoom and opening a photo.",
				["Tools panel", "Resolution vs size", "Saving PSD"],
				"40 min",
			),
			bootcampModule(
				"Module 2",
				"Layers",
				"Stacking, opacity and groups.",
				["New layer", "Reorder", "Groups"],
				"50 min",
			),
			bootcampModule(
				"Module 3",
				"Selections",
				"Marquee, lasso and subject select.",
				[
					"Add and subtract",
					"Refine edge intro",
					"Copy to a new layer",
				],
				"50 min",
			),
			bootcampModule(
				"Module 4",
				"Masks",
				"Hide, do not delete.",
				["Layer mask", "Black vs white", "Brush on a mask"],
				"55 min",
			),
			bootcampModule(
				"Module 5",
				"Adjustments",
				"Exposure, contrast and colour.",
				[
					"Curves or levels at a basic level",
					"Hue/saturation",
					"Adjustment layers",
				],
				"50 min",
			),
			bootcampModule(
				"Module 6",
				"Type and a graphic",
				"A poster or social tile.",
				["Type tool", "Alignment", "Smart objects intro"],
				"55 min",
			),
			bootcampModule(
				"Module 7",
				"Export",
				"Web vs print, JPG vs PNG.",
				["Export as", "sRGB", "File naming"],
				"35 min",
			),
		],
		duration: "6 hours",
		format: "Recorded · Self-paced",
		icon: "Ps",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/photoshop.svg",
		modulesCount: "7 modules",
		outcomes: [
			"Work non-destructively with layers",
			"Use a mask instead of erasing",
			"Correct exposure and colour basically",
			"Add type on a graphic",
			"Export JPG, PNG and the right size",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Deliver one retouched photo and one graphic with type.",
		seo: {
			description:
				"A free recorded Photoshop bootcamp covering layers, masks, type and export for web and social.",
			keywords: [
				"Photoshop bootcamp",
				"free Photoshop course",
				"Photoshop for beginners",
			],
			title: "Free Photoshop Bootcamp for Beginners | LetsUpgrade",
		},
		tagline:
			"Layers, masks and export — retouch a photo and produce a web-ready graphic.",
		title: "Photoshop Bootcamp",
		tools: ["Adobe Photoshop"],
	},

	"placement-prep": {
		about: "An entry-level placement prep bootcamp. Not aptitude dumps. You rewrite the resume, practise one project story, and rehearse the questions that always come up.",
		audience: "Students and freshers",
		certName: "Placement Prep Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"What recruiters scan",
				"Six seconds, then a second pass.",
				[
					"Order of sections",
					"Keywords vs stuffing",
					"Proof over adjectives",
				],
				"40 min",
			),
			bootcampModule(
				"Module 2",
				"Resume rewrite",
				"One page, bullets that start with verbs.",
				["Header", "Experience / projects", "Education and skills"],
				"55 min",
			),
			bootcampModule(
				"Module 3",
				"LinkedIn",
				"Headline, about and featured.",
				[
					"Headline formula",
					"About in first person",
					"Photo and banner basics",
				],
				"45 min",
			),
			bootcampModule(
				"Module 4",
				"Project story",
				"Problem, what you did, what changed.",
				[
					"Two-minute version",
					"Five-minute version",
					"What you would do next",
				],
				"50 min",
			),
			bootcampModule(
				"Module 5",
				"First-round questions",
				"Tell me about yourself, strengths, weakness, why this role.",
				[
					"STAR without the theatre",
					"Weakness that is not a humblebrag",
					"Questions you ask them",
				],
				"55 min",
			),
			bootcampModule(
				"Module 6",
				"Mock round",
				"Record yourself once and fix the obvious issues.",
				["Timer", "Filler words", "Follow-up email"],
				"40 min",
			),
		],
		duration: "5 hours",
		format: "Recorded · Self-paced",
		icon: "PP",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/placement.svg",
		modulesCount: "6 modules",
		outcomes: [
			"Rewrite a resume to one page with proof",
			"Clean up a LinkedIn headline and about",
			"Tell a project story in two minutes",
			"Answer “tell me about yourself” without rambling",
			"Prepare three questions to ask the interviewer",
		],
		playlist: { listId: "", provider: "youtube" },
		promise:
			"Walk into a first-round interview with a resume and a project story.",
		seo: {
			description:
				"A free recorded placement prep bootcamp covering resume, LinkedIn, project stories and first-round interviews.",
			keywords: [
				"placement preparation",
				"resume bootcamp",
				"interview prep for students",
			],
			title: "Free Placement Prep Bootcamp | LetsUpgrade",
		},
		tagline:
			"Resume, LinkedIn, a story about your project, and a first-round interview you can actually run.",
		title: "Placement Prep Bootcamp",
		tools: ["Google Docs", "LinkedIn", "A project you already have"],
	},

	"prompt-engineering": {
		about: "An entry-level prompt engineering bootcamp. No APIs. You practise a structure, then save the prompts that work.",
		audience: "Everyone",
		certName: "Prompt Engineering Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"What a prompt is",
				"Instructions vs chat, and why vague asks fail.",
				[
					"Prompt vs conversation",
					"Hallucinations",
					"When not to use AI",
				],
				"35 min",
			),
			bootcampModule(
				"Module 2",
				"A usable structure",
				"Role, context, task, format, examples.",
				[
					"RCTFE in practice",
					"One change at a time",
					"Length vs clarity",
				],
				"45 min",
			),
			bootcampModule(
				"Module 3",
				"Study prompts",
				"Notes, quizzes and explaining a concept back.",
				["Lecture notes", "Quiz generation", "Fact-check pass"],
				"40 min",
			),
			bootcampModule(
				"Module 4",
				"Work prompts",
				"Email, summary, comparison table.",
				["Tone control", "Tables", "Constraints"],
				"40 min",
			),
			bootcampModule(
				"Module 5",
				"Iteration",
				"The second prompt is the real skill.",
				[
					"Critique the output",
					"Ask for a revision",
					"Keep what worked",
				],
				"40 min",
			),
			bootcampModule(
				"Module 6",
				"Prompt pack",
				"Ten prompts in a doc, named and dated.",
				["Naming", "Variables in a prompt", "Reuse next week"],
				"40 min",
			),
		],
		duration: "4 hours",
		format: "Recorded · Self-paced",
		icon: "PE",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/prompt.svg",
		modulesCount: "6 modules",
		outcomes: [
			"Use a repeatable prompt structure",
			"Add examples when the first answer is vague",
			"Check claims instead of pasting them",
			"Rewrite a weak prompt into a strong one",
			"Leave with 10 saved prompts",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Keep a prompt pack you will actually reuse.",
		seo: {
			description:
				"A free recorded prompt engineering bootcamp. Learn a repeatable prompt structure and practise on study, work and writing tasks.",
			keywords: [
				"prompt engineering bootcamp",
				"free prompt engineering course",
				"ChatGPT prompts",
			],
			title: "Free Prompt Engineering Bootcamp | LetsUpgrade",
		},
		tagline:
			"Write prompts that return usable work on the first try — role, context, task, format, examples.",
		title: "Prompt Engineering Bootcamp",
		tools: ["ChatGPT", "Gemini", "Claude"],
	},

	python: {
		about: "An entry-level Python certification. You start from print() and finish able to write small scripts, read errors, and use lists and functions.",
		audience: "Complete beginners",
		certName: "Python Certification",
		credential: "Certification",
		curriculum: [
			bootcampModule(
				"Module 1",
				"Installing Python",
				"Interpreter, editor and running your first script.",
				[
					"Install Python 3",
					"REPL vs a .py file",
					"print and comments",
				],
				"45 min",
			),
			bootcampModule(
				"Module 2",
				"Variables and types",
				"Names, numbers, strings and converting between them.",
				["int, float, str, bool", "Assignment", "Type conversion"],
				"50 min",
			),
			bootcampModule(
				"Module 3",
				"Strings and input",
				"f-strings, slicing and reading from the keyboard.",
				["input()", "f-strings", "Indexing and slicing"],
				"50 min",
			),
			bootcampModule(
				"Module 4",
				"Decisions",
				"if, elif, else and comparison operators.",
				["Boolean logic", "Nested conditions", "Common mistakes"],
				"55 min",
			),
			bootcampModule(
				"Module 5",
				"Loops",
				"for, while and when to stop a loop.",
				["for over ranges and lists", "while", "break and continue"],
				"60 min",
			),
			bootcampModule(
				"Module 6",
				"Lists and dictionaries",
				"Collections you will actually use.",
				["list methods", "dict keys and values", "Looping over both"],
				"65 min",
			),
			bootcampModule(
				"Module 7",
				"Functions",
				"Arguments, return values and keeping scripts readable.",
				["def and return", "Parameters", "Scope in one sentence"],
				"60 min",
			),
			bootcampModule(
				"Module 8",
				"Errors and debugging",
				"Reading a traceback instead of fearing it.",
				[
					"Syntax vs runtime errors",
					"print debugging",
					"try / except for files",
				],
				"50 min",
			),
			bootcampModule(
				"Module 9",
				"Files",
				"Read a text file, write a result.",
				["open and with", "CSV lines", "Saving output"],
				"55 min",
			),
			bootcampModule(
				"Module 10",
				"Mini project",
				"A small script you can show: a grader, a cleaner or a report.",
				[
					"Pick one task",
					"Break it into functions",
					"Run it end to end",
				],
				"70 min",
			),
		],
		duration: "10 hours",
		format: "Recorded · Self-paced",
		icon: "Py",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/python.svg",
		modulesCount: "10 modules",
		outcomes: [
			"Run Python locally and read a traceback",
			"Use variables, types and operators with intent",
			"Write loops and conditionals that solve a small problem",
			"Package work into functions",
			"Read and write a simple text or CSV file",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Write Python scripts you can run on your own machine.",
		seo: {
			description:
				"A free recorded Python certification for beginners. Learn syntax, loops, functions and files through short exercises.",
			keywords: [
				"Python certification",
				"free Python course",
				"Python for beginners",
			],
			title: "Free Python Certification Course for Beginners | LetsUpgrade",
		},
		tagline:
			"Variables, loops, functions and files — enough Python to automate small tasks and read beginner code.",
		title: "Python Certification",
		tools: ["Python 3", "VS Code", "Terminal"],
	},

	react: {
		about: "An entry-level React bootcamp. HTML helps. You will not cover Redux, Next.js or production architecture — just enough React to build and run a small UI.",
		audience: "Beginners with basic HTML",
		certName: "React Bootcamp",
		credential: "Bootcamp",
		curriculum: [
			bootcampModule(
				"Module 1",
				"What React is for",
				"UI as components, and the problem React solves.",
				[
					"Component thinking",
					"SPA in one sentence",
					"Create a Vite app",
				],
				"50 min",
			),
			bootcampModule(
				"Module 2",
				"JSX",
				"HTML-looking JavaScript, with the rules that matter.",
				["JSX vs HTML", "className", "Embedding expressions"],
				"50 min",
			),
			bootcampModule(
				"Module 3",
				"Components",
				"Split a page into reusable pieces.",
				[
					"Function components",
					"File per component",
					"Import and export",
				],
				"55 min",
			),
			bootcampModule(
				"Module 4",
				"Props",
				"Pass data down, do not invent it twice.",
				["Props objects", "Children", "Default values"],
				"55 min",
			),
			bootcampModule(
				"Module 5",
				"useState",
				"State that re-renders the UI.",
				[
					"useState",
					"Updating from the previous value",
					"What not to store",
				],
				"65 min",
			),
			bootcampModule(
				"Module 6",
				"Events",
				"Buttons, inputs and preventDefault.",
				["onClick", "onChange", "Controlled inputs"],
				"60 min",
			),
			bootcampModule(
				"Module 7",
				"Lists",
				"map, keys and deleting an item.",
				["Rendering arrays", "key", "Updating lists in state"],
				"55 min",
			),
			bootcampModule(
				"Module 8",
				"Conditional UI",
				"Show, hide and empty states.",
				["Ternary vs &&", "Loading and empty", "Lifting a boolean"],
				"50 min",
			),
			bootcampModule(
				"Module 9",
				"Small forms",
				"A form that adds an item to a list.",
				["Form submit", "Resetting fields", "Basic validation"],
				"65 min",
			),
			bootcampModule(
				"Module 10",
				"Mini project",
				"A todo, notes app or simple dashboard.",
				["Plan components", "Wire state", "Run it locally"],
				"80 min",
			),
		],
		duration: "12 hours",
		format: "Recorded · Self-paced",
		icon: "Re",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/react.svg",
		modulesCount: "10 modules",
		outcomes: [
			"Create function components",
			"Pass data with props",
			"Update the UI with useState",
			"Handle clicks and form input",
			"Render a list from an array",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Ship a small React app you can click through.",
		seo: {
			description:
				"A free recorded React bootcamp. Learn components, props, state and events by building a small interactive interface.",
			keywords: [
				"React bootcamp",
				"free React course",
				"React for beginners",
			],
			title: "Free React Bootcamp for Beginners | LetsUpgrade",
		},
		tagline:
			"Components, props and state — build a small interactive UI in the browser.",
		title: "React Bootcamp",
		tools: ["VS Code", "Node.js", "Vite", "Chrome"],
	},

	sql: {
		about: "An entry-level SQL certification. You learn to query tables, join them, and summarise numbers without needing to become a database administrator.",
		audience: "Beginners",
		certName: "SQL Certification",
		credential: "Certification",
		curriculum: [
			bootcampModule(
				"Module 1",
				"What a table is",
				"Rows, columns, keys and why SQL exists.",
				["Relational tables", "Primary keys", "NULL"],
				"40 min",
			),
			bootcampModule(
				"Module 2",
				"SELECT and FROM",
				"Pick columns, alias them, and look at the result.",
				["SELECT * vs named columns", "Aliases", "LIMIT"],
				"45 min",
			),
			bootcampModule(
				"Module 3",
				"WHERE and ORDER BY",
				"Filter and sort without changing the table.",
				["Comparisons", "AND / OR", "ORDER BY"],
				"50 min",
			),
			bootcampModule(
				"Module 4",
				"INNER JOIN",
				"Combine two tables on a matching key.",
				["JOIN syntax", "ON vs WHERE", "Duplicate rows"],
				"60 min",
			),
			bootcampModule(
				"Module 5",
				"LEFT JOIN",
				"Keep rows that do not match.",
				["LEFT vs INNER", "Finding missing matches", "Coalesce"],
				"50 min",
			),
			bootcampModule(
				"Module 6",
				"GROUP BY",
				"Counts, sums and averages.",
				["COUNT, SUM, AVG", "GROUP BY", "HAVING vs WHERE"],
				"60 min",
			),
			bootcampModule(
				"Module 7",
				"Subqueries",
				"A query inside a query, used carefully.",
				["Scalar subqueries", "IN lists", "When a JOIN is clearer"],
				"50 min",
			),
			bootcampModule(
				"Module 8",
				"Business questions",
				"Translate “what sold last month?” into SQL.",
				[
					"A sales brief",
					"Checks for wrong joins",
					"Save and reuse the query",
				],
				"55 min",
			),
		],
		duration: "8 hours",
		format: "Recorded · Self-paced",
		icon: "SQL",
		kind: "self-paced",
		level: "Beginner",
		logo: "assets/bootcamps/sql.svg",
		modulesCount: "8 modules",
		outcomes: [
			"Write SELECT queries with filters and sorts",
			"Join two or three tables on a key",
			"Aggregate with GROUP BY and HAVING",
			"Avoid the usual JOIN mistakes",
			"Turn a business question into a query",
		],
		playlist: { listId: "", provider: "youtube" },
		promise: "Answer a real question from tables using SQL.",
		seo: {
			description:
				"A free recorded SQL certification. Learn SELECT, WHERE, JOIN and GROUP BY with practice queries on sample tables.",
			keywords: [
				"SQL certification",
				"free SQL course",
				"SQL for beginners",
			],
			title: "Free SQL Certification Course for Beginners | LetsUpgrade",
		},
		tagline:
			"SELECT, JOIN and GROUP BY — ask a database a business question and get a trustworthy answer.",
		title: "SQL Certification",
		tools: ["SQLite", "DB Browser", "Sample sales database"],
	},
}

Object.keys(BOOTCAMPS).forEach(slug => {
	const bootcamp = BOOTCAMPS[slug]
	bootcamp.playlist = bootcamp.playlist || { listId: "", provider: "youtube" }
	bootcamp.playlist.videos =
		bootcamp.playlist.videos || bootcampVideos(bootcamp.curriculum)
})

export const playlistEmbedUrl = (program, index) => {
	const playlist = program?.playlist || {}
	const video = (playlist.videos || [])[index] || {}
	if (video.youtubeId) {
		return `https://www.youtube.com/embed/${encodeURIComponent(video.youtubeId)}?rel=0`
	}
	if (video.vimeoId) {
		return `https://player.vimeo.com/video/${encodeURIComponent(video.vimeoId)}`
	}
	if (playlist.provider === "youtube" && playlist.listId) {
		return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlist.listId)}&index=${index + 1}&rel=0`
	}
	if (playlist.provider === "vimeo" && playlist.listId) {
		return `https://player.vimeo.com/video/${encodeURIComponent(playlist.listId)}`
	}
	return ""
}
