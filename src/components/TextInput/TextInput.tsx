import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { FieldHeader } from '../FieldHeader/FieldHeader';
import styles from './field.module.css';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'title'> {
  /** Figma `Title` / `Title?` */
  title?: ReactNode;
  /** Figma `Optional?` */
  optional?: boolean;
  /** Figma `Description` / `Description?` */
  description?: ReactNode;
  /** Figma `Error` — when set, renders `State=Error`. */
  error?: ReactNode;
  /** Figma `Text` maps to `placeholder` (empty) or `value` (completed). */
  placeholder?: string;
}

/**
 * Text input — Figma component set "text input".
 * `State`: Enabled / Hover / Focus / Active / Completed come from the browser,
 * Error from `error`, Disabled from `disabled`, Read-only from `readOnly`.
 */
export function TextInput({
  id,
  title,
  optional,
  description,
  error,
  disabled,
  readOnly,
  className,
  ...rest
}: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description != null ? `${inputId}-description` : undefined;
  const errorId = error != null ? `${inputId}-error` : undefined;

  return (
    <div className={cx(styles.field, error != null && styles.error, className)}>
      <FieldHeader
        htmlFor={inputId}
        descriptionId={descriptionId}
        title={title}
        optional={optional}
        description={description}
        disabled={disabled}
      />
      <div
        className={cx(
          styles.control,
          disabled && styles.disabledControl,
          readOnly && styles.readOnlyControl,
        )}
      >
        <input
          id={inputId}
          className={styles.input}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error != null || undefined}
          aria-describedby={cx(descriptionId, errorId) || undefined}
          {...rest}
        />
      </div>
      {error != null && (
        <p id={errorId} className={cx(styles.errorText, 'type-body-s')}>
          {error}
        </p>
      )}
    </div>
  );
}
