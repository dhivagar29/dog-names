export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80">
      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-8 text-sm text-muted-foreground sm:grid-cols-2 sm:px-6">
        <p>
          Dog Names. Built for the yell across the park, not the baby book.
        </p>
        <p className="sm:text-right">
          Favourites stay in this browser. Filters live in the URL, so you can
          paste a search to whoever else gets a vote.
        </p>
      </div>
    </footer>
  );
}
