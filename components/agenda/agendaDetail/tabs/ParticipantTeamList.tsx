import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { teamDataProps } from 'types/agenda/team/teamDataTypes';
import ParticipantTeam from 'components/agenda/agendaDetail/tabs/ParticipantTeam';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeamList.module.scss';

const teamData = [
  {
    teamKey: 'team1111',
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 4,
    coalitions: ['GUN', 'GON', 'GAM', 'LEE'],
  },
  {
    teamKey: 'team2222',
    teamName: 'team2222',
    teamLeaderIntraId: 'leader',
    teamMateCount: 2,
    coalitions: ['GUN', 'GON'],
  },
  {
    teamKey: 'team3333',
    teamName: 'team3333',
    teamLeaderIntraId: 'leader',
    teamMateCount: 1,
    coalitions: ['GUN'],
  },
];

const confirmData = [
  {
    teamName: 'team1111',
    teamLeaderIntraId: 'leader',
    teamMateCount: 4,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN', 'GON', 'GAM', 'LEE'],
  },
  {
    teamName: 'team2222',
    teamLeaderIntraId: 'leader',
    teamMateCount: 2,
    teamAward: 'string',
    awardPriority: 0,
    coalitions: ['GUN', 'GON'],
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

export interface ParticipantListProps {
  max: number;
}

export default function ParticipantTeamList({ max }: ParticipantListProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const [recruitingTeams, setRecruitingTeams] = useState<teamDataProps[]>([]);
  const [confirmedTeams, setConfirmedTeams] = useState<teamDataProps[]>([]);

  useEffect(() => {
    // // 모집 중인 팀 API 호출
    // const fetchCurrentTeams = async () => {};

    // // 확정 완료 팀 API 호출
    // const fetchConfirmedTeams = async () => {};

    setRecruitingTeams(teamData);
    setConfirmedTeams(confirmData);
  }, [agendaKey]);

  if (!agendaKey) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
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
