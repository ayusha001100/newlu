import {
	ArticleFaq,
	Author,
	Checklist,
	CodeBlock,
	DataTable,
	Example,
	InlineLink,
	Sources,
} from "./blocks"

export function PromptEngineeringBody() {
	return (
		<>
			<p>
				Most weak AI output begins with an underspecified task. “Write a
				post about data” leaves the model to invent the audience,
				purpose, evidence, tone, length and definition of success. A
				more useful prompt makes those decisions visible.
			</p>
			<p>
				Prompt engineering is therefore closer to writing a brief and
				designing a test than searching for secret words. The prompt
				matters, but so do the model, source material, tools, workflow
				and evaluation.
			</p>

			<h2 id="definition">What prompt engineering is — and is not</h2>
			<p>
				Prompt engineering is the practice of designing instructions,
				context, examples and quality criteria so an AI system can
				perform a defined task reliably enough for its intended use.
			</p>
			<p>It is not:</p>
			<ul>
				<li>A guarantee that every output will be correct.</li>
				<li>A substitute for reliable source data.</li>
				<li>A way to make the wrong model suitable for every task.</li>
				<li>A reason to skip privacy, security or human review.</li>
				<li>A collection of dramatic “act as a genius” phrases.</li>
			</ul>
			<p>
				Anthropic’s official prompting guidance begins by asking whether
				prompt engineering is the right solution at all. Some failures
				are better addressed by changing the model, improving retrieved
				context, using a tool or redefining the task.
			</p>

			<h2 id="framework">A five-part prompt framework</h2>
			<p>Use this structure as a checklist, not a rigid template.</p>
			<h3>1. Task: state the action and purpose</h3>
			<p>
				Use a concrete verb and name the decision or outcome the work
				supports.
			</p>
			<Example>
				<strong>Instead of</strong>
				<CodeBlock>Analyse this data.</CodeBlock>
				<strong>Write</strong>
				<CodeBlock>
					Identify the three largest month-over-month changes in
					support-ticket volume so an operations manager can decide
					where to investigate.
				</CodeBlock>
			</Example>
			<h3>2. Context: provide only what changes the answer</h3>
			<p>
				Include audience, domain, definitions, current situation and
				source material. Separate source material clearly from your
				instructions so quoted text is not mistaken for a command.
			</p>
			<h3>3. Constraints: define boundaries</h3>
			<p>
				Specify what the answer must and must not do: permitted sources,
				length, tone, privacy boundaries, assumptions and uncertainty
				handling.
			</p>
			<h3>4. Output: define the shape</h3>
			<p>
				Ask for the format you can actually use: a table with named
				columns, JSON matching a schema, a numbered plan or a short memo
				with headings. Format is not decoration; it connects the output
				to the next step in the workflow.
			</p>
			<h3>5. Check: define quality and verification</h3>
			<p>
				State what success means and how unsupported information should
				be handled. For important tasks, ask the model to identify
				uncertainty and cite the source material used. Then verify
				independently.
			</p>
			<Checklist
				items={[
					"The task uses a specific action verb.",
					"The context changes or narrows the answer.",
					"The constraints remove unsafe or irrelevant options.",
					"The output format matches the next use.",
					"The quality criteria are observable.",
				]}
				title="Five-part prompt check"
			/>

			<h2 id="examples">Before-and-after prompt examples</h2>
			<h3>Example 1: learning a concept</h3>
			<Example>
				<strong>Weak prompt</strong>
				<CodeBlock>Teach me APIs.</CodeBlock>
				<strong>Improved prompt</strong>
				<CodeBlock>
					{`Task: Explain REST APIs to a beginner preparing to build a JavaScript weather app.

Context: I understand functions and JSON but have not made a network request.

Constraints:
- Use one request-and-response analogy.
- Define endpoint, method, status code and API key.
- Do not assume backend experience.

Output:
1. A 250-word explanation.
2. One small fetch example.
3. Three questions to test my understanding.

Check: Label any simplifications you make.`}
				</CodeBlock>
			</Example>
			<h3>Example 2: improving a resume</h3>
			<Example>
				<strong>Weak prompt</strong>
				<CodeBlock>Make my resume better.</CodeBlock>
				<strong>Improved prompt</strong>
				<CodeBlock>
					{`Compare the project section below with the internship description.

Identify:
- missing evidence for required skills,
- vague bullets,
- unsupported claims,
- terms that may not be clear to a recruiter.

Do not invent metrics or experience.
Return a table with: original text, issue, suggested revision, and question for me.

[INTERNSHIP DESCRIPTION]
...

[PROJECT SECTION]
...`}
				</CodeBlock>
			</Example>
			<h3>Example 3: analysing research material</h3>
			<Example>
				<strong>Improved prompt</strong>
				<CodeBlock>
					{`Using only the sources inside <sources>, compare the stated benefits and limitations of the two approaches.

For each claim:
- cite the source label,
- distinguish direct evidence from author interpretation,
- write "not established" when the sources do not support a conclusion.

Return:
1. a comparison table,
2. a 150-word synthesis,
3. unresolved questions.

<sources>
  <source id="A">...</source>
  <source id="B">...</source>
</sources>`}
				</CodeBlock>
			</Example>
			<p>
				The structure makes the source boundary visible and defines what
				the model should do when evidence is missing. It still does not
				eliminate the need to inspect the citations.
			</p>

			<h2 id="complex-work">Break complex work into stages</h2>
			<p>
				One enormous prompt often hides where the process failed. Split
				work when the stages require different information or quality
				checks.
			</p>
			<ol>
				<li>
					<strong>Clarify:</strong> ask the model to identify missing
					requirements.
				</li>
				<li>
					<strong>Plan:</strong> produce an outline or analysis
					method.
				</li>
				<li>
					<strong>Create:</strong> generate one section or output at a
					time.
				</li>
				<li>
					<strong>Critique:</strong> evaluate against explicit
					criteria.
				</li>
				<li>
					<strong>Revise:</strong> change only the failed parts.
				</li>
				<li>
					<strong>Verify:</strong> check facts, calculations and
					source use outside the model.
				</li>
			</ol>
			<p>
				This also preserves control. You can reject a weak plan before
				spending time on a polished but misdirected answer.
			</p>
			<h3>Use examples when words are ambiguous</h3>
			<p>
				If “concise,” “professional” or “well structured” produces
				inconsistent results, show one or two examples of the desired
				pattern. Explain which features matter so the model does not
				copy irrelevant details.
			</p>
			<h3>Use roles only when they add relevant context</h3>
			<p>
				“Act as an expert” is vague. “Review this dashboard as an
				operations manager who needs to identify delayed orders in under
				two minutes” provides an audience and decision.
			</p>

			<h2 id="evaluation">Evaluate prompts, not favourite outputs</h2>
			<p>
				A prompt is not good because it produced one impressive
				response. Test it against representative inputs, including
				difficult and incomplete cases.
			</p>
			<DataTable
				headers={["Criterion", "Question", "Simple measure"]}
				rows={[
					[
						"Accuracy",
						"Are checkable claims correct?",
						"Verified claims / total claims",
					],
					[
						"Completeness",
						"Are required fields present?",
						"Requirements passed / total",
					],
					[
						"Grounding",
						"Does the answer stay inside supplied evidence?",
						"Unsupported claims count",
					],
					[
						"Format",
						"Can the next step consume the output?",
						"Schema or checklist pass",
					],
					[
						"Usefulness",
						"Does it support the intended decision?",
						"Human review against rubric",
					],
				]}
			/>
			<p>
				Keep a small test set and compare prompt versions on the same
				inputs. Change one major instruction at a time. Otherwise, you
				will not know which change improved or damaged the result.
			</p>

			<h2 id="mistakes">Common prompting mistakes</h2>
			<ul>
				<li>
					<strong>Conflicting instructions:</strong> asking for
					exhaustive detail and extreme brevity at the same time.
				</li>
				<li>
					<strong>Missing source boundaries:</strong> requesting facts
					without specifying acceptable evidence.
				</li>
				<li>
					<strong>Premature formatting:</strong> forcing a complex
					schema before the task is understood.
				</li>
				<li>
					<strong>Hidden success criteria:</strong> criticising the
					answer for requirements never stated.
				</li>
				<li>
					<strong>Overloaded prompts:</strong> asking for research,
					strategy, writing, design and validation in one pass.
				</li>
				<li>
					<strong>Trusting self-evaluation:</strong> asking the same
					model to certify that its own unsupported claims are
					correct.
				</li>
				<li>
					<strong>Sharing sensitive data:</strong> pasting private
					material without checking whether it is necessary or
					permitted.
				</li>
			</ul>

			<h2 id="portfolio">Build a prompt engineering portfolio</h2>
			<p>
				A portfolio should show a system, not a gallery of long prompts.
				Choose one practical task and document:
			</p>
			<ul>
				<li>The user, task and risk level.</li>
				<li>The baseline prompt and its failures.</li>
				<li>The evaluation criteria and test cases.</li>
				<li>Two or three prompt revisions.</li>
				<li>The final performance and remaining limitations.</li>
				<li>The required human review or safety boundary.</li>
			</ul>
			<p>
				Useful project ideas include a source-grounded research brief,
				customer-message classifier, interview-practice coach or
				structured meeting-note extractor. Use synthetic or safely
				shareable data.
			</p>
			<p>
				The{" "}
				<InlineLink href="/program/generative-ai">
					Generative AI & Prompt Engineering program
				</InlineLink>{" "}
				gives you a structured route to a practical assistant and prompt
				portfolio. Read the{" "}
				<InlineLink href="/blog/generative-ai-for-students">
					responsible AI guide for students
				</InlineLink>{" "}
				before using these workflows in academic work.
			</p>

			<h2 id="faq">Frequently asked questions</h2>
			<ArticleFaq
				items={[
					{
						answer: "It is the practice of designing instructions, context, examples and evaluation criteria so an AI system can produce a useful result for a defined task.",
						question: "What is prompt engineering?",
					},
					{
						answer: "No. Relevant context and clear constraints matter more than length. A long prompt with conflicting instructions or unnecessary detail can reduce quality.",
						question:
							"Do longer prompts always produce better answers?",
					},
					{
						answer: "Define observable criteria before testing, run the prompt on representative inputs, compare outputs consistently and revise the instruction that corresponds to the failure.",
						question: "How do I know whether a prompt is good?",
					},
				]}
			/>
			<Sources
				items={[
					{
						href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
						label: "Anthropic: Prompt engineering overview",
					},
					{
						href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
						label: "NIST AI 600-1: Generative Artificial Intelligence Profile",
					},
				]}
			/>
			<Author />
		</>
	)
}
