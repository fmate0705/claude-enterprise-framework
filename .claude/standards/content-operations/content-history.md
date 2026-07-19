# Content History

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define history as an operational instrument: how it is read, searched, and used. `versioning.md` defines how history is *made*; this file defines how it is *used*. History nobody can read provides none of the accountability it exists for.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`versioning`).

---

## Readability

- **CH-01 — History is legible to editors.** Editors MUST be able to read history without engineering help. History reachable only through a database query provides accountability to nobody who needs it.
- **CH-02 — The four questions.** History MUST answer: what changed, when, who, and why (`COP-25`).
- **CH-03 — Diffs are human-readable.** A diff MUST show meaningful change, not a serialized blob. A rich-text diff rendering as one changed line answers nothing (`VR-13`).
- **CH-04 — Field-level where possible.** History SHOULD show which fields changed. "The article changed" is less useful than "the price field changed."
- **CH-05 — Media changes are visible.** A replaced image MUST appear in history (`MM-22`).

## Search

- **CH-06 — History is queryable.** History MUST be searchable by item, author, and date range. The question is always "when did this change and who changed it," and it is asked under pressure.
- **CH-07 — Cross-item queries are supported.** "What did this author publish last month" and "what changed on launch day" MUST be answerable.
- **CH-08 — Bounded cost.** History queries MUST be bounded and MUST NOT contend with the delivery path (`REP-19`, `REP-20`).

## Use

- **CH-09 — History answers "it used to say something else."** This is its most common real use: a customer, a regulator, or a colleague asserts the site said something different. History settles it or the claim stands (`COP-25`).
- **CH-10 — History supports incident response.** When wrong content publishes, history identifies what, when, who, and what to restore (`incident-response.md`).
- **CH-11 — History is evidence.** For content with legal or pricing consequence, history is the record (`VR-31`, `compliance.policy.evidence`).
- **CH-12 — History is not a metric.** Revision counts MUST NOT be used to evaluate authors. Doing so teaches people to make fewer, larger, less reviewable changes and destroys the record's value.

## Retention

- **CH-13 — Retention is enforced and known.** (`VR-17`.) Editors MUST know how far back history goes.
- **CH-14 — Trimming is deliberate and logged.** Where history is trimmed to a retention limit, the trim MUST be a defined, logged process — never an unannounced cleanup.
- **CH-15 — The published version survives trimming.** (`VR-18`.)
- **CH-16 — Retention conflicts escalate.** (`VR-32`, `LEG-19`.)

## Integrity

- **CH-17 — Append-only, and demonstrably so.** (`VR-14`, `AL-08`.) Where history serves as an audit trail, its integrity MUST be demonstrable, not asserted (`AL-09`).
- **CH-18 — Access to history is authorized.** History exposes content that may never have published, including drafts and rejected revisions. Access MUST be authorized per object (`AZ-12`).
- **CH-19 — History access is audited for sensitive content.** (`AL-03`.)
- **CH-20 — Personal data in history follows the retention schedule.** History is a datastore and is not exempt from privacy rules — it is a common place they are forgotten (`PRV-11`, `REP-26`).
- **CH-21 — Erasure reaches history.** A valid erasure request MUST account for history, and where a retention obligation conflicts, the conflict escalates rather than being silently resolved either way (`PRV-13`, `LEG-19`).

## Portability

- **CH-22 — History exports where feasible.** A migration SHOULD carry history. Where it cannot, the loss MUST be recorded as a decision at CMS selection, not discovered at migration (`CMS-13`, `MG-14`).
- **CH-23 — Pre-migration history is retained.** Where history cannot migrate, the source MUST be retained until its retention period expires (`MG-13`).

## Verification

The content-operations gate verifies history is legible to editors without engineering, answers what/when/who/why, renders meaningful diffs, is queryable by item, author, and date, is append-only with authorized access, follows the retention schedule for personal data, and that migration's effect on history is a recorded decision.
