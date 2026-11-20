import { cx } from '../../lib/cx';
import logoDark from '../../assets/brand/logo-dark.svg';
import logoLight from '../../assets/brand/logo-light.svg';
import logoSymbol from '../../assets/brand/logo-symbol.svg';
import styles from './Logo.module.css';

/** Figma property `Mode`. `auto` follows the active theme. */
export type LogoMode = 'light' | 'dark' | 'auto';
/**
 * Figma property `Type`. Only `default` and `symbol` are exported here;
 * the `Access` and `Benefits` variants are not part of this screen.
 */
export type LogoType = 'default' | 'symbol';

export interface LogoProps {
  /** Figma `Mode`. Default: `auto`. */
  mode?: LogoMode;
  /** Figma `Type`. Default: `default`. */
  type?: LogoType;
  /** Rendered height in px; width follows the artwork's aspect ratio. Default: 36. */
  height?: number;
  className?: string;
}

const ALT = 'DrHouse';

/** Logo — Figma component set "Logo". */
export function Logo({ mode = 'auto', type = 'default', height = 36, className }: LogoProps) {
  const style = { height };

  if (type === 'symbol') {
    return <img className={cx(styles.logo, className)} style={style} src={logoSymbol} alt={ALT} />;
  }
  if (mode !== 'auto') {
    return (
      <img
        className={cx(styles.logo, className)}
        style={style}
        src={mode === 'dark' ? logoDark : logoLight}
        alt={ALT}
      />
    );
  }
  return (
    <span className={cx(styles.auto, className)}>
      <img className={cx(styles.logo, styles.light)} style={style} src={logoLight} alt={ALT} />
      <img className={cx(styles.logo, styles.dark)} style={style} src={logoDark} alt="" aria-hidden />
    </span>
  );
}
