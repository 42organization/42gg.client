import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styles from 'styles/rank/RankList.module.scss';
import { NormalUser } from 'types/rankTypes';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import { userState } from 'utils/recoil/layout';

type NormalListItemProps = {
  user: NormalUser;
  textColorPreview?: string;
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

  return (
    <div
      className={`${styles.rankItemWrap} ${topStyle(rank)} ${styles.Vip} ${
        intraId === myIntraId && styles.myVip
      }`}
    >
      {rank}
      <div
        style={{
          color: textColorPreview === undefined ? textColor : textColorPreview,
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
      <div className={styles.statusMessage}>{statusMessage}</div>
      <div className={styles.ppp}>{exp}</div>
    </div>
  );
}
