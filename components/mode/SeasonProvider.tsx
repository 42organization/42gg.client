import { useEffect, useState } from 'react';
import styles from 'styles/mode/ModeSelect.module.scss';
import SeasonDropDown from './SeasonDropDown';
import React from 'react';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function SeasonProvider({ children }: ModeSelectProps) {
  const [season, setSeason] = useState('');
  const seasons_rank = ['season3', 'season1']; // 임시 : back에서 받아와야함

  useEffect(() => {
    setSeason(() => seasons_rank[0]);
  }, []);

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
  };

  return (
    <div>
      <div className={styles.wrapperRight}>
        <SeasonDropDown
          seasons={seasons_rank}
          value={season}
          onSelect={seasonDropDownHandler}
        />
      </div>
      {React.cloneElement(children as React.ReactElement, {
        season,
      })}
    </div>
  );
}
