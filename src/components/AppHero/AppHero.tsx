import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './AppHero.module.css';

export interface AppHeroProps {
  heading: ReactNode;
  /** Figma `has Subheadline?` — shown when provided. */
  subheadline?: ReactNode;
  /** Figma `has Artwork?` — 48px artwork above the heading, shown when provided. */
  artwork?: ReactNode;
  /** Figma `has Filter?` — control aligned to the right of the heading, shown when provided. */
  filter?: ReactNode;
  className?: string;
}

/** App hero — Figma component "App hero". */
export function AppHero({ heading, subheadline, artwork, filter, className }: AppHeroProps) {
  return (
    <header className={cx(styles.hero, className)}>
      {artwork != null && <div className={styles.artwork}>{artwork}</div>}
      <div className={styles.texts}>
        <div className={styles.heading}>
          <h1 className={cx(styles.headingText, 'type-heading-s')}>{heading}</h1>
          {filter != null && <div className={styles.filter}>{filter}</div>}
        </div>
        {subheadline != null && <p className={cx(styles.subheadline, 'type-body-m')}>{subheadline}</p>}
      </div>
    </header>
  );
}
