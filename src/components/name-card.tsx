"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Copy, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { writeClipboard } from "@/lib/clipboard";
import { announceCopied } from "@/lib/copy-notice";
import {
  genderLabel,
  nameLength,
  originLabel,
  vibeLabel,
  type DogName,
} from "@/lib/names";
import {
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
  toggleShortlist,
  writeShortlist,
} from "@/lib/shortlist";
import { cn } from "@/lib/utils";

type NameCardTone = "default" | "featured" | "draw";

type NameCardProps = {
  name: DogName;
  tone?: NameCardTone;
  eyebrow?: string;
  htmlId?: string;
};

export function NameCard({
  name,
  tone = "default",
  eyebrow,
  htmlId,
}: NameCardProps) {
  const [copied, setCopied] = useState(false);
  const savedList = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    emptyShortlist,
  );
  const saved = savedList.includes(name.slug);
  const large = tone !== "default";

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = window.setTimeout(() => setCopied(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function handleCopy() {
    setCopied(true);
    announceCopied(`Copied ${name.name}`);
    // Deferred so the button repaints before the clipboard shim steals focus.
    window.setTimeout(() => {
      void writeClipboard(name.name);
    }, 0);
  }

  return (
    <article
      id={htmlId ?? `name-${name.slug}`}
      data-gender={name.gender}
      data-tone={tone}
      className={cn(
        "name-card group/card relative flex scroll-mt-28 flex-col rounded-3xl border border-border/80 bg-card p-5 transition-shadow",
        // Grid cards stretch to fill their row; the hero and draw cards hug their content.
        tone === "default" ? "h-full" : "self-start",
        "shadow-[0_1px_0_oklch(0.4_0.04_50/0.06),0_18px_40px_-24px_oklch(0.35_0.05_50/0.35)]",
        "hover:shadow-[0_1px_0_oklch(0.4_0.04_50/0.08),0_26px_50px_-24px_oklch(0.35_0.05_50/0.45)]",
        large && "p-6 sm:p-7",
        tone === "draw" && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : (
        <span
          className="absolute top-3 left-1/2 size-2.5 -translate-x-1/2 rounded-full border border-border bg-muted"
          aria-hidden="true"
        />
      )}

      <div className={cn("flex items-start justify-between gap-3", eyebrow ? "mt-3" : "mt-3")}>
        <div className="min-w-0">
          <h3
            className={cn(
              "font-heading leading-none tracking-tight break-words",
              large ? "text-[2.6rem] sm:text-5xl" : "text-[1.85rem]",
            )}
          >
            {name.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {originLabel(name.origin)} · {genderLabel(name.gender)} ·{" "}
            {name.name.length} letters
          </p>
        </div>
        <Button
          type="button"
          size="icon-lg"
          variant={saved ? "default" : "outline"}
          className="size-11 shrink-0 rounded-full"
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${name.name} from favourites`
              : `Save ${name.name} to favourites`
          }
          onClick={() => writeShortlist(toggleShortlist(savedList, name.slug))}
        >
          <Heart className={cn("size-5", saved && "fill-current")} />
        </Button>
      </div>

      <p className={cn("mt-4 flex-1 text-sm leading-6", large && "text-base leading-7")}>
        {name.meaning}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        <li>
          <Badge variant="secondary">{vibeLabel(name.vibe)}</Badge>
        </li>
        <li>
          <Badge variant="outline">{nameLength(name.name)}</Badge>
        </li>
        {name.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-border/70 pt-4">
        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full border text-sm font-medium outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
            copied
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background hover:bg-muted",
          )}
          data-copy="name"
          data-copied={copied ? "true" : "false"}
          onClick={handleCopy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? `Copied ${name.name}` : `Copy ${name.name}`}
        </button>
      </div>
    </article>
  );
}
