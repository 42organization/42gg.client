import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import ModeToggle from '../modeItems/ModeToggle';
import styles from 'styles/mode/ModeWrap.module.scss';

interface MatchModeProps {
  children: React.ReactNode;
}

export default function MatchMode({ children }: MatchModeProps) {
  const { seasonMode } = useRecoilValue(seasonListState);
  const [toggleMode, setToggleMode] = useState<string>('rank');

  const modeToggleHandler = () => {
    setToggleMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  return (
    <div>
      {seasonMode === 'both' && (
        <div className={styles.matchModeWrap}>
          <ModeToggle
            checked={toggleMode === 'rank'}
            onToggle={modeToggleHandler}
            text={toggleMode === 'rank' ? '랭크' : '일반'}
          />
        </div>
      )}
      {React.cloneElement(children as React.ReactElement, {
        mode: toggleMode,
      })}
    </div>
  );
}
