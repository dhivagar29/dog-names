import { NameCard } from "@/components/name-card";
import { NameExplorer } from "@/components/name-explorer";
import { NAMES, ORIGINS, VIBES } from "@/lib/names";
import { parseNameQuery, pickDailyName } from "@/lib/name-query";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const TIPS = [
  {
    title: "Say it across a field first",
    body: "A name lives outdoors. Stand at one end of the garden and shout it three times. Anything you feel silly yelling now, you will feel silly yelling for the next fifteen years.",
  },
  {
    title: "Watch out for command clashes",
    body: "Names that rhyme with the words you will train with get confusing. Bo and no, Kit and sit, Jay and stay, Beau and go. Pick one that sounds nothing like the rest of your vocabulary.",
  },
  {
    title: "Check the short version",
    body: "Long names always get clipped. Clementine becomes Clem, Bartholomew becomes Bart. If you do not like the nickname, you will not keep the long one.",
  },
  {
    title: "Two beats travel well",
    body: "A crisp start and a clear ending carry further than a mumble. That is why so many working dogs end up as Bess, Meg or Fly.",
  },
] as const;

export default async function Home(props: PageProps<"/">) {
  const params = await props.searchParams;
  const initialQuery = parseNameQuery({
    q: first(params.q),
    gender: first(params.gender),
    origin: first(params.origin),
    vibe: first(params.vibe),
    length: first(params.length),
    sort: first(params.sort),
  });
  const daily = pickDailyName(NAMES, new Date().toISOString().slice(0, 10));

  return (
    <main id="top" className="flex flex-1 flex-col">
      <section className="hero-wash relative overflow-hidden border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,22rem)] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">
              For the dog, and the person doing the shouting
            </p>
            <h1 className="mt-4 font-heading text-[2.45rem] leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Pick a name you would shout across a park.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              Search real names by meaning, origin, vibe and length. Heart the
              ones that survive the family group chat. Copy the winner when it
              finally feels right in your mouth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href="#find"
                className="inline-flex h-11 items-center rounded-full bg-primary px-5 font-medium text-primary-foreground outline-none transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                Start browsing
              </a>
              <a
                href="#surprise"
                className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                Draw me a name
              </a>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Names in the catalog</dt>
                <dd className="font-heading text-2xl tracking-tight tabular-nums">
                  {NAMES.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Origins</dt>
                <dd className="font-heading text-2xl tracking-tight tabular-nums">
                  {ORIGINS.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Vibes</dt>
                <dd className="font-heading text-2xl tracking-tight tabular-nums">
                  {VIBES.length}
                </dd>
              </div>
            </dl>
          </div>
          <section aria-labelledby="daily-heading">
            <h2 id="daily-heading" className="sr-only">
              Today&rsquo;s park name
            </h2>
            <NameCard name={daily} tone="featured" eyebrow="Park name today" htmlId="todays-name" />
          </section>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <NameExplorer names={NAMES} initialQuery={initialQuery} />
      </div>

      <section
        aria-labelledby="tips-heading"
        className="border-t border-border/70 bg-card/60"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="tips-heading" className="font-heading text-2xl tracking-tight sm:text-3xl">
            Before you commit
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Four things worth checking once you have a shortlist. None of this
            is science, it is just what tends to go wrong.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <li
                key={tip.title}
                className="rounded-3xl border border-border/70 bg-background p-5"
              >
                <h3 className="font-heading text-lg tracking-tight">{tip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {tip.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
