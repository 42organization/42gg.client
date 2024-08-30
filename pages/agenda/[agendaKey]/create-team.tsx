import { useRouter } from 'next/router';
import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import styles from 'styles/agenda/pages/create-team.module.scss';

const CreateTeam = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const agendaInfo = useAgendaInfo(agendaKey as string);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>팀 만들기</h2>
      <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
      <CreateTeamForm
        location={agendaInfo?.agendaLocation || null}
        agendaKey={agendaKey as string}
      />
    </div>
  );
};

export default CreateTeam;
