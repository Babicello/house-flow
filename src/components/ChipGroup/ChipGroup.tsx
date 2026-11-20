import { useId, type ReactNode } from 'react';
import { Chip } from '../Chip/Chip';
import { FieldHeader } from '../FieldHeader/FieldHeader';
import styles from './ChipGroup.module.css';

export interface ChipGroupOption {
  value: string;
  label: string;
}

export interface ChipGroupProps {
  title: ReactNode;
  options: ChipGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Figma `Is Optional?` */
  optional?: boolean;
  /** Figma `Show description` — shown when provided. */
  description?: ReactNode;
  className?: string;
}

/** Chip group — Figma component "Chip group" (single choice). The `Slot` holds the chips. */
export function ChipGroup({ title, options, value, onChange, optional, description, className }: ChipGroupProps) {
  const labelId = useId();
  return (
    <div className={`${styles.group} ${className ?? ''}`}>
      <FieldHeader labelId={labelId} title={title} optional={optional} description={description} strong />
      <div className={styles.slot} role="radiogroup" aria-labelledby={labelId}>
        {options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={option.value === value}
            onClick={() => onChange?.(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
