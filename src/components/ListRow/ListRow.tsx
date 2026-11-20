import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Badge } from '../Badge/Badge';
import { Divider } from '../Divider/Divider';
import { Icon } from '../Icon/Icon';
import { NotificationIndicator } from '../NotificationIndicator/NotificationIndicator';
import styles from './ListRow.module.css';

/** Figma property `Type` */
export type ListRowType = 'default' | 'action' | 'radio' | 'checkbox' | 'toggle' | 'description';

export interface ListRowProps {
  /** Figma `Type`. Default: `default`. */
  type?: ListRowType;
  title: ReactNode;
  /** Figma `has Subtitle?` — shown when provided. */
  subtitle?: ReactNode;
  /** Figma `has Description?` — shown when provided. */
  description?: ReactNode;
  /** Figma `has Badge` — shown when provided. */
  badge?: ReactNode;
  /** Figma `has Value` — trailing value text, shown when provided. */
  value?: ReactNode;
  /** Figma `has Artwork?` + artwork slot — pass a <ListRowArtwork />. */
  artwork?: ReactNode;
  /** `action` type: trailing action label. */
  actionLabel?: ReactNode;
  /** `radio` / `checkbox` / `toggle` types: the trailing control element. */
  control?: ReactNode;
  /** Figma `has Disclosure?` — trailing chevron. Default: `true` for `default`, else `false`. */
  hasDisclosure?: boolean;
  /** Figma `has Notification?` */
  hasNotification?: boolean;
  /** Figma `has Highlight?` */
  hasHighlight?: boolean;
  /** Figma `Divider`. Default: `true`. */
  divider?: boolean;
  /** Figma `has Slot?` + `Slot` — extra content rendered below the row (e.g. a text field). */
  slot?: ReactNode;
  /** Figma `State=Selected`. */
  selected?: boolean;
  /** Makes the row interactive (renders a link). */
  href?: string;
  /** Makes the row interactive (renders a button). */
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

/**
 * List row — Figma component set "List row".
 * `State` (Enabled / Hover / Focus / Selected) maps to `:hover`, `:focus-visible` and `selected`.
 * Must be rendered inside a list (e.g. <ListRowBlock>).
 */
export function ListRow({
  type = 'default',
  title,
  subtitle,
  description,
  badge,
  value,
  artwork,
  actionLabel,
  control,
  hasDisclosure = type === 'default',
  hasNotification = false,
  hasHighlight = false,
  divider = true,
  slot,
  selected,
  href,
  onClick,
  className,
}: ListRowProps) {
  const isDescription = type === 'description';

  const rowContent = (
    <span className={cx(styles.container, control != null && styles.withControl)}>
      {artwork}
      <span className={styles.textAndTrailing}>
        <span className={styles.texts}>
          <span className={cx(styles.title, isDescription ? 'type-label-s' : 'type-label-m')}>{title}</span>
          {subtitle != null && (
            <span className={cx(styles.subtitle, isDescription ? 'type-body-m' : 'type-body-s')}>
              {subtitle}
            </span>
          )}
          {description != null && <span className={cx(styles.subtitle, 'type-body-xs')}>{description}</span>}
          {badge != null && (
            <span className={styles.badgeWrapper}>
              <Badge>{badge}</Badge>
            </span>
          )}
        </span>
        {hasNotification && <NotificationIndicator />}
        {value != null && <span className={cx(styles.value, 'type-body-s')}>{value}</span>}
        {type === 'action' && actionLabel != null && (
          <span className={cx(styles.actionLabel, 'type-label-s-strong')}>{actionLabel}</span>
        )}
        {(type === 'radio' || type === 'checkbox' || type === 'toggle') && control}
        {hasDisclosure && <Icon name="chevron-right-large" className={styles.disclosure} />}
      </span>
    </span>
  );

  const rowClass = cx(styles.row, (href || onClick) && styles.interactive);

  let row: ReactNode;
  if (href) {
    row = (
      <a className={rowClass} href={href} onClick={onClick} aria-current={selected ? 'true' : undefined}>
        {rowContent}
      </a>
    );
  } else if (onClick) {
    row = (
      <button type="button" className={rowClass} onClick={onClick} aria-pressed={selected}>
        {rowContent}
      </button>
    );
  } else {
    row = <div className={rowClass}>{rowContent}</div>;
  }

  return (
    <li className={cx(styles.listRow, hasHighlight && styles.highlight, className)}>
      <div className={cx(styles.body, divider && styles.withDivider)}>
        {row}
        {slot != null && <div className={styles.slot}>{slot}</div>}
      </div>
      {divider && (
        <div className={styles.divider}>
          <Divider />
        </div>
      )}
    </li>
  );
}
