import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/rank/RankList.module.scss';
import { ToggleMode } from 'types/rankTypes';

interface User {
  intraId: string;
  rank: number;
  statusMessage: string;
  point: number | string;
  level: number | null;
}

interface RankListItemProps {
  user: User;
  toggleMode: ToggleMode;
}

export default function RankListItem({ user, toggleMode }: RankListItemProps) {
  const { rank, intraId, statusMessage, point, level } = user;
  const myIntraId = useRecoilValue(userState).intraId;
  const wrapStyle = {
    topStandard: rank < 4 ? styles.top : styles.standard,
    rankItem: {
      RANK: styles.Ranking,
      NORMAL: styles.Vip,
    },
    myRankItem: {
      RANK: intraId === myIntraId && level === null ? styles.myRanking : '',
      NORMAL: intraId === myIntraId && level !== null ? styles.myVip : '',
    },
  };

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
      className={`${styles.rankItemWrap} ${wrapStyle.topStandard}
        ${wrapStyle.myRankItem[toggleMode]} ${wrapStyle.rankItem[toggleMode]}`}
    >
      {rank}
      <div className={styles.intraId}>{makeIntraIdLink()}</div>
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.ppp}>{point}</div>
    </div>
  );
}
