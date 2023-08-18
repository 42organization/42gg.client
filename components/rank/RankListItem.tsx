import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/rank/RankList.module.scss';

interface User {
  intraId: string;
  idColor: string;
  rank: number;
  statusMessage: string;
  point: number | string;
  level: number | null;
  tierImageUri: string;
}

interface RankListItemProps {
  user: User;
  idColorPreview?: string;
}

export default function RankListItem({
  user,
  idColorPreview,
}: RankListItemProps) {
  const Mode = useRecoilValue(colorToggleSelector);
  // TODO : 랭크 정보에 아이디 색상 정보도 필요함.
  const { rank, intraId, statusMessage, point, level, tierImageUri, idColor } =
    user;
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
        ${wrapStyle.myRankItem[Mode]} ${wrapStyle.rankItem[Mode]}`}
    >
      {rank}
      {Mode === 'RANK' ? (
        <PlayerImage src={tierImageUri} styleName={'ranktier'} size={1} />
      ) : (
        ''
      )}
      <div
        style={{
          color: idColorPreview === undefined ? idColor : idColorPreview,
        }}
        className={styles.intraId}
      >
        {makeIntraIdLink()}
      </div>
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.ppp}>{point}</div>
    </div>
  );
}
