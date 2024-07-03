import styles from 'styles/game/GameResultEmpty.module.scss';

interface GameResultEmptyItemProps {
  status: string;
}

export default function GameResultEmptyItem({
  status,
}: GameResultEmptyItemProps) {
  const message: { [key: string]: string[] } = {
    loading: ['Loading', '🤪', '로딩중'],
    success: ['Record', '🫥', '게임 결과가 없습니다.'],
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>{message[status][0]}</div>
      <div className={styles.emoji}>{message[status][1]}</div>
      <div>{message[status][2]}</div>
    </div>
  );
}
