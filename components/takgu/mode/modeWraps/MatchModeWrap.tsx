import React, { SetStateAction, Dispatch } from 'react';
import { useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/takgu/mainType';
import { Match } from 'types/takgu/matchTypes';
import { colorModeState } from 'utils/recoil/colorMode';
import ModeRadiobox from 'components/takgu/mode/modeItems/ModeRadiobox';

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
  const setColorMode = useSetRecoilState(colorModeState);
  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(e.target.value as MatchMode);
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
        match: match,
      })}
    </div>
  );
}
