import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SeasonMode } from 'types/mainType';
import { seasonListState } from 'utils/recoil/seasons';
import IsMineCheckBox from './modeItems/IsMineCheckBox';
import SeasonDropDown from './modeItems/SeasonDropDown';
import ModeRadiobox from './modeItems/ModeRadiobox';
import styles from 'styles/mode/ModeSelect.module.scss';

interface GameModeProps {
  children: React.ReactNode;
}

export default function GameMode({ children }: GameModeProps) {
  const { seasonList } = useRecoilValue(seasonListState);
  const [isMine, setIsMine] = useState(false);
  const [season, setSeason] = useState<number>(seasonList[0].id);
  const [radioMode, setRadioMode] = useState<SeasonMode>('both');

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioMode(e.target.value as SeasonMode);
  };

  const isMineCheckBoxHandler = () => {
    setIsMine((isMine) => !isMine);
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <IsMineCheckBox isMine={isMine} onChange={isMineCheckBoxHandler} />
        {radioMode === 'rank' && seasonList && (
          <SeasonDropDown
            seasonList={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      <ModeRadiobox mode={radioMode} onChange={modeChangeHandler} />
      {React.cloneElement(children as React.ReactElement, {
        mode: radioMode,
        season,
        isMine,
      })}
    </div>
  );
}
