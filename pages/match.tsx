import MatchBoardList from '../components/match/MatchBoardList';
import MatchEnrollModal from '../components/modal/MatchEnrollModal';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Match</h1>
      <MatchBoardList type='single' />
      <MatchEnrollModal />
    </div>
  );
}
