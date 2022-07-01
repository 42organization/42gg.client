import MatchBoardList from 'components/match/MatchBoardList';
import MatchEnrollModal from 'components/modal/MatchEnrollModal';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  const manualPageHandler = () => {
    // 매뉴얼 구현시 연결
  };
  const refreshPageHandler = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnWrap}>
        <button className={styles.mamualBtn} onClick={manualPageHandler}>
          매뉴얼
        </button>
        <button className={styles.refreshBtn} onClick={refreshPageHandler}>
          &#8635;
        </button>
      </div>
      <h1 className={styles.title}>Match</h1>
      <MatchBoardList type='single' />
      <MatchEnrollModal />
    </div>
  );
}
