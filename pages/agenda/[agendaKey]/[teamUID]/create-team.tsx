import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import styles from 'styles/agenda/pages/agendakey/CreateTeam.module.scss';

const saveLocal = () => {
  console.log('saveLocal', '팀 만들기');
};

// const readInput = () => {};

const submitTeamForm = (target: React.FormEvent<HTMLFormElement>) => {
  console.log(target);
};

const CreateTeam = () => {
  return (
    <div className={styles.container}>
      <div>
        <button
          className={styles.cancelBtn}
          onClick={() => {
            saveLocal();
            history.back();
          }}
        >
          <span className='icon' />
        </button>
      </div>
      <h2 className={styles.title}>팀 만들기</h2>
      <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
      <CreateTeamForm handleSubmit={submitTeamForm} />
      <button className={styles.submitBtn}>팀 만들기</button>
    </div>
  );
};

export default CreateTeam;
