# Security Engine Validation

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define the checks that prove this engine is internally sound and that a project satisfies it. `review.md` validates the *project*; this file validates the *engine* and the hard gates that admit no judgment.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hard Gates

These MUST pass. They admit no waiver and no severity discussion.

- **SV-01 — No secrets committed.** The repository MUST contain no secret, in any branch or in history. Secret scanning MUST run in CI and pre-commit where practical (`SM-02`). A detection MUST fail the build. Remediation follows `secrets-management.md`: rotate → revoke → assess → purge → record. Purging alone MUST NOT close the finding.
- **SV-02 — `.env` is ignored.** Environment files with real values MUST be excluded from version control, and the exclusion MUST be verified rather than assumed (`SM-19`).
- **SV-03 — `.env.example` is value-free.** Committed templates MUST list names with empty or clearly fake values (`SM-18`).
- **SV-04 — No secret reaches the client.** No secret MUST appear in a client bundle (`SM-05`).
- **SV-05 — Security policies exist.** All six policies MUST exist: `security`, `authentication`, `authorization`, `privacy`, `headers`, `compliance`.
- **SV-06 — Checklists are complete and executable.** `checklists/security.md` MUST exist, MUST cover the ten review areas of `review.md`, and every item MUST be executable — stating what to check, how, and what constitutes pass (AS-013).

## Engine Consistency

- **SV-07 — Single source of truth.** Every canonical value MUST live in exactly one policy file. A value restated in a second policy or hard-coded in a document is a defect (`SEC-03`, `XV-12`).
- **SV-08 — Documentation matches policy.** Every rule referencing a canonical value MUST reference it, never restate it. Drift between a document and its policy is a defect.
- **SV-09 — No duplicated ownership.** No topic MUST be owned by two documents. Where this engine and another cover the same subject, the boundary MUST be stated explicitly (`overview.md` scope boundary; `KV-05`).
- **SV-10 — Cross-references resolve.** Every referenced file, rule ID, and policy key MUST exist.
- **SV-11 — No contradictions.** No rule MUST contradict another, nor the Constitution, nor a higher-priority engine. A conflict MUST be named and resolved by precedence, never silently (Constitution, authority and precedence).
- **SV-12 — RFC-2119 throughout.** Every normative statement MUST use MUST / MUST NOT / SHOULD / MAY. Hedging verbs MUST NOT appear.
- **SV-13 — Anti-patterns are complete.** `anti-patterns.md` MUST carry at least 100 entries, each stating problem, risk, and recommended approach.
- **SV-14 — Every document is substantive.** No file MUST be a placeholder, and none MUST contain lorem ipsum or an empty section (Article IV).

## Alignment

- **SV-15 — Guidance aligns with accepted practice.** Guidance MUST align with widely accepted secure-development practice and MUST NOT contradict established industry standards without a recorded rationale. Where CEF deliberately departs from a common convention — as with `PW-02` (no composition rules) and `PW-08` (no forced rotation) — the departure MUST state its reasoning, because it follows current guidance rather than habit.
- **SV-16 — No offensive content.** This engine MUST NOT contain exploit code, weaponized payloads, or offensive technique instructions. It defines defense (writing style, AS-016).
- **SV-17 — No legal conclusions.** No document MUST state a legal conclusion, assert applicability, or set a legally operative deadline (`LEG-02`, `LEG-03`).
- **SV-18 — The disclaimer is present.** Every document touching legal or compliance matters MUST carry the qualified-legal-review disclaimer (`LEG-06`).

## Project Validation

Executed at the gate (`review.md`):

- **SV-19 — Every review area is resolved.** All ten areas MUST be checked; a not-applicable area MUST carry a recorded reason.
- **SV-20 — Live verification occurred.** Browser-observable controls MUST be verified on a real response with the Chrome DevTools MCP (`RV-04`, TE-08).
- **SV-21 — No open finding of consequence.** No blocker or major MUST remain (`RV-02`).
- **SV-22 — Suppressions are current.** Every suppression MUST carry a reason, scope, owner, and an unexpired date (`VM-06`).
- **SV-23 — Decisions are recorded.** Every waiver, acceptance, and compensating control MUST be recorded in `memory/decisions.md` with its scope (`ME-07`, `SDL-08`).
- **SV-24 — Evidence is current.** The artifacts in `compliance.policy.evidence` MUST exist and be current (`CMP-22`).

## Reporting

- **SV-25 — Report honestly.** Validation MUST report each check as pass or fail with evidence. A single fail MUST be reported as a fail (Article XI).
- **SV-26 — Never claim security.** A passed validation MUST NOT be reported as proof the system is secure. It reports that these checks, at this scope, at this time, passed (`RV-11`).
