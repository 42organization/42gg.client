import React from 'react';
import SeasonDropDown from 'components/takgu/mode/modeItems/SeasonDropDown';
import useSeasonDropDown from 'hooks/takgu/mode/useSeasonDropDown';
import styles from 'styles/mode/ModeWrap.module.scss';

interface ProfileModeWrapProps {
  children: React.ReactNode;
}

export default function ProfileModeWrap({ children }: ProfileModeWrapProps) {
  const { seasonList, season, seasonDropDownHandler } = useSeasonDropDown();

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
