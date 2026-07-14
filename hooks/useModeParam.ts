"use client";

import { useSearchParams } from 'next/navigation';

// Replaces the old hash-based `?mode=xxx` detection (window.location.hash +
// hashchange listener) that every tool component used to read its sub-mode.
// Tools now live at real routes (/outils/[tool]?mode=xxx), so the mode is a
// plain search param available on first render — no effect/listener needed.
export function useModeParam<T extends string>(validModes: readonly T[], defaultMode: T): T {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  return (validModes as readonly string[]).includes(mode ?? '') ? (mode as T) : defaultMode;
}
