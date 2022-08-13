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
}

export default function ModeSeasonProvider({ children }: ModeSelectProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [displaySeasons, SetDisplaySeasons] = useState(true);
  const [isRank, setIsRank] = useState(userData?.mode === 'rank');
  const [season, setSeason] = useState('');
  const seasons_normal = ['season4', 'season2']; // 임시 : back에서 받아와야함
  const seasons_rank = ['season3', 'season1']; // 임시 : back에서 받아와야함

  useEffect(() => {
    setSeason(() => (isRank ? seasons_rank[0] : seasons_normal[0]));
  }, [isRank]);

  const toggleHandler = () => {
    setIsRank((isRank) => !isRank);
  };

  const dropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
  };

  const displaySeasonsHandler = (isDisplay: boolean) => {
    SetDisplaySeasons(isDisplay);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={isRank}
          onToggle={toggleHandler}
          text={isRank ? '랭크' : '일반'}
        />
        {displaySeasons && (
          <SeasonDropDown
            seasons={isRank ? seasons_rank : seasons_normal}
            value={season}
            onSelect={dropDownHandler}
          />
        )}
      </div>
      {React.cloneElement(children as React.ReactElement, {
        isRank,
        season,
        displaySeasonsHandler,
      })}
    </div>
  );
}
