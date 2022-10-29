import GameResult from 'components/game/GameResult';
import GameMode from 'components/mode/GameMode';
import styles from 'styles/game/GameResultItem.module.scss';

export default function Game() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Record</h1>
      <GameMode>
        <GameResult />
      </GameMode>
    </div>
  );
}
