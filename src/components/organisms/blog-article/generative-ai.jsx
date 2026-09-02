import {
	ArticleFaq,
	Author,
	Callout,
	Checklist,
	CodeBlock,
	Example,
	InlineLink,
	Quote,
	Sources,
} from "./blocks"

export function GenerativeAiBody() {
	return (
		<>
			<p>
				Generative AI is most useful to a student when it behaves like a
				patient collaborator: it can explain, reorganise, question and
				draft. It becomes harmful when it quietly replaces the exact
				thinking the assignment was designed to develop.
			</p>
			<p>
				The practical goal is not “use AI everywhere” or “never use AI.”
				It is to separate tasks that benefit from assistance from tasks
				where the struggle is the learning. That distinction gives you
				speed without creating a skill gap you only discover during an
				exam, interview or real project.
			</p>

			<h2 id="what-ai-does">What Generative AI actually does</h2>
			<p>
				A language model produces likely continuations based on patterns
				in its training and the context you provide. That can look like
				reasoning, expertise or certainty even when the answer is
				incomplete or wrong. Fluency is not evidence.
			</p>
			<p>This explains the two most important habits for students:</p>
			<ul>
				<li>
					<strong>Give the model enough context.</strong> A vague
					request forces it to guess your level, goal, constraints and
					preferred output.
				</li>
				<li>
					<strong>Verify claims outside the model.</strong> An answer
					that sounds polished can still contain a false quotation,
					invented source or incorrect calculation.
				</li>
			</ul>
			<Quote>
				Use AI to reduce avoidable friction. Do not use it to remove the
				thinking you are supposed to practise.
			</Quote>

			<h2 id="learning-workflow">A safe five-step learning workflow</h2>
			<p>
				A repeatable workflow is safer than deciding from scratch every
				time you open a chatbot.
			</p>
			<h3>1. Attempt before asking</h3>
			<p>
				Write what you already know, where you are stuck and what you
				tried. Even a rough attempt gives the AI a real starting point
				and lets you compare its help with your own reasoning.
			</p>
			<h3>2. Ask for guidance, not a finished submission</h3>
			<p>
				Request an explanation, hints, a worked example on a different
				problem or questions that expose your gap. This keeps you active
				in the process.
			</p>
			<Example title="Better study prompt">
				<CodeBlock>
					{`I am learning SQL joins at beginner level.

I understand INNER JOIN but I confuse LEFT JOIN and FULL OUTER JOIN.
Do not solve my assignment.

First, explain the difference using one small table example.
Then give me two practice questions without answers.
After I answer, critique my reasoning.`}
				</CodeBlock>
			</Example>
			<h3>3. Reconstruct the answer yourself</h3>
			<p>
				Close the AI response and explain the idea in your own words. If
				you cannot reconstruct it, you recognised the answer but did not
				learn it.
			</p>
			<h3>4. Verify important details</h3>
			<p>
				Check definitions against course material or official
				documentation. Recalculate numeric answers. Open cited sources.
				Search for the original quotation instead of trusting a
				generated citation.
			</p>
			<h3>5. Record what changed</h3>
			<p>
				Keep a short learning log: the original misunderstanding, the
				explanation that helped and one new problem you can now solve.
				This turns a chat into evidence of progress.
			</p>

			<h2 id="study-use-cases">Five useful student use cases</h2>
			<h3>Explain a difficult concept at the right level</h3>
			<p>
				Ask for the same concept in three layers: a simple explanation,
				a technical explanation and a concrete example. Specify what you
				already understand so the response does not restart from zero.
			</p>
			<h3>Turn notes into active recall</h3>
			<p>
				Paste notes that you are allowed to share and ask the model to
				create questions, not summaries. Answer without looking. Then
				ask it to mark your response against the notes and identify the
				exact missing idea.
			</p>
			<h3>Plan research before collecting information</h3>
			<p>
				AI is useful for generating sub-questions, search terms,
				alternative explanations and a structure for comparing sources.
				It should not be treated as the source itself.
			</p>
			<h3>Improve a draft without losing your voice</h3>
			<p>
				Ask for diagnosis before rewriting: unclear claims, weak
				transitions, unsupported statements and repeated ideas. Decide
				which edits to accept. A full rewrite is fast, but it often
				removes your reasoning and makes it difficult to defend the work
				later.
			</p>
			<h3>Practise interviews and presentations</h3>
			<p>
				Give the model a role description or presentation outline and
				ask it to question you one item at a time. Request follow-up
				questions when your answer is vague. This is more useful than
				memorising generated answers.
			</p>

			<h2 id="verification">How to verify an AI answer</h2>
			<p>Verification is not a final spell-check. It is a sequence:</p>
			<ol>
				<li>
					Highlight every factual claim, number, quotation and named
					source.
				</li>
				<li>
					Find the original source rather than another generated
					summary.
				</li>
				<li>
					Check whether the source actually supports the wording used.
				</li>
				<li>Compare important claims with a second reliable source.</li>
				<li>Reproduce calculations independently.</li>
				<li>Remove anything you cannot verify.</li>
			</ol>
			<Checklist
				items={[
					"Can I open every cited source?",
					"Does the source contain the quoted idea?",
					"Is the information current enough for this task?",
					"Are assumptions clearly separated from facts?",
					"Could I explain how the conclusion was reached?",
				]}
				title="Fast verification checklist"
			/>
			<p>
				The{" "}
				<InlineLink href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence">
					NIST Generative AI Profile
				</InlineLink>{" "}
				frames responsible use around governing, mapping, measuring and
				managing risk. A student does not need to implement an
				organisational framework, but the underlying habit is relevant:
				identify the risk before trusting the output.
			</p>

			<h2 id="privacy">Privacy, academic integrity and disclosure</h2>
			<p>
				Never paste information merely because the chat box is
				convenient. Remove names and identifying details when they are
				not necessary. Do not upload private student records, employer
				documents, passwords, identity documents, unpublished research
				or confidential datasets.
			</p>
			<p>
				Academic rules vary by institution, course and assignment. “AI
				is allowed” is not a universal policy. If an assignment permits
				brainstorming but not generated prose, follow that boundary. If
				disclosure is required, state what tool you used and what it
				helped with.
			</p>
			<Callout title="A simple disclosure format">
				<p>
					“I used [tool] to generate practice questions and identify
					unclear sentences. I verified factual claims against the
					sources listed and wrote the submitted analysis myself.”
				</p>
			</Callout>

			<h2 id="skill-building">Turn AI use into a demonstrable skill</h2>
			<p>
				Typing prompts is not yet a career skill. A useful skill has a
				repeatable process, quality criteria and evidence.
			</p>
			<p>Build a small portfolio around one real task:</p>
			<ul>
				<li>Define the task and what a good result means.</li>
				<li>Save the first prompt and its weak output.</li>
				<li>Improve context, constraints and format.</li>
				<li>Document how you verified the final result.</li>
				<li>Explain where the workflow should not be trusted.</li>
			</ul>
			<p>
				That portfolio is stronger than a list of tools because it shows
				judgement. If you want a structured path, the{" "}
				<InlineLink href="/program/generative-ai">
					Generative AI & Prompt Engineering certification
				</InlineLink>{" "}
				builds toward a practical assistant and prompt portfolio rather
				than isolated chatbot tricks. For a deeper prompting method,
				continue with the{" "}
				<InlineLink href="/blog/prompt-engineering-guide">
					prompt engineering guide
				</InlineLink>
				.
			</p>

			<h2 id="faq">Frequently asked questions</h2>
			<ArticleFaq
				items={[
					{
						answer: "It depends on the institution, course and assignment. Follow the stated policy, disclose assistance when required and never submit generated work as your own when that is prohibited.",
						question:
							"Is it acceptable for students to use Generative AI?",
					},
					{
						answer: "Treat it as a draft. Identify checkable claims, locate original sources, compare important claims across reliable references and verify calculations or quotations directly.",
						question:
							"How can I check whether an AI answer is accurate?",
					},
					{
						answer: "Avoid passwords, identity documents, private student records, confidential employer material, unpublished research and personal information that is unnecessary for the task.",
						question: "What information should I avoid sharing?",
					},
				]}
			/>
			<Sources
				items={[
					{
						href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
						label: "NIST AI 600-1: Generative Artificial Intelligence Profile",
					},
					{
						href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
						label: "Anthropic: Prompt engineering overview",
					},
				]}
			/>
			<Author />
		</>
	)
}
