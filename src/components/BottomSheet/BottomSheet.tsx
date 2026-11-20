import { useId, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { useDialog } from '../../hooks/useDialog';
import { SHEET_TRANSITION_MS, useSheetStack } from '../../hooks/useSheetStack';
import { cx } from '../../lib/cx';
import { Icon } from '../Icon/Icon';
import styles from './BottomSheet.module.css';

/** Figma property `Header` */
export type BottomSheetHeader = 'default' | 'minimal';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** Figma `Header`. `minimal` shows only the drag handle. Default: `default`. */
  header?: BottomSheetHeader;
  /** Header title (`default` header), also the dialog's accessible name. */
  title: string;
  /** Figma `has Subtitle?` — shown when provided (`default` header). */
  subtitle?: ReactNode;
  /** Figma `has Action?` — trailing label button in the `default` header. */
  action?: { label: string; onClick: () => void };
  /** Figma `Slot` */
  children: ReactNode;
  /** Figma `has Footer?` — footer button group content. */
  footer?: ReactNode;
  /** Figma `has Footer Subtitle?` — shown when provided. */
  footerSubtitle?: ReactNode;
  /** Figma `Padding`. Default: `true`. */
  padding?: boolean;
  className?: string;
}

const DISMISS_DISTANCE = 96;

/**
 * Bottom sheet — Figma component set "Bottom sheet" (mobile drawer).
 * Closes on Escape, backdrop tap, the close button, or dragging the handle down.
 * When another sheet opens on top, this one is pushed back like iOS: only its top edge
 * (`SHEET_PEEK` px) stays visible above the new sheet.
 * (`is Searcheable?` is not implemented.)
 */
export function BottomSheet({
  open,
  onClose,
  header = 'default',
  title,
  subtitle,
  action,
  children,
  footer,
  footerSubtitle,
  padding = true,
  className,
}: BottomSheetProps) {
  const { ref, closing, dialogProps } = useDialog(open, onClose, { exitMs: SHEET_TRANSITION_MS });
  const stackLayout = useSheetStack(open, ref);
  const titleId = useId();
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef<number | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    setDragY(Math.max(0, event.clientY - dragStart.current));
  };
  const onPointerUp = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (dragY > DISMISS_DISTANCE) onClose();
    setDragY(0);
  };

  return (
    <dialog
      ref={ref}
      className={cx(
        styles.sheet,
        stackLayout.sheetsAbove > 0 && styles.pushedBack,
        closing && styles.closing,
        dragY > 0 && styles.dragging,
        className,
      )}
      style={{
        minHeight: stackLayout.minHeight,
        transform: dragY > 0 ? `translateY(${dragY}px)` : stackLayout.transform,
      }}
      aria-labelledby={header === 'default' ? titleId : undefined}
      aria-label={header === 'minimal' ? title : undefined}
      {...dialogProps}
    >
      {(open || closing) && (
        <>
          <div className={cx(styles.header, header === 'default' && styles.headerDefault)}>
            <div
              className={styles.dragHandle}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              aria-hidden
            >
              <span className={styles.grabber} />
            </div>
            {header === 'default' && (
              <div className={styles.titleRow}>
                <button type="button" className={styles.sheetButton} onClick={onClose} aria-label="Close">
                  <Icon name="x-close" />
                </button>
                <div className={styles.titles}>
                  <h2 id={titleId} className={cx(styles.title, 'type-heading-xs')}>
                    {title}
                  </h2>
                  {subtitle != null && <p className={cx(styles.subtitle, 'type-body-xs')}>{subtitle}</p>}
                </div>
                {action ? (
                  <button
                    type="button"
                    className={cx(styles.sheetButton, styles.sheetButtonLabel, 'type-label-s-strong')}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ) : (
                  <span className={styles.spacer} />
                )}
              </div>
            )}
          </div>

          <div className={cx(styles.content, footer == null && styles.contentSafeArea)}>
            <div className={cx(styles.slot, padding ? styles.padded : styles.unpadded)}>{children}</div>
          </div>

          {footer != null && (
            <div className={styles.footer}>
              <div className={styles.buttonGroup}>
                {footer}
                {footerSubtitle != null && (
                  <p className={cx(styles.footerSubtitle, 'type-body-xs')}>{footerSubtitle}</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </dialog>
  );
}
