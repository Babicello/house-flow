import { MemberDetail } from './pages/MemberDetail/MemberDetail';

export function App() {
  return (
    <MemberDetail
      memberName="Emily Thomson"
      onBack={() => console.info('Navigate back to family members')}
      onOpenSection={(id) => console.info('Open section', id)}
      onRemove={() => console.info('Remove family member')}
      onSavePatientDetails={(values) => console.info('Save patient details', values)}
    />
  );
}
