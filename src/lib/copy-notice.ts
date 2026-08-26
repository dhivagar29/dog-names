const COPIED_EVENT = "dog-names-copied";

export function announceCopied(label: string): void {
  window.dispatchEvent(new CustomEvent(COPIED_EVENT, { detail: label }));
}

export function subscribeCopied(onCopied: (label: string) => void): () => void {
  function onEvent(event: Event) {
    const label = (event as CustomEvent<string>).detail;
    if (typeof label === "string") {
      onCopied(label);
    }
  }
  window.addEventListener(COPIED_EVENT, onEvent);
  return () => window.removeEventListener(COPIED_EVENT, onEvent);
}
