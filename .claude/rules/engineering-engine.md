# Engineering Engine

**Framework:** CEF · **Specification:** AS-002 (Rule Engine) · **Version:** 0.1.0

**Purpose:** Provide deterministic engineering decisions. For Every trigger there is Exactly one decision. This catalog holds ~100 rules that make implementation reproducible. It enforces the architecture, react, nextjs, typescript, testing, security, and performance standards.

**Rule format:** Each rule is a row projecting the canonical 8-field structure. **Purpose** is the section heading. **Trigger/Conditions** is the *When / If* column. **Decision + Actions** is the *Decision* column (Always / Never / Must / Only / Exactly). **Expected Output** is the realized Decision. **Example** is the *Example* column. The language is deterministic and free of hedging verbs.

**Conflict rule:** When two rules appear to conflict, `priority-engine.md` decides; Correctness and the security/accessibility/performance floors Never yield.

---

## Inspection & Reuse

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-001 Inspect first | When modifying code | Always read the existing implementation before changing it | Read the file, then edit |
| E-002 Reuse component | If a component exists for the need | Always reuse it; Never duplicate | Reuse `<Button>` |
| E-003 Reuse utility | If a utility exists for the need | Always reuse it; Never re-implement | Reuse `formatDate` |
| E-004 Extend not fork | If a component nearly fits | Must add a variant; Never copy-and-fork | Add `variant` prop |
| E-005 Search before create | When a new helper seems needed | Must search the codebase first | Grep before writing |
| E-006 Edit only affected | When making a change | Only edit files the task requires; Never restyle working code | Change one string |
| E-007 No speculative code | When building | Never add unused abstractions for a hypothetical future | Build what is needed |
| E-008 Follow local style | When adding to a file | Must match the surrounding conventions | Match naming/idioms |
| E-009 Delete on replace | When replacing code | Must remove the old code; Never leave both | Old path deleted |

## Components

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-010 Single responsibility | When a component grows | Must do one thing; split mixed concerns | Fetch vs. render split |
| E-011 Split by limit | If a file exceeds the architecture limit | Must split into components/modules | 300-line cap → split |
| E-012 Props over globals | When passing data | Must pass via props; Never reach into globals | Data via props |
| E-013 Controlled inputs | When building form inputs | Must define controlled/uncontrolled explicitly | Controlled value |
| E-014 No prop drilling depth | If props pass through > 3 layers | Must use composition or context | Context for theme |
| E-015 Children over config | When a component varies structurally | Must accept `children`/slots over boolean flags | Slot-based card |
| E-016 Pure render | When rendering | Never mutate props or state during render | Derive, don't mutate |
| E-017 Keys | When rendering lists | Must use stable, unique keys; Never index when items reorder | `key={id}` |
| E-018 Full states | When building an interactive component | Must implement all states (default→error) | Loading + error states |
| E-019 Accessible primitives | When building interactive UI | Must use semantic elements; Never `div` as a button | Real `button` |
| E-020 Colocation | When adding component files | Must colocate component, styles, and tests | Feature-folder |

## Server & Client

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-021 Server default | When creating a component | Always prefer a Server Component | Server by default |
| E-022 Client only for interactivity | If a component needs state/effects/events | Only then mark `"use client"` | Client for a menu |
| E-023 Minimal client boundary | When a leaf needs interactivity | Must push the client boundary to the smallest leaf | Client leaf only |
| E-024 Server data | When fetching for render | Must fetch on the server; Never fetch on the client for initial render | Server fetch |
| E-025 Secrets server-only | When using secrets | Never expose secrets to the client; Only server env | Server-only key |
| E-026 No client for static | If content is static | Never make it a Client Component | Static server page |
| E-027 Serialization | When passing server→client props | Must pass serializable data Only | Plain objects |
| E-028 Actions for mutations | When mutating server state | Must use server actions/handlers with validation | Validated action |
| E-029 Streaming | When a slow part blocks render | Must stream with suspense boundaries | `<Suspense>` shell |

## Effects & State

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-030 Remove needless effect | If a `useEffect` is unnecessary | Always remove it | Delete sync effect |
| E-031 Derive not store | When a value is computable from props/state | Must derive in render; Never store + sync | `const full = a+b` |
| E-032 Event not effect | When responding to a user action | Must use an event handler; Never an effect | onClick logic |
| E-033 No fetch-in-effect default | If fetching for initial data | Never default to client `useEffect` fetch; use server data | Server fetch |
| E-034 Effect cleanup | If an effect subscribes | Must return cleanup | Unsubscribe |
| E-035 Effect deps | If an effect is required | Must declare correct, exhaustive deps | Complete deps |
| E-036 Colocate state | When adding state | Must place state at the lowest common owner | Local state |
| E-037 No redundant state | If state mirrors a prop | Never duplicate; read the prop | Use the prop |
| E-038 Minimal global state | When reaching for a store | Only for genuinely shared, cross-cutting state | No store for local |
| E-039 Immutable updates | When updating state | Must update immutably | Spread/new object |
| E-040 Refs for non-render | If a value must not trigger render | Must use a ref | `useRef` timer |

## Data & Fetching

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-041 Validate at boundary | When receiving external data | Must validate/parse at the boundary | Schema parse |
| E-042 Type after parse | After validating input | Must type the parsed result; Never pass `any` onward | Typed DTO |
| E-043 Handle all outcomes | When fetching | Must handle loading, empty, error, success | Four states |
| E-044 Cache intentionally | When fetching in Next.js | Must set caching/revalidation explicitly | `revalidate` set |
| E-045 No N+1 | If fetching in a loop | Never issue N+1 queries; batch | Single batched query |
| E-046 Pagination | If a list can be large | Must paginate/virtualize; Never load unbounded | Server pagination |
| E-047 Idempotent mutations | When designing mutations | Must guard against duplicates | Idempotency key |
| E-048 Optimistic rollback | If updating optimistically | Must roll back on failure | Revert on error |
| E-049 Timeouts | When calling external services | Must set timeouts and handle failure | 5s timeout |

## Types

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-050 Strict mode | When configuring TS | Always enable `strict`; Never disable it | `strict: true` |
| E-051 No `any` | When typing | Never use `any` except as a recorded escape hatch | `unknown` + narrow |
| E-052 Derive types | When a type mirrors data | Must derive, not duplicate | `z.infer`/`typeof` |
| E-053 Exhaustive unions | When switching on a union | Must handle every case (exhaustive check) | `never` default |
| E-054 Nullability explicit | When a value may be absent | Must model with optional/`null`, not silent undefined | `T | null` |
| E-055 Narrow at edges | When data enters typed code | Must narrow before use | Type guards |
| E-056 Interface vs type | When modeling objects vs unions | Must use one convention consistently | `interface` for objects |
| E-057 No non-null `!` abuse | When a value seems present | Never use `!` to silence the checker without proof | Guard instead |
| E-058 Public API typed | When exporting a module | Must fully type its public surface | Typed exports |

## Files & Structure

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-059 File size cap | If a file grows large | Must split at the architecture limit | Split at ~300 lines |
| E-060 One export focus | When a file has many concerns | Must keep one primary concern per file | One component/file |
| E-061 Feature folders | When adding a feature | Must colocate by feature | `features/auth/*` |
| E-062 Barrel discipline | When re-exporting | Only barrel where it aids imports; Never create cycles | No circular barrels |
| E-063 No circular deps | When importing | Never create circular dependencies | Acyclic graph |
| E-064 Consistent imports | When importing | Must use the configured alias/order | `@/` aliases |
| E-065 Config as code | When configuring env | Must define config centrally and typed | Typed config module |
| E-066 Assets colocated | When adding component assets | Must colocate with the component | Local asset import |
| E-067 Dead file removal | If a file is unused | Must delete it | Remove orphan |

## Naming

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-068 Intent names | When naming | Must reveal intent; Never `data`, `tmp`, `flag` | `isEligible` |
| E-069 Boolean prefix | When naming booleans | Must prefix `is/has/can/should` | `hasAccess` |
| E-070 Handler prefix | When naming event handlers | Must prefix `handle`/`on` | `handleSubmit` |
| E-071 Consistent casing | When naming | Must follow project casing conventions | `PascalCase` components |
| E-072 No abbreviations | When naming | Never use unclear abbreviations | `button`, not `btn` in APIs |
| E-073 Units in names | When a number has a unit | Must include the unit | `delayMs` |
| E-074 Rename to clarify | If a name misleads | Must rename; renaming is valid work | `count` → `retryCount` |

## Errors & Edge Cases

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-075 Handle, never swallow | When catching an error | Never swallow; Must handle and surface | Log + user state |
| E-076 Error boundaries | When a subtree can throw | Must wrap it in an error boundary | Route boundary |
| E-077 User-facing errors | When an operation fails | Must show a recoverable message; Never a raw stack | Friendly error |
| E-078 Guard clauses | When preconditions exist | Must fail fast with guards | Early returns |
| E-079 Null/empty handling | When data may be empty | Must handle empty explicitly | Empty state |
| E-080 Boundary inputs | When accepting numbers/strings | Must handle min/max/zero/negative | Clamp/validate |
| E-081 Log with context | When logging an error | Must include actionable context | Include ids |
| E-082 No silent catch | If a `catch` is empty | Never leave it empty | Handle or rethrow |
| E-083 Fallback UI | When async fails | Must render a fallback | Retry fallback |

## Performance

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-084 Budget is a floor | When shipping a page | Must meet CWV and bundle budget; Never exceed | In-budget page |
| E-085 Code split | If a chunk is large or route-specific | Must split/lazy-load | Dynamic import |
| E-086 Defer noncritical | When JS is not needed for first paint | Must defer/lazy it | Below-fold lazy |
| E-087 Memo when measured | If a costly render repeats | Only memoize with evidence; Never premature | Profiled memo |
| E-088 Image pipeline | When rendering images | Must use the optimized image pipeline | Next Image |
| E-089 Font strategy | When loading fonts | Must use `font-display: swap` and subset | Swap + subset |
| E-090 Avoid layout thrash | When measuring the DOM | Never interleave read/write in loops | Batch reads |
| E-091 Virtualize long lists | If a list is very long | Must virtualize | Windowed list |
| E-092 Prefetch intent | When navigation is likely | Must prefetch the next route | Link prefetch |
| E-093 Debounce/throttle | When handling high-frequency events | Must debounce/throttle | Throttled scroll |

## Dependencies

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-094 Earn the dep | When adding a dependency | Only add if it earns its cost; Never for a few lines | Use `Intl` first |
| E-095 Platform first | When a need exists | Must prefer platform APIs | `fetch`, `Intl` |
| E-096 Pin versions | When adding a dependency | Must pin and lock versions | Lockfile committed |
| E-097 Audit deps | When adding/updating | Must check for known vulnerabilities | Audit clean |
| E-098 Tree-shakeable | When importing a library | Must import Only what is used | Named imports |

## Testing

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-099 Test behavior | When writing tests | Must test observable behavior; Never internals | Assert output |
| E-100 Cover critical paths | If a path is critical | Must have a test; Never certify untested critical paths | Checkout tested |
| E-101 Deterministic tests | When writing tests | Never depend on time/network without control | Mocked clock |
| E-102 Arrange-act-assert | When structuring a test | Must follow AAA clearly | Clear phases |
| E-103 One reason to fail | When a test asserts | Must assert one behavior per test | Focused test |
| E-104 Test edge cases | When behavior has edges | Must test empty/error/boundary | Empty + error tests |

## Security

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-105 Validate all input | When accepting input | Always validate/sanitize at the boundary | Schema validation |
| E-106 Escape output | When rendering user content | Must escape; Never inject raw HTML | No `dangerouslySetInnerHTML` on user data |
| E-107 Parameterize queries | When querying a database | Must parameterize; Never concatenate | Prepared statements |
| E-108 AuthZ every action | When performing a mutation | Must check authorization server-side | Server-side guard |
| E-109 Secrets in env | When using secrets | Must use server env; Never commit secrets | `.env` ignored |
| E-110 Security headers | When serving pages | Must set CSP and security headers | Strict CSP |
| E-111 Least privilege | When granting access | Only the minimum needed | Scoped tokens |
| E-112 No trust of client | When receiving client data | Never trust it; re-validate server-side | Server re-check |
| E-113 Safe redirects | When redirecting from input | Must allowlist targets | No open redirect |

## Accessibility in Code

| ID · Name | When / If | Decision | Example |
|---|---|---|---|
| E-114 Semantic first | When building UI | Must use semantic HTML; Only add ARIA to fill gaps | Native elements |
| E-115 Keyboard operable | When adding interaction | Must be fully keyboard operable | Tab + Enter work |
| E-116 Focus management | When opening overlays | Must trap and restore focus | Modal focus return |
| E-117 Labels & names | When a control lacks visible text | Must give an accessible name | `aria-label` |
| E-118 Live regions | When content updates async | Must announce with `aria-live` | Status announced |
| E-119 Respect reduced motion | When animating in code | Must honor `prefers-reduced-motion` | Motion gated |
