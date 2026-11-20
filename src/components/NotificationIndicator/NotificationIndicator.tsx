import { cx } from '../../lib/cx';
import styles from './NotificationIndicator.module.css';

export interface NotificationIndicatorProps {
  /** Accessible label, e.g. "New updates". */
  label?: string;
  className?: string;
}

/** Notification indicator — Figma "Notification indicator" (Size=Small). */
export function NotificationIndicator({ label, className }: NotificationIndicatorProps) {
  return (
    <span
      className={cx(styles.indicator, className)}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
