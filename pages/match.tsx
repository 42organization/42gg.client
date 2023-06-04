import { useState } from 'react';
import { MatchMode } from 'types/mainType';
import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  // const [toggleMode] = useState<MatchMode>('RANK');
  const content = {
    NORMAL: { style: styles.normal },
    RANK: { style: '' },
    BOTH: { style: '' },
  };

  const [radioMode, setRadioMode] = useState<MatchMode>('BOTH');

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${content[radioMode].style}`}>Match</h1>
      {/* <MatchModeWrap toggleMode={toggleMode}>
        <MatchBoard toggleMode={toggleMode} type='single' />
      </MatchModeWrap> */}
      <MatchModeWrap radioMode={radioMode} setRadioMode={setRadioMode}>
        <MatchBoard radioMode={radioMode} type='single' />
      </MatchModeWrap>
    </div>
  );
}
