import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { TeamDetailProps } from 'types/aganda/TeamDetailTypes';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/TeamDetail/TeamDetail.module.scss';

export default function TeamDetail() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const { teamUID } = router.query;

  /**
   * API GET DATA
   * 1. intraId
   * 2. agenda Data
   * 3. teamDetail Data
   */
  const intraId = useUser()?.intraId;

  const agendaData = useFetchGet<AgendaDataProps>(`/`, {
    agenda_key: agendaKey,
  }).data;

  const teamDetailData = useFetchGet<TeamDetailProps>('/team', {
    teamKey: teamUID,
    agenda_key: agendaKey,
  }).data;

  /**
   *  useEffect / API GET 얻은 데이터 teamDetail, authority 할당
   */
  const [teamDetail, setTeamDetail] = useState<TeamDetailProps | null>(null);
  const [authority, setAuthority] = useState<string>('');

  useEffect(() => {
    if (intraId && agendaData && teamDetailData) {
      const userRole =
        intraId === agendaData?.agendaHost
          ? 'HOST'
          : intraId === teamDetailData.teamLeaderIntraId
          ? 'LEADER'
          : teamDetailData.teamMates.find((mate) => mate.intraId === intraId)
          ? 'MEMBER'
          : 'NONE';
      setAuthority(userRole);
      setTeamDetail(teamDetailData);
    }
  }, [intraId, agendaData, teamDetailData]);

  /**
   * EventListener
   */
  const shareTeamInfo = () => {
    alert('공유하기');
  };

  return (
    <div className={styles.teamDeatil}>
      {agendaData && (
        <Link href={`/agenda/${agendaKey}`} className={styles.agendaLink}>
          <AgendaInfo agendaData={agendaData} />
        </Link>
      )}
      {teamDetail && agendaData && (
        <TeamInfo
          teamDetail={teamDetail}
          shareTeamInfo={shareTeamInfo}
          maxPeople={agendaData.agendaMaxPeople}
          authority={authority}
        />
      )}
    </div>
  );
}
