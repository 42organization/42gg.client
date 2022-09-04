import React from 'react';
import { RecordMode } from 'types/mainType';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonState } from 'utils/recoil/seasons';
import IsMineCheckBox from './modeItems/IsMineCheckBox';
import SeasonDropDown from './modeItems/SeasonDropDown';
import ModeRadiobox from './modeItems/ModeRadiobox';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function ModeSeasonProvider({ children }: ModeSelectProps) {
  const [recordMode, setRecordMode] = useState<RecordMode>('both');
  const [isMine, setIsMine] = useState(false);
  const [season, setSeason] = useState<number>(0);
  const seasonList = useRecoilValue(seasonState);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordMode(e.target.value as RecordMode);
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
        {recordMode === 'rank' && seasonList && (
          <SeasonDropDown
            seasons={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      <ModeRadiobox mode={recordMode} onChange={modeChangeHandler} />
      {React.cloneElement(children as React.ReactElement, {
        mode: recordMode,
        season,
        isMine,
      })}
    </div>
  );
}
