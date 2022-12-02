import React from 'react';
import { useRecoilValue } from 'recoil';
import { MatchMode } from 'types/mainType';
import { showModeWrapState } from 'utils/recoil/match';
import { seasonListState } from 'utils/recoil/seasons';
import ModeCheckBox from '../modeItems/ModeCheckBox';
import styles from 'styles/mode/ModeWrap.module.scss';

interface MatchModeWrapProps {
  children: React.ReactNode;
  checkBoxMode: MatchMode;
  setCheckBoxMode: React.Dispatch<React.SetStateAction<MatchMode>>;
}

export default function MatchModeWrap({
  children,
  checkBoxMode,
  setCheckBoxMode,
}: MatchModeWrapProps) {
  const showModeWrap = useRecoilValue(showModeWrapState);
  const { seasonMode } = useRecoilValue(seasonListState);

  const modeCheckBoxHandler = () => {
    setCheckBoxMode((mode) => (mode === 'rank' ? 'challenge' : 'rank'));
  };

  return (
    <div>
      {seasonMode === 'both' && showModeWrap && (
        <div className={styles.matchModeWrap}>
          <ModeCheckBox
            checked={checkBoxMode === 'challenge'}
            onCheckBox={modeCheckBoxHandler}
            id={'matchCheckBox'}
          />
        </div>
      )}
      {React.cloneElement(children as React.ReactElement, {
        toggleMode: checkBoxMode,
      })}
    </div>
  );
}
