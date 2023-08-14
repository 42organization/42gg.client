import styles from 'styles/rank/RankList.module.scss';

type IdPreviewProps = {
  intraId: string;
  color: string;
};

export default function IdPreviewComponent({ intraId, color }: IdPreviewProps) {
  // TODO : RankListItem 2개로 분리 후 import해서 사용할 것.
  // NOTE : 아래는 임시 구현임.
  return (
    <div>
      {/* RANK */}
      <div
        className={`${styles.rankItemWrap} ${styles.standard} ${styles.Ranking}`}
      >
        <div className={styles.intraId} style={{ color: color }}>
          {intraId}
        </div>
      </div>
      {/* NORMAL */}
      <div
        className={`${styles.rankItemWrap} ${styles.standard} ${styles.Vip}`}
      >
        <div className={styles.intraId} style={{ color: color }}>
          {intraId}
        </div>
      </div>
    </div>
  );
}
