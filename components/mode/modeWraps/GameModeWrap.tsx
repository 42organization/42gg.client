// /game 레코드의 전체 부분
//gameresultlist부분에서 value를 더 보기로 준다.
//랭크일 경우 시즌리스트를 표시한다.
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SeasonMode } from 'types/mainType';
import UserGameSearchBar from 'components/mode/modeItems/UserGameSearchBar';
import useSeasonDropDown from 'hooks/useSeasonDropDown'
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import ModeRadiobox from 'components/mode/modeItems/ModeRadiobox';
import styles from 'styles/mode/ModeWrap.module.scss';

interface GameModeWrapProps {
  children: React.ReactNode;
  clickTitle: boolean;
  radioMode: SeasonMode;
  setClickTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setRadioMode: React.Dispatch<React.SetStateAction<SeasonMode>>;
}

export default function GameModeWrap({
  children,
  clickTitle,
  setClickTitle,
  radioMode,
  setRadioMode,
}: GameModeWrapProps) {
  const intraId = useRouter().query.intraId;
  const {seasonList, season, seasonDropDownHandler, TitleSeasonHandler} = useSeasonDropDown(clickTitle, intraId);
  useEffect(() => {
    setRadioMode('both');
    TitleSeasonHandler;
    if (clickTitle) setClickTitle(false);
  }, [clickTitle, intraId]);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioMode(e.target.value as SeasonMode);
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
