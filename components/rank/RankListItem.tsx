import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { Normal, Rank } from 'types/rankTypes';
import { Mode, UserData } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/RankList.module.scss';

interface RankType {
  index: number;
  userData: Normal | Rank;
  isMain: boolean;
  mode?: Mode;
  ppp: number | string | null;
  level: number | null;
  exp: number | null;
}

export default function RankListItem({
  index,
  userData,
  isMain,
  mode,
  ppp,
  level,
  exp,
}: RankType) {
  const myIntraId = useRecoilValue<UserData>(userState).intraId;
  const { rank, intraId, statusMessage } = userData;
  const messageFiltered =
    statusMessage.length > 10
      ? statusMessage.slice(0, 10) + '...'
      : statusMessage;
  const rankFiltered = rank < 0 ? '-' : rank;
  const pppFiltered = rank < 0 ? '-' : ppp;

  const makeIntraIdLink = () => (
    <Link href={`/users/detail?intraId=${intraId}`}>
      <span>
        {mode === 'normal' && level ? `${intraId} (${level})` : intraId}
      </span>
    </Link>
  );

  return (
    <>
      {isMain ? (
        <div className={styles.mainData}>
          <div className={styles.rank}>{rankFiltered}</div>
          <div className={styles.intraId}>{makeIntraIdLink()}</div>
          <div className={styles.statusMessage}>{messageFiltered}</div>
        </div>
      ) : (
        <div className={styles.rankData}>
          <div
            className={`${index % 2 === 0 ? styles.even : styles.odd}
            ${rankFiltered < 4 ? styles.topRank : styles.rank}
            ${intraId === myIntraId && styles.myself}`}
          >
            {rankFiltered}
            <div className={styles.intraId}>{makeIntraIdLink()}</div>
            <div className={styles.statusMessage}>{messageFiltered}</div>
            <div className={styles.ppp}>
              {mode === 'normal' && exp ? exp : pppFiltered}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
