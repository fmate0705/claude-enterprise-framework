# Legal Considerations

**Framework:** CEF · **Specification:** AS-016 (Security & Compliance Engine) · **Version:** 2.0.0 · **Module:** M-SEC

**Purpose:** Fix the boundary between engineering and legal judgment. This file exists to state precisely where the framework's authority ends — and to ensure that boundary is honored rather than crossed by confident-sounding output.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `compliance.policy.yaml` (`legal_review`), `privacy.policy.yaml` (`legal_review`).

---

## The Boundary

- **LEG-01 — The framework is not counsel.** CEF is engineering guidance. It MUST NOT be represented as legal advice, and it MUST NOT be relied upon as a substitute for qualified legal review.
- **LEG-02 — No legal conclusions.** CEF MUST NOT conclude that a regime applies, that an obligation is satisfied, that a document is sufficient, or that a project is compliant (`CMP-01`).
- **LEG-03 — No deadlines.** CEF MUST NOT state a notification deadline or any other legally operative time limit. Where a duty may exist, the framework escalates to counsel; it does not compute the date (`PRV-33`, `IR-15`).
- **LEG-04 — Obligations vary.** Legal obligations vary by jurisdiction, sector, entity type, and processing activity. Guidance that is correct in one context is wrong in another, and the difference is not an engineering judgment.
- **LEG-05 — Where authority ends.** The framework's authority ends at engineering evidence. What that evidence means legally is counsel's determination (`compliance.policy.review`).

## The Mandatory Disclaimer

- **LEG-06 — Every legal document carries it.** Every generated legal document MUST carry a clear, prominent disclaimer stating that it requires review by qualified legal professionals before publication. This applies to ÁSZF, Adatkezelési Tájékoztató, Impresszum, Cookie Tájékoztató, privacy notices, terms, and every equivalent.
- **LEG-07 — The disclaimer is not removable.** The disclaimer MUST NOT be omitted, minimized, or removed by a later edit. Its removal MUST NOT be treated as a formatting decision.
- **LEG-08 — It is not a substitute.** The disclaimer MUST NOT be treated as licensing the framework to generate legal content freely. It states a limitation; it does not lift one.

## Generating Legal Content

Content is owned by `content/legal-pages.md` (AS-011). These constraints bind that generation.

- **LEG-09 — Never fabricate details.** Company registration numbers, tax identifiers, addresses, representatives, hosting providers, processors, and retention periods MUST NOT be invented. Each is a factual claim, and a fabricated one is a false statement in a legal document (Article IV).
- **LEG-10 — Request what is missing.** Missing legal information MUST be requested from the user. It MUST NOT be filled with a placeholder, a plausible guess, or a bracketed token that survives to publication (`WF-14`, `AP-109`).
- **LEG-11 — A template is a starting point.** Generated documents MUST be treated as drafts for counsel. They MUST NOT be published as authored.
- **LEG-12 — The document must match the system.** A privacy notice MUST describe actual processing. Generating a notice that describes processing the system does not perform — or omits processing it does — is a defect, and a representation that is false (`PRV-06`, `CMP-19`).
- **LEG-13 — Do not overstate.** Generated content MUST NOT claim certifications, standards conformance, or protections the project does not have (`CMP-02`).

## When to Escalate

Engineering MUST stop and escalate to qualified legal professionals when:

- **LEG-14** — Any legal document is to be published.
- **LEG-15** — A suspected personal-data breach occurs; notification duties are legal determinations (`IR-16`).
- **LEG-16** — Personal data is to be transferred across borders or to a new processor.
- **LEG-17** — Special-category data is to be collected (`PRV-09`).
- **LEG-18** — The applicable jurisdiction or regime is unclear or changes.
- **LEG-19** — Retention duties conflict — for example, an erasure request against a record subject to a retention obligation (`AL-18`, `PRV-15`). Engineering MUST NOT resolve the conflict by preference.
- **LEG-20** — A compliance claim or certification is to be published.
- **LEG-21** — Terms, liability, or licensing are to be represented (`DEP-21`).

## Recording

- **LEG-22 — Legal review is recorded.** Where legal review has occurred, the fact, scope, and date MUST be recorded in `memory/decisions.md`. Where it has not, the document's status MUST be recorded as **awaiting legal review**.
- **LEG-23 — Status is honest.** A document awaiting review MUST NOT be described as approved, final, or compliant (Article XI).

## Verification

The security gate verifies the disclaimer is present on every legal document, no fabricated detail exists, documents match actual system behavior, and review status is recorded honestly. The gate MUST NOT certify legal sufficiency — no gate in this framework can.
