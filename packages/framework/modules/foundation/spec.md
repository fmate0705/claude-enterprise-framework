# Foundation — Detailed Specification

Render and fetch on the server by default; reach for the client only when interaction
requires it. Keep TypeScript in strict mode and validate external data at the boundary.
Decompose along responsibility lines, name for intent, and record every non-obvious
decision with its reason. When values conflict, resolve by the priority order: correctness
and security first, then accessibility and user experience, then performance, then
maintainability, consistency, and simplicity. Authoritative source: AS-001 (Constitution),
AS-002 (Rule Engine), AS-003 (Architecture).
