import GameResult from 'components/game/GameResult';
import ModeSelect from 'components/mode/ModeSelect';
import styles from 'styles/game/GameResultItem.module.scss';

export default function Game() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Record</h1>
      <ModeSelect>
        <GameResult />
      </ModeSelect>
    </div>
  );
}
