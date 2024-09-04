import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
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
        <div className={styles.headWrapper}>
          <Link href={`/agenda`}>
            <button className={styles.webViewBtn}>
              <div className={styles.imageWrapper}>
                <Image
                  src='/image/agenda/ArrowRight.svg'
                  width={35}
                  height={35}
                  alt='Create Agenda'
                  className={styles.imageBox}
                />
              </div>
              <div>{` 행사 목록 보기`}</div>
            </button>
          </Link>
        </div>
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
