import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonState } from 'utils/recoil/seasons';
import SeasonDropDown from './modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function SeasonProvider({ children }: ModeSelectProps) {
  const [season, setSeason] = useState<number>(0);
  const seasonList = useRecoilValue(seasonState);

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.wrapperRight}>
        {seasonList && (
          <SeasonDropDown
            seasons={seasonList}
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
