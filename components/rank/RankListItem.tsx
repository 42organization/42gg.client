import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/rank/RankList.module.scss';
import PlayerImage from 'components/PlayerImage';
import { RankUser } from 'types/rankTypes';

// type RankItemUser = {
//   intraId: string;
//   rank: number;
//   textColor: string;
//   statusMessage: string;
//   point: string;
//   tierImageUri: string;
// };

// type RankListItemProps = {
//   user: RankItemUser;
//   textColorPreview?: string;
// };

type RankListItemProps = {
  user: RankUser;
  textColorPreview?: string;
};

export function RankListItem({ user, textColorPreview }: RankListItemProps) {
  const Mode = useRecoilValue(colorToggleSelector);
  const myIntraId = useRecoilValue(userState).intraId;
  const { rank, intraId, statusMessage, ppp, tierImageUri, textColor } = user;

  const topStyle = (rank: number) => {
    if (rank < 4) {
      return styles.top;
    } else {
      return styles.standard;
    }
  };

  const makeInitialPPP = (ppp: number) => (rank < 0 ? '-' : ppp);

  return (
    <div
      className={`${styles.rankItemWrap} ${topStyle(rank)} ${styles.Ranking} ${
        intraId === myIntraId && styles.myRanking
      }`}
    >
      {rank}
      {Mode === 'RANK' && (
        <PlayerImage src={tierImageUri} styleName={'ranktier'} size={1} />
      )}
      <div
        style={{
          color: textColorPreview === undefined ? textColor : textColorPreview,
        }}
        className={styles.intraId}
      >
        <Link href={`/users/detail?intraId=${intraId}`}>
          <span>{intraId}</span>
        </Link>
      </div>
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.ppp}>{makeInitialPPP(ppp)}</div>
    </div>
  );
}
