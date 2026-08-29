"use client";

import { useEffect, useMemo, useState } from "react";

import { FavoritesPanel } from "@/components/favorites-panel";
import { FilterPanel } from "@/components/filter-panel";
import { NameCard } from "@/components/name-card";
import { SurpriseDraw } from "@/components/surprise-draw";
import { Button } from "@/components/ui/button";
import {
  activeFilters,
  clearFilter,
  nameQuerySearch,
  parseNameQuery,
} from "@/lib/name-query";
import {
  countBy,
  EMPTY_QUERY,
  isFiltered,
  queryNames,
  type DogName,
  type NameQuery,
} from "@/lib/names";

const PAGE_SIZE = 60;

type NameExplorerProps = {
  names: readonly DogName[];
  initialQuery: NameQuery;
};

export function NameExplorer({ names, initialQuery }: NameExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const originCounts = useMemo(
    () => countBy(names, (item) => item.origin),
    [names],
  );
  const vibeCounts = useMemo(() => countBy(names, (item) => item.vibe), [names]);
  const matches = useMemo(() => queryNames(names, query), [names, query]);
  const filtered = isFiltered(query);

  function updateQuery(next: NameQuery) {
    setQuery(next);
    setVisible(PAGE_SIZE);
  }

  // Filters live in the URL so a search can be pasted into the group chat.
  useEffect(() => {
    const search = nameQuerySearch(query);
    const next = search ? `?${search}` : "";
    if (next === window.location.search) {
      return;
    }
    window.history.replaceState(null, "", `${window.location.pathname}${next}`);
  }, [query]);

  useEffect(() => {
    function onPop() {
      const params = new URLSearchParams(window.location.search);
      setQuery(
        parseNameQuery({
          q: params.get("q") ?? undefined,
          gender: params.get("gender") ?? undefined,
          origin: params.get("origin") ?? undefined,
          vibe: params.get("vibe") ?? undefined,
          length: params.get("length") ?? undefined,
          sort: params.get("sort") ?? undefined,
        }),
      );
      setVisible(PAGE_SIZE);
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

  const shown = matches.slice(0, visible);

  return (
    <div className="flex flex-col gap-8">
      <FilterPanel
        query={query}
        onChange={updateQuery}
        originCounts={originCounts}
        vibeCounts={vibeCounts}
      />

      <SurpriseDraw pool={matches} filtered={filtered} />

      <FavoritesPanel names={names} />

      <section id="catalog" aria-labelledby="catalog-heading" className="scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="catalog-heading" className="font-heading text-2xl tracking-tight">
              The catalog
            </h2>
            <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
              {filtered
                ? `${matches.length} of ${names.length} names match`
                : `${names.length} names, every one in real use`}
            </p>
          </div>
          {matches.length > shown.length ? (
            <p className="text-sm text-muted-foreground">
              Showing {shown.length}
            </p>
          ) : null}
        </div>

        {matches.length === 0 ? (
          <EmptyState query={query} onChange={updateQuery} />
        ) : (
          <>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((item) => (
                <li key={item.slug}>
                  <NameCard name={item} />
                </li>
              ))}
            </ul>
            {matches.length > shown.length ? (
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full px-6 text-base"
                  onClick={() => setVisible((count) => count + PAGE_SIZE)}
                >
                  Show {Math.min(PAGE_SIZE, matches.length - shown.length)} more
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}

function EmptyState({
  query,
  onChange,
}: {
  query: NameQuery;
  onChange: (next: NameQuery) => void;
}) {
  const chips = activeFilters(query);

  return (
    <div className="mt-6 rounded-3xl border border-dashed border-border bg-card px-5 py-12 text-center sm:py-16">
      <p className="font-heading text-2xl tracking-tight sm:text-3xl">
        No name survives that combination
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Every name here is a real one, so some mixes come up empty. Drop a
        filter below, or search a meaning instead — moon, wolf, snow and herb
        all return something.
      </p>
      {chips.length > 0 ? (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <Button
              key={chip.key}
              type="button"
              variant="outline"
              className="h-10 rounded-full px-4"
              onClick={() => onChange(clearFilter(query, chip.key))}
            >
              Drop {chip.label}
            </Button>
          ))}
        </div>
      ) : null}
      <div className="mt-4">
        <Button
          type="button"
          className="h-11 rounded-full px-6"
          onClick={() => onChange({ ...EMPTY_QUERY, sort: query.sort })}
        >
          Reset every filter
        </Button>
      </div>
    </div>
  );
}
