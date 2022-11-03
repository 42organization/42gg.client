import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';

interface RankModeProps {
  children: React.ReactNode;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

export default function RankMode({ children, setMode }: RankModeProps) {
  const { seasonMode, seasonList } = useRecoilValue(seasonListState);
  const [season, setSeason] = useState<number>(seasonList[0]?.id);
  const [toggleMode, setToggleMode] = useState<string>(
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
          text={toggleMode === 'rank' ? '랭크' : '일반'}
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
