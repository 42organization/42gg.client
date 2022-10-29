import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RecordMode } from 'types/mainType';
import { seasonListState } from 'utils/recoil/seasons';
import IsMineCheckBox from './modeItems/IsMineCheckBox';
import SeasonDropDown from './modeItems/SeasonDropDown';
import ModeRadiobox from './modeItems/ModeRadiobox';
import styles from 'styles/mode/ModeSelect.module.scss';

interface GameModeProps {
  children: React.ReactNode;
}

export default function GameMode({ children }: GameModeProps) {
  const [isMine, setIsMine] = useState(false);
  const [season, setSeason] = useState(0);
  const [recordMode, setRecordMode] = useState<RecordMode>('both');
  const seasonList = useRecoilValue(seasonListState);
  const fromMine = useRouter().query.fromMine;

  useEffect(() => {
    if (fromMine) setIsMine(true);
  }, []);

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
