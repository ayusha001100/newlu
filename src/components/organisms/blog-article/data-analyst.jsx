import {
	ArticleFaq,
	Author,
	Callout,
	Checklist,
	DataTable,
	Example,
	InlineLink,
	Quote,
	Sources,
} from "./blocks"

export function DataAnalystBody() {
	return (
		<>
			<p>
				A data analyst is not a person who knows every chart or
				memorises every SQL function. An analyst turns incomplete data
				and an ambiguous business question into a conclusion that can
				survive scrutiny.
			</p>
			<p>
				That requires four connected abilities: prepare data, analyse
				it, communicate the result and understand the decision behind
				the question. The tools matter, but the sequence matters more.
			</p>

			<h2 id="role">What a data analyst actually does</h2>
			<p>
				Microsoft describes the analyst role around profiling, cleaning
				and transforming data; building models; creating reports; and
				working with stakeholders to identify requirements. That is a
				better guide than a long software checklist.
			</p>
			<p>
				A typical assignment may sound simple: “Why did weekly sales
				fall?” The actual work includes:
			</p>
			<ul>
				<li>Defining which sales metric and time period matter.</li>
				<li>
					Checking whether the source data is complete and consistent.
				</li>
				<li>
					Separating changes in volume, price, product mix and
					geography.
				</li>
				<li>Comparing the result with an appropriate baseline.</li>
				<li>
					Explaining what is known, what is uncertain and what to
					investigate next.
				</li>
			</ul>
			<Quote>
				Your portfolio should show decisions, not just dashboards.
			</Quote>

			<h2 id="sequence">The right learning sequence</h2>
			<DataTable
				headers={["Stage", "Primary skill", "Evidence to build"]}
				rows={[
					[
						"1",
						"Spreadsheet analysis and data quality",
						"A cleaned workbook with a short findings page",
					],
					[
						"2",
						"SQL querying and relational thinking",
						"A documented query set answering business questions",
					],
					[
						"3",
						"Data modelling and Power BI",
						"An interactive dashboard with clear measures",
					],
					[
						"4",
						"Statistics and business interpretation",
						"A written recommendation with limitations",
					],
					[
						"5",
						"Portfolio and interview communication",
						"A concise walkthrough you can defend",
					],
				]}
			/>
			<p>
				You can study these in parallel, but do not skip the evidence at
				each stage. Watching a tutorial creates familiarity. Completing
				a project reveals whether you can make decisions without the
				instructor.
			</p>

			<h2 id="excel">Stage 1: Excel and spreadsheet analysis</h2>
			<p>
				Spreadsheets are not a lesser version of analytics. They are
				where many teams inspect, exchange and reconcile operational
				data. Learn to make a workbook understandable to someone who did
				not create it.
			</p>
			<h3>Core spreadsheet skills</h3>
			<ul>
				<li>
					Data types, tables, sorting, filtering and structured
					references.
				</li>
				<li>Conditional logic and lookup functions.</li>
				<li>Date, text and error-handling functions.</li>
				<li>Pivot tables and charts.</li>
				<li>Basic data validation and duplicate detection.</li>
				<li>Clear separation of raw data, calculations and outputs.</li>
			</ul>
			<Example title="Starter project: sales performance workbook">
				<p>
					Use a transaction dataset with dates, products, regions and
					revenue. Clean inconsistent categories, calculate monthly
					performance, identify the strongest and weakest segments,
					and produce one summary page for a sales manager.
				</p>
			</Example>
			<p>
				Do not stop at a colourful chart. Write three sentences: what
				changed, why it may have changed and which next question would
				reduce uncertainty.
			</p>

			<h2 id="sql">Stage 2: SQL and relational thinking</h2>
			<p>
				SQL is how analysts ask repeatable questions of structured data.
				Start with accuracy before cleverness.
			</p>
			<h3>Learn in this order</h3>
			<ol>
				<li>
					<code>SELECT</code>, filtering, sorting and calculated
					columns.
				</li>
				<li>Aggregations, grouping and handling null values.</li>
				<li>Joins and the grain of each table.</li>
				<li>Subqueries and common table expressions.</li>
				<li>
					Window functions for rankings, running totals and
					comparisons.
				</li>
				<li>Date logic and reusable business definitions.</li>
			</ol>
			<p>
				The hardest SQL mistakes are often not syntax errors. They are
				plausible-looking results created by joining at the wrong grain,
				counting duplicate records or using the wrong denominator.
			</p>
			<Checklist
				items={[
					"Can I state what one row represents?",
					"Did any join multiply the number of records?",
					"Are nulls excluded, replaced or meaningful?",
					"Does the total reconcile with a known reference?",
					"Could another analyst understand the definitions?",
				]}
				title="Before trusting a query"
			/>

			<h2 id="power-bi">Stage 3: Power BI, models and reports</h2>
			<p>
				Power BI brings data preparation, modelling, calculations and
				visual communication together. Microsoft’s official learning
				paths separate these capabilities for a reason: a polished
				report on a weak model remains a weak analysis.
			</p>
			<p>Focus on:</p>
			<ul>
				<li>
					Power Query for importing, profiling and transforming data.
				</li>
				<li>Relationships, star schemas and clear table roles.</li>
				<li>Measures and evaluation context in DAX.</li>
				<li>Visual choices based on the comparison being made.</li>
				<li>Filters, drill-through and interaction design.</li>
				<li>Readable labels, units, definitions and accessibility.</li>
			</ul>
			<p>
				A good dashboard answers a small number of related questions. It
				does not place every available chart on one canvas.
			</p>

			<h2 id="portfolio">
				Build two projects with different kinds of evidence
			</h2>
			<h3>Project 1: operational analysis</h3>
			<p>
				Choose a dataset such as e-commerce orders, support tickets or
				inventory. Use Excel and SQL to clean and analyse it. Build a
				Power BI dashboard for a named audience. Finish with a written
				recommendation.
			</p>
			<h3>Project 2: open-ended investigation</h3>
			<p>
				Start with a question where the path is not already defined.
				Document assumptions, missing data and alternative explanations.
				This project shows judgement rather than tool-following.
			</p>
			<Callout title="Use a case-study structure">
				<p>
					<strong>
						Question → Data → Quality checks → Analysis → Visuals →
						Recommendation → Limitations.
					</strong>{" "}
					An interviewer can follow this structure even if they never
					open your dashboard file.
				</p>
			</Callout>
			<p>
				Publish screenshots and a short walkthrough, but also keep the
				workbook, queries and source notes organised. Remove personal or
				restricted data before publishing anything.
			</p>

			<h2 id="interviews">Prepare to explain the analysis</h2>
			<p>
				Interview preparation should begin inside the project, not after
				it. For every chart or metric, be ready to answer:
			</p>
			<ul>
				<li>Why did you choose this question?</li>
				<li>What was wrong or incomplete in the data?</li>
				<li>Why did you choose this metric and comparison?</li>
				<li>What alternative explanation did you consider?</li>
				<li>What would you do with more time or better data?</li>
			</ul>
			<p>
				Practise a two-minute project explanation and a ten-minute
				version. The short version tests prioritisation; the longer
				version tests depth.
			</p>
			<p>
				The{" "}
				<InlineLink href="/program/data-analytics">
					Data Analytics with Excel, SQL & Power BI certification
				</InlineLink>{" "}
				follows this progression and ends with portfolio evidence. When
				your projects are ready, use the{" "}
				<InlineLink href="/blog/how-to-get-an-internship">
					internship application guide
				</InlineLink>{" "}
				to turn them into focused applications.
			</p>

			<h2 id="faq">Frequently asked questions</h2>
			<ArticleFaq
				items={[
					{
						answer: "A technical degree can help but is not the only route. Employers need evidence that you can clean data, query it, build useful reports and explain a business conclusion.",
						question:
							"Can I become a data analyst without a technical degree?",
					},
					{
						answer: "For many entry-level analyst roles, SQL and spreadsheets create value sooner. Python becomes useful after you can already frame an analysis, inspect data quality and communicate a result.",
						question: "Should a beginner learn Python before SQL?",
					},
					{
						answer: "Two or three well-explained projects are stronger than many shallow dashboards. Each should show the question, cleaning decisions, analysis, visualisation and recommendation.",
						question:
							"How many projects should my portfolio contain?",
					},
				]}
			/>
			<Sources
				items={[
					{
						href: "https://learn.microsoft.com/en-us/training/career-paths/data-analyst",
						label: "Microsoft Learn: Training for Data Analysts",
					},
					{
						href: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi",
						label: "Microsoft Learn: Power BI learning paths",
					},
					{
						href: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/",
						label: "Microsoft Certified: Power BI Data Analyst Associate",
					},
				]}
			/>
			<Author />
		</>
	)
}
