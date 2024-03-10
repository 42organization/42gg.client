import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import PartyCommentReportModal from '../Party/PartyCommentModal';

export default function PartyReport() {
  const { modalName, partyReport } = useRecoilValue(modalState);

  if (!modalName) {
    return null;
  }

}
