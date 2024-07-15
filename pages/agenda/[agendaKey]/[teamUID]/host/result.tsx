//주최자 결과입력 페이지
import { AgendaResultForm } from 'components/agenda/Form/AgendaResultForm';
import styles from 'styles/agenda/pages/agendakey/host/result.module.scss';

const SubmitAgendaResult = () => {
  const awardlist = ['1등', '2등', '3등', '참가상'];
  return (
    <div className={styles.container}>
      <AgendaResultForm awardlist={awardlist} />
    </div>
  );
};

export default SubmitAgendaResult;
