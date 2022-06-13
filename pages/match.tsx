import MatchBoardList from '../components/match/MatchBoardList';
import MatchEnrollModal from '../components/match/MatchEnrollModal';
import CurrentMatchInfo from '../components/match/CurrentMatchInfo';

export default function Match() {
  return (
    <div>
      <CurrentMatchInfo />
      <MatchBoardList type='single' />
      <MatchEnrollModal />
    </div>
  );
}
