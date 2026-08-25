import { NameExplorer } from "@/components/name-explorer";
import { NAMES } from "@/lib/names";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="hero-wash border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">For the dog, and the person calling them</p>
            <h1 className="mt-4 font-heading text-[2.35rem] leading-[1.12] tracking-tight sm:text-5xl">
              Pick a name you would shout across a park.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              Search meanings, origins, and vibes. Heart the ones that survive
              the family group chat.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <HeroStep n="1" title="Browse" body="Filter until a name feels easy to say." />
            <HeroStep n="2" title="Save" body="Keep a shortlist on this phone or laptop." />
            <HeroStep n="3" title="Call it" body="Copy the winner and try it for a day." />
          </ul>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-6 sm:py-14">
        <NameExplorer names={NAMES} />
      </div>
    </main>
  );
}

function HeroStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-2xl border border-border/80 bg-card/70 px-4 py-4 shadow-sm">
      <p className="text-xs font-medium tracking-wide text-primary uppercase">
        {n} · {title}
      </p>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{body}</p>
    </li>
  );
}
