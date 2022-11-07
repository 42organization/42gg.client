import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import { MatchMode } from 'types/mainType';
import RankModeWrap from 'components/mode/modeWraps/RankModeWrap';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/rank/RankList.module.scss';

export default function Rank() {
  const { seasonMode } = useRecoilValue(seasonListState);
  const [mode, setMode] = useState<MatchMode>(
    seasonMode === 'normal' ? 'normal' : 'rank'
  );

  return (
    <div className={styles.pageWrap}>
      <h1 className={mode === 'rank' ? styles.rankTitle : styles.vipTitle}>
        {mode === 'rank' ? 'Ranking' : 'VIP'}
      </h1>
      <MyRank mode={mode} />
      <RankModeWrap setMode={setMode}>
        <RankList mode={mode} />
      </RankModeWrap>
    </div>
  );
}
