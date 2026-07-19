# UX Writing

**Framework:** CEF · **Specification:** AS-011 (Content Intelligence Engine) · **Version:** 0.1.0

**Purpose:** Fix interface microcopy. Every message MUST be concise, actionable, and helpful. This governs the words in the interface; component behavior is in the Component Engine, and the two MUST NOT conflict.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## UX Writing by Surface

| ID · Surface | Rule |
|---|---|
| UXW-01 Buttons | MUST be verb-led and specific ("Save changes", "Create account"); "Submit"/"OK"/"Click here" MUST NOT be used as the sole label. |
| UXW-02 Navigation | MUST use short, descriptive labels; vague labels that hide destinations SHOULD be avoided. |
| UXW-03 Form labels | MUST be clear, visible labels; placeholder-as-label MUST NOT be used. |
| UXW-04 Field help | SHOULD provide concise hint text where a field needs it; help MUST NOT restate the label. |
| UXW-05 Validation messages | MUST be specific and actionable ("Enter a valid email"); generic "Invalid input" MUST NOT be used. |
| UXW-06 Error states | MUST be calm, explain what happened, and offer a next step; blame and jargon MUST NOT be used (`tone.md` TN-04). |
| UXW-07 Success messages | MUST briefly confirm what happened; empty or ambiguous confirmations MUST NOT be used. |
| UXW-08 Loading states | SHOULD reassure with context where waits are long; a bare spinner with no text is acceptable for short waits. |
| UXW-09 Empty states | MUST explain the state and offer the next action ("Add your first project"); a bare "No data" MUST NOT be the only text. |
| UXW-10 Tooltips | MUST be concise and add information not already visible; tooltips MUST NOT hide essential content (`components/hover`). |
| UXW-11 Notifications/toasts | MUST be brief, relevant, and dismissible; noisy or vague notifications MUST NOT be used. |
| UXW-12 Confirmations | Destructive confirmations MUST state the consequence clearly and name the action; ambiguous "Are you sure?" alone MUST NOT be used. |

## UX Writing Rules

- **UXW-13 — Concise.** Microcopy MUST be as short as possible while remaining clear; padding MUST NOT be added.
- **UXW-14 — Actionable.** Messages MUST tell the user what to do next where an action is possible.
- **UXW-15 — Consistent terms.** The same action MUST use the same words everywhere ("Delete", not "Remove"/"Trash" interchangeably).
- **UXW-16 — Accessible.** Microcopy MUST provide accessible names and MUST NOT rely on color or icon alone (`components/accessibility`).
- **UXW-17 — On-voice.** Microcopy MUST match the brand voice with a context-appropriate tone (`brand-voice.md`, `tone.md`).
- **UXW-18 — No dead ends.** A state MUST NOT leave the user without a next step (empty, error, and success all guide forward).

## UX Writing Guarantees

- **UXW-G1** — Concise, actionable, helpful microcopy on every surface.
- **UXW-G2** — Specific validation and error messages; guided empty states.
- **UXW-G3** — Consistent, accessible, on-voice interface language.
