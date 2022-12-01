import { Player, Players } from 'types/scoreTypes';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/modal/AfterGameModal.module.scss';

export function MatchTeams({ matchTeams }: { matchTeams: Players }) {
  return (
    <div className={styles.players}>
      <Team team={matchTeams.myTeam.teams} />
      <div id={styles.versus}>vs</div>
      <Team team={matchTeams.enemyTeam.teams} />
    </div>
  );
}

function Team({ team }: { team: Player[] }) {
  return (
    <div className={styles.user}>
      {team.map((player, index) => (
        <PlayerImage
          key={index}
          src={player.userImageUri}
          styleName={'afterGameModal'}
          size={30}
        />
      ))}
      {team.map((user) => (
        <PlayerId key={user.intraId} intraId={user.intraId} />
      ))}
    </div>
  );
}

function PlayerId({ intraId }: { intraId: string }) {
  return <div className={styles.intraId}>{intraId}</div>;
}
