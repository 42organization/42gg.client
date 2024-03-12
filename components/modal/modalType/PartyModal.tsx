import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { PartyReportModal } from '../party/PartyReportModal';

export default function PartyModal() {
  const { modalName, partyReport } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'PARTY-REPORT': partyReport ? (
      <PartyReportModal report={partyReport} />
    ) : null,
  };

  if (!modalName) return null;
  return content[modalName];
}
