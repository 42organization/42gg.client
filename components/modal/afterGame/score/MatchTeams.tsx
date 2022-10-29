import Image from 'next/image';
import { Player, Players } from 'types/scoreTypes';
import styles from 'styles/modal/AfterGameModal.module.scss';

export function MatchTeams({ matchTeams }: { matchTeams: Players }) {
  return (
    <div className={styles.players}>
      <Team team={matchTeams.myTeam} />
      <div>vs</div>
      <Team team={matchTeams.enemyTeam} />
    </div>
  );
}

function Team({ team }: { team: Player[] }) {
  return (
    <div className={styles.user}>
      {team.map((player) => (
        <PlayerImage key={player.intraId} userImageUri={player.userImageUri} />
      ))}
      {team.map((user) => (
        <PlayerId key={user.intraId} intraId={user.intraId} />
      ))}
    </div>
  );
}

function PlayerImage({ userImageUri }: { userImageUri: string }) {
  return (
    <div className={styles.userImage}>
      {userImageUri && (
        <Image
          src={userImageUri}
          alt='prfImg'
          layout='fill'
          objectFit='cover'
          sizes='30vw'
          quality='30'
        />
      )}
    </div>
  );
}

function PlayerId({ intraId }: { intraId: string }) {
  return <div className={styles.intraId}>{intraId}</div>;
}
