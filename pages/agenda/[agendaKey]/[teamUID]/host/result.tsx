//주최자 결과입력 페이지
import AgendaResultForm from 'components/agenda/Form/AgendaResultForm';
import styles from 'styles/agenda/pages/agendakey/host/result.module.scss';

const SubmitAgendaResult = () => {
  const teamlist = [
    'apple',
    'banana',
    'cider',
    'dumpling',
    'egg',
    'fish',
    'grape',
    'honey',
  ];
  return (
    <div className={styles.container}>
      <AgendaResultForm teamlist={teamlist} />
    </div>
  );
};

export default SubmitAgendaResult;
