import type { CSSProperties } from 'react';
import { cx } from '../../lib/cx';
import shape from '../../assets/brand/list-icon-shape.svg';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './ListIcon.module.css';

/** Figma property `Type` */
export type ListIconType = 'brand' | 'accent' | 'neutral' | 'empty';

export interface ListIconProps {
  /** Figma `Type`. Default: `brand`. `empty` renders the shape only. */
  type?: ListIconType;
  /** Figma `Instance` (instance swap) — the 24px glyph. Ignored for `empty`. */
  icon?: IconName;
  className?: string;
}

const shapeStyle = { '--list-icon-shape': `url("${shape}")` } as CSSProperties;

/** List Icon — Figma component set "List Icon" (40×40 squircle with a 24px glyph). */
export function ListIcon({ type = 'brand', icon, className }: ListIconProps) {
  return (
    <span className={cx(styles.listIcon, styles[`type-${type}`], className)} aria-hidden>
      <span className={styles.shape} style={shapeStyle} />
      {type !== 'empty' && icon && <Icon name={icon} className={styles.glyph} />}
    </span>
  );
}
