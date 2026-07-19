# Quality Philosophy

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** State the beliefs behind the gates. Quality is measurable, cumulative, and verified — never assumed.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Principles

- **QP-01 — Shipping is not finishing.** Deployment is a step, not completion. Work is complete Only when every gate passes (Article X).
- **QP-02 — Passing CI is not quality.** A green pipeline proves the build ran, not that the product is good. CI is a floor, not a verdict.
- **QP-03 — A working website can still fail users.** Functional correctness is necessary and insufficient; usability, accessibility, speed, and clarity are also required.
- **QP-04 — Quality is cumulative.** It is the result of thousands of small decisions; no single check produces it, and a few wrong details erode it.
- **QP-05 — Quality must be measurable.** Every claim of quality MUST rest on a measurement or an objective check; "looks good" is not evidence.
- **QP-06 — Every review has objective criteria.** Each review MUST define pass/fail conditions in advance; subjective preference MUST NOT decide a gate.
- **QP-07 — Verify, never assume.** A gate passes on demonstrated evidence (build output, measurement, checklist result), never on assumption.
- **QP-08 — Findings are actionable.** Every issue MUST carry a severity, a reason, and a recommendation; a finding without a fix path is incomplete.
- **QP-09 — Floors never bend.** Accessibility, performance, security, and legal floors MUST NOT be traded for schedule; Only a recorded, scoped user waiver may lower a non-legal floor.
- **QP-10 — Defects are cheapest early.** Reviews run as work completes, not once at the end; late detection multiplies cost.
- **QP-11 — The gate is the same for everyone.** Standards apply regardless of deadline, client, or author.
- **QP-12 — Tool-assisted where possible.** Where an instrument can measure it, it MUST be measured, not eyeballed (`overview.md` skill routing).
- **QP-13 — Report honestly.** A failing check MUST be reported as failing, with evidence; a hidden failure is a defect in the process (Constitution Article XI).
- **QP-14 — No bypass.** No gate MUST be skipped, reordered around, or declared "not applicable" without a recorded justification.
- **QP-15 — Quality is owned.** Every review category has an owner accountable for its verdict.
- **QP-16 — Correct, then re-run.** A failed gate is fixed and the gate re-run; a partially fixed finding MUST NOT pass.
- **QP-17 — Traceable decisions.** Waivers and significant QA decisions MUST be recorded in `memory/decisions.md`.
- **QP-18 — Done is defensible.** "Complete" is a claim the team can defend line by line against the Definition of Done.

## Philosophy Guarantees

- **QP-G1** — Quality is measured, evidenced, and owned — never assumed.
- **QP-G2** — Every review has objective criteria and actionable findings.
- **QP-G3** — No gate is bypassed; floors never bend; failures are reported honestly.
