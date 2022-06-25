import MatchBoardList from '../components/match/MatchBoardList';
import MatchEnrollModal from '../components/modal/MatchEnrollModal';

export default function Match() {
  return (
    <div>
      <MatchBoardList type='single' />
      <MatchEnrollModal />
    </div>
  );
}
