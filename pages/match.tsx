import { useState } from 'react';
import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import { MatchMode } from 'types/mainType';
import styles from 'styles/match/match.module.scss';

export default function Match() {
  const [toggleMode, setToggleMode] = useState<MatchMode>('rank');

  return (
    <div className={styles.container}>
      <h1
        className={toggleMode === 'rank' ? styles.rankTitle : styles.normTitle}
      >
        Match
      </h1>
      <MatchModeWrap toggleMode={toggleMode} setToggleMode={setToggleMode}>
        <MatchBoard type='single' />
      </MatchModeWrap>
    </div>
  );
}
