import React, { SetStateAction } from 'react';
import { MatchMode } from 'types/mainType';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useModeToggle from 'hooks/mode/useModeToggle';
import styles from 'styles/mode/ModeWrap.module.scss';

import { Dispatch } from 'react';
import ModeRadiobox from '../modeItems/ModeRadiobox';

interface MatchModeWrapProps {
  children: React.ReactNode;
  // toggleMode: MatchMode;
  radioMode: MatchMode;
  setRadioMode: Dispatch<SetStateAction<MatchMode>>;
}

export default function MatchModeWrap({
  children,
  // toggleMode,
  radioMode,
  setRadioMode,
}: MatchModeWrapProps) {
  // const seasonMode = 'RANK';
  // const { onToggle, Mode } = useModeToggle(toggleMode);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioMode(e.target.value as MatchMode);
  };

  return (
    <div>
      {/* {seasonMode === 'RANK' && (
        <div className={styles.matchModeWrap}>
          <ModeToggle
            checked={Mode === 'RANK'}
            onToggle={onToggle}
            id={'matchToggle'}
            text={Mode === 'RANK' ? '랭크' : '일반'}
          />
        </div>
      )} */}
      {/* {React.cloneElement(children as React.ReactElement, {
        toggleMode: Mode,
      })} */}
      <ModeRadiobox mode={radioMode} onChange={modeChangeHandler} />
      {React.cloneElement(children as React.ReactElement, {
        mode: radioMode,
      })}
    </div>
  );
}
