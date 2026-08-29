"use client";

import { useState } from "react";
import { Dices } from "lucide-react";

import { NameCard } from "@/components/name-card";
import { Button } from "@/components/ui/button";
import { drawName } from "@/lib/name-query";
import { findName, type DogName } from "@/lib/names";

type SurpriseDrawProps = {
  pool: readonly DogName[];
  filtered: boolean;
};

export function SurpriseDraw({ pool, filtered }: SurpriseDrawProps) {
  const [slug, setSlug] = useState<string | null>(null);
  // Derived, so a draw that no longer survives the filters simply disappears.
  const drawn = slug ? findName(pool, slug) : undefined;

  function draw() {
    const pick = drawName(pool, Math.random(), slug);
    setSlug(pick?.slug ?? null);
  }

  return (
    <section
      id="surprise"
      aria-labelledby="surprise-heading"
      className="scroll-mt-24 rounded-3xl border border-border/80 bg-[color-mix(in_oklch,var(--accent),var(--card)_45%)] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-md">
          <h2 id="surprise-heading" className="font-heading text-2xl tracking-tight">
            Can&rsquo;t decide?
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {filtered
              ? "Draws one name from your current filters. Change a filter and the draw changes with it."
              : "Draws one name from the whole catalog. Set a filter first if you want to narrow the odds."}
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="h-11 rounded-full px-5 text-base"
          onClick={draw}
          disabled={pool.length === 0}
        >
          <Dices className="size-5" aria-hidden="true" />
          {drawn ? "Draw again" : "Draw a name"}
        </Button>
      </div>

      <div aria-live="polite" className="mt-5">
        {pool.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card/60 px-4 py-6 text-center text-sm text-muted-foreground">
            Nothing matches your filters yet, so there is nothing to draw from.
          </p>
        ) : drawn ? (
          <div className="max-w-md">
            <NameCard name={drawn} tone="draw" eyebrow="Your draw" htmlId="draw-result" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {pool.length} {pool.length === 1 ? "name is" : "names are"} in the hat.
          </p>
        )}
      </div>
    </section>
  );
}
