import type { CSSProperties } from 'react';
import { cx } from '../../lib/cx';
import { icons, type IconName } from './icons';
import styles from './Icon.module.css';

export type { IconName };

export interface IconProps {
  name: IconName;
  /** Accessible label. Omit for decorative icons (default). */
  label?: string;
  className?: string;
}

/**
 * Renders a Figma icon asset as a mask so its colour follows `currentColor`
 * (and therefore the colour tokens / theme) while keeping the exact geometry.
 */
export function Icon({ name, label, className }: IconProps) {
  const { src, size } = icons[name];
  const style = { '--icon-src': `url("${src}")`, width: size, height: size } as CSSProperties;
  return (
    <span
      className={cx(styles.icon, className)}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
