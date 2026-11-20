import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './ListRowBlock.module.css';

export interface ListRowBlockProps {
  /** Figma `has Headline?` — shown when provided. */
  headline?: ReactNode;
  /** Figma `has Subheadline?` — shown when provided. */
  subheadline?: ReactNode;
  /** Figma `Divider` — bottom border under the block. Default: `false`. */
  divider?: boolean;
  /** Figma `Slot` — <ListRow> items. */
  children: ReactNode;
  className?: string;
}

/** List row block — Figma component set "List row block". */
export function ListRowBlock({ headline, subheadline, divider = false, children, className }: ListRowBlockProps) {
  return (
    <section className={cx(styles.block, divider && styles.divider, className)}>
      {headline != null && (
        <div className={styles.headline}>
          <h2 className={cx(styles.headlineText, 'type-heading-xs')}>{headline}</h2>
        </div>
      )}
      {subheadline != null && (
        <div className={styles.subheadline}>
          <p className="type-body-m">{subheadline}</p>
        </div>
      )}
      <ul className={styles.slot} role="list">
        {children}
      </ul>
    </section>
  );
}
