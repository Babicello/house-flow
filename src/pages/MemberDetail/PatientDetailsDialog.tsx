import { useEffect, useId, useState } from 'react';
import { BottomSheet, Button, Modal, ModalFooter, OptionsSheet } from '../../components';
import { MOBILE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery';
import { PatientDetailsForm, RELATION_OPTIONS, type PatientDetails } from './PatientDetailsForm';

export interface PatientDetailsDialogProps {
  open: boolean;
  /** App hero heading, e.g. "Spouse personal details". */
  heading: string;
  initialValues: PatientDetails;
  onClose: () => void;
  onSave: (values: PatientDetails) => void;
}

const TITLE = 'Personal information';

/**
 * "Patient details" editor: a Modal on desktop, a Bottom sheet on mobile / narrow viewports
 * (below the Figma Breakpoint "Mobile" threshold of 660px).
 */
export function PatientDetailsDialog({
  open,
  heading,
  initialValues,
  onClose,
  onSave,
}: PatientDetailsDialogProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const formId = useId();
  const [values, setValues] = useState(initialValues);
  const [relationPickerOpen, setRelationPickerOpen] = useState(false);

  // Reset the draft each time the dialog opens.
  useEffect(() => {
    if (open) setValues(initialValues);
    else setRelationPickerOpen(false);
  }, [open, initialValues]);

  const save = () => {
    onSave(values);
    onClose();
  };

  const form = (
    <PatientDetailsForm
      id={formId}
      heading={heading}
      values={values}
      onChange={setValues}
      onSubmit={save}
      layout={isMobile ? 'sheet' : 'modal'}
      onOpenRelationPicker={isMobile ? () => setRelationPickerOpen(true) : undefined}
    />
  );

  if (isMobile) {
    return (
      <>
        <BottomSheet
          open={open}
          onClose={onClose}
          header="minimal"
          title={TITLE}
          fullHeight
          footer={
            <Button type="submit" form={formId} variant="primary" size="large" fullWidth>
              Save
            </Button>
          }
        >
          {form}
        </BottomSheet>
        <OptionsSheet
          open={open && relationPickerOpen}
          onClose={() => setRelationPickerOpen(false)}
          title="Relation to patient"
          options={RELATION_OPTIONS}
          value={values.relation}
          onSelect={(relation) => setValues((current) => ({ ...current, relation }))}
        />
      </>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={TITLE}
      footer={
        <ModalFooter>
          <Button variant="secondary" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form={formId} variant="primary" size="large">
            Save
          </Button>
        </ModalFooter>
      }
    >
      {form}
    </Modal>
  );
}
