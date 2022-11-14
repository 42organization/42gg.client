import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonListState, latestSeasonIdState } from 'utils/recoil/seasons';
import SeasonDropDown from 'components/mode/modeItems/SeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';

interface ProfileModeWrapProps {
  children: React.ReactNode;
}

export default function ProfileModeWrap({ children }: ProfileModeWrapProps) {
  const { seasonList } = useRecoilValue(seasonListState);
  const [season, setSeason] = useState<number>(
    useRecoilValue(latestSeasonIdState)
  );
  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(parseInt(e.target.value));
  };

  return (
    <div>
      <div className={styles.profileModeWrap}>
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
