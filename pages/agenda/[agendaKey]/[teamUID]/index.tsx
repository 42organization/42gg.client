import { useRouter } from 'next/router';
import { useState } from 'react';
import { TeamDetailProps } from 'types/aganda/TeamDetailTypes';
import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';
import TeamInfo from 'components/agenda/teamDetail/TeamInfo';
import { useUser } from 'hooks/takgu/Layout/useUser';

export default function TeamDetail({ intraId }: { intraId: string }) {
  const router = useRouter();
  console.log(router.query);
  const { teamUID } = router.query;

  const [teamDetail, setTeamDetail] = useState<TeamDetailProps>({
    teamName: '팀이름',
    teamLeaderIntraId: 'leader',
    teamStatus: TeamStatus.OPEN, //e
    teamLocation: AgendaLocation.MIX, //e
    teamContent: '우리팀이세계최강팀',
    teamMates: [
      {
        intraId: 'leader',
        coalition: Coalition.GUN, //e
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

  if (teamDetail.teamStatus === TeamStatus.CANCEL) {
    setTeamDetail({ ...teamDetail, teamStatus: TeamStatus.CONFIRM });
  }

  const shareTeamInfo = () => {
    alert('공유하기');
  };
  const authority =
    intraId === teamDetail.teamLeaderIntraId
      ? 'LEADER'
      : teamDetail.teamMates.find((mate) => mate.intraId === intraId)
      ? 'MEMBER'
      : 'NONE';

  return (
    <>
      {/* <AgendaInfo type='team' /> 이거 어케 가져오지 */}
      <TeamInfo teamDetail={teamDetail} shareTeamInfo={shareTeamInfo} />
      <div>teamKey: {teamUID}</div>
      {}
    </>
  );
}
