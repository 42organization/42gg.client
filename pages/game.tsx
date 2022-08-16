import GameResult from 'components/game/GameResult';
import ModeSeasonMineProvider from 'components/mode/ModeSeasonMineProvider';
import styles from 'styles/game/GameResultItem.module.scss';

export default function Game() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Record</h1>
      <ModeSeasonMineProvider>
        <GameResult />
      </ModeSeasonMineProvider>
    </div>
  );
}
