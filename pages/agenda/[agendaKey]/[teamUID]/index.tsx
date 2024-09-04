import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import { Authority } from 'constants/agenda/agenda';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
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

  const { data: teamDetailData, getData: getTeamDetail } =
    useFetchGet<TeamDetailProps>('/team', {
      teamKey: teamUID,
      agenda_key: agendaKey,
    });

  /**
   *  useEffect / API GET 얻은 데이터 teamDetail, authority 할당
   */
  const [teamDetail, setTeamDetail] = useState<TeamDetailProps | null>(null);
  const [authority, setAuthority] = useState<Authority>(Authority.NONE);

  useEffect(() => {
    if (intraId && agendaData && teamDetailData) {
      const userRole =
        intraId === agendaData?.agendaHost
          ? Authority.HOST
          : intraId === teamDetailData.teamLeaderIntraId
          ? Authority.LEADER
          : teamDetailData.teamMates.find((mate) => mate.intraId === intraId)
          ? Authority.MEMBER
          : Authority.GEUST;
      setAuthority(userRole);
      setTeamDetail(teamDetailData);
    }
  }, [intraId, agendaData, teamDetailData]);

  /**
   * Button Click Fucntions
   */
  const sendRequest = useFetchRequest().sendRequest;

  const shareTeamInfo = () => {
    alert('링크가 복사되었습니다.');
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const manageTeamDetail = async (method: 'POST' | 'PATCH', url: string) => {
    sendRequest(
      method,
      url,
      {},
      {
        agenda_key: agendaKey,
        teamKey: teamUID,
      },
      () => {
        // 팀 폭파 API : 아젠다 디테일 페이지로 이동
        if (url === 'team/cancel') {
          router.push(`/agenda/${agendaKey}`);
        } else {
          // 그 외 API : 팀 상세 데이터 갱신

          getTeamDetail();
        }
      },
      (err: string) => {
        console.error(err);
      }
    );
  };

  return (
    <div className={styles.teamDetail}>
      {agendaData ? (
        <Link href={`/agenda/${agendaKey}`} className={styles.agendaLink}>
          <AgendaInfo agendaData={agendaData} />
        </Link>
      ) : (
        ''
      )}
      {teamDetail && agendaData ? (
        <TeamInfo
          teamDetail={teamDetail}
          shareTeamInfo={shareTeamInfo}
          maxPeople={agendaData.agendaMaxPeople}
          authority={authority}
          manageTeamDetail={manageTeamDetail}
          submitTeamForm={() => {
            getTeamDetail();
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
