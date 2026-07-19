# Legal Review — Gate 6

**Framework:** CEF · **Specification:** AS-013 (Quality Assurance Engine) · **Version:** 0.1.0

**Purpose:** Validate that required legal content is present, honest, and jurisdiction-appropriate. Executes within Gate 6 (Content) and is individually required. Requirements are owned by `content/legal-pages.md` and `content.policy.yaml`.

> **Disclaimer.** This review is an operational completeness check. It is **not legal advice** and does not constitute legal approval. Every legal document MUST be reviewed by a qualified legal professional in the relevant jurisdiction before publication.

**Owner:** Product Strategist · **Gate:** 6

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Review Criteria

| ID | Criterion | Pass condition | Severity if failed |
|---|---|---|---|
| QLG-01 | Required pages present | Privacy, terms, cookie, accessibility statement, imprint — as applicable | Critical |
| QLG-02 | Hungarian set | For Hungarian projects: ÁSZF, Adatkezelési Tájékoztató, Impresszum, Cookie Tájékoztató — as applicable | Critical |
| QLG-03 | Mandatory disclaimer | Generated legal content carries the legal-review disclaimer | Critical |
| QLG-04 | Accuracy | Legal text reflects the actual business, data practices, and jurisdiction | Critical |
| QLG-05 | No fabricated details | Company identifiers, addresses, DPO/processor details are real, not invented | Critical |
| QLG-06 | Reachable | Legal pages are linked (typically footer) and reachable | Major |
| QLG-07 | Consent honesty | Cookie/consent copy reflects actual tracking; no pre-ticked consent or dark patterns | Critical |
| QLG-08 | Dates and versions | Effective/last-updated date shown; changes versioned | Minor |
| QLG-09 | Neutral tone | Plain, precise, neutral; no persuasion in legal copy | Minor |
| QLG-10 | Accessible | Legal pages are readable and accessible | Major |
| QLG-11 | Client advised | The client is advised in writing to obtain qualified legal review | Critical |

## Review Rules

- **QLG-12 — Completeness only.** This review verifies presence, accuracy, and disclaimer — it MUST NOT be represented as legal sign-off.
- **QLG-13 — Never fabricate.** Missing legal details MUST be requested from the client, never invented (Constitution Article XII).
- **QLG-14 — Jurisdiction fit.** The required set MUST match the jurisdiction(s) of operation.

## Gate Pass Condition

Category score ≥ 90, 0 Critical, 0 Major; contributes to Gate 6.
