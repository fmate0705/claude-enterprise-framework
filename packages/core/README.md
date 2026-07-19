# @cef/core

The innermost layer of the CEF CLI: runtime engine, plugin SDK, domain types, ports, and the
`Result`/error model. It depends on nothing outside itself and is consumed by every other
package (`ARCHITECTURE.md` §4–§5).

> Status: M0 establishes the package boundary. The domain model, ports, and plugin SPI land in
> milestone M1.
