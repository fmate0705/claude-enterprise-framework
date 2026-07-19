# Content Operations Checklist — Content Operations Gate

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0

**Purpose:** Execute the content-operations gate. Governance, version history, and the floors are non-negotiable. **Owner:** Technical Writer with the Backend Engineer. Governed by `standards/content-operations/validation.md`.

**Scope:** Applies to any project with an editorial system. Where an area has no applicable surface, record it as not applicable with a reason (`CV-22`).

---

## Content Model

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-01 | Model complete | Every type declares fields, relationships, validation, lifecycle, owner | Missing declaration | Major | Backend Engineer |
| CHK-CO-02 | Fields typed and validated | Types declared; validated at the boundary; unknown keys rejected | Untyped or unvalidated fields | Major | Backend Engineer |
| CHK-CO-03 | Structured over unstructured | Discrete facts in discrete fields; dates as dates; media referenced | Facts buried in rich text | Major | Backend Engineer |
| CHK-CO-04 | No presentation in content | No layout, inline styles, or pasted HTML | Layout encoded in content | Major | Frontend Engineer |
| CHK-CO-05 | Rich text constrained | Explicit allowlist; paste sanitized; portable storage; no second h1 | Unconstrained rich text | Major | Frontend Engineer |
| CHK-CO-06 | Blocks typed | Allowlisted per type; map to design-system components; nesting bounded | Open block scope | Major | Frontend Engineer |
| CHK-CO-07 | Relationships explicit | Typed; integrity enforced; cascade declared; required relationships enforced | Broken reference or name-as-relationship | Critical | Backend Engineer |
| CHK-CO-08 | Model versioned | Expressed as code or exported; changes reviewed | Model changed by console clicks | Major | Backend Engineer |

## Editorial Workflow

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-09 | Workflow deterministic | Only declared transitions; every state reachable; archived terminates | Undeclared transition | Critical | Technical Writer |
| CHK-CO-10 | Review never skipped | No path from draft to published | Draft publishes directly | Critical | Technical Writer |
| CHK-CO-11 | Author is never approver | System-enforced for every role including administrator | Self-approval possible | Critical | Security Reviewer |
| CHK-CO-12 | Approval binds to a revision | Recorded against a version; invalidated by edit; expires | Approval by title or surviving edits | Critical | Technical Writer |
| CHK-CO-13 | Approval revalidated at publish | Verified at publish and at schedule fire | Stale approval publishes | Critical | Backend Engineer |
| CHK-CO-14 | Rejection states a reason | Reason required and reaches the author | Silent or unexplained rejection | Major | Technical Writer |
| CHK-CO-15 | Transitions logged and attributed | Who, what, when, outcome; individual accounts | Unattributed transition | Major | Backend Engineer |
| CHK-CO-16 | Bypass paths recorded | Any publish-without-approval path is a recorded scoped decision | Undocumented bypass | Critical | Product Strategist |

## Drafts and Preview

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-17 | Drafts never public | Not reachable, not indexable, not in the public index | Any draft publicly reachable | Critical | Security Reviewer |
| CHK-CO-18 | Production cannot request drafts | No parameter exposes drafts on the live path | Draft parameter honored in production | Critical | Backend Engineer |
| CHK-CO-19 | Drafts of published leave live alone | Working revision; live unaffected until published | Editing published content changes it live | Critical | Backend Engineer |
| CHK-CO-20 | Autosave and no loss | Autosaves; survives refresh, session expiry, navigation; history not flooded | Work lost or history flooded | Major | Frontend Engineer |
| CHK-CO-21 | Concurrency guarded | Lock, merge, or warn; locks expire and are visible | Silent overwrite | Critical | Backend Engineer |
| CHK-CO-22 | Preview authorized and honest | Authorized per viewer; expires; renders the real layout; not indexable | Preview link is the access control | Critical | Security Reviewer |

## Version History

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-23 | Versioning exists | Every change an attributed, summarized revision; stable ordered identifiers | No history | Critical | Backend Engineer |
| CHK-CO-24 | History append-only | Not editable; not deletable by any role; Git branches protected | Editors can delete history or force-push | Critical | Security Reviewer |
| CHK-CO-25 | Retention enforced | Minimums held; published version always restorable | History trimmed below minimum | Major | Backend Engineer |
| CHK-CO-26 | Rollback works | Fast; editor-available; creates a revision; restores media references | Rollback needs an engineer or loses media | Critical | Backend Engineer |
| CHK-CO-27 | History legible and queryable | Readable diffs; searchable by item, author, date; access authorized | History needs engineering to read | Major | Backend Engineer |

## Publishing

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-28 | Publishing deliberate | Explicit approved attributed act; saving and deploying do not publish | Save or deploy publishes | Critical | Backend Engineer |
| CHK-CO-29 | Preconditions block | Broken links, missing alt, missing metadata, unlicensed media, invalid model all block | Any precondition bypassed | Critical | Technical Writer |
| CHK-CO-30 | Publishing atomic | Complete or not at all; dependencies live | Partial publish visible | Critical | Backend Engineer |
| CHK-CO-31 | Index and cache update | Index updated; cache invalidated; rebuild failure alerts | Stale content after publish, silently | Critical | DevOps Engineer |
| CHK-CO-32 | Unpublish deliberate | URL returns decided 301/404/410; removed from index and navigation; cascades to translations | URL rots or content vanishes silently | Critical | Backend Engineer |
| CHK-CO-33 | Expiry declared | Behavior declared per type; owner warned; time-sensitive types require expiry | Expired content left live or silently deleted | Major | Technical Writer |
| CHK-CO-34 | Schedules correct | Explicit timezone stored UTC; past rejected; approval and preconditions revalidated at fire; edits block the fire | Timezone-less or stale-approval schedule | Critical | Backend Engineer |
| CHK-CO-35 | Missed schedules alert | Failure alerts; never publishes silently late; scheduler monitored | Silent missed schedule | Critical | DevOps Engineer |
| CHK-CO-36 | Scheduled content isolated | Not reachable, guessable, or indexed before firing | Embargo leak | Critical | Security Reviewer |

## Media

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-37 | Alt text present | Meaningful alt or explicit decorative; requested at add-time; missing blocks publish | Missing or filename alt | Critical | Accessibility Specialist |
| CHK-CO-38 | Licence recorded | Licence and source per asset; unknown blocks publish | Unlicensed media published | Critical | Technical Writer |
| CHK-CO-39 | Reuse over re-upload | Library searchable; duplicates detected; replace-in-place updates references | Duplicate uploads accumulate | Major | Technical Writer |
| CHK-CO-40 | Deletion checks references | Blocked or deliberate cascade; orphans detected but never auto-deleted | Deletion breaks published pages | Critical | Backend Engineer |
| CHK-CO-41 | Pipeline automatic | Variants and compression automatic; originals retained; editors not in the pipeline | Editors compress images | Major | DevOps Engineer |
| CHK-CO-42 | Uploads safe | Bounded; type by content; outside webroot; generated filenames; EXIF stripped | Extension trusted or executable path | Critical | Security Reviewer |
| CHK-CO-43 | Non-image media accessible | Video captioned; documents declare format and size; scanned PDFs have alternatives | Uncaptioned video | Critical | Accessibility Specialist |

## Taxonomy and Search

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-44 | Taxonomy coherent | One category per item; bounded depth; flat controlled tags; privileged creation | Free-text tags or multi-category items | Major | Technical Writer |
| CHK-CO-45 | Navigation modeled | Navigation is content; targets resolve; no orphans; changes audited | Hardcoded navigation or broken targets | Major | Frontend Engineer |
| CHK-CO-46 | URLs stable | Slugs stable; changes 301; chains bounded; canonical declared | Slug change without redirect | Critical | SEO Specialist |
| CHK-CO-47 | Taxonomy governed | Named owner; documented; reviewed; unused pruned; internal tags hidden | Unowned or undocumented taxonomy | Major | Technical Writer |
| CHK-CO-48 | Index correct | Server-side; updates on publish and unpublish; rebuildable; failures alert | Stale index or client-side corpus | Major | Backend Engineer |
| CHK-CO-49 | Search respects authorization | Results filtered by viewer permission | Restricted titles disclosed via search | Critical | Security Reviewer |
| CHK-CO-50 | Relevance documented | Rule documented; deterministic with stable tiebreak; boosting visible; empty state designed | Undocumented ranking | Major | Backend Engineer |

## Localization

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-51 | Source discipline | Source language declared; final before translation; one authoritative source | Translating a draft | Major | Technical Writer |
| CHK-CO-52 | Workflow in the system | Six steps in order inside the editorial workflow; reviewer ≠ translator | Spreadsheet localization | Critical | Technical Writer |
| CHK-CO-53 | Machine translation reviewed | Never publishes unreviewed; never a silent fallback; origin recorded | Unreviewed MT published | Critical | Technical Writer |
| CHK-CO-54 | Staleness tracked | Translations linked to source version; source change marks stale; visible to editors | Stale translations published silently | Critical | Backend Engineer |
| CHK-CO-55 | Formats from policy | Locale formats from `localization.policy`; never translated as strings; placeholders survive | Translated date or currency strings | Major | Frontend Engineer |
| CHK-CO-56 | Language and region distinct | Regional variants declared; locale overridable and persistent | Language assumed to imply region | Major | Backend Engineer |
| CHK-CO-57 | Fallback declared | Chain declared; visible to the reader; never empty, mixed, or silently machine-translated | Silent fallback | Critical | Frontend Engineer |
| CHK-CO-58 | Publishing sync declared | Strategy declared; simultaneous requires all locales approved; unpublish cascades | Retracted source live in other locales | Critical | Backend Engineer |

## Permissions

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-59 | Roles express M-SEC's model | Default deny; server-side; object-level; every entry point | A second authorization model | Critical | Security Reviewer |
| CHK-CO-60 | Publish is a distinct right | Edit right does not grant publish | Publish bundled with edit | Critical | Security Reviewer |
| CHK-CO-61 | No role deletes history | Including administrator | History deletable | Critical | Security Reviewer |
| CHK-CO-62 | Accounts individual and governed | Individual accounts; admin MFA; revoked on departure; reviewed periodically; role changes re-authenticated | Shared editor login | Critical | Security Reviewer |
| CHK-CO-63 | External identities scoped | API tokens, integrations, vendors least-privilege and inventoried | Read integration holds publish rights | Major | Security Reviewer |

## Integrations, Migration, Backup

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-64 | CMS isolated | Typed interface; no vendor types in domain; server-side fetching; server-only tokens; boundary validation | Vendor types in domain | Major | Backend Engineer |
| CHK-CO-65 | Webhooks authenticated | Signature over raw body; timestamp window; replay rejected; idempotent | Unauthenticated rebuild endpoint | Critical | Security Reviewer |
| CHK-CO-66 | Integrations fail safe | Outage never renders empty, publishes, or indexes as though it succeeded; timeouts; monitored | Fail-open integration | Critical | Backend Engineer |
| CHK-CO-67 | Content portable | Structured export exists and has been tested; one source per type | Untested or absent export | Critical | Backend Engineer |
| CHK-CO-68 | Migration disciplined | Model first; explicit mapping; dry run; counts reconcile; references resolve; reversible; source retained | Legacy shape imported live | Critical | Backend Engineer |
| CHK-CO-69 | URLs preserved | Preserved or 301 to genuine equivalents; map derived and tested; media URLs redirect; chains bounded | Broken or homepage-bulk redirects | Critical | SEO Specialist |
| CHK-CO-70 | Backup complete | Content, media, history, model, taxonomy, translation links together; restore verified by rendering; retention applies | Content backed up without media | Critical | DevOps Engineer |

## Editor Experience

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-71 | Editor meets WCAG 2.2 AA | Keyboard-operable; labeled; errors announced; rich text and media management accessible | Any AA violation in the editor | Critical | Accessibility Specialist |
| CHK-CO-72 | Editor within budget | Editor performant; large corpora paginated and virtualized; saving immediate | Slow editor | Major | Performance Engineer |
| CHK-CO-73 | Nothing requires an engineer | Publishing, scheduling, rollback, media, taxonomy all editor-operable | Routine action needs engineering | Major | Product Strategist |
| CHK-CO-74 | State and next action visible | Current state, holder, and next action clear; notifications reach the right person | Invisible workflow state | Major | UX Designer |

## Cross-Cutting

| ID | Description | Pass condition | Failure condition | Priority | Owner |
|---|---|---|---|---|---|
| CHK-CO-75 | Verified in-browser | Publishing, preview, and the editor exercised via Chrome DevTools MCP | Never verified in a browser | Critical | QA Engineer |
| CHK-CO-76 | Unhappy path exercised | Failed rebuild, missed schedule, concurrent edit, broken reference, rollback all tested | Only the happy path reviewed | Critical | QA Engineer |
| CHK-CO-77 | Decisions recorded | CMS selection, rendering strategy, taxonomy structure, waivers in `memory/decisions.md` | Undocumented decision | Major | Technical Writer |
| CHK-CO-78 | No content-operations anti-patterns | Zero entries from `standards/content-operations/anti-patterns.md` | Any listed anti-pattern | Critical | Technical Writer |

**Gate pass:** category score ≥ 90 and 0 Critical — in practice, no known content-operations defect of consequence.

**Reporting.** A passed gate reports that this review, at this scope, found no unresolved finding of consequence (`standards/content-operations/validation.md` CV-28).
