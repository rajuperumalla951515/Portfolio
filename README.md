# React + Vite

## Decode Careers

The job portal lives at `/decode/jobs`. Category routes are `/decode/jobs/internships`, `/decode/jobs/graduate-trainee`, `/decode/jobs/entry-level`, `/decode/jobs/apprenticeships`, and `/decode/jobs/remote`; saved listings are at `/decode/jobs/saved`. Learning materials remain available at `/decode/resources`.

The shared category and role taxonomy, along with verified classifications for curated listings, is maintained in `shared/job-taxonomy.json`. Listings without both a verified primary opportunity category and role classification are omitted instead of being assigned by guesswork. Remote listings belong only to the Remote Jobs category, with their employment type retained as listing metadata.

Before deploying the portal changes, apply `backend/decode_job_portal_migration.sql` after the existing Decode migrations. New admin URL imports require explicit `primaryCategory`, `roleCategory`, `typeOverride`, `workModeOverride`, and `locationOverride` values; the source must also provide a title and description, or the admin request must provide verified overrides. Optional category-specific filter metadata can be set through the importer or protected job update endpoint.

Run `npm run test:job-portal` to verify category exclusivity and role filtering.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
