import { useRouter } from 'next/router';
import { ParticipantTeamListProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import ParticipantTeam from 'components/agenda/agendaDetail/tabs/ParticipantTeam';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeamList.module.scss';

export default function ParticipantTeamList({
  max,
  myTeam,
}: ParticipantTeamListProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  const openTeamParams = { agenda_key: agendaKey, page: 1, size: 10 };
  const openTeams = useFetchGet<TeamDataProps[]>(
    `team/open/list`,
    openTeamParams
  ).data;

  const confirmTeamParams = { agenda_key: agendaKey, page: 1, size: 10 };
  const confirmedTeams = useFetchGet<TeamDataProps[]>(
    `team/confirm/list`,
    confirmTeamParams
  ).data;

  const openTeamsCount = openTeams ? openTeams.length : 0;
  const confirmedTeamsCount = confirmedTeams ? confirmedTeams.length : 0;

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
          모집중인 팀 {openTeamsCount}
        </div>
        {openTeams
          ? openTeams.map((team) => (
              <ParticipantTeam
                key={team.teamName}
                teamKey={team.teamKey}
                teamName={team.teamName}
                teamLeaderIntraId={team.teamLeaderIntraId}
                teamMateCount={team.teamMateCount}
                maxMateCount={max}
                coalitions={team.coalitions}
              />
            ))
          : null}
      </div>

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          확정완료 팀 {confirmedTeamsCount} / {max}
        </div>
        {confirmedTeams
          ? confirmedTeams.map((team) => (
              <ParticipantTeam
                key={team.teamName}
                teamName={team.teamName}
                teamLeaderIntraId={team.teamLeaderIntraId}
                teamMateCount={team.teamMateCount}
                maxMateCount={max}
                coalitions={team.coalitions}
              />
            ))
          : null}
      </div>
    </>
  );
}
