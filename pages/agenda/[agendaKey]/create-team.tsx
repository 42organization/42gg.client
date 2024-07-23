import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import styles from 'styles/agenda/pages/create-team.module.scss';

const CreateTeam = () => {
  const submitTeamForm = (target: React.FormEvent<HTMLFormElement>) => {
    console.log(target);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>팀 만들기</h2>
      <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
      <CreateTeamForm handleSubmit={submitTeamForm} />
    </div>
  );
};

export default CreateTeam;
