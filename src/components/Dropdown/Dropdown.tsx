import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../lib/cx';
import { DropdownList } from '../DropdownList/DropdownList';
import { FieldHeader } from '../FieldHeader/FieldHeader';
import { Icon } from '../Icon/Icon';
import { ListSingleSelect } from '../ListSingleSelect/ListSingleSelect';
import fieldStyles from '../TextInput/field.module.css';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  id?: string;
  options: DropdownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  /** Figma `Text` while nothing is chosen. */
  placeholder?: string;
  /** Figma `Title` / `Title?` */
  title?: ReactNode;
  /** Figma `Optional?` */
  optional?: boolean;
  /** Figma `Description` / `Description?` */
  description?: ReactNode;
  /** Figma `Error` — when set, renders `State=Error`. */
  error?: ReactNode;
  /** Figma `State=Disabled` */
  disabled?: boolean;
  /**
   * When set, the trigger calls this instead of opening the Dropdown List
   * (e.g. to present an options bottom sheet on mobile).
   */
  onOpenPicker?: () => void;
  className?: string;
}

/** Space between the field and the floating list. */
const LIST_GAP = 4;
/** Keep the list this far from the viewport edges. */
const VIEWPORT_MARGIN = 8;

/**
 * Dropdown — Figma component set "dropdown". Opens a "Dropdown List" of
 * "List-single-select" options anchored under the field (`State=Active` while open).
 * Keyboard: ↑/↓, Home/End, Enter/Space to choose, Escape/Tab to close.
 * (`is Searcheable?` is not implemented.)
 */
export function Dropdown({
  id,
  options,
  value,
  onValueChange,
  placeholder,
  title,
  optional,
  description,
  error,
  disabled,
  onOpenPicker,
  className,
}: DropdownProps) {
  const autoId = useId();
  const triggerId = id ?? autoId;
  const listId = `${triggerId}-listbox`;
  const descriptionId = description != null ? `${triggerId}-description` : undefined;
  const errorId = error != null ? `${triggerId}-error` : undefined;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : undefined;
  const isEmpty = selectedLabel === undefined;
  const optionId = (index: number) => `${listId}-option-${index}`;

  const close = useCallback(() => setExpanded(false), []);

  const open = () => {
    if (disabled) return;
    if (onOpenPicker) {
      onOpenPicker();
      return;
    }
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled(options, 0, 1));
    setExpanded(true);
  };

  const choose = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onValueChange?.(option.value);
    close();
  };

  // Show the list in the top layer (above any dialog) and keep it anchored to the field.
  useLayoutEffect(() => {
    const list = listRef.current;
    const trigger = triggerRef.current?.parentElement; // the bordered control
    if (!expanded || !list || !trigger) return;

    list.showPopover();
    const place = () => {
      const rect = trigger.getBoundingClientRect();
      const height = list.offsetHeight;
      const spaceBelow = window.innerHeight - rect.bottom - LIST_GAP - VIEWPORT_MARGIN;
      const spaceAbove = rect.top - LIST_GAP - VIEWPORT_MARGIN;
      const placeAbove = height > spaceBelow && spaceAbove > spaceBelow;
      list.style.left = `${rect.left}px`;
      list.style.width = `${rect.width}px`;
      list.style.top = placeAbove ? `${rect.top - LIST_GAP - height}px` : `${rect.bottom + LIST_GAP}px`;
      list.style.maxHeight = `${Math.max(120, placeAbove ? spaceAbove : spaceBelow)}px`;
      list.dataset.placement = placeAbove ? 'top' : 'bottom';
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      if (list.matches(':popover-open')) list.hidePopover();
    };
  }, [expanded]);

  // Close on a pointer press outside the field and the list.
  useEffect(() => {
    if (!expanded) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [expanded, close]);

  // Keep the keyboard-highlighted option in view.
  useEffect(() => {
    if (expanded && activeIndex >= 0) {
      document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
    }
  }, [expanded, activeIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (onOpenPicker) return;
    if (!expanded) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        open();
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => firstEnabled(options, index + 1, 1, index));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => firstEnabled(options, index - 1, -1, index));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(firstEnabled(options, 0, 1));
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(firstEnabled(options, options.length - 1, -1));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(activeIndex);
        break;
      case 'Escape':
        // Close only the list, not a surrounding dialog.
        event.preventDefault();
        event.stopPropagation();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  };

  return (
    <div className={cx(fieldStyles.field, error != null && fieldStyles.error, className)}>
      <FieldHeader
        htmlFor={triggerId}
        descriptionId={descriptionId}
        title={title}
        optional={optional}
        description={description}
        disabled={disabled}
      />
      <div
        className={cx(
          fieldStyles.control,
          styles.control,
          expanded && styles.expanded,
          disabled && fieldStyles.disabledControl,
        )}
      >
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          role={onOpenPicker ? undefined : 'combobox'}
          className={cx(fieldStyles.input, styles.trigger, isEmpty && styles.placeholder)}
          disabled={disabled}
          onClick={() => (expanded ? close() : open())}
          onKeyDown={onKeyDown}
          aria-haspopup={onOpenPicker ? 'dialog' : 'listbox'}
          aria-expanded={onOpenPicker ? undefined : expanded}
          aria-controls={onOpenPicker ? undefined : listId}
          aria-activedescendant={expanded && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-invalid={error != null || undefined}
          aria-describedby={cx(descriptionId, errorId) || undefined}
        >
          {selectedLabel ?? placeholder}
        </button>
        <Icon name="chevron-down-20" className={styles.chevron} />
      </div>

      {!onOpenPicker && (
        <DropdownList
          ref={listRef}
          id={listId}
          popover="manual"
          showScroll
          className={styles.popover}
          aria-labelledby={triggerId}
        >
          {options.map((option, index) => (
            <ListSingleSelect
              key={option.value}
              id={optionId(index)}
              label={option.label}
              selected={index === selectedIndex}
              active={index === activeIndex}
              disabled={option.disabled}
              onPointerEnter={() => setActiveIndex(index)}
              // Keep focus on the trigger while choosing with the pointer.
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            />
          ))}
        </DropdownList>
      )}

      {error != null && (
        <p id={errorId} className={cx(fieldStyles.errorText, 'type-body-s')}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Index of the next enabled option from `start` in `step` direction (clamped), or `fallback`. */
function firstEnabled(options: DropdownOption[], start: number, step: 1 | -1, fallback = -1): number {
  for (let index = start; index >= 0 && index < options.length; index += step) {
    if (!options[index].disabled) return index;
  }
  return fallback;
}
