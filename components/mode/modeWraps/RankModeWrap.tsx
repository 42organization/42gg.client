import React, { useEffect, useState } from 'react';
import { MatchMode } from 'types/mainType';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useModeToggle from 'hooks/useModeToggle';
import useSeasonDropDown from 'hooks/useSeasonDropDown'
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';

interface RankModeWrapProps {
  children: React.ReactNode;
  setMode: React.Dispatch<React.SetStateAction<MatchMode>>;
}

export default function RankModeWrap({ children, setMode }: RankModeWrapProps) {
  const {seasonList, season, seasonDropDownHandler, seasonMode} = useSeasonDropDown();
  const {onToggle, Mode} = useModeToggle(seasonMode === 'normal' ? 'normal' : 'rank');
  const [showSeasons, setShowSeasons] = useState<boolean>(
    seasonMode !== 'normal'
  );

  useEffect(() => {
    setShowSeasons(Mode === 'rank');
    setMode(Mode);
  }, [Mode]);

  return (
    <div>
      <div className={styles.rankModeWrap}>
        <ModeToggle
          checked={Mode === 'rank'}
          onToggle={onToggle}
          text={Mode === 'rank' ? '랭크' : '열정'}
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
