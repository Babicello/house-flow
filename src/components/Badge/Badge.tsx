import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './Badge.module.css';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Badge — Figma "Badge" (Size=Small, State=Info), as used inside List row. */
export function Badge({ children, className }: BadgeProps) {
  return <span className={cx(styles.badge, 'type-body-xs', className)}>{children}</span>;
}
