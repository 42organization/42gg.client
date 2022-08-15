import ModeSeasonProvider from 'components/mode/ModeSeasonProvider';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/RankList.module.scss';

export default function Rank() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Ranking</h1>
      <MyRank />
      <ModeSeasonProvider>
        <RankList />
      </ModeSeasonProvider>
    </div>
  );
}
