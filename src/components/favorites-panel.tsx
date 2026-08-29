"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Copy, Download, Heart, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { writeClipboard } from "@/lib/clipboard";
import { announceCopied } from "@/lib/copy-notice";
import { downloadText } from "@/lib/download";
import { genderLabel, originLabel, type DogName } from "@/lib/names";
import {
  clearShortlist,
  emptyShortlist,
  readShortlist,
  subscribeShortlist,
  toggleShortlist,
  writeShortlist,
} from "@/lib/shortlist";

type FavoritesPanelProps = {
  names: readonly DogName[];
};

export function FavoritesPanel({ names }: FavoritesPanelProps) {
  const [confirmingClear, setConfirmingClear] = useState(false);
  const saved = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    emptyShortlist,
  );

  const favorites = useMemo(
    () =>
      saved
        .map((slug) => names.find((item) => item.slug === slug))
        .filter((item): item is DogName => item !== undefined),
    [names, saved],
  );

  function copyOne(name: string) {
    announceCopied(`Copied ${name}`);
    void writeClipboard(name);
  }

  function copyAll() {
    announceCopied(
      favorites.length === 1 ? "Copied 1 name" : `Copied ${favorites.length} names`,
    );
    void writeClipboard(favorites.map((item) => item.name).join(", "));
  }

  function exportAll() {
    const body = favorites
      .map((item) => `${item.name} — ${originLabel(item.origin)} — ${item.meaning}`)
      .join("\n");
    downloadText("dog-name-favourites.txt", `${body}\n`);
  }

  return (
    <section
      id="favorites"
      aria-labelledby="favorites-heading"
      className="scroll-mt-24 rounded-3xl border border-primary/25 bg-primary/5 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="favorites-heading"
          className="flex items-center gap-2 font-heading text-2xl tracking-tight"
        >
          <Heart className="size-5 text-primary" aria-hidden="true" />
          Favourites
        </h2>
        {favorites.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            {favorites.length} saved on this device
          </p>
        ) : null}
      </div>

      {favorites.length === 0 ? (
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Nothing saved yet. Tap the heart on any card and it lands here, ready
          for the household vote. Favourites stay in this browser — no account,
          no sync, nothing sent anywhere.
        </p>
      ) : (
        <>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {favorites.map((item) => (
              <li
                key={item.slug}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-lg leading-tight tracking-tight">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {originLabel(item.origin)} · {genderLabel(item.gender)}
                  </p>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-9 shrink-0 rounded-full"
                  aria-label={`Copy ${item.name}`}
                  onClick={() => copyOne(item.name)}
                >
                  <Copy className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-9 shrink-0 rounded-full"
                  aria-label={`Remove ${item.name} from favourites`}
                  onClick={() => writeShortlist(toggleShortlist(saved, item.slug))}
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-full px-4"
              onClick={copyAll}
            >
              Copy the list
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-full px-4"
              onClick={exportAll}
            >
              <Download className="size-4" aria-hidden="true" />
              Download as text
            </Button>
            {confirmingClear ? (
              <span className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  className="h-10 rounded-full px-4"
                  onClick={() => {
                    clearShortlist();
                    setConfirmingClear(false);
                  }}
                >
                  Yes, clear them
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 rounded-full px-4"
                  onClick={() => setConfirmingClear(false)}
                >
                  Keep them
                </Button>
              </span>
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="h-10 rounded-full px-4"
                onClick={() => setConfirmingClear(true)}
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Clear favourites
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
