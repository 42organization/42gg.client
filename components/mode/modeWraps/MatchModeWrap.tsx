import React, { SetStateAction, useState } from 'react';
import { MatchMode } from 'types/mainType';
import { Dispatch } from 'react';
import ModeRadiobox from '../modeItems/ModeRadiobox';
import { Match } from 'types/matchTypes';

interface MatchModeWrapProps {
  children: React.ReactNode;
  radioMode: MatchMode;
  match: Match | null;
  setRadioMode: Dispatch<SetStateAction<MatchMode>>;
}

export default function MatchModeWrap({
  children,
  radioMode,
  match,
  setRadioMode,
}: MatchModeWrapProps) {
  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioMode(e.target.value as MatchMode);
  };

  return (
    <div>
      <ModeRadiobox mode={radioMode} onChange={modeChangeHandler} />
      {React.cloneElement(children as React.ReactElement, {
        mode: radioMode,
        match: match,
      })}
    </div>
  );
}
