import { useState } from 'react';
import { MatchMode } from 'types/mainType';
import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  const [toggleMode] = useState<MatchMode>('rank');
  const content = {
    normal: { style: styles.normal },
    rank: { style: '' },
    both: { style: '' },
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${content[toggleMode].style}`}>Match</h1>
      <MatchModeWrap toggleMode={toggleMode}>
        <MatchBoard toggleMode={toggleMode} type='single' />
      </MatchModeWrap>
    </div>
  );
}
