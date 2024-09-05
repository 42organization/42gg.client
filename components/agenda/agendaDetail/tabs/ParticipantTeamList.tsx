import { ParticipantTeamListProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import ParticipantTeam from 'components/agenda/agendaDetail/tabs/ParticipantTeam';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import PageNation from 'components/Pagination';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import usePageNation from 'hooks/agenda/usePageNation';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeamList.module.scss';

export default function ParticipantTeamList({
  maxTeam,
  maxPeople,
  myTeam,
}: ParticipantTeamListProps) {
  const agendaKey = useAgendaKey();

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

  const noParticipants = (
    <div className={styles.noParticipants}>팀이 없습니다.</div>
  );
  const openTeamsCount = openTeams ? openTeams.length : 0;
  const confirmedTeamsCount = confirmedTeams ? confirmedTeams.length : 0;

  if (!agendaKey || !openTeams || !confirmedTeams) {
    return <AgendaLoading />;
  }
  return (
    <>
      <div className={styles.participantsContainer}>
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
                maxMateCount={maxPeople}
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
      </div>
    </>
  );
}
