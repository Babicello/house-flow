import { cx } from '../../lib/cx';
import styles from './Avatar.module.css';

/** Figma property `Type` */
export type AvatarType = 'photo' | 'initials-brand' | 'initials-alt';
/** Figma property `Size` */
export type AvatarSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface AvatarProps {
  /** Figma `Type`. Default: `initials-alt`. */
  type?: AvatarType;
  /** Figma `Size`. Default: `M` (36px). */
  size?: AvatarSize;
  /** Initials shown for `initials-*` types. */
  initials?: string;
  /** Image URL for the `photo` type. */
  src?: string;
  /** Accessible name (e.g. the person's full name). */
  alt?: string;
  className?: string;
}

/** Avatar — Figma component set "Avatar". */
export function Avatar({ type = 'initials-alt', size = 'M', initials, src, alt, className }: AvatarProps) {
  return (
    <span
      className={cx(styles.avatar, styles[`type-${type}`], styles[`size-${size}`], className)}
      role={type === 'photo' ? undefined : 'img'}
      aria-label={type === 'photo' ? undefined : alt}
    >
      {type === 'photo' ? (
        <img className={styles.photo} src={src} alt={alt ?? ''} />
      ) : (
        <span className={styles.initials} aria-hidden={alt ? true : undefined}>
          {initials}
        </span>
      )}
    </span>
  );
}
