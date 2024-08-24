import { useRouter } from 'next/router';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { User } from 'types/agenda/mainType';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import AgendaTab from 'components/agenda/agendaDetail/AgendaTab';
import { useUser } from 'hooks/agenda/Layout/useUser';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/agendaDetail/AgendaDetail.module.scss';

const getIsHost = (intraId: string, agendaData?: AgendaDataProps | null) => {
  if (!agendaData) return false;
  return intraId === agendaData.agendaHost;
};

const AgendaDetail = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const agendaData = useAgendaInfo(agendaKey as string); // useFetchGet 사용해서 get하기 -> useAgendaInfo 는 데이터를 refresh 불가
  const user: User | undefined = useUser();
  const intraId = user?.intraId || '';
  const isHost = getIsHost(intraId, agendaData);

  const { data: myTeam, status: myTeamStatus } = useFetchGet<TeamDataProps>(
    `team/my`,
    { agenda_key: agendaKey }
  );

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
