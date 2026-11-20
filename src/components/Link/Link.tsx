import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import styles from './Link.module.css';

/** Figma property `Size` */
export type LinkSize = 'S' | 'M';
/**
 * Figma property `Type`: `Default` → `default`, `False` (inverted surfaces) → `inverted`, `Mute` → `mute`.
 */
export type LinkVariant = 'default' | 'inverted' | 'mute';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Figma `Size`. Default: `M`. */
  size?: LinkSize;
  /** Figma `Type`. Default: `default`. */
  variant?: LinkVariant;
}

/**
 * Link — Figma component set "Link". `State=Hover` maps to `:hover`.
 * Override the resting colour with the `--link-color` custom property.
 */
export function Link({ size = 'M', variant = 'default', className, children, ...rest }: LinkProps) {
  return (
    <a
      className={cx(
        styles.link,
        size === 'S' ? 'type-label-s-underline' : 'type-label-m-underline',
        styles[`variant-${variant}`],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
