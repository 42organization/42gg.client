import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import styles from 'styles/rank/RankList.module.scss';
import PlayerImage from 'components/PlayerImage';

interface User {
  intraId: string;
  rank: number;
  statusMessage: string;
  point: number | string;
  level: number | null;
  //tierImageUri: string | null;
}

interface RankListItemProps {
  user: User;
}

export default function RankListItem({ user }: RankListItemProps) {
  const Mode = useRecoilValue(colorToggleSelector);
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
  const tierImageUri =
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/sangmipa-0a8bc4cc-14a3-4d3a-bea9-cfea82bc5fb4.jpeg';
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
        ${wrapStyle.myRankItem[Mode]} ${wrapStyle.rankItem[Mode]}`}
    >
      {rank}
      {Mode === 'RANK' ? (
        <PlayerImage src={tierImageUri} styleName={'ranktier'} size={1} />
      ) : (
        ''
      )}
      <div className={styles.intraId}>{makeIntraIdLink()}</div>
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.ppp}>{point}</div>
    </div>
  );
}
