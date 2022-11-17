import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState, latestSeasonIdState } from 'utils/recoil/seasons';
import { MatchMode } from 'types/mainType';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';

interface RankModeWrapProps {
  children: React.ReactNode;
  setMode: React.Dispatch<React.SetStateAction<MatchMode>>;
}

export default function RankModeWrap({ children, setMode }: RankModeWrapProps) {
  const { seasonMode, seasonList } = useRecoilValue(seasonListState);
  const [season, setSeason] = useState<number>(
    useRecoilValue(latestSeasonIdState)
  );
  const [toggleMode, setToggleMode] = useState<MatchMode>(
    seasonMode === 'normal' ? 'normal' : 'rank'
  );
  const [showSeasons, setShowSeasons] = useState<boolean>(
    seasonMode !== 'normal'
  );

  useEffect(() => {
    setShowSeasons(toggleMode === 'rank');
    setMode(toggleMode);
  }, [toggleMode]);

  const modeToggleHandler = () => {
    setToggleMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.rankModeWrap}>
        <ModeToggle
          checked={toggleMode === 'rank'}
          onToggle={modeToggleHandler}
          text={toggleMode === 'rank' ? '랭크' : '열정'}
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
        mode: toggleMode,
        season,
      })}
    </div>
  );
}
