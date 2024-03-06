import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import PartyCommentReportModal from '../Party/PartyCommentModal';

export default function PartyReport() {
  const { modalName, partyReport } = useRecoilValue(modalState);

  if (!modalName) {
    return null;
  }

  // const content: { [key: string]: JSX.Element | null } = {
  //   NO_SHOW: <PartyNoShowReportModal partyReport={partyReport} />,
  //   COMMENT: <PartyCommentReportModal partyReport={partyReport} />,
  //   ROOM: <PartyRoomReportModal partyReport={partyReport} />,
  // };

  // return content[modalName];
}
