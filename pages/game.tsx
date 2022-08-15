import GameResult from 'components/game/GameResult';
import ModeSeasonProvider from 'components/mode/ModeSeasonProvider';
import styles from 'styles/game/GameResultItem.module.scss';

export default function Game() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Record</h1>
      <ModeSeasonProvider>
        <GameResult />
      </ModeSeasonProvider>
    </div>
  );
}
