import React, { useEffect, useState } from 'react';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useModeToggle from 'hooks/mode/useModeToggle';
import useSeasonDropDown from 'hooks/mode/useSeasonDropDown';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';
import { ToggleMode } from 'types/rankTypes';

interface RankModeWrapProps {
  children: React.ReactNode;
  setMode: React.Dispatch<React.SetStateAction<ToggleMode>>;
}

export default function RankModeWrap({ children, setMode }: RankModeWrapProps) {
  const { seasonList, season, seasonDropDownHandler } = useSeasonDropDown();
  const { onToggle, Mode } = useModeToggle('RANK');
  const [showSeasons, setShowSeasons] = useState<boolean>(true);

  useEffect(() => {
    setShowSeasons(Mode === 'RANK');
    setMode(Mode);
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
