# Editorial Review

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the internal review stage: who reviews, what they check, and how findings are returned. This file governs the review of a *content item*. The review of the *content operations system* is `validation.md`; content *quality* criteria are owned by `content/review.md` (AS-011).

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `editorial.policy.yaml` (`review_stage`).

---

## Rules

- **ER-01 — Review is mandatory.** Nothing publishes unreviewed (`COP-14`, `CO-06`).
- **ER-02 — The reviewer is not the author.** (`COP-15`.) This separation is the entire mechanism; without it the stage is a checkbox.
- **ER-03 — Criteria are documented.** What review checks MUST be documented. Undocumented criteria produce inconsistent review, which produces inconsistent content (`COP-13`).
- **ER-04 — Review is against a revision.** (`COP-16`.)
- **ER-05 — Rejection states a reason.** (`COP-17`.)
- **ER-06 — Rejection returns to Revision.** (`editorial.policy.transitions`.)
- **ER-07 — Review is logged.** (`editorial.policy.audit`.)

## What Review Checks

| Area | Checks | Source |
|---|---|---|
| **Accuracy** | Every factual claim is true and supportable; no invented statistics, testimonials, or metrics | Article IV; `AP-005` |
| **Brand voice** | Voice and tone match the brand | `content/brand-voice.md`, `content/tone.md` (AS-011) |
| **Structure** | One `h1`; headings descend without skipping; scannable; content model complete | `SE-06`, `RC-08`, `CM-03` |
| **Links** | Internal links resolve; anchor text is descriptive; external links intended | `SE-07`, `MD-18` |
| **Media** | Alt text present and meaningful; licence recorded; assets referenced not pasted | `MM-04`, `MM-08`, `SC-12` |
| **Metadata** | Title, description, canonical present and unique | `SE-01`, `SE-02` |
| **Accessibility** | Heading order, alt text, link text, table semantics, no colour-only meaning | `D-038`, `D-092`, `RC-25` |
| **Legal** | No fabricated claims; legal content routed to counsel; consent recorded for testimonials and likenesses | `LEG-14`, `CM-11`, `MM-13` |

- **ER-08 — Accuracy first.** A well-written falsehood is worse than a badly-written truth. Accuracy MUST be checked before style.
- **ER-09 — Fabrication is a blocker.** Invented statistics, testimonials, ratings, or metrics MUST NOT pass, ever (Article IV). This is not a style note.
- **ER-10 — Legal content routes to counsel.** A reviewer MUST NOT approve legal content on their own judgment (`LEG-14`, `CLG-28`).
- **ER-11 — Accessibility is a floor, not an opinion.** Missing alt text and broken heading order MUST block (`PR-06`, `MM-06`).

## Conduct

- **ER-12 — Findings are specific and actionable.** "Doesn't feel right" is not a finding. A finding MUST name what, where, and why (`D-075` applies the same logic to error messages).
- **ER-13 — Review the content, not the author.** (`IR-20` applies the same logic to incidents.)
- **ER-14 — Severity is stated.** A blocker MUST be distinguished from a suggestion, or authors cannot triage and reviewers become bottlenecks.
- **ER-15 — Blockers block; suggestions do not.** A suggestion MUST NOT hold publication hostage.
- **ER-16 — Review is bounded in time.** A review SLA MUST be defined. Unbounded review is where content dies quietly, and authors route around it.

## Scale

- **ER-17 — Proportional.** Review depth MUST match consequence. A typo fix and a pricing page do not warrant the same review — but both are reviewed (`EW-10`).
- **ER-18 — Automate the mechanical.** Link checking, schema validation, alt-text presence, and metadata presence MUST be automated (`GC-12`, `publishing.policy.integrity`). Humans MUST review what only humans can: accuracy, voice, and judgment. A reviewer spending their attention on missing alt text will not notice the false claim.

## Verification

The content-operations gate verifies review is mandatory with a non-author reviewer, criteria are documented, review binds to a revision, rejection states a reason, fabrication and accessibility failures block, legal content routes to counsel, and mechanical checks are automated rather than delegated to reviewers.
