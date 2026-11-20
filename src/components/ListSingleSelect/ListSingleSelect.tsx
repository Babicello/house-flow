import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './ListSingleSelect.module.css';

export interface ListSingleSelectProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  /** Figma `Label` */
  label: ReactNode;
  /** Figma `Sub` / `has Subheadline?` — shown when provided. */
  sub?: ReactNode;
  /** Figma `Has Icon` + `Instance` — leading icon. */
  icon?: IconName;
  /** Figma `State=Selected` — shows the check indication. */
  selected?: boolean;
  /** Figma `State=Hover` / `Focus` — the option highlighted by pointer or keyboard. */
  active?: boolean;
  /** Figma `State=Disabled` */
  disabled?: boolean;
}

/**
 * List-single-select — Figma component set "List-single-select" (Type=Single):
 * one option inside a <DropdownList>. Renders `role="option"`.
 */
export function ListSingleSelect({
  label,
  sub,
  icon,
  selected = false,
  active = false,
  disabled = false,
  className,
  ...rest
}: ListSingleSelectProps) {
  return (
    <li
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      className={cx(
        styles.option,
        selected && styles.selected,
        active && !disabled && styles.active,
        disabled && styles.disabled,
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} className={styles.leading} />}
      <span className={styles.texts}>
        <span className="type-label-m">{label}</span>
        {sub != null && <span className={cx(styles.sub, 'type-body-s')}>{sub}</span>}
      </span>
      {selected && <Icon name="check" className={styles.check} />}
    </li>
  );
}
