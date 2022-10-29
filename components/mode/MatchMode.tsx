import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import ModeToggle from './modeItems/ModeToggle';
import styles from 'styles/match/match.module.scss';

interface MatchModeProps {
  children: React.ReactNode;
}

export default function MatchMode({ children }: MatchModeProps) {
  const user = useRecoilValue(userState);
  const [mode, setMode] = useState<string>('rank');

  const modeToggleHandler = () => {
    setMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  return (
    <div>
      {/* 서버 업데이트 이후 주석 해제할 예정 */}
      {/* {user.seasonMode === 'both' && ( */}
      <div className={styles.toggle}>
        <ModeToggle
          checked={mode === 'rank'}
          onToggle={modeToggleHandler}
          text={mode === 'rank' ? '랭크' : '일반'}
        />
      </div>
      {/* )} */}
      {React.cloneElement(children as React.ReactElement, {
        mode,
      })}
    </div>
  );
}
