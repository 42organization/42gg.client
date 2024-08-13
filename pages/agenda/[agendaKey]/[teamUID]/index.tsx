import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TeamDetailProps } from 'types/aganda/TeamDetailTypes';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import TeamButtons from 'components/agenda/teamDetail/TeamButtons';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/TeamDetail/TeamDetail.module.scss';

export default function TeamDetail({ intraId }: { intraId: string }) {
  const router = useRouter();
  const { agendaKey } = router.query;
  const { teamUID } = router.query;

  // agenda DATA API 받아오기
  const agendaData = useFetchGet<AgendaDataProps>(`/`, {
    agenda_key: agendaKey,
  }).data;

  // teamDetail DATA API 받아오기
  const teamDetailData = useFetchGet<TeamDetailProps>('/team', {
    teamKey: teamUID,
    agenda_key: agendaKey,
  }).data;

  // teamDetail MOCK DATA
  const [teamDetail, setTeamDetail] = useState<TeamDetailProps>({
    teamName: '42 GG 7 TH',
    teamLeaderIntraId: 'leader',
    teamStatus: TeamStatus.OPEN, // ENUM
    teamLocation: AgendaLocation.MIX, // ENUM
    teamContent: '우리팀이세계최강팀',
    teamMates: [
      {
        intraId: 'leader',
        coalition: Coalition.GUN, //ENUM
      },
      {
        intraId: 'member1',
        coalition: Coalition.SPRING,
      },
      {
        intraId: 'member1',
        coalition: Coalition.SPRING,
      },
      {
        intraId: 'member1',
        coalition: Coalition.SPRING,
      },
      {
        intraId: 'member2',
        coalition: Coalition.SUMMER,
      },
    ],
  });

  /**
   * 내 인트라 아이디 MOCK DATA -> 팀 상세 페이지 권한 체크 (리더 | 참여멤버 | 참여안함)
   * */
  intraId = 'notMember';

  if (teamDetail.teamStatus === TeamStatus.CANCEL) {
    setTeamDetail({ ...teamDetail, teamStatus: TeamStatus.CONFIRM });
  }

  const shareTeamInfo = () => {
    alert('공유하기');
  };

  /**
   *  권한 확인 -> 내 인트라 아이디 통해서 authority string 정하기
   */
  const authority =
    intraId === teamDetail.teamLeaderIntraId
      ? 'LEADER'
      : teamDetail.teamMates.find((mate) => mate.intraId === intraId)
      ? 'MEMBER'
      : 'NONE';
  console.log(authority, intraId);

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
        />
      )}
      <TeamButtons authority={authority} />
    </div>
  );
}
