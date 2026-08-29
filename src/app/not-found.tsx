import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-4 font-heading text-4xl tracking-tight">
        No page by that name
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
        The whole site is one page: search, filters, a surprise draw and your
        favourites all live there.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground outline-none transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/40"
      >
        Back to the names
      </Link>
    </main>
  );
}
