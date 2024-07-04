import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/takgu/recoil/modal';
import TournamentManualModal from '../tournament/TournamentManualModal';
import TournamentRegistryModal from '../tournament/TournamentRegistryModal';

export default function TournamentModal() {
  const { modalName, tournamentInfo } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'TOURNAMENT-REGISTRY': tournamentInfo ? (
      <TournamentRegistryModal {...tournamentInfo} />
    ) : null,
    'TOURNAMENT-MANUAL': <TournamentManualModal />,
  };

  if (!modalName) return null;
  return content[modalName];
}
