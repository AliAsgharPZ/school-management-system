# Bahar — Engineering and UI rules

This repository is a multilingual, multi-tenant school-management system. Treat correctness, data integrity, tenant isolation, permissions and existing workflows as release-critical.

## Required reading for UI work
1. `docs/design-language.md` — visual system and layout rules.
2. `docs/component-contracts.md` — component API, semantics and interaction contracts.
3. `docs/ui-craft-rules.md` — implementation and QA checklist.
4. `docs/agents-md-persian.md` — Persian copy, RTL and localization.

These documents are the single source of truth. Do not follow stale design notes or introduce a second visual system.

## Non-negotiable product constraints
- Preserve every existing route, module, API contract, database field, role, permission, data record and workflow unless a verified defect requires a narrowly scoped correction.
- Never remove or silently hide an existing operation to simplify a screen. On small screens, provide an accessible alternative.
- Respect tenant boundaries and enforce authorization on the server; hiding a control is not authorization.
- Do not fabricate data, success states, counts or completed operations.
- Do not run destructive database commands against production.
- Do not change schemas or migrations for a visual-only task.
- All buttons, menu items, filters, export controls and print actions must perform their stated operation.

## Existing implementation conventions
- Next.js App Router, React, TypeScript, Tailwind CSS and the existing Radix-based components in `src/components/ui`.
- Reuse and improve the shared components before creating duplicates.
- Keep the current dependency set unless a new dependency is technically necessary and justified.
- Use existing API/client, localization, country-profile, date, number, permission and print helpers. Do not reimplement them ad hoc.
- The active country profile determines locale, direction, calendar, digits and timezone. Persian defaults to RTL and the Solar Hijri calendar; do not hard-code those assumptions into country-neutral code.
- All user-facing strings must use the existing localization catalog. Persian is the source language; preserve translations and fallbacks.

## UI implementation rules
- Follow the Bahar design tokens and component contracts; do not add arbitrary brand colors, fonts, radii or shadow systems.
- Preserve balanced information density. Prefer clear hierarchy, restrained surfaces, precise spacing and functional controls over decoration.
- Use logical CSS properties and support RTL/LTR, Light/Dark, responsive layouts and reduced motion.
- Every control needs visible focus, correct disabled/loading/error states and an accessible name.
- Use semantic buttons for actions and links for navigation. Set button `type` explicitly inside forms.
- Keep input values on validation/network errors. Show success only after the server confirms success.
- Loading must terminate in success, empty or recoverable error state; never leave an infinite spinner.
- Print and export are separate output surfaces. Test page size, page breaks, repeated headers, fonts, images, RTL text and multi-page output.

## Required verification before claiming completion
- Inspect all call sites when changing a shared component.
- Run the repository's actual install, lint, typecheck and production/Cloudflare build commands when the environment permits.
- Test the changed workflows with valid, empty, invalid, unauthorized, network-failure and large-data cases.
- Test RTL/LTR, Light/Dark, keyboard-only, reduced-motion, mobile and desktop.
- Verify print preview and generated PDF, not just the click handler.
- Report exactly which checks ran and which could not run. A commit or merge is not proof of a successful build or deployment.
