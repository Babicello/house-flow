import { useId, type ReactNode } from 'react';
import { useDialog } from '../../hooks/useDialog';
import { cx } from '../../lib/cx';
import { Icon } from '../Icon/Icon';
import styles from './Modal.module.css';

/** Keep in sync with --modal-duration. */
const MODAL_TRANSITION_MS = 180;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** `_Modal header` headline. */
  title: ReactNode;
  /** Figma `Slot` — modal body content. */
  children: ReactNode;
  /** Figma `Show footer` + `_Footer` — usually a <ModalFooter>. */
  footer?: ReactNode;
  /** Figma `Padding`. Default: `true`. */
  padding?: boolean;
  className?: string;
}

/** Modal — Figma component set "Modal" (desktop dialog). */
export function Modal({ open, onClose, title, children, footer, padding = true, className }: ModalProps) {
  const { ref, closing, dialogProps } = useDialog(open, onClose, { exitMs: MODAL_TRANSITION_MS });
  const titleId = useId();

  return (
    <dialog ref={ref} className={cx(styles.modal, closing && styles.closing, className)} aria-labelledby={titleId} {...dialogProps}>
      {(open || closing) && (
        <>
          <div className={styles.header}>
            <h2 id={titleId} className={cx(styles.title, 'type-heading-xs')}>
              {title}
            </h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
              <Icon name="x-close" />
            </button>
          </div>
          <div className={cx(styles.body, padding && styles.padded)}>
            <div className={styles.slot}>{children}</div>
          </div>
          {footer}
        </>
      )}
    </dialog>
  );
}

export interface ModalFooterProps {
  /** Right-aligned actions (e.g. Cancel + Save). */
  children: ReactNode;
  /** Figma `Left button` — left-aligned action (e.g. a danger button). */
  leftButton?: ReactNode;
  /** Figma `has Text?` — helper text next to the left button. */
  leftText?: ReactNode;
}

/** _Footer — Figma component "_Footer" used by Modal. */
export function ModalFooter({ children, leftButton, leftText }: ModalFooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.buttons}>
        {leftButton != null && (
          <div className={styles.left}>
            {leftButton}
            {leftText != null && <span className={cx(styles.leftText, 'type-body-xs')}>{leftText}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
