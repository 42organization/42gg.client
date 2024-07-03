import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SeasonMode, MatchMode } from 'types/mainType';
import { colorModeState } from 'utils/recoil/colorMode';
import ModeRadiobox from 'components/takgu/mode/modeItems/ModeRadiobox';
import SeasonDropDown from 'components/takgu/mode/modeItems/SeasonDropDown';
import UserGameSearchBar from 'components/takgu/mode/modeItems/UserGameSearchBar';
import useSeasonDropDown from 'hooks/mode/useSeasonDropDown';
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
  const { seasonList, season, seasonDropDownHandler, TitleSeasonHandler } =
    useSeasonDropDown(clickTitle, intraId);
  const setColorMode = useSetRecoilState(colorModeState);

  useEffect(() => {
    setRadioMode('BOTH');
    TitleSeasonHandler;
    if (clickTitle) setClickTitle(false);
  }, [clickTitle, intraId]);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(e.target.value as MatchMode);
    setRadioMode(e.target.value as SeasonMode);
  };

  const isGamePage = useRouter().pathname === '/game';

  return (
    <div>
      <div className={styles.gameModeWrap}>
        <UserGameSearchBar />
        {radioMode === 'RANK' && seasonList && (
          <SeasonDropDown
            seasonList={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      <ModeRadiobox
        mode={radioMode}
        page='GAME'
        onChange={modeChangeHandler}
        zIndexList={!isGamePage}
      />
      {React.cloneElement(children as React.ReactElement, {
        mode: radioMode,
        season,
      })}
    </div>
  );
}
