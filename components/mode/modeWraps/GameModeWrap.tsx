import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SeasonMode } from 'types/mainType';
import { seasonListState } from 'utils/recoil/seasons';
import UserGameSearchBar from '../modeItems/UserGameSearchBar';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import ModeRadiobox from 'components/mode/modeItems/ModeRadiobox';
import styles from 'styles/mode/ModeWrap.module.scss';

interface GameModeWrapProps {
  children: React.ReactNode;
  clickedTitle: boolean;
  setClickedTitle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameModeWrap({
  children,
  clickedTitle,
  setClickedTitle,
}: GameModeWrapProps) {
  const { seasonList } = useRecoilValue(seasonListState);
  const [season, setSeason] = useState<number>(seasonList[0]?.id);
  const [radioMode, setRadioMode] = useState<SeasonMode>('both');

  useEffect(() => {
    if (clickedTitle) {
      setRadioMode('both');
      setSeason(seasonList[0]?.id);
      setClickedTitle(false);
    }
  }, [clickedTitle]);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioMode(e.target.value as SeasonMode);
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.gameModeWrap}>
        <UserGameSearchBar />
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
      })}
    </div>
  );
}
