# Legal Pages

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix which legal pages are mandatory and how legal content is written. Required legal pages MUST be present, honest, and jurisdiction-appropriate. Required legal pages are canonical in `content.policy.yaml`.

> **Disclaimer (MANDATORY).** CEF-generated legal documents are drafts for convenience only. They are **not legal advice**. Every legal document MUST be reviewed and approved by a qualified legal professional in the relevant jurisdiction before publication. This disclaimer MUST accompany any generated legal content and MUST NOT be removed.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Mandatory Legal Pages (baseline)

Public sites MUST provide, as applicable to their activity and jurisdiction:

| Page | Required when |
|---|---|
| **Privacy Policy** | Any collection or processing of personal data |
| **Terms of Service** | Any service, account, or transaction |
| **Cookie Policy** | Any cookies/trackers beyond strictly necessary |
| **Accessibility Statement** | Recommended for all; required in some jurisdictions/sectors |
| **Imprint / Impressum** | Required in jurisdictions that mandate provider identification (e.g., EU) |

## Hungarian Projects (jurisdiction-specific)

Hungarian projects MUST support the following, in Hungarian, as applicable:

| Page | Purpose |
|---|---|
| **ÁSZF** (Általános Szerződési Feltételek) | General terms and conditions for the service/shop |
| **Adatkezelési Tájékoztató** | Privacy / data-processing notice (GDPR + Hungarian law) |
| **Impresszum** | Legally required provider/company identification |
| **Cookie Tájékoztató** | Cookie/tracking notice |

These MUST be produced in correct Hungarian and MUST carry the mandatory legal-review disclaimer above. Terminology and legal specifics MUST NOT be invented; where a required detail (company registration number, tax ID, hosting provider) is unknown, it MUST be requested, not fabricated.

## Legal Content Rules

- **LGL-01 — Presence.** Every legal page required for the project MUST be present and reachable (typically from the footer) (`discoverability` navigation).
- **LGL-02 — Mandatory disclaimer.** Generated legal content MUST include the legal-review disclaimer; it MUST NOT be presented as final legal advice.
- **LGL-03 — Accuracy.** Legal content MUST reflect the actual business, data practices, and jurisdiction; boilerplate that does not match reality MUST NOT be published.
- **LGL-04 — No fabricated details.** Company identifiers, addresses, DPO contacts, and processors MUST be real; missing details MUST be requested, never invented (Constitution Article XII).
- **LGL-05 — Plain-language summary.** Where helpful, a plain-language summary SHOULD precede the full legal text so users understand it (`CNP-34`); the summary MUST NOT contradict the full text.
- **LGL-06 — Neutral tone.** Legal copy MUST use a plain, precise, neutral tone; persuasion and hype MUST NOT appear (`tone.md` TN-05).
- **LGL-07 — Consent and cookies.** Cookie/consent copy MUST be honest and MUST reflect the actual tracking; pre-ticked consent or dark patterns MUST NOT be used (privacy default per platform).
- **LGL-08 — Dates and versions.** Legal pages MUST show an effective/last-updated date and MUST be versioned when changed.
- **LGL-09 — Jurisdiction fit.** The required set MUST fit the jurisdiction(s) of operation; a Hungarian shop MUST include ÁSZF, Adatkezelési Tájékoztató, and Impresszum.
- **LGL-10 — Accessibility.** Legal pages MUST be accessible and readable (`accessibility-signals`); legal text MUST NOT be hidden or unreadable.
- **LGL-11 — Reviewed before publish.** Legal content MUST NOT be marked done until the mandatory review disclaimer is present and the client is advised to obtain qualified review.

## Legal Page Guarantees

- **LGL-G1** — All required legal pages present, honest, and jurisdiction-appropriate.
- **LGL-G2** — Hungarian projects support ÁSZF, Adatkezelési Tájékoztató, Impresszum, and Cookie Tájékoztató.
- **LGL-G3** — Mandatory legal-review disclaimer on every generated legal document; no fabricated details.
