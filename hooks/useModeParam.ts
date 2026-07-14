"use client";

import { useState, useEffect } from 'react';

// Replaces the old hash-based `?mode=xxx` detection (window.location.hash +
// hashchange listener) that every tool component used to read its sub-mode.
//
// Deliberately does NOT use next/navigation's useSearchParams(): calling that
// hook during render forces Next to bail the whole subtree to
// client-side-only rendering on prerendered (SSG) pages — the static HTML
// ends up as an empty <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">
// instead of the tool's actual content, which defeats the entire point of
// this migration (crawlers without JS would see nothing). Reading
// window.location.search in an effect instead lets the component render its
// default-mode content synchronously during SSR/SSG, then swap to the
// requested mode client-side after hydration if a ?mode= param is present —
// same behavior the old hash-based version had (also effect-driven).
export function useModeParam<T extends string>(validModes: readonly T[], defaultMode: T): T {
  const [mode, setMode] = useState<T>(defaultMode);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('mode');
    if (m && (validModes as readonly string[]).includes(m)) {
      setMode(m as T);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mode;
}
