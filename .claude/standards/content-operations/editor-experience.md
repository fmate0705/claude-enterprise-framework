# Editor Experience

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the experience of the people who actually produce content. Governance nobody can follow is governance nobody follows: editors route around a hostile system, and the workflow becomes fiction.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`skills`), `editorial.policy.yaml`.

**Instruments:** UI/UX Pro Max (TE-05) for flow; Frontend Design Skill (TE-02) for layout; Taste Skill (TE-01) for hierarchy; Chrome DevTools MCP (TE-08) for verification.

---

## The Principle

- **EX-01 — Editors are users.** The editing interface is a product with users, and it MUST be held to the framework's UX and accessibility standards exactly as the public surface is. An internal tool is not exempt (`PR-06`).
- **EX-02 — Editor fit determines whether content exists.** A system editors avoid produces no content, whatever its modeling elegance (`CMS-06`).
- **EX-03 — Governance MUST be followable.** Where the workflow is more painful than working around it, editors work around it — in a spreadsheet, in a direct database edit, in an unreviewed emergency publish. The workaround is the system's fault (`philosophy.md` precedence).

## Authoring

- **EX-04 — The model is legible.** An editor MUST be able to see what a field is for. A form of unexplained fields produces content that satisfies validation and means nothing.
- **EX-05 — Required is visible before submission.** (`DR-23`.) An editor MUST see what remains, not discover it on rejection.
- **EX-06 — Validation guides, never obstructs.** Validation MUST NOT block typing. It blocks submission (`DR-22`).
- **EX-07 — Errors are specific and actionable.** (`D-075`.) "Invalid" is not a message.
- **EX-08 — Autosave, always.** (`DR-06`.) Losing work is the fastest way to lose an author.
- **EX-09 — Nothing is lost.** Refresh, session expiry, and navigation MUST NOT discard work (`DR-09`).
- **EX-10 — Structure is not punishment.** Where structure costs authoring effort, the interface MUST reduce it — sensible defaults, good ordering, inline help. Structure is for the system's benefit; the editor MUST be given something back (`SC-14`).

## Media

- **EX-11 — Alt text is asked for at add-time.** (`MM-04`.) The interface MUST request it when the image is chosen, by the person who chose it. Asking at publish produces a caption from someone who does not know why the image is there.
- **EX-12 — Licence is asked for at add-time.** (`MM-08`.)
- **EX-13 — Reuse is easier than re-upload.** (`MM-16`.) Where uploading is faster than finding, editors upload, and the library becomes a pile.
- **EX-14 — Optimization is invisible.** (`MM-26`.) Editors MUST NOT be asked to compress images.

## Preview and Publish

- **EX-15 — Preview is honest.** (`COP-20`.)
- **EX-16 — Preview is one step.** A preview requiring a build, a link request, or an engineer will not be used, and content will be reviewed by imagining it.
- **EX-17 — Publishing is unambiguous.** The editor MUST know exactly what publishing will do and when. A button whose effect is unclear produces accidental publication (`COP-19`).
- **EX-18 — Rollback is discoverable.** (`PB-20`.) An editor in a panic MUST be able to find it without documentation.
- **EX-19 — State is visible.** The editor MUST see what state an item is in, what happens next, and who holds it (`SP-09`, `DR-13`).

## Workflow

- **EX-20 — The next action is obvious.** At every state, whose turn it is and what they must do MUST be clear (`editorial-workflow.md`).
- **EX-21 — Notifications reach the right person.** (`publishing.policy.notifications`.) A review request nobody receives is a queue that silently stops.
- **EX-22 — Review is in-context.** Reviewers MUST see the content as readers will (`EX-15`), with findings attached where they apply.
- **EX-23 — Rejection reasons reach the author.** (`ER-05`.)
- **EX-24 — Nothing requires an engineer.** Publishing, scheduling, rollback, media, and taxonomy MUST be editor-operable. Every dependency on engineering is a bottleneck that governance dies in (`PB-20`, `VR-20`).

## Accessibility

- **EX-25 — The editor meets WCAG 2.2 AA.** Keyboard-operable, labeled, announced errors, no colour-only meaning (`E-115`, `E-117`, `E-118`, `D-038`). Editors have disabilities. An inaccessible editing tool excludes people from employment, which is a more serious exclusion than an inaccessible page.
- **EX-26 — Rich-text editing is keyboard-operable.** (`E-115`.)
- **EX-27 — Media management is accessible.** Upload, selection, and alt-text entry MUST be reachable and operable by keyboard.

## Performance

- **EX-28 — The editor is within budget.** A slow editor is a system editors avoid (`EX-02`).
- **EX-29 — Large corpora stay usable.** Lists MUST paginate and virtualize (`E-091`, `API-18`).
- **EX-30 — Saving is immediate.** A save that blocks for seconds trains editors to save rarely, which loses work.

## Verification

The editing interface MUST be verified in a real browser with the **Chrome DevTools MCP** (TE-08). The gate verifies the editor meets the accessibility floor and the performance budget, alt text and licence are requested at add-time, autosave and no-loss hold, preview is honest and one step, rollback is discoverable, state and next actions are visible, and no routine editorial action requires an engineer.
