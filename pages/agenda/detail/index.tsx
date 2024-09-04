import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import AgendaTab from 'components/agenda/agendaDetail/AgendaTab';
import { useUser } from 'hooks/agenda/Layout/useUser';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/agendaDetail/AgendaDetail.module.scss';

const getIsHost = (intraId: string, agendaData?: AgendaDataProps | null) => {
  if (!agendaData) return false;
  return intraId === agendaData.agendaHost;
};

const AgendaDetail = () => {
  const agendaKey = useAgendaKey();
  const agendaData = useAgendaInfo(agendaKey as string);

  const { data: myTeam, status: myTeamStatus } = useFetchGet<TeamDataProps>(
    `team/my`,
    { agenda_key: agendaKey }
  );
  const intraId = useUser()?.intraId || '';
  const isHost = getIsHost(intraId, agendaData);

  return (
    <>
      <div className={styles.agendaDetailWrap}>
        {agendaData ? (
          <>
            <AgendaInfo
              agendaData={agendaData}
              isHost={isHost}
              myTeamStatus={myTeamStatus}
              myTeam={myTeam}
              intraId={intraId}
            />
            <AgendaTab
              agendaData={agendaData}
              isHost={isHost}
              myTeam={myTeam}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default AgendaDetail;
