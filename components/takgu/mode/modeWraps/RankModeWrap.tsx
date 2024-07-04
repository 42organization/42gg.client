import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import ModeToggle from 'components/takgu/mode/modeItems/ModeToggle';
import SeasonDropDown from 'components/takgu/mode/modeItems/SeasonDropDown';
import useSeasonDropDown from 'hooks/takgu/mode/useSeasonDropDown';
import styles from 'styles/takgu/mode/ModeWrap.module.scss';
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
        season,
      })}
    </div>
  );
}
