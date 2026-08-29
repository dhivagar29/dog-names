"use client";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium text-primary">Something went wrong</p>
      <h1 className="mt-4 font-heading text-4xl tracking-tight">
        The catalog did not load
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
        Nothing you saved is lost — favourites live in this browser, not on a
        server. Try again, and if it keeps failing, reload the page.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground outline-none transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/40"
      >
        Try again
      </button>
    </main>
  );
}
