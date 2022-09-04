import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { NormalMode, RankMode } from 'types/rankTypes';
import { Mode } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/rank/RankList.module.scss';

interface RankListItemRrops {
  index: number;
  rankedUser: NormalMode | RankMode;
  isRankMode: boolean;
  ppp: number | null;
  level: number | null;
  exp: number | null;
}

export default function RankListItem({
  index,
  rankedUser,
  isRankMode,
  ppp,
  level,
  exp,
}: RankListItemRrops) {
  const { rank, intraId, statusMessage } = rankedUser;
  const myIntraId = useRecoilValue(userState).intraId;
  const messageFiltered =
    statusMessage.length > 10
      ? statusMessage.slice(0, 10) + '...'
      : statusMessage;
  const rankFiltered = rank < 0 ? '-' : rank;
  const point = !isRankMode && ppp === null ? exp : rank < 0 ? '-' : ppp;

  const makeIntraIdLink = () => (
    <Link href={`/users/detail?intraId=${intraId}`}>
      <span>
        {intraId}
        {!isRankMode && level && (
          <span className={styles.level}>( {level})</span>
        )}
      </span>
    </Link>
  );

  return (
    <div className={styles.rankData}>
      <div
        className={`${index % 2 === 0 ? styles.even : styles.odd}
            ${rankFiltered < 4 ? styles.topRank : styles.rank}
            ${intraId === myIntraId && styles.myself}`}
      >
        {rankFiltered}
        <div className={styles.intraId}>{makeIntraIdLink()}</div>
        <div className={styles.statusMessage}>{messageFiltered}</div>
        <div className={styles.ppp}>{point}</div>
      </div>
    </div>
  );
}
