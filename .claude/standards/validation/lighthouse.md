# Lighthouse

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0 · **Module:** M-VALIDATION

**Purpose:** Define how automated page audits (Lighthouse and equivalent auditors) are run and interpreted. Lighthouse is a **measurement instrument**, not the standard: its Performance, Accessibility, Best-Practices, and SEO categories map to budgets and requirements owned by the performance, accessibility, and SEO engines. A category score is a signal that MUST be traced to a specific, owned requirement.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** minimum category scores in `validation.policy.lighthouse`; underlying thresholds owned by their engines.

---

## The audit categories

- **LHS-01 — Performance.** The Performance category is measured, but the gate is the owned budgets (CWV, bundle), not the aggregate score alone; a passing score with an over-budget metric still fails (`PRT-11`, `discoverability.policy`).
- **LHS-02 — Accessibility.** The Accessibility category is one automated scan among several; it MUST NOT be read as full WCAG conformance (`ACT-08`, `M-A11Y`).
- **LHS-03 — Best Practices.** Best-Practices findings (console errors, deprecated APIs, insecure requests) MUST be triaged; each maps to a code or security requirement owned elsewhere (`M-SEC`, `BLD`).
- **LHS-04 — SEO.** The SEO category is a coarse check; the authoritative SEO validation is `seo-validation.md` against `metadata`/`robots`/`discoverability` policies (`OVR-01`).

## How audits run

- **LHS-05 — Audits run in automation on representative pages.** Lighthouse MUST run on a representative set (home, a content page, a conversion page, a dynamic page) in the pipeline, not once by hand (`AUT-07`, `PRT-08`).
- **LHS-06 — Progressive enhancement is validated.** Core content and function MUST be present without client JavaScript; the audit MUST confirm the page is usable before enhancement (`XBR-09`).
- **LHS-07 — Performance budgets are enforced as budgets, not scores.** Where the auditor supports explicit performance budgets, those budgets (owned by their engines) are enforced; the 0–100 score is a summary, not the gate (`PRT-01`, `PRT-02`).
- **LHS-08 — Audits run under representative throttling.** Mobile CPU and network throttling MUST reflect real conditions, not an unthrottled desktop run that flatters the score (`PRT-08`).

## Interpretation

- **LHS-09 — A failed audit is never ignored.** Ignoring a failing Lighthouse audit is a listed anti-pattern (`VAP`); every failure is triaged to fix or to a recorded, justified exception (`VLP-22`).
- **LHS-10 — Category minimums gate, floors override.** Minimum category scores in `validation.policy.lighthouse` gate the build; where a category maps to a floor (accessibility, performance), the floor overrides any passing aggregate (`OVR-03`).
- **LHS-11 — Scores are traced to causes.** A score is never the finding; the specific audit item behind it (an unsized image, a blocking script, a missing label) is the finding to fix (`VLP-18`).
- **LHS-12 — The audit report is durable.** Each run stores the full category and item results as an artifact for trend tracking (`RPT-06`, `BMK-03`).
