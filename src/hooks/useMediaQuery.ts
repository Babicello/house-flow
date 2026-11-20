import { useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Figma "Breakpoint" collection: Mobile mode applies below 660px. */
export const MOBILE_QUERY = '(max-width: 659px)';
