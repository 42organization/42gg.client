import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import TournamentRegistryModal from '../tournament/TournamentRegistryModal';

export default function TournamentModal() {
  const { modalName, tournamentInfo } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'TOURNAMENT-REGISTRY': tournamentInfo ? (
      <TournamentRegistryModal {...tournamentInfo} />
    ) : null,
  };

  if (!modalName) return null;
  return content[modalName];
}
