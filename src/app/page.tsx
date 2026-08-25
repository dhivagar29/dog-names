import { NameExplorer } from "@/components/name-explorer";
import { NameCard } from "@/components/name-card";
import { NAMES } from "@/lib/names";
import { parseNameQuery, pickDailyName } from "@/lib/name-query";

type HomeProps = {
  searchParams: Promise<{
    q?: string | string[];
    gender?: string | string[];
    origin?: string | string[];
  }>;
};

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const initialQuery = parseNameQuery({
    q: first(params.q),
    gender: first(params.gender),
    origin: first(params.origin),
  });
  const daily = pickDailyName(NAMES, new Date().toISOString().slice(0, 10));

  return (
    <main className="flex flex-1 flex-col">
      <section className="hero-wash relative overflow-hidden border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,22rem)] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">
              For the dog, and the person calling them
            </p>
            <h1 className="mt-4 font-heading text-[2.45rem] leading-[1.08] tracking-tight sm:text-5xl">
              Pick a name you would shout across a park.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              Search meanings, origins, and vibes. Heart the ones that survive
              the family group chat. Copy the winner when it feels right in
              your mouth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href="#name-search"
                className="inline-flex h-10 items-center rounded-full bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Browse the catalog
              </a>
              <a
                href={`#name-${daily.slug}`}
                className="inline-flex h-10 items-center rounded-full border border-border bg-card px-4 font-medium transition-colors hover:bg-muted"
              >
                Jump to {daily.name}
              </a>
            </div>
          </div>
          <NameCard name={daily} featured htmlId="todays-name" />
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-6 sm:py-14">
        <NameExplorer names={NAMES} initialQuery={initialQuery} />
      </div>
    </main>
  );
}
