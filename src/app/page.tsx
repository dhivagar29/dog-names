import { NameExplorer } from "@/components/name-explorer";
import { NAMES } from "@/lib/names";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b bg-card/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-sm font-medium tracking-tight">Dog Names</p>
          <p className="text-sm text-muted-foreground">A starter catalog</p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 sm:py-16">
        <section className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Find a name that fits</p>
          <h1 className="mt-3 font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
            Browse dog names by vibe, origin, and meaning.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Search the first curated set, then shortlist what you would actually
            shout across a park. Favorites and accounts come later.
          </p>
        </section>

        <NameExplorer names={NAMES} />
      </main>
    </div>
  );
}
