# Implementation Workflow

**Purpose:** Define how CEF builds — the disciplined loop of writing code that adheres to every applicable standard, task by task.

**Description:** Implementation is where standards meet the keyboard. This workflow will govern the build loop: pick the next task, consult the governing standards, write the code, self-check against the design/UI/a11y/performance rules, and move on only when the task's acceptance criteria are met. It emphasizes small, coherent increments; continuous adherence rather than end-of-project cleanup; and updating memory and todos as work progresses. Quality is built in during this phase, not inspected in later.

## Inputs

- The task plan and acceptance criteria from planning.
- The applicable standards and the chosen template.

## Steps (to be authored)

1. Select the next task from the plan/`todos`.
2. Load only the standards relevant to that task (token discipline).
3. Implement to the standards and the acceptance criteria.
4. Self-verify against design, UI, accessibility, and performance rules.
5. Update `todos`, `decisions`, and `session` memory.

## Outputs

- Working, standard-compliant increments.
- Updated todos and decision memory.

## Status

Draft (AS-000). This workflow is scaffolded; its steps will be authored in a later module.

## TODO

- [ ] Author the build loop in detail.
- [ ] Define per-task self-verification steps.
- [ ] Specify how implementation hands off to review.
