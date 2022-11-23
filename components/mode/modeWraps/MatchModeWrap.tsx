import React from 'react';
import { useRecoilValue } from 'recoil';
import { MatchMode } from 'types/mainType';
import { seasonListState } from 'utils/recoil/seasons';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import styles from 'styles/mode/ModeWrap.module.scss';
import ModeCheckBox from '../modeItems/ModeCheckBox';

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
          <ModeCheckBox
            checked={toggleMode === 'rank'}
            onToggle={modeToggleHandler}
            id={'matchToggle'}
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
