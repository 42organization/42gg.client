import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import SeasonDropDown from './modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ProfileModeProps {
  children: React.ReactNode;
}

export default function ProfileMode({ children }: ProfileModeProps) {
  const [season, setSeason] = useState<number>(0);
  const seasonList = useRecoilValue(seasonListState);

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
