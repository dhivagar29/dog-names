"use client";

import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { Copy, Heart, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  filterNames,
  GENDERS,
  genderLabel,
  ORIGINS,
  originLabel,
  type DogName,
  type Gender,
  type Origin,
} from "@/lib/names";
import {
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
  writeShortlist,
} from "@/lib/shortlist";

const EXAMPLES = ["Luna", "snow", "norse"] as const;

type NameExplorerProps = {
  names: readonly DogName[];
};

export function NameExplorer({ names }: NameExplorerProps) {
  const [text, setText] = useState("");
  const [gender, setGender] = useState<Gender | "all">("all");
  const [origin, setOrigin] = useState<Origin | "all">("all");
  const [copied, setCopied] = useState<string | null>(null);
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

  function toggleSaved(slug: string) {
    writeShortlist(
      saved.includes(slug)
        ? saved.filter((item) => item !== slug)
        : [...saved, slug],
    );
  }

  async function copyName(name: string) {
    setCopied(name);
    window.setTimeout(() => {
      setCopied((current) => (current === name ? null : current));
    }, 1600);
    await writeClipboard(name);
  }

  return (
    <div id="names" className="flex scroll-mt-24 flex-col gap-8">
      <div className="rounded-3xl border border-border/80 bg-card/80 p-4 shadow-sm sm:p-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Search names, meanings, or tags</span>
          <span className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setText("");
                setGender("all");
                setOrigin("all");
              }}
            >
              Clear all
            </Button>
          </div>
        ) : null}
      </div>

      {shortlist.length > 0 ? (
        <section
          aria-label="Shortlist"
          className="rounded-3xl border border-primary/20 bg-primary/5 px-4 py-4 sm:px-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-heading text-xl tracking-tight">Your shortlist</h2>
            <p className="text-sm text-muted-foreground">
              {shortlist.length} {shortlist.length === 1 ? "name" : "names"}
            </p>
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

      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl tracking-tight">The catalog</h2>
          <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
            {matches.length === names.length
              ? `${matches.length} names`
              : `${matches.length} of ${names.length} names`}
          </p>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">
          Heart a name to keep it.
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-card px-5 py-14 text-center">
          <p className="font-heading text-2xl tracking-tight">Nothing in that mix</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Clear a filter or search a shorter word. Meanings work too, like
            moon or snow.
          </p>
          <Button
            type="button"
            className="mt-5 rounded-full"
            onClick={() => {
              setText("");
              setGender("all");
              setOrigin("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {matches.map((item) => (
            <li key={item.slug}>
              <NameCard
                name={item}
                saved={saved.includes(item.slug)}
                copied={copied === item.name}
                onToggle={() => toggleSaved(item.slug)}
                onCopy={() => copyName(item.name)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

async function writeClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to execCommand.
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(field);
  return ok;
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

function NameCard({
  name,
  saved,
  copied,
  onToggle,
  onCopy,
}: {
  name: DogName;
  saved: boolean;
  copied: boolean;
  onToggle: () => void;
  onCopy: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-[1.85rem] leading-none tracking-tight">
            {name.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {originLabel(name.origin)} · {name.name.length} letters ·{" "}
            {genderLabel(name.gender)}
          </p>
        </div>
        <Button
          type="button"
          size="icon"
          variant={saved ? "default" : "outline"}
          className="rounded-full"
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${name.name} from shortlist`
              : `Save ${name.name} to shortlist`
          }
          onClick={onToggle}
        >
          <Heart className={saved ? "size-4 fill-current" : "size-4"} />
        </Button>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6">{name.meaning}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {name.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-5 border-t border-border/70 pt-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={onCopy}
        >
          <Copy className="size-3.5" />
          {copied ? "Copied" : "Copy name"}
        </Button>
      </div>
    </article>
  );
}
