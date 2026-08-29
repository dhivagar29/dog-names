"use client";

import { useId, type ReactNode } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { activeFilters, clearFilter } from "@/lib/name-query";
import {
  EMPTY_QUERY,
  GENDERS,
  genderLabel,
  isFiltered,
  LENGTHS,
  lengthLabel,
  ORIGINS,
  originLabel,
  SORTS,
  sortLabel,
  VIBES,
  vibeLabel,
  type NameQuery,
  type Origin,
  type Vibe,
} from "@/lib/names";
import { cn } from "@/lib/utils";

const EXAMPLES = ["moon", "bear", "snow", "herb", "wolf"] as const;

type FilterPanelProps = {
  query: NameQuery;
  onChange: (next: NameQuery) => void;
  originCounts: Record<Origin, number>;
  vibeCounts: Record<Vibe, number>;
};

export function FilterPanel({
  query,
  onChange,
  originCounts,
  vibeCounts,
}: FilterPanelProps) {
  const sortId = useId();
  const filtered = isFiltered(query);
  const chips = activeFilters(query);

  return (
    <section
      id="find"
      aria-labelledby="find-heading"
      className="scroll-mt-24 rounded-3xl border border-border/80 bg-card/85 p-4 shadow-[0_18px_40px_-28px_oklch(0.35_0.05_50/0.45)] sm:p-6"
    >
      <h2 id="find-heading" className="sr-only">
        Search and filter names
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-sm font-medium">
            Search names, meanings, and tags
          </span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="name-search"
              type="search"
              value={query.text}
              onChange={(event) => onChange({ ...query, text: event.target.value })}
              placeholder="Try moon, wolf, or snow"
              className="h-12 w-full rounded-2xl border border-input bg-background pr-11 pl-10 text-base outline-none transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
              autoComplete="off"
              spellCheck={false}
            />
            {query.text ? (
              <button
                type="button"
                onClick={() => onChange({ ...query, text: "" })}
                className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </span>
        </label>

        <label className="flex flex-col gap-2 sm:w-48" htmlFor={sortId}>
          <span className="text-sm font-medium">Order</span>
          <select
            id={sortId}
            value={query.sort}
            onChange={(event) =>
              onChange({
                ...query,
                sort:
                  SORTS.find((item) => item === event.target.value) ??
                  EMPTY_QUERY.sort,
              })
            }
            className="h-12 w-full rounded-2xl border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            {SORTS.map((value) => (
              <option key={value} value={value}>
                {sortLabel(value)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Try a meaning</span>
        {EXAMPLES.map((example) => (
          <Button
            key={example}
            type="button"
            size="sm"
            variant="secondary"
            className="h-8 rounded-full px-3"
            onClick={() => onChange({ ...query, text: example })}
          >
            {example}
          </Button>
        ))}
        <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
          Press / to jump to the search box
        </span>
      </div>

      <div className="mt-6 grid gap-5">
        <ChipGroup label="Gender">
          <Chip
            pressed={query.gender === "all"}
            onClick={() => onChange({ ...query, gender: "all" })}
          >
            {genderLabel("all")}
          </Chip>
          {GENDERS.map((value) => (
            <Chip
              key={value}
              pressed={query.gender === value}
              onClick={() => onChange({ ...query, gender: value })}
            >
              {genderLabel(value)}
            </Chip>
          ))}
        </ChipGroup>

        <ChipGroup label="Vibe">
          <Chip
            pressed={query.vibe === "all"}
            onClick={() => onChange({ ...query, vibe: "all" })}
          >
            {vibeLabel("all")}
          </Chip>
          {VIBES.map((value) => (
            <Chip
              key={value}
              pressed={query.vibe === value}
              count={vibeCounts[value]}
              onClick={() => onChange({ ...query, vibe: value })}
            >
              {vibeLabel(value)}
            </Chip>
          ))}
        </ChipGroup>

        <ChipGroup label="Length">
          <Chip
            pressed={query.length === "all"}
            onClick={() => onChange({ ...query, length: "all" })}
          >
            {lengthLabel("all")}
          </Chip>
          {LENGTHS.map((value) => (
            <Chip
              key={value}
              pressed={query.length === value}
              onClick={() => onChange({ ...query, length: value })}
            >
              {lengthLabel(value)}
            </Chip>
          ))}
        </ChipGroup>

        <ChipGroup label="Origin">
          <Chip
            pressed={query.origin === "all"}
            onClick={() => onChange({ ...query, origin: "all" })}
          >
            {originLabel("all")}
          </Chip>
          {ORIGINS.map((value) => (
            <Chip
              key={value}
              pressed={query.origin === value}
              count={originCounts[value]}
              onClick={() => onChange({ ...query, origin: value })}
            >
              {originLabel(value)}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      {filtered ? (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters on
          </span>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onChange(clearFilter(query, chip.key))}
              className="inline-flex h-8 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 text-sm text-foreground outline-none hover:bg-primary/20 focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              {chip.label}
              <X className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Remove this filter</span>
            </button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-auto h-8 rounded-full px-3"
            onClick={() => onChange({ ...EMPTY_QUERY, sort: query.sort })}
          >
            Clear filters
          </Button>
        </div>
      ) : null}
    </section>
  );
}

function ChipGroup({ label, children }: { label: string; children: ReactNode }) {
  const labelId = useId();
  return (
    <div className="flex flex-col gap-2">
      <p id={labelId} className="text-sm font-medium">
        {label}
      </p>
      <div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function Chip({
  pressed,
  count,
  onClick,
  children,
}: {
  pressed: boolean;
  count?: number;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium outline-none transition-colors",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
        pressed
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-muted",
      )}
    >
      {children}
      {typeof count === "number" ? (
        <span
          className={cn(
            "text-xs tabular-nums",
            pressed ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
