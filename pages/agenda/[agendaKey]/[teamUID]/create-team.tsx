import styles from 'styles/agenda/Form/createTeam.module.scss';

const CreateTeamForm = () => {
  return (
    <>
      <div className={styles.container + ' container'}>
        <div>
          <button className={styles.button_cancel}>X</button>
        </div>
        <h2 className={styles.title}>팀 만들기</h2>
        <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
      </div>
    </>
  );
};

export default CreateTeamForm;
