export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#names" className="flex items-center gap-2.5">
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
        <a
          href="#names"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse names
        </a>
      </div>
    </header>
  );
}
