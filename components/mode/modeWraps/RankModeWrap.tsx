import React, { useEffect, useState } from 'react';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useModeToggle from 'hooks/mode/useModeToggle';
import useSeasonDropDown from 'hooks/mode/useSeasonDropDown';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';

interface RankModeWrapProps {
  children: React.ReactNode;
  setMode: React.Dispatch<React.SetStateAction<'normal' | 'rank'>>;
}

export default function RankModeWrap({ children, setMode }: RankModeWrapProps) {
  const { seasonList, season, seasonDropDownHandler, seasonMode } =
    useSeasonDropDown();
  const { onToggle, Mode } = useModeToggle(
    seasonMode === 'normal' ? 'normal' : 'rank'
  );
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
