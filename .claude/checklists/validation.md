# Validation Checklist — Validation & Automation Gate

**Framework:** CEF · **Specification:** AS-020 (Validation & Automation Engine) · **Version:** 2.0.0

**Purpose:** Execute the validation gate. Reliability, evidence, and the floors are non-negotiable. **Owner:** QA Engineer with the leading engineer. Governed by `standards/validation/review.md`.

**Scope:** Applies to any project entering release validation. Where an area has no applicable surface, record it as not applicable with a reason (`VRV-05`). Domain-finding severity and remedy defer to the owning engine (`VRV-06`); the release decision defers to AS-013 (`release.policy`).

---

## Coverage

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-01 | Critical paths covered | Every critical journey has end-to-end coverage | An untested critical path | Critical | QA Engineer |
| CHK-VAL-02 | Coverage threshold met | Unit coverage ≥ threshold; behavior of critical branches asserted | Below threshold or line-only coverage | Major | QA Engineer |
| CHK-VAL-03 | New logic ships with tests | Added logic carries its tests in the same change | Logic merged without tests | Major | Frontend Engineer |
| CHK-VAL-04 | Layer balance | Pyramid shape held; behavior tested at the lowest sufficient layer | Inverted pyramid; redundant layers | Minor | QA Engineer |

## Reliability

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-05 | Deterministic suite | Same commit yields same result | Flaky, order-dependent tests | Major | QA Engineer |
| CHK-VAL-06 | Flaky tests quarantined | Flaky tests isolated with owner and deadline, never retried into green | Flakiness masked by retries | Major | QA Engineer |
| CHK-VAL-07 | Unhappy path exercised | Errors, empties, boundaries, and failures tested | Happy-path-only suite | Critical | QA Engineer |
| CHK-VAL-08 | Isolation and reset | Tests seed and reset their own state | Shared mutable state across tests | Major | QA Engineer |

## Accessibility

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-09 | Automated scans run | Every page and key state scanned | Pages unscanned | Major | Accessibility Specialist |
| CHK-VAL-10 | Keyboard and screen reader | Critical flows operated by keyboard and verified with a screen reader | Assumed, not verified | Critical | Accessibility Specialist |
| CHK-VAL-11 | Contrast and focus | Contrast measured to AA; focus visible; reduced motion honored | Sub-threshold contrast; hidden focus | Critical | Accessibility Specialist |
| CHK-VAL-12 | Scan not sold as proof | Passing scan reported as automated-checks-only | Scan reported as "accessible" | Major | Accessibility Specialist |

## Performance

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-13 | CWV within budget | LCP/CLS/INP measured within owned thresholds under representative conditions | Over threshold or desktop-only measurement | Critical | Performance Engineer |
| CHK-VAL-14 | Bundle within budget | Client JS measured within the project bundle budget | Over budget | Critical | Performance Engineer |
| CHK-VAL-15 | Regression tolerance held | No metric regressed past tolerance vs baseline | Regression past tolerance | Major | Performance Engineer |
| CHK-VAL-16 | Re-measured after fixes | Every perf fix re-measured | Fix assumed effective | Major | Performance Engineer |

## Security

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-17 | Scans run | Dependency, static, secret, and header scans run | A scan omitted | Critical | Security Reviewer |
| CHK-VAL-18 | Authorization negative case | Cross-principal/tenant access attempted and denied | Only authorized access tested | Critical | Security Reviewer |
| CHK-VAL-19 | Hostile input exercised | Injection and malformed input rejected safely | Hostile input untested | Critical | Security Reviewer |
| CHK-VAL-20 | Scan not sold as proof | Passing scans reported as automated-checks-only; M-SEC review done | Scans reported as "secure" | Major | Security Reviewer |

## SEO

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-21 | Per-page SEO validated | Metadata, canonical, robots validated on every public page | Missing on any page | Major | SEO Specialist |
| CHK-VAL-22 | Site artifacts valid | Sitemap complete and current; robots.txt valid | Stale sitemap; invalid robots | Major | SEO Specialist |
| CHK-VAL-23 | Structured data valid and truthful | JSON-LD valid, complete, and matching visible content | Missing, invalid, or contradictory schema | Major | SEO Specialist |

## AI Discoverability

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-24 | Manifests valid | `llms.txt`/`robots.txt` present, valid, and aligned | Missing or contradictory manifests | Minor | AI SEO Specialist |
| CHK-VAL-25 | Entities consistent | Knowledge-graph entities consistent across pages | Contradictory entities | Minor | AI SEO Specialist |
| CHK-VAL-26 | Content extractable | Real semantic hierarchy; claims match content | Fake structure; claim/content mismatch | Major | AI SEO Specialist |

## Documentation

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-27 | Docs current with change | Docs required by the change present; `CHANGELOG.md` updated | Stale or missing docs | Major | Technical Writer |
| CHK-VAL-28 | Config documented | New configuration documented where introduced | Undocumented config | Minor | Technical Writer |

## Automation

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-29 | Pipelines are code | Version-controlled, deterministic, event-triggered | Console-configured or nondeterministic | Major | DevOps Engineer |
| CHK-VAL-30 | Signals enforced | Every stage blocks or is removed; no permanent warnings | Tolerated warning stages | Minor | DevOps Engineer |
| CHK-VAL-31 | Fail closed, fail fast | Errored stages block; cheapest stages first | Fail-open or slow-first pipeline | Major | DevOps Engineer |
| CHK-VAL-32 | Cadence recorded | Schedules and triggers declared in policy | Undeclared or habitual cadence | Minor | DevOps Engineer |
| CHK-VAL-33 | Skill routing deferred | Uses `qa.policy` routing; no second table | Duplicated routing | Major | DevOps Engineer |

## Release Readiness

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-VAL-34 | Suite ran in full | Release-validation suite ran and produced evidence | Suite skipped or partial | Critical | QA Engineer |
| CHK-VAL-35 | Per-criterion evidence | Every production-readiness criterion has a result | Missing evidence assumed pass | Critical | QA Engineer |
| CHK-VAL-36 | Floors pass | No accessibility, security, performance, or legal floor failure | Any floor failure | Critical | Product Strategist |
| CHK-VAL-37 | Build and image valid | Build succeeds; production image builds and is healthy | Failed build or image | Critical | DevOps Engineer |
| CHK-VAL-38 | Rollback validated | Rollback path proven; post-deploy smoke passes | Unproven rollback; no smoke | Major | DevOps Engineer |
| CHK-VAL-39 | Decision deferred to AS-013 | Approve/reject and sign-off owned by `release.policy` | Automation self-approves | Critical | Product Strategist |
| CHK-VAL-40 | No false certification | Result reported as scoped evidence, not "done/secure/accessible" | Overstated certification | Major | QA Engineer |

**Gate pass:** every area resolved, 0 Critical open, no `VAP` anti-pattern present, and the release decision left to AS-013.

**Reporting.** A passed gate MUST NOT be reported as "correct", "secure", "accessible", or "done". It reports that this validation, at this scope, found no unresolved finding of consequence (`VRV-12`).
