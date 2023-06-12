import { useState } from 'react';
import RankModeWrap from 'components/mode/modeWraps/RankModeWrap';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/rank/RankList.module.scss';
import { ToggleMode } from 'types/rankTypes';

export default function Rank() {
  const [mode, setMode] = useState<ToggleMode>('RANK');
  const content = {
    RANK: { style: '', title: 'Ranking' },
    NORMAL: { style: styles.vip, title: 'VIP' },
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
