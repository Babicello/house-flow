import type { FormEvent } from 'react';
import { AppHero, Asset, ChipGroup, Dropdown, TextInput } from '../../components';
import { cx } from '../../lib/cx';
import styles from './PatientDetailsForm.module.css';

export interface PatientDetails {
  firstName: string;
  lastName: string;
  relation: string;
  dateOfBirth: string;
  sexAtBirth: string;
}

/** Options from the Figma relation picker (1677:45297). */
export const RELATION_OPTIONS = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'child', label: 'Child' },
  { value: 'parent', label: 'Parent' },
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
];

const SEX_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

/** Formats typed digits as MM/DD/YYYY. */
function formatDate(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join('/');
}

export interface PatientDetailsFormProps {
  id: string;
  heading: string;
  values: PatientDetails;
  onChange: (values: PatientDetails) => void;
  onSubmit: () => void;
  /** Spacing differs between the Modal (16px) and Bottom sheet (24px) slots in Figma. */
  layout: 'modal' | 'sheet';
  /** When set, the relation field opens a custom picker instead of the native select. */
  onOpenRelationPicker?: () => void;
}

/** Slot content shared by the Modal and Bottom sheet "Personal information" designs. */
export function PatientDetailsForm({
  id,
  heading,
  values,
  onChange,
  onSubmit,
  layout,
  onOpenRelationPicker,
}: PatientDetailsFormProps) {
  const set = <K extends keyof PatientDetails>(key: K, value: PatientDetails[K]) =>
    onChange({ ...values, [key]: value });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form id={id} className={cx(styles.form, styles[layout])} onSubmit={handleSubmit} noValidate>
      <AppHero heading={heading} artwork={<Asset type="user" />} />
      <div className={styles.fields}>
        <TextInput
          title="First name"
          placeholder="First name"
          autoComplete="given-name"
          value={values.firstName}
          onChange={(e) => set('firstName', e.target.value)}
        />
        <TextInput
          title="Last name"
          placeholder="Last name"
          autoComplete="family-name"
          value={values.lastName}
          onChange={(e) => set('lastName', e.target.value)}
        />
        <Dropdown
          title="Relation to patient"
          placeholder="Choose Relation"
          options={RELATION_OPTIONS}
          value={values.relation}
          onValueChange={(relation) => set('relation', relation)}
          onOpenPicker={onOpenRelationPicker}
        />
        <TextInput
          title="Date of Birth"
          description="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
          inputMode="numeric"
          autoComplete="bday"
          value={values.dateOfBirth}
          onChange={(e) => set('dateOfBirth', formatDate(e.target.value))}
        />
        <ChipGroup
          title="Assigned sex at birth"
          options={SEX_OPTIONS}
          value={values.sexAtBirth}
          onChange={(value) => set('sexAtBirth', value)}
        />
      </div>
    </form>
  );
}
