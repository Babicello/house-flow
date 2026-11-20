import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './FieldHeader.module.css';

export interface FieldHeaderProps {
  /** Element the label is for. Omit when the header labels a group (use `labelId`). */
  htmlFor?: string;
  labelId?: string;
  descriptionId?: string;
  /** Figma `Title` (shown when provided — `Title?`). */
  title?: ReactNode;
  /** Figma `Optional?` */
  optional?: boolean;
  /** Figma `Description` (shown when provided — `Description?`). */
  description?: ReactNode;
  /** Title text style: Label M (inputs) or Label M Strong (chip group). */
  strong?: boolean;
  disabled?: boolean;
}

/** Shared "Header" block of text input / dropdown / chip group: title, optional marker, description. */
export function FieldHeader({
  htmlFor,
  labelId,
  descriptionId,
  title,
  optional,
  description,
  strong,
  disabled,
}: FieldHeaderProps) {
  if (title == null && description == null) return null;
  const Label = htmlFor ? 'label' : 'span';
  return (
    <div className={cx(styles.header, disabled && styles.disabled)}>
      {title != null && (
        <div className={styles.titleRow}>
          <Label
            id={labelId}
            htmlFor={htmlFor}
            className={cx(styles.title, strong ? 'type-label-m-strong' : 'type-label-m')}
          >
            {title}
          </Label>
          {optional && <span className={cx(styles.muted, 'type-label-s')}>Optional</span>}
        </div>
      )}
      {description != null && (
        <p id={descriptionId} className={cx(styles.muted, 'type-label-s')}>
          {description}
        </p>
      )}
    </div>
  );
}
