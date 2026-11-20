import { cx } from '../../lib/cx';
import styles from './Radio.module.css';

export interface RadioProps {
  /** Figma `is Checked?` */
  checked?: boolean;
  className?: string;
}

/**
 * Radio — Figma component "Radio" (State=Enabled), visual indicator only.
 * Use inside an interactive parent (e.g. a ListRow of type `radio`) that carries the semantics.
 */
export function Radio({ checked = false, className }: RadioProps) {
  return <span className={cx(styles.radio, checked && styles.checked, className)} aria-hidden />;
}
