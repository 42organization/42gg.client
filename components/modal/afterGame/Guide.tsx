import styles from 'styles/modal/AfterGameModal.module.scss';

export default function Guide({
  condition,
  trueStr,
  falseStr,
}: {
  condition: boolean;
  trueStr: string;
  falseStr: string;
}) {
  return (
    <div className={styles.phrase}>
      <div className={styles.emoji}>✅</div>
      <div>{condition ? trueStr : falseStr}</div>
    </div>
  );
}
