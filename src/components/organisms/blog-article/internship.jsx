import {
	ArticleFaq,
	Author,
	Checklist,
	CodeBlock,
	DataTable,
	Example,
	InlineLink,
	Quote,
} from "./blocks"

export function InternshipBody() {
	return (
		<>
			<p>
				The first internship creates a frustrating loop: employers ask
				for evidence, but you expect the internship to provide the
				evidence. The way through is to create a smaller version of the
				work before someone hires you to do it.
			</p>
			<p>
				You do not need to pretend a personal project is employment. You
				need to show that you can understand a brief, use the relevant
				tools, make decisions and communicate what happened.
			</p>

			<h2 id="choose-role">Step 1: choose one target role</h2>
			<p>
				“I want any internship” feels flexible, but it makes your
				resume, projects and search less relevant. Pick one role family
				for the next application cycle: data analyst, frontend
				developer, digital marketing, AI research or another clear
				direction.
			</p>
			<p>
				Collect ten realistic internship descriptions and create a
				simple skill map. Record:
			</p>
			<ul>
				<li>Tasks that appear repeatedly.</li>
				<li>Tools mentioned as required versus preferred.</li>
				<li>Outputs the intern is expected to produce.</li>
				<li>Domain knowledge that appears more than once.</li>
				<li>
					Evidence requested, such as GitHub, writing samples or
					dashboards.
				</li>
			</ul>
			<p>
				Do not treat the longest description as a mandatory checklist.
				Look for the common core. That core becomes your learning and
				project brief.
			</p>
			<Quote>
				A target role turns random learning into relevant evidence.
			</Quote>

			<h2 id="proof">Step 2: build one piece of proof</h2>
			<p>
				A first portfolio project should be small enough to finish and
				rich enough to discuss. It does not need an original startup
				idea.
			</p>
			<DataTable
				headers={[
					"Target role",
					"Useful first proof",
					"What it demonstrates",
				]}
				rows={[
					[
						"Data analyst",
						"Clean a public dataset and build a decision-focused dashboard",
						"Data quality, analysis and communication",
					],
					[
						"Frontend developer",
						"Build and deploy a responsive product page from a written brief",
						"HTML, CSS, JavaScript and delivery",
					],
					[
						"Digital marketer",
						"Create a channel plan and sample campaign for a real category",
						"Audience, positioning and measurement",
					],
					[
						"AI / research",
						"Compare model outputs against cited sources for one task",
						"Prompting, evaluation and verification",
					],
				]}
			/>
			<h3>Use a real brief</h3>
			<p>
				Define an audience, deadline, constraints and success criteria.
				“I made a dashboard” is weaker than “I built a dashboard for an
				operations manager to identify delayed orders by region and
				product category.”
			</p>
			<h3>Document your decisions</h3>
			<p>
				Save the first version, what went wrong and what you changed.
				Interviewers often learn more from one trade-off than from a
				flawless screenshot.
			</p>
			<h3>Finish with a walkthrough</h3>
			<p>
				Create a short README, case study or presentation. Explain the
				problem, process, output, result and limitation. Make it easy
				for a reviewer to understand in two minutes.
			</p>

			<h2 id="resume">Step 3: write a resume around relevance</h2>
			<p>
				Your resume is not an autobiography. It is a map from the
				internship requirements to credible evidence.
			</p>
			<h3>Use a simple order</h3>
			<ol>
				<li>Name, location, contact details and relevant links.</li>
				<li>
					A short role-specific summary, only if it adds information.
				</li>
				<li>Skills that you can demonstrate.</li>
				<li>Two or three relevant projects.</li>
				<li>Education, certifications and relevant activities.</li>
			</ol>
			<Example>
				<strong>Weak project bullet</strong>
				<p>“Created a Power BI dashboard using sales data.”</p>
				<strong>Stronger project bullet</strong>
				<p>
					“Cleaned 12 months of transaction data, modelled sales by
					product and region, and built a Power BI report to surface
					monthly variance and delayed orders.”
				</p>
			</Example>
			<p>
				The stronger version does not invent impact. It names the scope,
				actions and output. Use numbers only when they are true and
				meaningful.
			</p>
			<Checklist
				items={[
					"The target role is obvious within ten seconds.",
					"Every listed skill appears in a project or activity.",
					"Project links open without requesting access.",
					"Bullets describe actions and outputs, not adjectives.",
					"Dates, spelling and formatting are consistent.",
				]}
				title="Resume quality check"
			/>

			<h2 id="search">Step 4: search with intent</h2>
			<p>
				Use several routes: structured internship boards, company career
				pages, university networks, communities and relevant
				professional connections. Search by task as well as title. A
				role involving analytics may be called operations intern,
				business intelligence intern or reporting intern.
			</p>
			<p>Before applying, check:</p>
			<ul>
				<li>
					Whether the listing identifies a real organisation or
					accountable recruiter.
				</li>
				<li>Whether responsibilities and expectations are concrete.</li>
				<li>
					Whether location, duration and compensation are clear enough
					to evaluate.
				</li>
				<li>
					Whether the application asks for sensitive information too
					early.
				</li>
				<li>
					Whether any payment is being demanded from the applicant.
				</li>
			</ul>
			<p>
				Be cautious with roles that promise guaranteed selection, ask
				for money, request identity documents before a legitimate hiring
				stage or communicate only through unverifiable personal
				accounts.
			</p>

			<h2 id="apply">Step 5: apply with evidence</h2>
			<p>
				Tailoring does not mean rewriting everything. Adjust the top
				third of your resume, project order and short note so the most
				relevant evidence appears first.
			</p>
			<Example title="Short application note">
				<CodeBlock>
					{`Hello [Name],

I am applying for the Data Analytics Internship. The role's focus on
cleaning operational data and building reports matches my recent project,
where I analysed order delays and built a Power BI dashboard.

Project: [link]
Resume: [link]

I would be glad to explain the data-quality decisions and report design.`}
				</CodeBlock>
			</Example>
			<p>
				Do not claim to be passionate about every company. Show that you
				read the brief and have one relevant reason to be considered.
			</p>

			<h2 id="interview">Step 6: prepare from your own evidence</h2>
			<p>
				Expect questions about the project you submitted. Review every
				line of the resume and every important project decision. Prepare
				concise answers for:
			</p>
			<ul>
				<li>Tell me about yourself.</li>
				<li>Why this role and organisation?</li>
				<li>Walk me through your project.</li>
				<li>What went wrong, and how did you respond?</li>
				<li>What would you improve next?</li>
				<li>How do you handle work you do not yet know how to do?</li>
			</ul>
			<p>
				Use examples, not personality labels. “I am a problem solver” is
				a claim. A short story about diagnosing a broken data join is
				evidence.
			</p>

			<h2 id="tracker">Step 7: use an application feedback loop</h2>
			<p>
				Track the organisation, role, source, date, resume version,
				follow-up and result. Review the pattern every week.
			</p>
			<ul>
				<li>
					<strong>No responses:</strong> improve role fit, resume
					clarity and project visibility.
				</li>
				<li>
					<strong>Screening calls but no technical rounds:</strong>{" "}
					strengthen the role story and foundational explanations.
				</li>
				<li>
					<strong>Technical rounds but no offers:</strong> practise
					depth, communication and handling uncertainty.
				</li>
			</ul>
			<p>
				Do not over-interpret one rejection. Look for a repeated pattern
				and change one variable at a time.
			</p>
			<p>
				When your proof is ready, explore the{" "}
				<InlineLink href="/internships">
					LetsUpgrade internship catalogue
				</InlineLink>{" "}
				using role, skill and work-mode filters. If your target is data,
				the{" "}
				<InlineLink href="/blog/data-analyst-roadmap">
					data analyst roadmap
				</InlineLink>{" "}
				gives you a project sequence to follow first.
			</p>

			<h2 id="faq">Frequently asked questions</h2>
			<ArticleFaq
				items={[
					{
						answer: "Yes. Relevant projects, coursework, volunteering and clear evidence of skill can replace previous employment when presented for a specific role.",
						question:
							"Can I get an internship without previous work experience?",
					},
					{
						answer: "There is no universal number. Track a sustainable weekly target and improve it using response data. A smaller set of relevant, tailored applications is usually more informative than mass-applying without checking fit.",
						question:
							"How many internship applications should I send?",
					},
					{
						answer: "Lead with relevant skills and two or three projects. Explain the problem, what you built, the tools used and the result or lesson. Include education and relevant volunteering or leadership.",
						question:
							"What should I put on my resume with no experience?",
					},
				]}
			/>
			<Author />
		</>
	)
}
