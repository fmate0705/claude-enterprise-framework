# Changesets

This directory is managed by [changesets](https://github.com/changesets/changesets). Every
change that affects a published package (`@cef/cli`, `@cef/core`, `@cef/framework`, and the
`@cef/plugin-*` packages) ships with a changeset describing the bump and the reason.

Add one with:

```bash
corepack pnpm changeset
```

Release notes are aggregated into each package's `CHANGELOG.md` at version time. The
framework's own specification changelog (`../CHANGELOG.md`, AS-000…AS-020) is separate and
is not managed by changesets.
