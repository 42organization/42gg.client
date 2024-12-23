import { useRouter } from 'next/router';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/create-team.module.scss';

const CreateTeam = () => {
  const router = useRouter();
  const agendaKey = useAgendaKey();

  const agendaInfo = useFetchGet<AgendaDataProps>({
    url: `/`,
    isReady: Boolean(agendaKey),
    params: {
      agenda_key: agendaKey,
    },
  }).data;

  const backPage = () => {
    router.back();
  };

  if (!agendaKey || !agendaInfo) {
    return <AgendaLoading />;
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>팀 만들기</h2>
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
