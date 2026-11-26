# Bahar Design System V5

The active, canonical product design specification is
[docs/design-system-v5.md](docs/design-system-v5.md).

The component API, state contracts, primitive inventory and school-domain
component catalog are maintained in
[docs/component-catalog-v5.md](docs/component-catalog-v5.md).

The implementation scope, route inventory, migration status and QA matrix are
maintained in
[docs/ui-rebuild-v5.md](docs/ui-rebuild-v5.md).

Implementation source of truth:
- `src/app/bahar-v5.css` — tokens and global presentation layer
- `src/components/shared/bits.tsx` — shared page primitives
- `src/components/ui/*` — accessible primitives
- `src/components/app-shell/app-shell.tsx` — application shell and navigation

V4 and V3 documents are historical references only. Arad is the only permitted
font family. Never introduce a parallel visual language or a second typeface.
