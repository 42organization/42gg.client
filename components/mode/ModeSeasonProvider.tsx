import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { seasonState } from 'utils/recoil/seasons';
import ModeToggle from './modeItems/ModeToggle';
import SeasonDropDown from './modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
  setModeProps: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModeSeasonProvider({
  children,
  setModeProps,
}: ModeSelectProps) {
  const user = useRecoilValue(userState);
  const [rankMode, setRankMode] = useState(user?.seasonMode);
  const [season, setSeason] = useState<number>(0);
  const [displaySeasons, setDisplaySeasons] = useState(true);
  const seasonList = useRecoilValue(seasonState);

  useEffect(() => {
    setDisplaySeasons(rankMode === 'rank');
    setModeProps(rankMode);
  }, [rankMode]);

  const modeToggleHandler = () => {
    setRankMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={rankMode === 'rank'}
          onToggle={modeToggleHandler}
          text={rankMode === 'rank' ? '랭크' : '일반'}
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
        mode: rankMode,
        season,
      })}
    </div>
  );
}
