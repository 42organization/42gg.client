import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import styles from 'styles/agenda/Form/CreateTeam.module.scss';

const CreateTeam = () => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <button className={styles.button_cancel}>X</button>
        </div>
        <h2 className={styles.title}>팀 만들기</h2>
        <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
        <CreateTeamForm />
      </div>
    </>
  );
};

export default CreateTeam;
