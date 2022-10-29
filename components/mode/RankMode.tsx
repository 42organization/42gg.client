import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { seasonListState } from 'utils/recoil/seasons';
import ModeToggle from './modeItems/ModeToggle';
import SeasonDropDown from './modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeSelect.module.scss';

interface RankModeProps {
  children: React.ReactNode;
  setModeProps: React.Dispatch<React.SetStateAction<string>>;
}

export default function RankMode({ children, setModeProps }: RankModeProps) {
  const user = useRecoilValue(userState);
  const [season, setSeason] = useState<number>(0);
  const [seasonMode, setSeasonMode] = useState(user?.seasonMode);
  const [displaySeasons, setDisplaySeasons] = useState(true);
  const seasonList = useRecoilValue(seasonListState);

  useEffect(() => {
    setDisplaySeasons(seasonMode === 'rank');
    setModeProps(seasonMode);
  }, [seasonMode]);

  const modeToggleHandler = () => {
    setSeasonMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={seasonMode === 'rank'}
          onToggle={modeToggleHandler}
          text={seasonMode === 'rank' ? '랭크' : '일반'}
        />
        {displaySeasons && seasonList && (
          <SeasonDropDown
            seasons={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      {React.cloneElement(children as React.ReactElement, {
        mode: seasonMode,
        season,
      })}
    </div>
  );
}
