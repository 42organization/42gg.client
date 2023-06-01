import React from 'react';
import { MatchMode } from 'types/mainType';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useModeToggle from 'hooks/mode/useModeToggle';
import styles from 'styles/mode/ModeWrap.module.scss';

interface MatchModeWrapProps {
  children: React.ReactNode;
  toggleMode: MatchMode;
}

export default function MatchModeWrap({
  children,
  toggleMode,
}: MatchModeWrapProps) {
  const seasonMode = 'RANK';
  const { onToggle, Mode } = useModeToggle(toggleMode);

  return (
    <div>
      {seasonMode === 'RANK' && (
        <div className={styles.matchModeWrap}>
          <ModeToggle
            checked={Mode === 'RANK'}
            onToggle={onToggle}
            id={'matchToggle'}
            text={Mode === 'RANK' ? '랭크' : '일반'}
          />
        </div>
      )}
      {React.cloneElement(children as React.ReactElement, {
        toggleMode: Mode,
      })}
    </div>
  );
}
