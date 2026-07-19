# Content Operations Philosophy

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** State the beliefs this engine is built on. Thirty-five principles, each with its reasoning. When a rule is ambiguous in a novel situation, the principle decides.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

---

## Content as an Asset

**COP-01 — Content is a long-term asset.** A site is rebuilt every few years; its content persists across every rebuild. Content modeled as an asset survives the migration. Content trapped in a rendering technology dies with it.

**COP-02 — Content outlives the CMS.** Every CMS decision is temporary. The question is never "will we migrate" but "what will migration cost." Portability is the answer, and it is designed in or it is absent.

**COP-03 — Content is not markup.** The moment layout is baked into content, the content is coupled to today's design and cannot be reused, restyled, or re-rendered. Presentation belongs to components; content belongs to the model.

**COP-04 — Content has an owner.** Unowned content rots: nobody updates it, nobody retires it, nobody notices it is wrong. Every content type MUST have a named owner.

**COP-05 — Stale content is a defect.** Content that was true and is no longer true is worse than absent content, because it is trusted. Expiry and review are maintenance, not bureaucracy.

## Structure

**COP-06 — Structured content scales.** Discrete typed fields can be queried, validated, localized, reused, and re-rendered. A rich-text blob can only be displayed. The difference compounds with every new surface.

**COP-07 — Structure is decided before content exists.** Retrofitting structure onto a thousand rich-text pages is a migration project. Deciding it first costs an afternoon.

**COP-08 — A field per meaning.** Every distinct meaning gets a field. Encoding three facts in one text field means none of them can be used independently, and all of them must be parsed to be trusted.

**COP-09 — Rich text is for prose, not layout.** Rich text carries paragraphs and emphasis. The moment it carries columns, cards, or pasted HTML, the model has failed and the content is unmaintainable.

**COP-10 — Relationships are explicit.** A reference to an author is a relationship, not a name typed into a field. Explicit relationships stay correct when the author's name changes; typed strings do not.

**COP-11 — Validation belongs to the model.** A model that permits invalid content produces invalid content. Validation at the boundary is what makes the model true rather than aspirational.

**COP-12 — The model is versioned.** A content model change is a schema change. Treating it casually breaks published content silently.

## Editorial Consistency

**COP-13 — Editorial consistency builds trust.** A reader encountering inconsistent structure, voice, or quality learns that the publisher does not check. Consistency is the visible evidence of governance.

**COP-14 — Nothing publishes unreviewed.** Review exists because authors cannot see their own gaps. The cost of review is minutes; the cost of publishing an error is the credibility of everything adjacent to it.

**COP-15 — The author is not the approver.** Self-approval is not review; it is a checkbox. Separation is the entire mechanism.

**COP-16 — Approval binds to a version, not a title.** Approving "the pricing page" and then editing it means nothing was approved. Approval attaches to the revision or it is theatre.

**COP-17 — Rejection explains itself.** A rejection without a reason produces a resubmission with the same defect. The reason is the whole value of the rejection.

**COP-18 — Editorial workflow is deterministic.** The same content in the same state moves the same way, every time. A workflow that depends on who is asking is not a workflow.

## Publishing

**COP-19 — Publishing should be deliberate.** Publication is an act with an author, an approval, and a timestamp — never a side effect of saving, syncing, or deploying. Accidental publication is a governance failure, not an accident.

**COP-20 — A preview that lies is worse than no preview.** If preview does not render what publication will render, the review approved something that does not exist.

**COP-21 — Rollback is what makes publishing safe.** Deliberate publishing is still fallible. A one-step rollback available to the editor — not to an engineer — is what converts a mistake into a minute.

**COP-22 — Publishing is atomic.** Half-published content is broken content. The transition is complete or it has not occurred.

**COP-23 — Unpublishing is not deletion.** Content removed from view still exists, still has history, and still needs its URL to answer deliberately. Silent disappearance breaks every link ever made to it.

**COP-24 — A missed schedule must shout.** A publication that silently did not happen is invisible until someone asks why the campaign did not launch.

## History

**COP-25 — Version history is valuable.** History answers what changed, when, who, and why. It is the only defense against "the site used to say something different" — and the only way to recover from a change nobody remembers making.

**COP-26 — History is append-only.** History editors can rewrite is not history. The ability to delete a revision is the ability to erase accountability.

**COP-27 — Rollback creates history; it does not erase it.** Reverting is an event worth recording. Rewriting the past to hide the mistake destroys the record that would prevent the next one.

**COP-28 — A change summary is part of the change.** A diff shows what changed; only the author can say why. The why is what the next reader needs.

## Media

**COP-29 — Media is content, not decoration.** Media needs a model, metadata, licensing, and lifecycle exactly as text does. Treated as an upload, it becomes an unattributed, unlicensed, unfindable pile.

**COP-30 — Alt text is authored, never deferred.** Alt text written at publish time by someone who did not choose the image is a caption, not a description. It is authored with the image or it is wrong.

**COP-31 — Unlicensed media is a liability.** An image whose licence nobody recorded is a legal risk that compounds silently and is discovered by a letter.

**COP-32 — Reuse over re-upload.** The same asset uploaded five times is five things to update, five licences to track, and five caches to bust.

## Localization

**COP-33 — Localization begins with good source content.** Ambiguity, idiom, and baked-in layout multiply across every locale. A poor source produces poor translations in every language, and the cost is paid once per language.

**COP-34 — A translation is only as true as its source.** When the source changes, the translation is stale. A system that does not track this publishes confident, outdated, unnoticed lies.

**COP-35 — Fallback is a decision, never an accident.** A missing translation must fall back deliberately, visibly, and to a declared language — never render empty, never mix languages silently, and never machine-translate without saying so.

---

## Precedence

When principles conflict, resolve in this order:

1. **Nothing publishes unreviewed** (COP-14, COP-15) — governance outranks speed.
2. **History is append-only** (COP-26) — accountability outranks convenience.
3. **Structured content scales** (COP-06) — long-term maintainability outranks short-term authoring ease.
4. **Fewest practical steps for editors** (`editor-experience.md`) — optimized only after the above hold.

Editorial convenience MUST NOT override 1–3. Where a genuine conflict exists, it MUST be recorded in `memory/decisions.md`.
