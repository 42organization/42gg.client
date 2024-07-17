import styles from 'styles/agenda/agendaDetail/taps/AgendaConditions.module.scss';

export default function AgendaConditions() {
  const content =
    '이 대회에참가하려면 어쩌구저쩌구 포인트얼마를내야하며 상품은 뭔데 줄지안줄지 생각해볼게';
  return (
    <>
      <div className={styles.agendaConditionsContainer}>
        <div className={styles.conditionTitle}>대회 참여 조건 제목</div>
        <div className={styles.conditionWarp}>{content}</div>
      </div>
    </>
  );
}
