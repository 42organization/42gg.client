import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { instanceInAgenda } from 'utils/axios';
import ParticipantTeam from 'components/agenda/agendaDetail/tabs/ParticipantTeam';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeamList.module.scss';

const teamData = [
  {
    teamKey: 'team1111',
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 4,
    coalitions: ['GUN', 'GON', 'GAM', 'GUN'],
  },
  {
    teamKey: 'team2222',
    teamName: 'team2222',
    teamLeaderIntraId: 'leader',
    teamMateCount: 2,
    coalitions: ['GUN', 'GON'],
  },
];

const confirmData = [
  {
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 6,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN', 'GON', 'GAM', 'LEE', 'GUN', 'GON'],
  },
  {
    teamName: 'team2222',
    teamLeaderIntraId: 'leader',
    teamMateCount: 3,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN', 'GON', 'GON'],
  },
  {
    teamName: 'team3333',
    teamLeaderIntraId: 'leader',
    teamMateCount: 1,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN'],
  },
];

export interface ParticipantTeamListProps {
  max: number;
  myTeam?: TeamDataProps | null;
}

export default function ParticipantTeamList({
  max,
  myTeam,
}: ParticipantTeamListProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const [recruitingTeams, setRecruitingTeams] = useState<TeamDataProps[]>([]);
  const [confirmedTeams, setConfirmedTeams] = useState<TeamDataProps[]>([]);

  // const fetchRecruitTeams = async () => {
  //   if (agendaKey) {
  //     try {
  //       const params = {
  //         agenda_key: agendaKey,
  //         page: 1,
  //         size: 10,
  //       };

  //       const res = await instanceInAgenda.get(`team/open?`, { params });
  //       console.log('모집 중인 팀', res.data);
  //       setRecruitingTeams(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  useEffect(() => {
    // fetchRecruitTeams();
    // fetchMyTeam();
    setRecruitingTeams(teamData);
    setConfirmedTeams(confirmData);
  }, [agendaKey]);

  if (!agendaKey) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {myTeam ? (
        <div className={styles.participantsWarp}>
          <div className={styles.participantsTitle}>내 팀</div>

          <ParticipantTeam
            key={myTeam.teamName}
            teamKey={myTeam.teamKey}
            teamName={myTeam.teamName}
            teamLeaderIntraId={myTeam.teamLeaderIntraId}
            teamMateCount={myTeam.teamMateCount}
            maxMateCount={max}
            coalitions={myTeam.coalitions}
          />
        </div>
      ) : null}

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          모집중인 팀 {recruitingTeams.length}
        </div>
        {recruitingTeams.map((team) => (
          <ParticipantTeam
            key={team.teamName}
            teamKey={team.teamKey}
            teamName={team.teamName}
            teamLeaderIntraId={team.teamLeaderIntraId}
            teamMateCount={team.teamMateCount}
            maxMateCount={max}
            coalitions={team.coalitions}
          />
        ))}
      </div>

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          확정완료 팀 {confirmedTeams.length} / {max}
        </div>
        {confirmedTeams.map((team) => (
          <ParticipantTeam
            key={team.teamName}
            teamName={team.teamName}
            teamLeaderIntraId={team.teamLeaderIntraId}
            teamMateCount={team.teamMateCount}
            maxMateCount={max}
            coalitions={team.coalitions}
          />
        ))}
      </div>
    </>
  );
}
