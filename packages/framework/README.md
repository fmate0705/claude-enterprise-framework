# @cef/framework

The Claude Enterprise Framework (specifications AS-000…AS-020) shipped as **data**: policies,
standards, rules, templates, and engine descriptors that the CLI loads dynamically at runtime.

This package contains **no framework rules as code** — only a `frameworkRoot()` locator so
consumers can resolve the data directory. The CLI never hardcodes framework knowledge
(`ARCHITECTURE.md` §7, KD-4).

> Status: M0 seeds the package with an empty `framework.manifest.yaml`. Milestone M1 migrates
> the existing `.claude/{standards,policies,rules,knowledge,…}` content here and generates the
> per-engine `plugin.manifest.yaml` files.
