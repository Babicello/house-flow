import { useEffect, useId, useLayoutEffect, useState, useSyncExternalStore, type RefObject } from 'react';

/**
 * iOS-style stacking for bottom sheets.
 *
 * Open sheets register here in order. When a sheet is presented on top of another:
 * - the top sheet grows to at least the height of the sheet below, so their tops line up;
 * - the sheet below is scaled down and lifted so only `SHEET_PEEK` px of it shows above.
 */

/** How much of a pushed-back sheet stays visible above the sheet on top of it. */
export const SHEET_PEEK = 20;
/** Scale applied to a pushed-back sheet. */
export const SHEET_PUSHED_SCALE = 0.92;
/** Shared by present, dismiss and push-back so all motion stays in sync (see --sheet-duration). */
export const SHEET_TRANSITION_MS = 320;

interface Entry {
  id: string;
  ref: RefObject<HTMLElement | null>;
}

let stack: Entry[] = [];
let version = 0;
const listeners = new Set<() => void>();
const emit = () => {
  version += 1;
  listeners.forEach((listener) => listener());
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export interface SheetStackLayout {
  /** Sheets stacked above this one (0 = top-most or closed). */
  sheetsAbove: number;
  /** Min height so this sheet's top lines up with the sheet below it. */
  minHeight?: number;
  /** Inline transform for a pushed-back sheet. */
  transform?: string;
}

const RESTING: SheetStackLayout = { sheetsAbove: 0 };

export function useSheetStack(open: boolean, ref: RefObject<HTMLElement | null>): SheetStackLayout {
  const id = useId();
  const stackVersion = useSyncExternalStore(
    subscribe,
    () => version,
    () => 0,
  );
  const [layout, setLayout] = useState<SheetStackLayout>(RESTING);

  // Register while open; re-measure the stack whenever this sheet resizes.
  useEffect(() => {
    if (!open) return;
    stack = [...stack, { id, ref }];
    emit();
    const element = ref.current;
    const observer = element ? new ResizeObserver(emit) : null;
    if (element) observer?.observe(element);
    return () => {
      observer?.disconnect();
      stack = stack.filter((entry) => entry.id !== id);
      emit();
    };
  }, [open, id, ref]);

  useLayoutEffect(() => {
    const index = stack.findIndex((entry) => entry.id === id);
    if (index === -1) {
      // Closed (or animating out): drop the push-back but keep the height so an exiting sheet doesn't jump.
      setLayout((current) =>
        current.sheetsAbove === 0 && !current.transform
          ? current
          : { sheetsAbove: 0, minHeight: current.minHeight },
      );
      return;
    }
    const own = ref.current;
    const below = index > 0 ? stack[index - 1].ref.current : null;
    const above = index < stack.length - 1 ? stack[index + 1].ref.current : null;

    const next: SheetStackLayout = { sheetsAbove: stack.length - 1 - index };
    if (below) next.minHeight = below.offsetHeight;
    if (above && own) {
      // Both sheets are bottom-anchored; lift this one so its top sits SHEET_PEEK px above the next.
      const tallerBy = Math.max(0, above.offsetHeight - own.offsetHeight);
      next.transform = `translateY(${-(SHEET_PEEK + tallerBy)}px) scale(${SHEET_PUSHED_SCALE})`;
    }

    setLayout((current) =>
      current.sheetsAbove === next.sheetsAbove &&
      current.minHeight === next.minHeight &&
      current.transform === next.transform
        ? current
        : next,
    );
  }, [stackVersion, id, ref]);

  return layout;
}
