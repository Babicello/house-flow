import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import shape from '../../assets/brand/list-icon-shape.svg';
import type { IconName } from '../Icon/Icon';
import { ListIcon, type ListIconType } from '../ListIcon/ListIcon';
import { NotificationIndicator } from '../NotificationIndicator/NotificationIndicator';
import styles from './ListRowArtwork.module.css';

/** Figma property `Type` (the `Duo Avatar` / `Duo Icon` variants are not implemented). */
export type ListRowArtworkType = 'icon' | 'slot' | 'round';

export interface ListRowArtworkProps {
  /** Figma `Type`. Default: `icon`. */
  type?: ListRowArtworkType;
  /** `icon` type: the glyph shown in the List Icon. */
  icon?: IconName;
  /** `icon` type: the nested List Icon `Type`. Default: `brand`. */
  iconType?: ListIconType;
  /** Figma `Img slot` — content for the `slot` (squircle) and `round` types, e.g. an <img>. */
  children?: ReactNode;
  /** Figma `has Notification?` */
  hasNotification?: boolean;
  className?: string;
}

const shapeStyle = { '--list-icon-shape': `url("${shape}")` } as CSSProperties;

/** _List row artwork — Figma component set "_List row artwork" (38×44 leading slot). */
export function ListRowArtwork({
  type = 'icon',
  icon,
  iconType = 'brand',
  children,
  hasNotification = false,
  className,
}: ListRowArtworkProps) {
  return (
    <span className={cx(styles.artwork, className)}>
      {type === 'icon' ? (
        <ListIcon type={iconType} icon={icon} />
      ) : (
        <span className={cx(styles.imgSlot, styles[`type-${type}`])} style={shapeStyle}>
          {children}
        </span>
      )}
      {hasNotification && <NotificationIndicator className={styles.notification} />}
    </span>
  );
}
