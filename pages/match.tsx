import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MatchMode } from 'types/mainType';
import { currentMatchState } from 'utils/recoil/match';
import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  const { mode } = useRecoilValue(currentMatchState);
  const [checkBoxMode, setCheckBoxMode] = useState<MatchMode>('rank');
  const content = {
    normal: { style: styles.normal },
    rank: { style: '' },
    challenge: { style: styles.normal },
  };

  useEffect(() => {
    if (mode !== '')
      setCheckBoxMode(mode === 'CHALLENGE' ? 'challenge' : 'rank');
  }, [mode]);

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${content[checkBoxMode].style}`}>
        Match
      </h1>
      <div className={styles.checkbox}></div>
      <MatchModeWrap
        checkBoxMode={checkBoxMode}
        setCheckBoxMode={setCheckBoxMode}
      >
        <MatchBoard checkBoxMode={checkBoxMode} type='single' />
      </MatchModeWrap>
    </div>
  );
}
