import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';

interface AgendaResultFormProps {
  awardlist: string[];
}

const AgendaResultForm = ({ awardlist }: AgendaResultFormProps) => {
  return (
    <div className={styles.container}>
      <h1>결과 입력</h1>
      <h2 className={styles.description}>팀별 결과를 입력해주세요</h2>
      {awardlist.map((award, idx) => (
        <p key={idx}>{award}</p>
      ))}
    </div>
  );
};

export { AgendaResultForm };
