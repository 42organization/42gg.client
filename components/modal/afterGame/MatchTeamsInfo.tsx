import Image from 'next/image';
import { PlayerInfo, PlayersData } from 'types/scoreTypes';
import styles from 'styles/modal/AfterGameModal.module.scss';

export function MatchTeamsInfo({
  matchTeamsInfo,
}: {
  matchTeamsInfo: PlayersData;
}) {
  return (
    <div className={styles.players}>
      <TeamInfo teamInfo={matchTeamsInfo.myTeam} />
      <div>vs</div>
      <TeamInfo teamInfo={matchTeamsInfo.enemyTeam} />
    </div>
  );
}

function TeamInfo({ teamInfo }: { teamInfo: PlayerInfo[] }) {
  return (
    <div className={styles.userInfo}>
      {teamInfo.map((playerInfo) => (
        <PlayerImage
          key={playerInfo.intraId}
          userImageUri={playerInfo.userImageUri}
        />
      ))}
      {teamInfo.map((userInfo) => (
        <PlayerId key={userInfo.intraId} intraId={userInfo.intraId} />
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
