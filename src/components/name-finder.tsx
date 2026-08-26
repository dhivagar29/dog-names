"use client";

import { useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { NameCard } from "@/components/name-card";
import { Button } from "@/components/ui/button";
import { BREEDS, breedLabel } from "@/lib/breeds";
import {
  filterNames,
  pickRandomNames,
  VIBE_FILTERS,
  type DogName,
  type NameQuery,
} from "@/lib/names";

type NameFinderProps = {
  names: readonly DogName[];
  query: NameQuery;
  onBreedChange: (breed: NameQuery["breed"]) => void;
  onVibeChange: (vibe: NameQuery["vibe"]) => void;
  onGenerated: (slug: string) => void;
};

export function NameFinder({
  names,
  query,
  onBreedChange,
  onVibeChange,
  onGenerated,
}: NameFinderProps) {
  const [picks, setPicks] = useState<readonly DogName[]>([]);
  const [emptyPick, setEmptyPick] = useState(false);

  const matches = filterNames(names, query);
  const activeBreed = query.breed !== "all" ? BREEDS.find((b) => b.slug === query.breed) : null;
  const pickCount = Math.min(3, matches.length);

  function generate() {
    setEmptyPick(false);
    const next = pickRandomNames(matches, 3);
    setPicks(next);
    if (next.length === 0) {
      setEmptyPick(true);
      return;
    }
    const first = next[0];
    if (first) {
      onGenerated(first.slug);
    }
  }

  return (
    <section
      id="finder"
      aria-labelledby="finder-heading"
      className="scroll-mt-24 rounded-3xl border border-primary/25 bg-[linear-gradient(145deg,oklch(0.97_0.03_78),oklch(0.99_0.01_85))] p-4 shadow-[0_18px_40px_-28px_oklch(0.35_0.05_50/0.45)] sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
            Start here
          </p>
          <h2 id="finder-heading" className="mt-1 font-heading text-2xl tracking-tight">
            Match names to your dog
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            Pick a breed and a vibe. We narrow the catalog, then you can generate three
            fresh picks to try out loud.
          </p>
        </div>
        <Button
          type="button"
          className="rounded-full"
          onClick={generate}
          disabled={matches.length === 0}
        >
          <Sparkles className="size-4" />
          {pickCount === 0
            ? "No matches"
            : pickCount === 1
              ? "Generate 1 pick"
              : `Generate ${pickCount} picks`}
        </Button>
      </div>

      <div className="mt-6 grid gap-5">
        <FinderRow label="Breed">
          <FinderChip pressed={query.breed === "all"} onClick={() => onBreedChange("all")}>
            Any breed
          </FinderChip>
          {BREEDS.map((breed) => (
            <FinderChip
              key={breed.slug}
              pressed={query.breed === breed.slug}
              onClick={() => onBreedChange(breed.slug)}
            >
              {breed.name}
            </FinderChip>
          ))}
        </FinderRow>

        <FinderRow label="Vibe">
          <FinderChip pressed={query.vibe === "all"} onClick={() => onVibeChange("all")}>
            Any vibe
          </FinderChip>
          {VIBE_FILTERS.map((vibe) => (
            <FinderChip
              key={vibe}
              pressed={query.vibe === vibe}
              onClick={() => onVibeChange(vibe)}
            >
              {vibe}
            </FinderChip>
          ))}
        </FinderRow>
      </div>

      {activeBreed ? (
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{breedLabel(activeBreed.slug)}.</span>{" "}
          {activeBreed.hint}
        </p>
      ) : null}

      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
        {matches.length === 0
          ? "No names match this breed and vibe yet."
          : matches.length === 1
            ? "1 name matches — generate it, or loosen a filter for more options."
            : `${matches.length} names match this mix.`}
      </p>

      {emptyPick ? (
        <div
          role="status"
          className="mt-5 rounded-2xl border border-dashed border-border bg-card/80 px-4 py-6 text-center"
        >
          <p className="font-heading text-lg tracking-tight">No names in that mix yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Loosen the breed or vibe, or browse the full catalog below.
          </p>
        </div>
      ) : null}

      {picks.length > 0 ? (
        <div className="mt-6">
          <p className="text-sm font-medium">
            {picks.length === 1 ? "Your generated pick" : "Your generated picks"}
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-3">
            {picks.map((item) => (
              <li key={item.slug}>
                <NameCard name={item} spotlight />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function FinderRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

function FinderChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={pressed ? "default" : "outline"}
      aria-pressed={pressed}
      onClick={onClick}
      className="shrink-0 rounded-full"
    >
      {children}
    </Button>
  );
}
