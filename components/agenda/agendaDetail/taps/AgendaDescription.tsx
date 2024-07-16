import styles from 'styles/agenda/agendaDetail/taps/AgendaDescription.module.scss';

export default function AgendaDescription() {
  const content =
    '대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n대회설명 대회 설명 길게 어쩌고저쩌고\n';
  return (
    <>
      <div className={styles.descriptionContainer}>
        <div className={styles.discriptionTitle}>대회설명 제목</div>
        <div className={styles.descriptionWarp}>{content}</div>
      </div>
    </>
  );
}
