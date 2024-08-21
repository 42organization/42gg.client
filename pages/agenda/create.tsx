import router from 'next/router';
import { CancelBtn } from 'components/agenda/button/Buttons';
import AgendaForm from 'components/agenda/Form/AgendaFrom';
import SubmitAgendaForm from 'components/agenda/Form/SubmitAgendaForm';
import styles from 'styles/agenda/pages/CreateAgenda.module.scss';

export const saveLocal = () => {
  // console.log('saveLocal', '팀 만들기');
  // 임시저장 추후 추가
};

const CreateAgenda = () => {
  return (
    <div className={styles.container}>
      <div>
        <CancelBtn onClick={saveLocal} />
      </div>
      <h2 className={styles.title}>새로운 아젠다 만들기</h2>
      <p className={styles.description}>당부사항</p>
      <AgendaForm
        onProceed={() => {
          router.push(`/agenda`);
        }}
      />
    </div>
  );
};

export default CreateAgenda;
