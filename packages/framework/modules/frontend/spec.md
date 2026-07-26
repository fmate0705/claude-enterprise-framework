# Frontend — Detailed Specification

Colors, spacing, and type come from tokens, never hard-coded literals. Build one canonical
component per pattern with defined variants and every interaction state (default, hover,
focus, active, disabled, loading, error). Compose layouts for the specific content — avoid
centered-by-default and the generic three-card row. Prefer Server Components; push the
client boundary to the smallest interactive leaf. Authoritative source: AS-007 (Experience),
AS-008 (Design System), AS-009 (Components).
