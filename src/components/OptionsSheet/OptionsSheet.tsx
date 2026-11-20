import { useEffect, useRef } from 'react';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import { ListRow } from '../ListRow/ListRow';
import { Radio } from '../Radio/Radio';
import styles from './OptionsSheet.module.css';

export interface OptionsSheetOption {
  value: string;
  label: string;
}

export interface OptionsSheetProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the sheet (the minimal header has no visible title). */
  title: string;
  options: OptionsSheetOption[];
  value?: string;
  onSelect: (value: string) => void;
}

/** Delay before closing so the checked radio is visible, as on iOS. */
const CLOSE_DELAY_MS = 180;

/**
 * Single-choice picker presented as a bottom sheet (Figma 1677:45297):
 * minimal header, `Padding=False`, List rows of type `radio`.
 * Opening it from another sheet pushes that sheet back.
 */
export function OptionsSheet({ open, onClose, title, options, value, onSelect }: OptionsSheetProps) {
  const closeTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const choose = (next: string) => {
    onSelect(next);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(onClose, CLOSE_DELAY_MS);
  };

  return (
    <BottomSheet open={open} onClose={onClose} header="minimal" title={title} padding={false}>
      <ul className={styles.list} role="list">
        {options.map((option) => (
          <ListRow
            key={option.value}
            type="radio"
            title={option.label}
            control={<Radio checked={option.value === value} />}
            selected={option.value === value}
            onClick={() => choose(option.value)}
          />
        ))}
      </ul>
    </BottomSheet>
  );
}
