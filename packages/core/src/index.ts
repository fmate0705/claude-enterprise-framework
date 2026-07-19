/**
 * `@cef/core` — the runtime, plugin SDK, and domain types for the CEF CLI.
 *
 * This package is the innermost layer of the architecture (see `ARCHITECTURE.md` §5): it
 * depends on nothing outside itself and is consumed by every other package. Milestone M1
 * fills in the domain entities, ports, `Result` model, and plugin SPI; M0 establishes the
 * package boundary and the version constant used for framework-compatibility checks.
 */
export const CEF_CORE_VERSION = '0.0.0';
