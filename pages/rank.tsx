import { useState } from 'react';
import RankMode from 'components/mode/RankMode';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/rank/RankList.module.scss';

export default function Rank() {
  const [mode, setMode] = useState('');
  const makePageName = (mode?: string) => (mode === 'rank' ? 'Ranking' : 'VIP');
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>{makePageName(mode)}</h1>
      <MyRank />
      <RankMode setModeProps={setMode}>
        <RankList />
      </RankMode>
    </div>
  );
}
