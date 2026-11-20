import { useState } from 'react';
import {
  AppFooter,
  AppHeader,
  AppHero,
  Button,
  ListRow,
  ListRowArtwork,
  ListRowBlock,
  type IconName,
} from '../../components';
import styles from './MemberDetail.module.css';
import { PatientDetailsDialog } from './PatientDetailsDialog';
import type { PatientDetails } from './PatientDetailsForm';

/** Initial state shown in the Figma Modal / Bottom sheet designs. */
const DEFAULT_PATIENT_DETAILS: PatientDetails = {
  firstName: '',
  lastName: '',
  relation: '',
  dateOfBirth: '',
  sexAtBirth: 'male',
};

interface Section {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
}

const SECTIONS: Section[] = [
  {
    id: 'patient-details',
    icon: 'user-circle',
    title: 'Patient details',
    subtitle: 'Name, Date of birth, Assigned sex at birth...',
  },
  {
    id: 'medical-information',
    icon: 'file-02',
    title: 'General and medical information',
    subtitle: 'Height, weight, medications, contitions...',
  },
  {
    id: 'preferred-pharmacy',
    icon: 'marker-pin-06',
    title: 'Preferred pharmacy',
    subtitle: 'Patient preferred pharmacy for pickup',
  },
  {
    id: 'insurance',
    icon: 'shield-tick',
    title: 'Insurance information',
    subtitle: 'Patient insurance information',
  },
  {
    id: 'home-address',
    icon: 'home-02',
    title: 'Home address',
    subtitle: 'Patients home address',
  },
];

export interface MemberDetailProps {
  memberName: string;
  onBack?: () => void;
  onOpenSection?: (sectionId: string) => void;
  onRemove?: () => void;
  onSavePatientDetails?: (values: PatientDetails) => void;
}

/** Figma frame "Member detail" (1762:38313). */
export function MemberDetail({
  memberName,
  onBack,
  onOpenSection,
  onRemove,
  onSavePatientDetails,
}: MemberDetailProps) {
  const [patientDetails, setPatientDetails] = useState(DEFAULT_PATIENT_DETAILS);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const openSection = (sectionId: string) => {
    if (sectionId === 'patient-details') setDetailsOpen(true);
    onOpenSection?.(sectionId);
  };

  return (
    <div className={styles.page}>
      <AppHeader userInitials="PT" userName="Patient" />

      <main className={styles.card}>
        <div className={styles.form}>
          <div className={styles.backRow}>
            <Button variant="secondary" size="small" icon="arrow-left" onClick={onBack}>
              Family members
            </Button>
          </div>

          <div className={styles.form}>
            <div className={styles.heroWrapper}>
              <AppHero heading={memberName} subheadline="Patient information" />
            </div>

            <div className={styles.listGroup}>
              <ListRowBlock>
                {SECTIONS.map((section, index) => (
                  <ListRow
                    key={section.id}
                    title={section.title}
                    subtitle={section.subtitle}
                    artwork={<ListRowArtwork type="icon" iconType="brand" icon={section.icon} />}
                    hasDisclosure
                    divider={index < SECTIONS.length - 1}
                    onClick={() => openSection(section.id)}
                  />
                ))}
              </ListRowBlock>

              <div className={styles.actions}>
                <Button variant="danger" size="large" icon="trash-01" fullWidth onClick={onRemove}>
                  Remove family member
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />

      <PatientDetailsDialog
        open={detailsOpen}
        heading="Spouse personal details"
        initialValues={patientDetails}
        onClose={() => setDetailsOpen(false)}
        onSave={(values) => {
          setPatientDetails(values);
          onSavePatientDetails?.(values);
        }}
      />
    </div>
  );
}
