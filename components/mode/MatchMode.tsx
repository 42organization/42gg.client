import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import ModeToggle from './modeItems/ModeToggle';
import styles from 'styles/match/match.module.scss';

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
      {/* 서버 업데이트 이후 주석 해제할 예정 */}
      {/* {seasonMode === 'both' && ( */}
      <div className={styles.toggle}>
        <ModeToggle
          checked={toggleMode === 'rank'}
          onToggle={modeToggleHandler}
          text={toggleMode === 'rank' ? '랭크' : '일반'}
        />
      </div>
      {/* )} */}
      {React.cloneElement(children as React.ReactElement, {
        mode: toggleMode,
      })}
    </div>
  );
}
