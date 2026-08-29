# Dog Names

One page for finding a dog name you would actually shout across a park.

Browse a catalog of real, in-use names, filter by gender, vibe, length and
origin, draw a surprise pick, save favourites, and copy the winner. No account,
no database, no paid services.

## What is here

- **Search** across names, meanings, origins, vibes and tags. Press `/` to jump
  to the box.
- **Filters** for gender, vibe, length and origin, plus a sort order. Everything
  lives in the URL (`?q=&gender=&origin=&vibe=&length=&sort=`), so a search can
  be pasted to whoever else gets a vote.
- **Surprise draw** that respects the filters you already set, and never
  immediately repeats its last pick.
- **Favourites** kept in `localStorage`. Copy one, copy the whole list, or
  download it as a text file. Nothing is sent anywhere.
- **A daily park name**, chosen by UTC date so everyone sees the same one.

## Honesty notes

- Every entry in `src/lib/names.ts` is a name people genuinely use for dogs, with
  a meaning written to be accurate. Where an etymology is contested the wording
  hedges ("usually read as", "often glossed as").
- There are no popularity counts, rankings, ratings, testimonials or awards.
  The only numbers on the page — catalog size, origin counts, vibe counts,
  match counts — are computed from the catalog at render time. A test asserts
  that no meaning or tag contains ranking or popularity language.
- The "Before you commit" tips are practical suggestions, not research findings,
  and the page says so.
- Favourites are per-browser. Clearing site data loses them; there is no sync.
- The site is light-theme only. The dark tokens in `globals.css` are unused.

## Stack

- Next.js 16 App Router (Turbopack) and TypeScript
- Tailwind CSS v4 and shadcn/ui primitives
- A typed in-repo catalog (`src/lib/names.ts`) — no database, no API

## Local setup

```bash
pnpm install
pnpm test
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` starts the app
- `pnpm test` compiles `src/lib` with `tsconfig.test.json` into `.test-out/` and
  runs the Node test runner against it. Compiling first rather than relying on
  `node --experimental-strip-types` keeps the suite working on Node 20.
- `pnpm build` produces the production bundle
- `pnpm lint` runs ESLint

## Layout

```
src/app/          layout, the single page, error and not-found boundaries
src/components/   header/footer, filter panel, surprise draw, favourites, name card
src/lib/          catalog, query parsing and URL state, shortlist storage, tests
```
