import styles from 'styles/game/GameResultEmpty.module.scss';

export default function GameResultEmptyArray() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Record</div>
      <div className={styles.emoji}>🤔</div>
      <div>게임 결과가 없습니다.</div>
    </div>
  );
}
