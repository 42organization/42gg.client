import React, { SetStateAction } from 'react';
import { MatchMode } from 'types/mainType';
import { Dispatch } from 'react';
import ModeRadiobox from '../modeItems/ModeRadiobox';

interface MatchModeWrapProps {
  children: React.ReactNode;
  radioMode: MatchMode;
  setRadioMode: Dispatch<SetStateAction<MatchMode>>;
}

export default function MatchModeWrap({
  children,
  radioMode,
  setRadioMode,
}: MatchModeWrapProps) {
  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioMode(e.target.value as MatchMode);
  };

  return (
    <div>
      <ModeRadiobox
        mode={radioMode}
        page='MATCH'
        onChange={modeChangeHandler}
        zIndexList={false}
      />
      {React.cloneElement(children as React.ReactElement, {
        mode: radioMode,
      })}
    </div>
  );
}
