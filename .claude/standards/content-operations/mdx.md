# MDX

**Framework:** CEF · **Specification:** AS-018 (Content Operations Engine) · **Version:** 2.0.0 · **Module:** M-CONTENTOPS

**Purpose:** Define MDX: where it is warranted, and the constraints that stop it from becoming code wearing content's clothes. MDX buys expressiveness by spending portability, and the trade is only sometimes worth it.

**Language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119.

**Canonical values:** `content-operations.policy.yaml` (`structured_over_unstructured`).

---

## The Trade

MDX is Markdown that executes components. That is its value and its entire cost.

| Gains | Costs |
|---|---|
| Components inside prose | Content is now code: it compiles, and it can fail to compile |
| Interactive documentation | Not portable — MDX renders only in its own toolchain (`COP-02`) |
| Rich technical writing | Non-technical authors cannot safely edit it |
| Type-checked component props | Arbitrary execution: a content file can do anything the app can |

- **MDX-01 — MDX is a recorded decision.** Choosing MDX MUST be recorded with its rationale (`ME-07`). It is not the default; Markdown is (`MD-25`).
- **MDX-02 — Warranted by interactivity, not convenience.** MDX MUST be justified by content that genuinely requires interactive or component-driven presentation — documentation with live examples, technical writing with embedded demos. "It is easier to lay out" is not a justification (`SC-05`).
- **MDX-03 — Not for non-technical authors.** Where authors are non-technical, MDX MUST NOT be selected. A syntax error in a content file breaking the build is a failure mode editors cannot recover from (`CMS-06`).
- **MDX-04 — Not for content requiring portability.** Marketing content, articles, and anything likely to outlive the toolchain SHOULD use Markdown or a CMS (`COP-01`).

## Constraints

- **MDX-05 — Components are an allowlist.** Only explicitly permitted components MUST be available in MDX scope. An open scope makes every content file able to import and execute anything (`RC-15`).
- **MDX-06 — Imports are restricted.** Arbitrary imports inside content MUST NOT be permitted. Content importing from `../../lib/db` is not content.
- **MDX-07 — No logic in content.** Conditionals, loops, and data fetching MUST NOT live in MDX. Where content needs logic, the logic belongs in a component the content invokes (`E-010`).
- **MDX-08 — Components map to the design system.** Every permitted component MUST come from the design system (`RC-16`, `E-002`).
- **MDX-09 — Components carry content, not layout.** (`RC-17`.)
- **MDX-10 — Front matter still applies.** Every Markdown front-matter rule applies unchanged (`MD-04`…`MD-09`).
- **MDX-11 — Prose is still Markdown.** Prose MUST remain Markdown; wrapping paragraphs in JSX defeats the format entirely.
- **MDX-12 — Nesting is bounded.** (`RC-18`.)

## Safety

- **MDX-13 — MDX is executable.** MDX MUST be treated as code, not as content, for every security purpose. It executes with the application's privileges.
- **MDX-14 — Never accept MDX from untrusted authors.** MDX MUST NOT be accepted from any source that is not trusted to commit code. User-submitted MDX is user-submitted code execution.
- **MDX-15 — Reviewed as code.** MDX changes MUST pass code review, not only editorial review (`SC-10` of the supply-chain standard applies the same logic to pipeline changes).
- **MDX-16 — Compiled in CI.** MDX MUST compile in CI; a compile failure MUST fail the build before it reaches production (`GC-12`).

## Performance

- **MDX-17 — Components respect the client boundary.** Components in MDX MUST default to Server Components; interactivity MUST justify a client boundary (`E-021`, `E-022`). MDX makes it trivially easy to ship an interactive component into every page of a corpus.
- **MDX-18 — Bundle impact is bounded.** MDX-embedded components MUST be counted against the performance budget (`E-084`).
- **MDX-19 — Build cost is bounded.** Compiling a large MDX corpus is a build-time cost that MUST be measured (`GC-16`).

## Accessibility

- **MDX-20 — Embedded components meet the floor.** Interactive components in content MUST be keyboard-operable and labeled (`E-115`, `E-117`). An inaccessible component embedded across a corpus is an inaccessible corpus.

## Exit

- **MDX-21 — Plan degradation.** The migration path MUST be understood: MDX degrades to Markdown only by removing every component. That cost MUST be accepted at selection, not discovered at migration (`CMS-13`).

## Verification

The content-operations gate verifies MDX is a recorded justified decision, components are allowlisted and drawn from the design system, imports and logic are excluded, MDX compiles in CI, it passes code review, embedded components respect the client boundary and the accessibility floor, and untrusted MDX is never accepted.
