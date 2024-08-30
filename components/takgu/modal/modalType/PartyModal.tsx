import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/takgu/modal';
import PartyManudalModal from '../party/PartyManualModal';
import { PartyReportModal } from '../party/PartyReportModal';

export default function PartyModal() {
  const { modalName, partyReport } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'PARTY-REPORT': partyReport ? (
      <PartyReportModal report={partyReport} />
    ) : null,
    'PARTY-MANUAL': <PartyManudalModal />,
  };

  if (!modalName) return null;
  return content[modalName];
}
