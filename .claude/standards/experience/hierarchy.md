# Visual Hierarchy

**Framework:** CEF · **Specification:** AS-008 (Experience Engine) · **Version:** 0.1.0

**Purpose:** Fix deterministic rules for directing attention. Every view MUST have exactly one primary focal point and a clear descending order of importance.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Hierarchy Rules

- **HR-01 — One focal point.** Every view MUST have Exactly one primary focal point (usually the headline or primary action). Two competing focal points MUST NOT coexist.
- **HR-02 — Headline structure.** A section MUST lead with one clear headline that states its point; a page MUST have Exactly one `h1` (`typography.md`).
- **HR-03 — Subheadline relationship.** A subheadline MUST support, not repeat, the headline and MUST be visibly subordinate in size and weight.
- **HR-04 — Body hierarchy.** Body copy MUST be visually subordinate to headings and grouped into scannable units; walls of text MUST NOT be used.
- **HR-05 — CTA hierarchy.** Exactly one primary CTA MUST dominate; secondary actions MUST be visibly lighter (`cta.md`).
- **HR-06 — Visual weight.** Importance MUST be expressed through size, weight, color, and space — in that priority. The most important element MUST carry the most weight.
- **HR-07 — Contrast for rank.** The highest contrast MUST fall on the most important element; uniform contrast that flattens hierarchy MUST NOT be used.
- **HR-08 — Spacing between groups.** Related content MUST be closer together; unrelated groups MUST be separated by larger space (proximity, `spacing.md`).
- **HR-09 — Scanning patterns.** Primary content MUST be placed on the natural reading path — F-pattern for text-dense views, Z-pattern for simple marketing views.
- **HR-10 — Eye flow.** The layout MUST lead the eye from the primary message to the primary action without competing detours.
- **HR-11 — Section prioritization.** Sections MUST be ordered by importance to the user's goal; the most persuasive content MUST appear before secondary detail.
- **HR-12 — Reading rhythm.** Content MUST alternate density and rest so the eye is guided, not fatigued (`visual-rhythm.md`).

## Hierarchy Guarantees

- **HR-G1** — One focal point and one primary action per view.
- **HR-G2** — Importance expressed by size, weight, color, and space, consistently.
- **HR-G3** — Content placed on the natural scanning path.
