import { cx } from '../../lib/cx';
import styles from './Divider.module.css';

export interface DividerProps {
  className?: string;
}

/** Horizontal divider — Figma "Horizontal divider". */
export function Divider({ className }: DividerProps) {
  return <hr className={cx(styles.divider, className)} />;
}
