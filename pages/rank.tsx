import RankModeWrap from 'components/mode/modeWraps/RankModeWrap';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/rank/RankList.module.scss';
import useColorMode from 'hooks/useColorMode';
import { createContext } from 'react';
import { ToggleMode } from 'types/rankTypes';
import { useState } from 'react';

export const ToggleModeContext = createContext<ToggleMode>('RANK');

export default function Rank() {
  const [Mode, setMode] = useState<ToggleMode>('RANK');

  useColorMode('RANK');

  const content = {
    RANK: { style: '', title: 'Ranking' },
    NORMAL: { style: styles.vip, title: 'VIP' },
  };
  return (
    <ToggleModeContext.Provider value={Mode}>
      <div className={styles.pageWrap}>
        <h1 className={`${styles.title} ${content[Mode].style}`}>
          {content[Mode].title}
        </h1>
        <MyRank/>
        <RankModeWrap setMode={setMode}>
          <RankList/>
        </RankModeWrap>
      </div>
    </ToggleModeContext.Provider>
  );
}
