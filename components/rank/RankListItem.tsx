import Link from 'next/link';
import { RankUser } from 'types/rankTypes';
import PlayerImage from 'components/PlayerImage';
import { useUser } from 'hooks/Layout/useUser';
import styles from 'styles/rank/RankList.module.scss';

type RankListItemProps = {
  user: RankUser;
  textColorPreview?: boolean;
};

export function RankListItem({ user, textColorPreview }: RankListItemProps) {
  const myInfo = useUser();
  const { rank, intraId, statusMessage, ppp, tierImageUri, textColor } = user;

  const topStyle = (rank: number) => {
    return rank < 4 ? styles.top : styles.standard;
  };

  const itemLayoutStyle = (textColorPreview?: boolean) => {
    return textColorPreview
      ? `${styles.rankItemWrap} ${styles.colorPreviewLayout}`
      : styles.rankItemWrap;
  };

  const makeInitialPPP = (ppp: number) => (rank < 0 ? '-' : ppp);

  if (!myInfo) return null;

  const { intraId: myIntraId } = myInfo;

  return (
    <div
      className={`${itemLayoutStyle(textColorPreview)} ${topStyle(rank)} ${
        intraId === myIntraId && styles.myRanking
      }`}
    >
      {rank}
      <PlayerImage src={tierImageUri} styleName={'ranktier'} size={1} />
      <div style={{ color: textColor }} className={styles.intraId}>
        <Link href={`/users/detail?intraId=${intraId}`}>
          <span>{intraId}</span>
        </Link>
      </div>
      {textColorPreview ? null : (
        <div className={styles.statusMessage}>{statusMessage}</div>
      )}
      <div className={styles.ppp}>{makeInitialPPP(ppp)}</div>
    </div>
  );
}
