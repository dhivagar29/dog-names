"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { Dices, Search, X } from "lucide-react";

import { NameCard } from "@/components/name-card";
import { Button } from "@/components/ui/button";
import { writeClipboard } from "@/lib/clipboard";
import { announceCopied } from "@/lib/copy-notice";
import {
  filterNames,
  GENDERS,
  genderLabel,
  ORIGINS,
  originLabel,
  type DogName,
  type Gender,
  type NameQuery,
  type Origin,
} from "@/lib/names";
import { nameQuerySearch, parseNameQuery } from "@/lib/name-query";
import {
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
  writeShortlist,
} from "@/lib/shortlist";

const EXAMPLES = ["Luna", "snow", "norse"] as const;

type NameExplorerProps = {
  names: readonly DogName[];
  initialQuery: NameQuery;
};

export function NameExplorer({ names, initialQuery }: NameExplorerProps) {
  const [text, setText] = useState(initialQuery.text);
  const [gender, setGender] = useState<Gender | "all">(initialQuery.gender);
  const [origin, setOrigin] = useState<Origin | "all">(initialQuery.origin);
  const [spotlight, setSpotlight] = useState<string | null>(null);
  const saved = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    emptyShortlist,
  );

  const matches = useMemo(
    () => filterNames(names, { text, gender, origin }),
    [names, text, gender, origin],
  );

  const shortlist = useMemo(
    () =>
      saved
        .map((slug) => names.find((item) => item.slug === slug))
        .filter((item): item is DogName => item !== undefined),
    [names, saved],
  );

  const filtered = gender !== "all" || origin !== "all" || text.trim().length > 0;

  useEffect(() => {
    const search = nameQuerySearch({ text, gender, origin });
    const next = search ? `?${search}` : "";
    if (next === window.location.search) {
      return;
    }
    window.history.replaceState(null, "", `${window.location.pathname}${next}`);
  }, [text, gender, origin]);

  useEffect(() => {
    function onPop() {
      const params = new URLSearchParams(window.location.search);
      const next = parseNameQuery({
        q: params.get("q") ?? undefined,
        gender: params.get("gender") ?? undefined,
        origin: params.get("origin") ?? undefined,
      });
      setText(next.text);
      setGender(next.gender);
      setOrigin(next.origin);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
          return;
        }
      }
      event.preventDefault();
      document.getElementById("name-search")?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!spotlight) {
      return;
    }
    const timeout = window.setTimeout(() => setSpotlight(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [spotlight]);

  function toggleSaved(slug: string) {
    writeShortlist(
      saved.includes(slug)
        ? saved.filter((item) => item !== slug)
        : [...saved, slug],
    );
  }

  function surprise() {
    if (matches.length === 0) {
      return;
    }
    const pick = matches[Math.floor(Math.random() * matches.length)];
    if (!pick) {
      return;
    }
    setSpotlight(pick.slug);
    window.requestAnimationFrame(() => {
      document.getElementById(`name-${pick.slug}`)?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    });
  }

  function resetFilters() {
    setText("");
    setGender("all");
    setOrigin("all");
  }

  function copyShortlist() {
    const label = shortlist.map((item) => item.name).join(", ");
    announceCopied("Copied shortlist");
    void writeClipboard(label);
  }

  return (
    <div id="names" className="flex scroll-mt-24 flex-col gap-8">
      <div className="rounded-3xl border border-border/80 bg-card/85 p-4 shadow-[0_18px_40px_-28px_oklch(0.35_0.05_50/0.45)] sm:p-6">
        <label className="flex flex-col gap-2">
          <span className="flex items-center justify-between gap-3 text-sm font-medium">
            Search names, meanings, or tags
            <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
              Press / to jump here
            </span>
          </span>
          <span className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="name-search"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Try moon, norse, or short"
              className="h-12 w-full rounded-2xl border border-input bg-background pr-11 pl-10 text-base outline-none transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              autoComplete="off"
              spellCheck={false}
            />
            {text ? (
              <button
                type="button"
                onClick={() => setText("")}
                className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </span>
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="self-center text-xs text-muted-foreground">Try</span>
          {EXAMPLES.map((example) => (
            <Button
              key={example}
              type="button"
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={() => setText(example)}
            >
              {example}
            </Button>
          ))}
        </div>

        <div className="mt-6 grid gap-5">
          <FilterRow label="Vibe">
            <FilterChip
              pressed={gender === "all"}
              onClick={() => setGender("all")}
            >
              All
            </FilterChip>
            {GENDERS.map((value) => (
              <FilterChip
                key={value}
                pressed={gender === value}
                onClick={() => setGender(value)}
              >
                {genderLabel(value)}
              </FilterChip>
            ))}
          </FilterRow>

          <FilterRow label="Origin">
            <FilterChip
              pressed={origin === "all"}
              onClick={() => setOrigin("all")}
            >
              All
            </FilterChip>
            {ORIGINS.map((value) => (
              <FilterChip
                key={value}
                pressed={origin === value}
                onClick={() => setOrigin(value)}
              >
                {originLabel(value)}
              </FilterChip>
            ))}
          </FilterRow>
        </div>

        {filtered ? (
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Filters are on.</p>
            <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
              Clear all
            </Button>
          </div>
        ) : null}
      </div>

      {shortlist.length > 0 ? (
        <section
          id="shortlist"
          aria-label="Shortlist"
          className="scroll-mt-24 rounded-3xl border border-primary/20 bg-primary/5 px-4 py-4 sm:px-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-xl tracking-tight">Your shortlist</h2>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {shortlist.length} {shortlist.length === 1 ? "name" : "names"}
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={copyShortlist}
              >
                Copy list
              </Button>
            </div>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {shortlist.map((item) => (
              <li key={item.slug}>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => toggleSaved(item.slug)}
                  aria-label={`Remove ${item.name} from shortlist`}
                >
                  {item.name}
                  <X className="size-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl tracking-tight">The catalog</h2>
          <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
            {matches.length === names.length
              ? `${matches.length} names`
              : `${matches.length} of ${names.length} names`}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={surprise}
          disabled={matches.length === 0}
        >
          <Dices className="size-4" />
          Surprise me
        </Button>
      </div>

      {matches.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-card px-5 py-14 text-center">
          <p className="font-heading text-2xl tracking-tight">Nothing in that mix</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Clear a filter or search a shorter word. Meanings work too, like moon or snow.
          </p>
          <Button type="button" className="mt-5 rounded-full" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {matches.map((item) => (
            <li key={item.slug}>
              <NameCard
                name={item}
                spotlight={spotlight === item.slug}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterRow({
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

function FilterChip({
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
