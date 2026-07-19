# Content Review — Gate 6

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate all written content against the Content Intelligence Engine. Executed via `checklists/content.md`.

**Owner:** Technical Writer · **Gate:** 6

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QCN-01 | Grammar | No grammar errors | Major |
| QCN-02 | Spelling | No spelling errors or typos | Major |
| QCN-03 | Tone | Context-appropriate tone; consistent within a surface (`content/tone.md`) | Major |
| QCN-04 | Voice | Matches the recorded brand voice (`content/brand-voice.md`) | Major |
| QCN-05 | Consistency | One term per concept; consistent product nomenclature | Major |
| QCN-06 | Readability | Reading grade, sentence, and paragraph limits met (`content.policy.yaml`) | Minor |
| QCN-07 | Accuracy | Every fact, number, price, and claim is true and verifiable | Critical |
| QCN-08 | Legal disclaimers | Required legal pages present with the mandatory review disclaimer (`legal-review.md`) | Critical |
| QCN-09 | Localization | Meaning/tone preserved; locale formats correct; human-reviewed | Major |
| QCN-10 | Placeholder removal | No lorem ipsum, placeholder copy, or TODO text | Critical |
| QCN-11 | No fabrication | No fabricated testimonials, statistics, reviews, or cases | Critical |
| QCN-12 | Conversion clarity | Clear value; one primary CTA; objections handled | Major |

## Review Rules

- **QCN-13 — Run the checklist.** The review MUST execute `checklists/content.md`.
- **QCN-14 — Verify facts.** Numbers, prices, and claims MUST be verified against source; unverified figures are Critical.
- **QCN-15 — Anti-pattern scan.** No entry from `content/anti-patterns.md` (CNAP-01…110) is present.
- **QCN-16 — Proofread.** A deliberate proofreading pass MUST occur (`content/proofreading.md`).

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major.
