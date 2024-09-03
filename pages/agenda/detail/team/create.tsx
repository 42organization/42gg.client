import { useRouter } from 'next/router';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/create-team.module.scss';

const CreateTeam = () => {
  const router = useRouter();
  const agendaKey = router.query.agenda_key as string;

  const agendaInfo = useFetchGet<AgendaDataProps>(`/`, {
    agenda_key: agendaKey,
  }).data;

  const backPage = () => {
    router.back();
  };

  if (!agendaKey || !agendaInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>팀 만들기</h2>
        <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
        <CreateTeamForm
          location={agendaInfo?.agendaLocation || null}
          agendaKey={agendaKey as string}
          handleConvert={backPage}
          onProceed={backPage}
        />
      </div>
    </div>
  );
};

export default CreateTeam;
