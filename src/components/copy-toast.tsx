"use client";

import { useEffect, useState } from "react";

import { subscribeCopied } from "@/lib/copy-notice";

export function CopyToast() {
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    return subscribeCopied((label) => {
      setNotice(label);
    });
  }, []);

  useEffect(() => {
    if (!notice) {
      return;
    }
    const timeout = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  if (!notice) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
    >
      <p className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
        {notice}
      </p>
    </div>
  );
}
