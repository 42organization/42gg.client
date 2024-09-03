import { useRouter } from 'next/router';
import { ParticipantTeamListProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import ParticipantTeam from 'components/agenda/agendaDetail/tabs/ParticipantTeam';
import PageNation from 'components/Pagination';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeamList.module.scss';

export default function ParticipantTeamList({
  maxTeam,
  maxPeople,
  myTeam,
}: ParticipantTeamListProps) {
  const router = useRouter();
  const agendaKey = router.query.agenda_key;

  const {
    content: openTeams,
    PagaNationElementProps: openTeamPageNationProps,
  } = usePageNation<TeamDataProps>({
    url: `team/open/list`,
    params: { agenda_key: agendaKey },
  });

  const {
    content: confirmedTeams,
    PagaNationElementProps: confirmedTeamPageNationProps,
  } = usePageNation<TeamDataProps>({
    url: `team/confirm/list`,
    params: { agenda_key: agendaKey },
  });

  const openTeamsCount = openTeams ? openTeams.length : 0;
  const confirmedTeamsCount = confirmedTeams ? confirmedTeams.length : 0;

  if (!agendaKey) {
    return <div>Loading...</div>;
  }
  const noParticipants = (
    <div className={styles.noParticipants}>팀이 없습니다.</div>
  );

  return (
    <>
      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>내 팀</div>
        {myTeam ? (
          <>
            <ParticipantTeam
              key={myTeam.teamName}
              teamKey={myTeam.teamKey}
              teamName={myTeam.teamName}
              teamLeaderIntraId={myTeam.teamLeaderIntraId}
              teamMateCount={myTeam.teamMateCount}
              maxMateCount={maxTeam}
              coalitions={myTeam.coalitions}
            />
          </>
        ) : (
          noParticipants
        )}
      </div>

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          모집중인 팀 {openTeamsCount}
        </div>
        {openTeams && openTeamsCount > 0 ? (
          <>
            {openTeams.map((team) => (
              <ParticipantTeam
                key={team.teamName}
                teamKey={team.teamKey}
                teamName={team.teamName}
                teamLeaderIntraId={team.teamLeaderIntraId}
                teamMateCount={team.teamMateCount}
                maxMateCount={maxPeople}
                coalitions={team.coalitions}
              />
            ))}
            <PageNation {...openTeamPageNationProps} />
          </>
        ) : (
          noParticipants
        )}
      </div>

      <div className={styles.participantsWarp}>
        <div className={styles.participantsTitle}>
          확정완료 팀 {confirmedTeamsCount} / {maxTeam}
        </div>
        {confirmedTeams && confirmedTeamsCount > 0 ? (
          <>
            {confirmedTeams.map((team) => (
              <ParticipantTeam
                key={team.teamName}
                teamName={team.teamName}
                teamLeaderIntraId={team.teamLeaderIntraId}
                teamMateCount={team.teamMateCount}
                maxMateCount={maxPeople}
                coalitions={team.coalitions}
              />
            ))}
            <PageNation {...confirmedTeamPageNationProps} />
          </>
        ) : (
          noParticipants
        )}
      </div>
    </>
  );
}
