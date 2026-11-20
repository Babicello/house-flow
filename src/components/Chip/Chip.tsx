import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import styles from './Chip.module.css';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma `Label` */
  label: string;
  /** Figma `Selected?` */
  selected?: boolean;
}

/**
 * Chip — Figma component set "Chip". `State=Hover` maps to `:hover`.
 * Rendered as a radio inside a <ChipGroup> (single choice).
 */
export function Chip({ label, selected = false, className, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={cx(styles.chip, selected && styles.selected, 'type-label-m', className)}
      {...rest}
    >
      {label}
    </button>
  );
}
