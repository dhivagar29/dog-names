"use client";

import { useSyncExternalStore } from "react";
import { Dices, Heart, Search } from "lucide-react";

import {
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
} from "@/lib/shortlist";

const LINKS = [
  { href: "#find", label: "Search", icon: Search },
  { href: "#surprise", label: "Surprise", icon: Dices },
] as const;

export function SiteHeader() {
  const saved = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    emptyShortlist,
  );

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="h-1 bg-primary" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true">
              <circle cx="10" cy="12" r="3.2" fill="currentColor" />
              <circle cx="22" cy="12" r="3.2" fill="currentColor" />
              <circle cx="7" cy="19" r="2.4" fill="currentColor" />
              <circle cx="25" cy="19" r="2.4" fill="currentColor" />
              <ellipse cx="16" cy="21" rx="6.5" ry="5.5" fill="currentColor" />
            </svg>
          </span>
          <span className="font-heading text-lg tracking-tight">Dog Names</span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 sm:px-3"
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sr-only sm:hidden">{label}</span>
            </a>
          ))}
          <a
            href="#favorites"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 sm:px-3"
          >
            <Heart
              className={saved.length > 0 ? "size-4 fill-primary text-primary" : "size-4"}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Favourites</span>
            <span className="sr-only sm:hidden">Favourites</span>
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.7rem] leading-5 font-semibold text-primary-foreground tabular-nums">
              {saved.length}
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
