import Link from 'next/link';
import { RankUser, NormalUser } from 'types/rankTypes';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListItemMainProps {
  user: NormalUser | RankUser;
  isSeasonNormal: boolean;
}

export default function RankListItemMain({
  user,
  isSeasonNormal,
}: RankListItemMainProps) {
  const { rank, intraId, statusMessage } = user;
  const messageFiltered =
    statusMessage.length > 10
      ? statusMessage.slice(0, 10) + '...'
      : statusMessage;
  const rankFiltered = rank < 0 ? '-' : rank;

  return (
    <div
      className={`${styles.mainData}
			${isSeasonNormal && styles.normal}`}
    >
      <div className={styles.rankNumber}>{rankFiltered}</div>
      <div className={styles.intraId}>
        <Link href={`/users/detail?intraId=${intraId}`}>
          <span>{intraId}</span>
        </Link>
      </div>
      <div className={styles.statusMessage}>{messageFiltered}</div>
    </div>
  );
}
