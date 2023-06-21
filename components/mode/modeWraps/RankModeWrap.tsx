import React, { useEffect, useState } from 'react';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useSeasonDropDown from 'hooks/mode/useSeasonDropDown';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';
import { ToggleMode } from 'types/rankTypes';
import { useSetRecoilState } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import { useContext } from 'react';
import { ToggleModeContext } from '../../../pages/rank';
interface RankModeWrapProps {
  children: React.ReactNode;
  setMode: React.Dispatch<React.SetStateAction<ToggleMode>>;
}

export default function RankModeWrap({ children, setMode }: RankModeWrapProps) {
  const Mode = useContext(ToggleModeContext);
  const { seasonList, season, seasonDropDownHandler } = useSeasonDropDown();
  const [showSeasons, setShowSeasons] = useState<boolean>(true);
  const setcolorToggleSelector = useSetRecoilState(colorToggleSelector);
  
  const onToggle = (): void => {
    setMode(Mode === 'RANK' ? 'NORMAL' : 'RANK');
  };

  useEffect(() => {
    setShowSeasons(Mode === 'RANK');
    setMode(Mode);
    setcolorToggleSelector(Mode);
  }, [Mode]);

  return (
    <div>
      <div className={styles.rankModeWrap}>
        <ModeToggle
          checked={Mode === 'RANK'}
          onToggle={onToggle}
          id={'rankToggle'}
        />
        {showSeasons && seasonList && (
          <SeasonDropDown
            seasonList={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      {React.cloneElement(children as React.ReactElement, {
        mode: Mode,
        season,
      })}
    </div>
  );
}
