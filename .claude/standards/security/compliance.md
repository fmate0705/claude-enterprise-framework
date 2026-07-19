# Compliance

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Define how engineering supports regulatory obligations. Compliance is the practice of being able to *demonstrate* what you do — this file governs the evidence, not the legal conclusion.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `compliance.policy.yaml`.

> **Legal notice.** This document is engineering guidance. It is not legal advice and states no legal conclusion. Whether any regime applies to a given project is a legal determination that MUST be made by qualified legal professionals. Nothing here MUST be read as establishing applicability, a deadline, or a defense.

---

## Position

- **CMP-01 — The framework states no legal conclusion.** CEF MUST NOT assert that a project is compliant, that a regime applies, or that an obligation is satisfied. It produces evidence; counsel draws conclusions (`SEC-06`).
- **CMP-02 — No claim without evidence.** A compliance claim MUST NOT be published without evidence supporting it. A certification MUST NOT be claimed without an audit.
- **CMP-03 — Legal review precedes publication.** Every legal document, compliance claim, and regulatory representation MUST be reviewed and approved by qualified legal professionals before publication (`legal-considerations.md`).
- **CMP-04 — Compliance is not security.** A compliant system MUST NOT be assumed secure, and a secure system MUST NOT be assumed compliant. They overlap; neither contains the other.

## Regimes That May Apply

Applicability is a legal determination. Engineering support is listed so the capability exists before it is needed.

| Regime | May apply when | Engineering support |
|---|---|---|
| **GDPR** | Personal data of EU/EEA data subjects is processed | `privacy.md`, `privacy.policy.yaml` |
| **Hungarian data protection** | Established in or targeting Hungary — the project default | `privacy.md`; documents per `content/legal-pages.md` |
| **ePrivacy / cookie consent** | Non-essential data is stored on or read from a device | `privacy.md` consent (`PRV-16`–`PRV-22`) |
| **CCPA / CPRA** | California business thresholds are met | `privacy.md` user rights (`PRV-23`) |
| **WCAG 2.2 AA** | Always — a framework floor regardless of jurisdiction | `standards/accessibility.md` |
| **European Accessibility Act** | In-scope products or services in the EU | `standards/accessibility.md` |
| **NIS2** | The entity is in scope as essential or important | `incident-response.md` |
| **OWASP ASVS** | Always available as a reference; not a regulation | `security.policy.yaml` |

- **CMP-05 — Jurisdiction is identified early.** The operating jurisdiction and likely regimes MUST be identified during Research (S02) and recorded in `memory/project.md`. Discovering a regime late means rebuilding data flows.
- **CMP-06 — Accessibility is not conditional.** WCAG 2.2 AA is a framework floor and applies regardless of legal obligation (`PR-02`).

## Privacy Regulation Support

- **CMP-07 — Engineering capability precedes the request.** Access, rectification, erasure, portability, restriction, and objection MUST be technically supported before launch (`PRV-23`), not built on first request.
- **CMP-08 — The inventory is the foundation.** A current data inventory MUST exist (`DC-12`). Without it, no rights request, retention rule, or breach assessment can be answered accurately.
- **CMP-09 — Processors are recorded.** Third-party processors and transfers MUST be recorded and disclosed (`PRV-29`, `PRV-30`).

## Cookie Consent

- **CMP-10 — Nothing non-essential before consent.** Non-essential cookies, trackers, and third-party scripts MUST NOT load before consent (`PRV-20`).
- **CMP-11 — Verified, not asserted.** Consent behavior MUST be verified with the **Chrome DevTools MCP** (TE-08) by observing network requests and storage before any interaction. A consent banner that blocks nothing is the most common compliance defect and is trivially observable.
- **CMP-12 — Essential is a narrow category.** Only genuinely essential storage may be exempt. Analytics MUST NOT be classified essential.
- **CMP-13 — Symmetric and granular.** Rejection MUST be as easy and as prominent as acceptance, and consent MUST be per purpose (`PRV-18`, `PRV-19`, `PRV-22`).

## Hungarian Documents

Content is owned by `content/legal-pages.md` (AS-011). Presence is enforced here.

- **CMP-14 — Required documents are present.** A project operating in Hungary MUST carry: **ÁSZF** (general terms), **Adatkezelési Tájékoztató** (privacy notice), **Impresszum** (imprint), and **Cookie Tájékoztató** (cookie notice).
- **CMP-15 — Never fabricated.** Legal document content MUST NOT be invented, and details (company registration, tax identifiers, addresses, representatives) MUST NOT be fabricated. Missing information MUST be requested (Article IV; `WF-14`).
- **CMP-16 — Disclaimer is mandatory.** Every generated legal document MUST carry the disclaimer that it requires review by qualified legal professionals before publication.
- **CMP-17 — Published only after review.** These documents MUST NOT be published without legal review.

## Security Documentation

- **CMP-18 — Documentation exists.** Security documentation MUST be maintained: the threat model, data inventory and classification, retention schedule, access-control record, incident plan, and decision log (`compliance.policy.evidence`).
- **CMP-19 — Documentation matches reality.** Documentation MUST describe what the system does. Drift is a finding, and in a privacy notice it is a false representation (`PRV-06`, `ME-09`).
- **CMP-20 — A reporting path is published.** A path to report a suspected vulnerability MUST be published (`VM-03`).

## Audit Preparation

- **CMP-21 — Evidence is a by-product, not a project.** Evidence MUST come from artifacts the framework already produces. Assembling evidence retrospectively produces documents describing an aspiration.
- **CMP-22 — Evidence is current and reproducible.** Evidence MUST be current and MUST be reproducible on demand.
- **CMP-23 — Gaps are recorded, never concealed.** A known gap MUST be recorded with an owner and a plan. Concealing a gap from an auditor or from counsel MUST NOT occur (`IR-18`).
- **CMP-24 — Decisions are traceable.** Security and privacy decisions MUST be recorded with rationale in `memory/decisions.md` (`ME-07`). "Why is it built this way" is the question an audit asks most.

## Verification

The security gate verifies the inventory is current, rights are supported, consent blocks non-essential loading, required documents are present with their disclaimer, documentation matches reality, and gaps are recorded. The gate MUST NOT certify legal compliance — it certifies that the engineering evidence exists.
