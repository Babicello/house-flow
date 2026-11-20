import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './DropdownList.module.css';

export interface DropdownListProps extends HTMLAttributes<HTMLUListElement> {
  /** Figma `Slot` — <ListSingleSelect> options. */
  children: ReactNode;
  /** Figma `Show Scroll` — cap the height and scroll the options. Default: `false`. */
  showScroll?: boolean;
  /** Max height when `showScroll` is on. Default: 320px. */
  maxHeight?: number;
}

/** Dropdown List — Figma component "Dropdown List": the floating options panel. Renders `role="listbox"`. */
export const DropdownList = forwardRef<HTMLUListElement, DropdownListProps>(function DropdownList(
  { children, showScroll = false, maxHeight = 320, className, style, ...rest },
  ref,
) {
  return (
    <ul
      ref={ref}
      role="listbox"
      className={cx(styles.list, showScroll && styles.scroll, className)}
      style={showScroll ? { maxHeight, ...style } : style}
      {...rest}
    >
      {children}
    </ul>
  );
});
