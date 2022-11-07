import React from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import { MatchMode } from 'types/mainType';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import styles from 'styles/mode/ModeWrap.module.scss';

interface MatchModeWrapProps {
  children: React.ReactNode;
  toggleMode: MatchMode;
  setToggleMode: React.Dispatch<React.SetStateAction<MatchMode>>;
}

export default function MatchModeWrap({
  children,
  toggleMode,
  setToggleMode,
}: MatchModeWrapProps) {
  const { seasonMode } = useRecoilValue(seasonListState);

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
        toggleMode: toggleMode,
      })}
    </div>
  );
}
