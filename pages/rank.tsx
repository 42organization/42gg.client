import { useState, useRef, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { seasonListState } from 'utils/recoil/seasons';
import { scrollState } from 'utils/recoil/myRank';
import RankModeWrap from 'components/mode/modeWraps/RankModeWrap';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import styles from 'styles/rank/RankList.module.scss';

export default function Rank() {
  const { seasonMode } = useRecoilValue(seasonListState);
  const [scroll, setScroll] = useRecoilState(scrollState);
  const [mode, setMode] = useState<MatchMode>(
    seasonMode === 'normal' ? 'normal' : 'rank'
  );
  const topRef = useRef<HTMLDivElement>(null);
  const content = {
    rank: { style: '', title: 'Ranking' },
    normal: { style: styles.vip, title: 'VIP' },
    challenge: { style: '', title: 'challenge' },
  };

  useEffect(() => {
    if (scroll.top) {
      topRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setScroll((prev) => ({ ...prev, top: false }));
    }
  }, [scroll.top]);

  return (
    <div className={styles.pageWrap} ref={topRef}>
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
