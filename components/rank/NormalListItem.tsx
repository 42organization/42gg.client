import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { NormalUser } from 'types/rankTypes';
import { userState } from 'utils/recoil/layout';
import styles from 'styles/rank/RankList.module.scss';

type NormalListItemProps = {
  user: NormalUser;
  textColorPreview?: boolean;
};

export function NormalListItem({
  user,
  textColorPreview,
}: NormalListItemProps) {
  const myIntraId = useRecoilValue(userState).intraId;
  const { rank, intraId, statusMessage, exp, level, textColor } = user;

  const topStyle = (rank: number) => {
    if (rank < 4) {
      return styles.top;
    } else {
      return styles.standard;
    }
  };

  const itemLayoutStyle = (textColorPreview?: boolean) => {
    return textColorPreview
      ? `${styles.rankItemWrap} ${styles.colorPreviewLayout}`
      : `${styles.rankItemWrap} ${styles.Vip}`;
  };

  return (
    <div
      className={`${itemLayoutStyle(textColorPreview)} ${topStyle(rank)} ${
        intraId === myIntraId && styles.myVip
      }`}
    >
      {rank}
      {textColorPreview ? <div></div> : null}
      <div
        style={{
          color: textColor,
        }}
        className={styles.intraId}
      >
        <Link href={`/users/detail?intraId=${intraId}`}>
          <span>
            {intraId}
            {level && <span className={styles.level}> ({level})</span>}
          </span>
        </Link>
      </div>
      {textColorPreview ? null : (
        <div className={styles.statusMessage}>{statusMessage}</div>
      )}
      <div className={styles.ppp}>{exp}</div>
    </div>
  );
}
