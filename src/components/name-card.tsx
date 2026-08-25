"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Copy, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { writeClipboard } from "@/lib/clipboard";
import { announceCopied } from "@/lib/copy-notice";
import {
  genderLabel,
  originLabel,
  type DogName,
} from "@/lib/names";
import {
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
  writeShortlist,
} from "@/lib/shortlist";
import { cn } from "@/lib/utils";

type NameCardProps = {
  name: DogName;
  featured?: boolean;
  spotlight?: boolean;
  htmlId?: string;
};

export function NameCard({
  name,
  featured = false,
  spotlight = false,
  htmlId,
}: NameCardProps) {
  const [copied, setCopied] = useState(false);
  const savedList = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    emptyShortlist,
  );
  const saved = savedList.includes(name.slug);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = window.setTimeout(() => setCopied(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function toggleSaved() {
    writeShortlist(
      saved
        ? savedList.filter((item) => item !== name.slug)
        : [...savedList, name.slug],
    );
  }

  function handleCopy() {
    setCopied(true);
    announceCopied(`Copied ${name.name}`);
    window.setTimeout(() => {
      void writeClipboard(name.name);
    }, 0);
  }

  return (
    <article
      id={htmlId ?? `name-${name.slug}`}
      data-gender={name.gender}
      data-spotlight={spotlight ? "true" : "false"}
      className={cn(
        "name-card relative flex h-full flex-col rounded-3xl border border-border/80 bg-card p-5 shadow-[0_1px_0_oklch(0.4_0.04_50/0.06),0_18px_40px_-24px_oklch(0.35_0.05_50/0.35)]",
        featured && "p-6 sm:p-7",
        spotlight && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
    >
      {featured ? (
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
          Park name today
        </p>
      ) : (
        <span
          className="absolute top-3 left-1/2 size-2.5 -translate-x-1/2 rounded-full border border-border bg-muted"
          aria-hidden="true"
        />
      )}

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3
            className={cn(
              "font-heading leading-none tracking-tight",
              featured ? "text-[2.6rem] sm:text-6xl" : "text-[1.85rem]",
            )}
          >
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
          onClick={toggleSaved}
        >
          <Heart className={saved ? "size-4 fill-current" : "size-4"} />
        </Button>
      </div>

      <p className={cn("mt-4 flex-1 text-sm leading-6", featured && "text-base leading-7")}>
        {name.meaning}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {name.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-5 border-t border-border/70 pt-4">
        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full border text-sm font-medium outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
            copied
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background hover:bg-muted",
          )}
          data-copy="name"
          data-copied={copied ? "true" : "false"}
          aria-live="polite"
          onClick={handleCopy}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? `Copied ${name.name}` : "Copy name"}
        </button>
      </div>
    </article>
  );
}
