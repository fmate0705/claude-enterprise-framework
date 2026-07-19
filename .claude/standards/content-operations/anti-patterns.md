# Content Operations Anti-Patterns

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define the editorial blacklist. These 120 patterns are Never produced. Each states the **problem**, the **operational impact**, and the **recommended approach**. Detection of any entry is a hard fail at the content-operations gate (`content-operations.policy.review.anti_patterns`).

**Note on ownership:** The AS-018 OUTPUT list names no file for the mandated ≥100 anti-patterns. This file is their canonical home, consistent with AS-010 through AS-017. `rules/anti-patterns.md` (AS-002) remains the framework-wide blacklist; this file is the content-operations catalog and does not duplicate it.

**Enforcement:** When a listed anti-pattern is detected, Never pass the gate. Always replace it with the recommended approach before completion.

---

## Content Model

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-001 Unstructured rich text | One blob stands in for the model | Content can only be displayed — never reused, localized, or queried | Structured fields (`SC-01`) |
| EAP-002 Layout in content | Columns and cards encoded in content | Content coupled to today's design; unusable at redesign | Presentation in components (`SC-05`) |
| EAP-003 Pasted HTML | Word or web markup pasted into rich text | Breaks the design system silently; injection surface | Sanitize paste to an allowlist (`RC-06`) |
| EAP-004 Inline styles in content | Colours and fonts set by editors | Defeats the design system, dark mode, and rebranding | No inline styles (`RC-07`) |
| EAP-005 Facts buried in prose | A price or date lives inside a paragraph | Unusable anywhere but that paragraph; cannot be localized | A field per meaning (`SC-02`) |
| EAP-006 Dates as strings | "March 3rd" stored as text | Cannot sort, compare, or localize | Dates as dates (`SC-10`) |
| EAP-007 Names instead of relationships | An author's name typed into a field | Breaks when the name changes; no inverse lookup | Explicit relationships (`COP-10`) |
| EAP-008 Layout-named fields | `left_column`, `hero_box_2` | Encodes a layout that will change; renaming is a migration | Name for meaning (`CM-19`) |
| EAP-009 Model shaped by the vendor | Model designed around a CMS's field types | Migrates badly; the vendor becomes load-bearing | Model first, express second (`CMS-05`) |
| EAP-010 Untyped fields | No declared type | Unvalidatable; garbage enters silently | Typed and validated (`CM-02`) |
| EAP-011 Everything required | Required fields nobody can fill | Drafts never submitted; workflow abandoned | Minimal, justified (`CM-05`) |
| EAP-012 Unversioned model | Schema changed by clicks in a console | Cannot review, reproduce, or restore | Model as code (`HC-23`) |
| EAP-013 Open block scope | Any block anywhere | A page builder; every structure problem returns | Allowlist per type (`RC-15`) |
| EAP-014 Blocks named for looks | `two_column_grey_box` | Content encodes design | Name for what it is (`RC-17`) |
| EAP-015 Second h1 in body | Body field emits its own `h1` | Breaks the document outline | h1 from front matter (`MD-12`) |
| EAP-016 Retrofitted structure | Structure decided after a thousand pages | A migration project instead of an afternoon | Structure first (`COP-07`) |

## Editorial Workflow

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-017 Unreviewed publishing | Content publishes with no review | Errors reach readers; credibility of everything adjacent falls | Review mandatory (`ER-01`) |
| EAP-018 Self-approval | The author approves their own work | Review is a checkbox; the mechanism is gone | Approver ≠ author (`AP-02`) |
| EAP-019 Approval by title | Approval attaches to "the pricing page" | The page changes; nothing was approved | Bind to a revision (`AP-04`) |
| EAP-020 Approval survives edits | Edited after approval, still approved | Unreviewed content publishes with an approval record | Edit invalidates (`AP-05`) |
| EAP-021 Approval never expires | Content approved months ago | Approved against a context that no longer exists | Approval expires (`AP-06`) |
| EAP-022 Verbal approval | "The manager said it was fine" | No audit trail; nobody accountable | In the system or it did not happen (`AP-08`) |
| EAP-023 Admin self-approval | Administrators exempt from separation | The role that can do everything checks nothing | No exemption (`AP-13`) |
| EAP-024 Rejection without a reason | Returned with no explanation | Resubmitted with the same defect | State the reason (`ER-05`) |
| EAP-025 Undeclared transition | Content moves outside the state machine | Nobody can reason about state | Declared only (`EW-02`) |
| EAP-026 Skipped review | Draft to published directly | The gate is optional, so it is skipped | Never skip (`EW-03`) |
| EAP-027 Unbounded review | No review SLA | Content dies in the queue; authors route around | Define an SLA (`ER-16`) |
| EAP-028 Emergency as default | "Urgent" bypass used routinely | Governance exists on paper only | Record every bypass (`AP-11`) |
| EAP-029 Reviewers doing machine work | Humans checking alt text and links | Attention spent on the mechanical misses the false claim | Automate mechanical (`ER-18`) |
| EAP-030 Publish right bundled with edit | Anyone who writes can publish | The approval gate removed by permission structure | Distinct right (`PM-05`) |
| EAP-031 Vague findings | "Doesn't feel right" | Author cannot act; cycles repeat | Specific and actionable (`ER-12`) |
| EAP-032 Severity unstated | Suggestions block publication | Reviewers become bottlenecks | State severity (`ER-14`) |

## Drafts and Preview

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-033 Public drafts | Draft reachable by URL | Unfinished, unapproved content published by accident | Never public (`DR-01`) |
| EAP-034 Indexed drafts | Drafts crawled | Outlives deletion in caches and results | Never indexable (`DR-02`) |
| EAP-035 Drafts in the public index | Search returns drafts | Content leak via the search box | Never indexed (`DR-03`) |
| EAP-036 Draft parameter in production | `?preview=true` on the live path | A query string away from publishing everything | Path cannot request drafts (`DR-04`) |
| EAP-037 Editing published content live | Edits change the live page as typed | Half-written content public | Working revision (`DR-05`) |
| EAP-038 No autosave | Work lost on a closed tab | Authors stop trusting the system | Autosave (`DR-06`) |
| EAP-039 Autosave floods history | Every keystroke a revision | History unreadable; the record is noise | Meaningful revisions (`DR-07`) |
| EAP-040 Silent overwrite | Last write wins, unannounced | Work destroyed invisibly; nobody knows why | Guard concurrency (`DR-11`) |
| EAP-041 Permanent locks | Lock never expires | An editor's closed laptop blocks the item | Locks expire (`DR-12`) |
| EAP-042 Unauthorized preview | Preview link is the access control | Shared link exposes every draft | Authorize preview (`DR-14`) |
| EAP-043 Lying preview | Preview does not match publication | Review approved something that does not exist | Real layout (`COP-20`) |
| EAP-044 Preview needs an engineer | Preview requires a build or a request | Content reviewed by imagination | One step (`EX-16`) |
| EAP-045 Auto-deleted drafts | Abandoned drafts removed silently | A parked campaign destroyed | Surface, never delete (`DR-20`) |

## Publishing

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-046 Save publishes | Saving pushes content live | Accidental publication routine | Publishing is an act (`PB-01`) |
| EAP-047 Deploy publishes | A code deploy publishes unapproved content | Content ships on the engineering calendar, unreviewed | Separate concerns (`PB-01`) |
| EAP-048 Partial publish | Page live before its images or dependencies | Readers see broken content | Atomic (`PB-13`) |
| EAP-049 Stale cache after publish | Publish does not invalidate | Editor believes they published; readers see yesterday | Invalidate on publish (`PB-16`) |
| EAP-050 Silent rebuild failure | Build fails; stale content stays live | "The CMS is broken" — reported by readers | Alert on failure (`PB-17`) |
| EAP-051 Unindexed publish | Live but not in the index | Content nobody finds | Index with publish (`PB-15`) |
| EAP-052 Rollback needs an engineer | Recovery requires a deploy | A mistake becomes an incident | Editor-available (`PB-20`) |
| EAP-053 Rollback rewrites history | Reverting erases the record | The evidence that would prevent recurrence is gone | Rollback creates (`PB-21`) |
| EAP-054 Rollback loses media | Text restores; images do not | A restored broken page | Restore references (`PB-22`) |
| EAP-055 Publishing without preconditions | Broken links and missing alt publish | Defects reach readers that a check would have caught | Preconditions block (`PB-07`) |
| EAP-056 Timezone-less schedule | Schedule with no zone | Fires at the wrong hour; wrong twice a year | Explicit timezone (`SP-01`) |
| EAP-057 Silent missed schedule | Schedule does not fire; nothing alerts | The campaign did not launch and nobody knows | Alert (`SP-11`) |
| EAP-058 Silent late publish | Missed schedule publishes hours later | Embargo broken; nobody decided | Never publish late silently (`SP-12`) |
| EAP-059 Unmonitored scheduler | The scheduler dies quietly | No errors — just nothing, which looks like nothing scheduled | Monitor it (`SP-13`) |
| EAP-060 Stale approval at fire | Approval not revalidated when firing | Publishes content approved then edited | Revalidate (`SP-05`) |
| EAP-061 Edit-after-schedule fires | Edited after scheduling, still publishes | Unreviewed content published on a timer | Block the fire (`SP-06`) |
| EAP-062 Scheduled content leaks | Reachable before its time | Embargo broken by a guessable URL | Not public before firing (`SP-15`) |
| EAP-063 Non-idempotent fire | Retry publishes twice | Duplicate revisions and notifications | Idempotent (`SP-14`) |

## Versioning and History

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-064 No version history | Changes overwrite | Nothing recoverable, nothing explicable | History required (`VR-01`) |
| EAP-065 Editors delete history | Revisions removable | Accountability erasable by the accountable | Nobody deletes (`VR-15`) |
| EAP-066 Force-push on content | History rewritten in Git | Exactly the deletion VR-15 forbids | Protected branches (`GC-02`) |
| EAP-067 No attribution | Revisions record no author | "Who changed this" unanswerable | Record the author (`VR-07`) |
| EAP-068 Shared accounts | One "editor" login | Attribution destroyed; history worthless | Individual accounts (`PM-17`) |
| EAP-069 Unattributed mass change | Migration writes with no attribution | Indistinguishable from a compromise | Attribute the process (`VR-10`) |
| EAP-070 "Update" as a summary | Meaningless change messages | The why is lost; the diff cannot supply it | Meaningful summaries (`VR-12`) |
| EAP-071 No diff | Editors cannot see what changed | History requires engineering to read | Human-readable diffs (`CH-03`) |
| EAP-072 History trimmed to save space | Retention cut for storage | The record gone exactly when it is needed | Enforce retention (`VR-17`) |
| EAP-073 Published version unrecoverable | Trimming loses what was live | Cannot restore what readers saw | Always restorable (`VR-18`) |
| EAP-074 History unqueryable | Cannot search by author or date | Unusable under incident pressure | Queryable (`CH-06`) |
| EAP-075 Revisions as a metric | Authors judged by revision counts | Fewer, larger, less reviewable changes | Never a metric (`CH-12`) |
| EAP-076 Unauthorized history access | Anyone reads every revision | Drafts and rejected content disclosed | Authorize per object (`CH-18`) |
| EAP-077 Personal data forgotten in history | Retention ignores history | An erasure request silently fails | Retention applies (`CH-20`) |

## Media

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-078 Missing alt text | Images without alt | Accessibility floor breached; excluded readers | Required (`MM-05`) |
| EAP-079 Alt deferred to publish | Alt written by whoever publishes | A caption from someone who did not choose the image | Authored at add-time (`MM-04`) |
| EAP-080 Filename as alt | `IMG_4021.jpg` as alt text | Conveys nothing; worse than empty | Describe purpose (`MM-07`) |
| EAP-081 Unlicensed media | Licence never recorded | Liability compounding silently, discovered by letter | Record licence (`MM-08`) |
| EAP-082 Orphaned media | Unreferenced assets accumulate | Storage cost and hidden licensing liability | Detect orphans (`MM-19`) |
| EAP-083 Auto-deleted orphans | Unreferenced media removed automatically | Deletes assets a draft or schedule needs | Never auto-delete (`MM-20`) |
| EAP-084 Deletion breaks pages | Asset deleted without checking references | Published pages break silently | Check references (`MM-18`) |
| EAP-085 Re-upload over reuse | Same asset uploaded repeatedly | Five things to update; four will not be | Reuse (`MM-14`) |
| EAP-086 No duplicate detection | Duplicates accumulate unnoticed | The library becomes a pile nobody searches | Detect at upload (`MM-15`) |
| EAP-087 Editors compress images | Optimization is a human task | Unoptimized images ship; the budget breaks | Automatic (`MM-26`) |
| EAP-088 Originals discarded | Only derivatives retained | Cannot regenerate at new sizes | Retain originals (`MM-21`) |
| EAP-089 Pasted external URLs | Images referenced by arbitrary URL | Asset you do not control, cannot cache or optimize | Reference managed assets (`MD-19`) |
| EAP-090 Unstripped EXIF | GPS and camera data published | Location of staff and premises disclosed | Strip metadata (`MM-30`) |
| EAP-091 Uncaptioned video | Video without captions | Accessibility floor breached | Captions required (`MM-31`) |
| EAP-092 Scanned-image PDF | A PDF that is pictures of text | Excludes every screen-reader user | Accessible alternative (`MM-34`) |
| EAP-093 Fabricated depiction | Generated imagery shows what does not exist | A false claim in picture form | Never fabricate (`MM-12`) |
| EAP-094 Likeness without consent | Identifiable people published unconsented | Privacy exposure | Record consent (`MM-13`) |

## Taxonomy and Search

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-095 Broken taxonomy | Items in several categories | Every breadcrumb a guess; navigation incoherent | One category (`TX-01`) |
| EAP-096 Tag hierarchy | Tags nested | A category taxonomy that escaped | Tags are flat (`TX-02`) |
| EAP-097 Free-text tagging | Anyone types any tag | `how-to`, `howto`, `How To` split the same content | Controlled vocabulary (`TX-10`) |
| EAP-098 Everyone mints tags | No privilege on tag creation | Vocabulary dead within months | Editor role (`TX-11`) |
| EAP-099 Internal tags exposed | Editorial notes reach readers | Embarrassing, recurring leak | Keep internal (`TX-15`) |
| EAP-100 Broken references | References point nowhere | Pages render broken; author links dead | Enforce integrity (`TX-17`) |
| EAP-101 Hardcoded navigation | Menus live in components | Every menu change is a deploy; menus stop changing | Navigation is content (`TX-21`) |
| EAP-102 Orphan pages | Published content unreachable | Nobody finds it; nobody maintains it | No orphans (`TX-23`) |
| EAP-103 Unowned taxonomy | Nobody governs it | Grows ad hoc until it classifies nothing | Named owner (`TX-31`) |
| EAP-104 Undocumented taxonomy | Terms undefined | Two editors classify the same thing differently | Document it (`TX-34`) |
| EAP-105 Client-side content search | Corpus shipped to the browser | Breaks the performance budget; does not scale | Server-side (`SR-17`) |
| EAP-106 Search ignores permissions | Results unfiltered by authorization | Titles of restricted content disclosed | Filter results (`SR-24`) |
| EAP-107 Stale index | Index not updated on publish or unpublish | Unpublished content still found; new content invisible | Update with publish (`SR-02`) |
| EAP-108 Undocumented relevance | Ranking nobody can explain | Cannot debug, tune, or defend | Document it (`SR-13`) |
| EAP-109 Blank empty results | Zero results render nothing | Reads as broken | Designed state (`SR-20`) |

## Localization

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-110 Manual localization | Translation managed in spreadsheets | Drifts immediately; nothing tracked; staleness invisible | Workflow in the system (`TW-02`) |
| EAP-111 Unreviewed machine translation | Machine output published directly | Confident, fluent, wrong — in every language but one | Never publish unreviewed (`TW-03`) |
| EAP-112 Silent machine fallback | Missing translation machine-filled | Reader never told; errors invisible | Never silent (`LO-26`) |
| EAP-113 Translating a draft | Source not final | Translation orphaned when the source moves | Source final first (`LO-04`) |
| EAP-114 No staleness tracking | Source changes; translations unmarked | Outdated claims published confidently in every locale | Link to source version (`LO-18`) |
| EAP-115 Language treated as region | `es` assumed to mean Spain | Wrong spelling, units, and law | Language ≠ region (`LO-12`) |
| EAP-116 Translated formats | Dates and currency translated as strings | Wrong formats; unlocalizable | Formats from policy (`LO-09`) |
| EAP-117 Empty on missing translation | Blank region renders | Reads as broken | Declared fallback (`LO-24`) |
| EAP-118 Silent language mixing | Half the page in another language | Unexplained; reads as broken | Surface fallback (`LO-25`) |
| EAP-119 Auto-applied memory | Memory matches applied without review | Context changes meaning; wrong translations at scale | Review matches (`TW-09`) |
| EAP-120 Source retracted, translations live | Unpublish does not cascade | The retracted claim stays published in five languages | Cascade (`LO-30`) |

## Migration and Operations

| ID · Name | Problem | Operational impact | Recommended approach |
|---|---|---|---|
| EAP-121 Broken redirects | Changed URLs without 301s | Every external link and every ranking discarded | Redirect always (`MG-17`) |
| EAP-122 Homepage bulk redirect | Legacy section redirected to `/` | Soft-404 pattern; misleads readers and crawlers | Genuine equivalents (`MG-18`) |
| EAP-123 URLs changed for preference | New system prefers a pattern | Accumulated authority discarded for nothing | Preserve URLs (`MG-16`) |
| EAP-124 Hand-typed redirect map | Map written manually | Errors discovered by absent traffic weeks later | Derive and test (`MG-20`) |
| EAP-125 Legacy shape imported | Content imported as-is | Legacy problems imported permanently | Model first (`MG-02`) |
| EAP-126 Unmapped fields | Source fields silently dropped | Data loss nobody decided on | Explicit mapping (`MG-03`) |
| EAP-127 No dry run | Migration run once, live | Failures discovered in production | Dry run (`MG-08`) |
| EAP-128 Source decommissioned early | Legacy system killed on cutover | No way back; unverified target | Retain until verified (`MG-13`) |
| EAP-129 Invented alt on migration | Alt generated to pass validation | Fabricated descriptions at scale | Flag for authoring (`MG-26`) |
| EAP-130 Media left behind | Text migrated; media re-linked "later" | A corpus of broken images nobody fixes | Migrate together (`MG-24`) |
| EAP-131 Mixed content ownership | Two systems editing one type | Drift; neither trusted; nobody knows which is live | One source per type (`CMS-12`) |
| EAP-132 Vendor-only backup | Hosted CMS backup is the only copy | Content you do not hold, on the vendor's terms | Scheduled export (`BK-08`) |
| EAP-133 Content backed up without media | Backup covers one system | Restores a corpus of broken references | Back up together (`BK-01`) |
| EAP-134 Untested export | Export never re-imported | A file, not a backup | Verify (`BK-10`) |
| EAP-135 Vendor types in domain | SDK types throughout the app | The CMS becomes unremovable | Typed interface (`CI-02`) |
| EAP-136 Fail-open integration | Failed CMS renders an empty page | Publishes emptiness as though it were content | Fail safe (`CI-39`) |
| EAP-137 Analytics as editorial truth | Page views decide accuracy | A well-performing page can be wrong | Never the record (`CI-33`) |
| EAP-138 Inaccessible editor | The editing tool fails WCAG | Excludes people from employment | Meet AA (`EX-25`) |
| EAP-139 Engineer-dependent editing | Routine actions need engineering | A bottleneck governance dies in | Editor-operable (`EX-24`) |
| EAP-140 Stale content left live | No expiry, no review | Content that was true and is not — trusted anyway | Expiry and review (`AR-14`) |
