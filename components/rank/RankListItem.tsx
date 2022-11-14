import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { MatchMode } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/rank/RankList.module.scss';

interface User {
  intraId: string;
  rank: number | string;
  statusMessage: string;
  point: number | string;
  level: number | null;
}

interface RankListItemProps {
  index: number;
  user: User;
  toggleMode: MatchMode;
}

export default function RankListItem({
  index,
  user,
  toggleMode,
}: RankListItemProps) {
  const { rank, intraId, statusMessage, point, level } = user;
  const myIntraId = useRecoilValue(userState).intraId;

  const makeIntraIdLink = () => (
    <Link href={`/users/detail?intraId=${intraId}`}>
      <span>
        {intraId}
        {toggleMode === 'normal' && level && (
          <span className={styles.level}> ({level})</span>
        )}
      </span>
    </Link>
  );

  return (
    <div className={styles.rankData}>
      <div
        className={`${index % 2 === 0 ? styles.even : styles.odd}
            ${rank < 4 ? styles.topRank : styles.rank}
            ${
              intraId === myIntraId &&
              (toggleMode === 'rank' ? styles.myRanking : styles.myVip)
            }`}
      >
        {rank}
        <div className={styles.intraId}>{makeIntraIdLink()}</div>
        <div className={styles.statusMessage}>{statusMessage}</div>
        <div className={styles.ppp}>{point}</div>
      </div>
    </div>
  );
}
