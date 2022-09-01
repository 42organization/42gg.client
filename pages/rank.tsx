import { useState } from 'react';
import ModeSeasonProvider from 'components/mode/ModeSeasonProvider';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/RankList.module.scss';

export default function Rank() {
  const [mode, setMode] = useState('');
  const makePageName = (mode?: string) =>
    mode === 'rank' ? 'Ranking' : 'VIPS';
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>{makePageName(mode)}</h1>
      <MyRank />
      <ModeSeasonProvider setModeProps={setMode}>
        <RankList />
      </ModeSeasonProvider>
    </div>
  );
}
