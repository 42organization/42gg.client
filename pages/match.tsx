import { useState } from 'react';
import { MatchMode } from 'types/mainType';
import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  const [checkBoxMode, setCheckBoxMode] = useState<MatchMode>('rank');
  const content = {
    normal: { style: styles.normal },
    rank: { style: '' },
    challenge: { style: styles.normal },
  };

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
