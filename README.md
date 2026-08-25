# Dog Names

A site for finding a name that actually fits the dog.

This first cut is a searchable catalog. No accounts, no database. You can browse, filter, and see meanings.

## Stack

- Next.js App Router on Vercel
- TypeScript
- Tailwind CSS and shadcn/ui
- A typed in-repo name catalog (`src/lib/names.ts`)

Later, if the catalog outgrows a file: Neon Postgres, Drizzle, and Clerk for saved shortlists.

## Local setup

```bash
pnpm install
pnpm test
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` starts the app
- `pnpm test` runs catalog and filter checks
- `pnpm build` produces the production bundle
- `pnpm lint` runs ESLint
