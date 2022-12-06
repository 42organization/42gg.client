import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MatchMode } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import { myRankScrollState } from 'utils/recoil/myRank';
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
  const [scrollMyRank, setScrollMyRank] = useRecoilState(myRankScrollState);
  const myIntraId = useRecoilValue(userState).intraId;
  const myRankRef = useRef<HTMLDivElement>(null);
  const wrapStyle = {
    evenOdd: index % 2 === 0 ? styles.even : styles.odd,
    topStandard: rank < 4 ? styles.top : styles.standard,
    myRankItem: {
      rank: intraId === myIntraId && level === null ? styles.myRanking : '',
      normal: intraId === myIntraId && level !== null ? styles.myVip : '',
      challenge: 'challenge',
    },
  };

  useEffect(() => {
    if (scrollMyRank) {
      myRankRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setScrollMyRank(false);
    }
  }, [scrollMyRank]);

  const makeIntraIdLink = () => (
    <Link href={`/users/detail?intraId=${intraId}`}>
      <span>
        {intraId}
        {level && <span className={styles.level}> ({level})</span>}
      </span>
    </Link>
  );

  return (
    <div
      className={`${styles.rankItemWrap} ${wrapStyle.evenOdd}
			${wrapStyle.topStandard} ${wrapStyle.myRankItem[toggleMode]}`}
      ref={intraId === myIntraId ? myRankRef : null}
    >
      {rank}
      <div className={styles.intraId}>{makeIntraIdLink()}</div>
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.ppp}>{point}</div>
    </div>
  );
}
