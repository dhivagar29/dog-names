"use client";

import { useSyncExternalStore } from "react";

import {
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
} from "@/lib/shortlist";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#finder", label: "Find" },
  { href: "#names", label: "Browse" },
  { href: "#shortlist", label: "Shortlist" },
] as const;

export function SiteHeader() {
  const saved = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    emptyShortlist,
  );

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="h-1 bg-primary" aria-hidden="true" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                link.href === "#shortlist" && saved.length > 0
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                {link.label}
                {link.href === "#shortlist" && saved.length > 0 ? (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.7rem] leading-5 text-primary-foreground">
                    {saved.length}
                  </span>
                ) : null}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
