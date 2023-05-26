import { useState } from 'react';
import { MatchMode } from 'types/mainType';
import RankModeWrap from 'components/mode/modeWraps/RankModeWrap';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/rank/RankList.module.scss';

export default function Rank() {
  const seasonMode = 'rank';
  const [mode, setMode] = useState<MatchMode>(
    seasonMode === 'normal' ? 'normal' : 'rank'
  );
  const content = {
    rank: { style: '', title: 'Ranking' },
    normal: { style: styles.vip, title: 'VIP' },
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={`${styles.title} ${content[mode].style}`}>
        {content[mode].title}
      </h1>
      <MyRank toggleMode={mode} />
      <RankModeWrap setMode={setMode}>
        <RankList toggleMode={mode} />
      </RankModeWrap>
    </div>
  );
}
