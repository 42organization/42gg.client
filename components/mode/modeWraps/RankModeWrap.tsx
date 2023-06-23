import React, { useEffect, useState } from 'react';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import useSeasonDropDown from 'hooks/mode/useSeasonDropDown';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';
import { useRecoilState } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';
interface RankModeWrapProps {
  children: React.ReactNode;
}

export default function RankModeWrap({ children }: RankModeWrapProps) {
  const [Mode, setMode] = useRecoilState(colorToggleSelector);
  const { seasonList, season, seasonDropDownHandler } = useSeasonDropDown();
  const [showSeasons, setShowSeasons] = useState<boolean>(true);
  
  const onToggle = (): void => {
    setMode(Mode === 'RANK' ? 'NORMAL' : 'RANK');
  };

  useEffect(() => {
    setShowSeasons(Mode === 'RANK');
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
