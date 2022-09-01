import { useRecoilValue } from 'recoil';
import { UserData } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import { useEffect, useState } from 'react';
import styles from 'styles/mode/ModeSelect.module.scss';
import ModeToggle from './ModeToggle';
import SeasonDropDown from './SeasonDropDown';
import React from 'react';

interface ModeSelectProps {
  children: React.ReactNode;
  setModeProps: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModeSeasonProvider({
  children,
  setModeProps,
}: ModeSelectProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [mode, setMode] = useState(userData?.mode);
  const [season, setSeason] = useState('');
  const [displaySeasons, setDisplaySeasons] = useState(true);
  const seasons_normal = ['season4', 'season2']; // 임시 : back에서 받아와야함
  const seasons_rank = ['season3', 'season1']; // 임시 : back에서 받아와야함

  useEffect(() => {
    setSeason(() => (mode === 'rank' ? seasons_rank[0] : seasons_normal[0]));
    setDisplaySeasons(mode === 'rank');
    setModeProps(mode);
  }, [mode]);

  const modeToggleHandler = () => {
    setMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={mode === 'rank'}
          onToggle={modeToggleHandler}
          text={mode === 'rank' ? '랭크' : '일반'}
        />
        {displaySeasons && (
          <SeasonDropDown
            seasons={mode === 'rank' ? seasons_rank : seasons_normal}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      {React.cloneElement(children as React.ReactElement, {
        mode,
        season,
      })}
    </div>
  );
}
