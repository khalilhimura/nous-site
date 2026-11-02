# Nous public website — archived

Development and publishing have moved to the [Nous monorepo](https://github.com/khalilhimura/nous).

- Public website source: [apps/site](https://github.com/khalilhimura/nous/tree/main/apps/site)
- Live website: [nous.my](https://nous.my)
- Maintenance and rollback: [site operations](https://github.com/khalilhimura/nous/blob/main/docs/site-migration/operations.md)
- Nous Account work: [issue #10](https://github.com/khalilhimura/nous/issues/10), with its separate release process in the monorepo.

This repository is retained as read-only history. The public site was imported with its
complete Git history at `36a18dd2f18bcb087ef88eb0d5e3994f02260e40`, and all pre-retirement
branch heads are preserved under `archive/nous-site/*` in the monorepo. The earlier account
design-audit branch and PR #2 remain historical references; they are not the current account
implementation.

Submit future site changes to `khalilhimura/nous`, under `apps/site`. The existing Cloudflare
Pages project keeps the name `nous-site` for domain continuity, but its Git publishing
source is now `khalilhimura/nous/main`.
