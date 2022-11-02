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
  const { seasonList } = useRecoilValue(seasonListState);
  const [season, setSeason] = useState<number>(seasonList[0].id);

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.wrapperRight}>
        {seasonList && (
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
