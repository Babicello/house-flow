import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Button.module.css';

/** Figma property `type` */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'link'
  | 'link-inverted'
  | 'link-stable';

/** Figma property `Size` */
export type ButtonSize = 'x-small' | 'small' | 'medium' | 'large';

interface ButtonOwnProps {
  /** Figma `type`. Default: `primary`. */
  variant?: ButtonVariant;
  /** Figma `Size`. Default: `medium`. */
  size?: ButtonSize;
  /** Figma `Icon?` + `Icon` (instance swap). Leading icon; omit for no icon. */
  icon?: IconName;
  /** Stretch to the container width (max-width still applies). */
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type AsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { href?: undefined };
type AsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & { href: string };

export type ButtonProps = AsButton | AsLink;

/**
 * Button — Figma component set "Button".
 * `State` (Default / Hover / Disabled) maps to `:hover` and the `disabled` attribute.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'medium', icon, fullWidth, children, className, ...rest } = props;

  const classes = cx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      {icon && <Icon name={icon} />}
      <span className={styles.label}>{children}</span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
