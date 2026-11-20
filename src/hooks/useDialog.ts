import { useEffect, useRef, useState, type MouseEvent, type SyntheticEvent } from 'react';

interface UseDialogOptions {
  /**
   * Exit transition length in ms. While it runs the dialog stays in the top layer with
   * `closing === true` so CSS can animate it out; then it is actually closed.
   */
  exitMs?: number;
}

/**
 * Drives a native <dialog> as a modal: opens with showModal() (focus trap, top layer,
 * Escape handling) and reports close requests from Escape or a backdrop click.
 */
export function useDialog(open: boolean, onClose: () => void, { exitMs = 0 }: UseDialogOptions = {}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      setClosing(false);
      if (!dialog.open) {
        dialog.showModal();
        // Focus the dialog itself (it is labelled) rather than auto-focusing the close button.
        dialog.focus();
      }
      return;
    }

    if (!dialog.open) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!exitMs || reduceMotion) {
      dialog.close();
      return;
    }
    setClosing(true);
    const timer = window.setTimeout(() => {
      dialog.close();
      setClosing(false);
    }, exitMs);
    return () => window.clearTimeout(timer);
  }, [open, exitMs]);

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  // A click whose target is the <dialog> itself landed on the ::backdrop.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return { ref, closing, dialogProps: { onCancel, onClick, tabIndex: -1 } };
}
