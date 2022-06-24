import GameResult from '../components/game/GameResult';
import styles from './../styles/GameResultItem.module.scss';

export default function Game() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Current</h1>
      <GameResult />
    </div>
  );
}
