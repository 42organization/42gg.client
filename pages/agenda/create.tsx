import { CancelBtn } from 'components/agenda/button/Buttons';
import CreateAgendaForm from 'components/agenda/Form/CreateAgendaForm';
import styles from 'styles/agenda/pages/CreateAgenda.module.scss';

const saveLocal = () => {
  console.log('saveLocal', '팀 만들기');
};

// const readInput = () => {};

const submitTeamForm = (target: React.FormEvent<HTMLFormElement>) => {
  console.log(target);
};

const CreateAgenda = () => {
  return (
    <div className={styles.container}>
      <div>
        <CancelBtn onClick={saveLocal} />
      </div>
      <h2 className={styles.title}>새로운 아젠다 만들기</h2>
      <p className={styles.description}>당부사항</p>
      <CreateAgendaForm handleSubmit={submitTeamForm} />
    </div>
  );
};

export default CreateAgenda;
