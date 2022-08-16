import { useRecoilValue } from 'recoil';
import { Mode, UserData } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import { useEffect, useState } from 'react';
import styles from 'styles/mode/ModeSelect.module.scss';
import ModeToggle from './ModeToggle';
import SeasonDropDown from './SeasonDropDown';
import React from 'react';
import ModeRadiobox from './ModeRadiobox';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function ModeSeasonProvider({ children }: ModeSelectProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [mode, setMode] = useState(userData?.mode);
  const [isMine, setIsMine] = useState(false);
  const [season, setSeason] = useState('');
  const seasons_both = ['season4', 'season3', 'season2', 'season1']; // 임시 : back에서 받아와야함
  const seasons_normal = ['season4', 'season2']; // 임시 : back에서 받아와야함
  const seasons_rank = ['season3', 'season1']; // 임시 : back에서 받아와야함

  useEffect(() => {
    setSeason(() => {
      if (mode === 'both') return seasons_both[0];
      else if (mode === 'normal') return seasons_normal[0];
      else return seasons_rank[0];
    });
  }, [mode]);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as Mode);
  };

  const isMineToggleHandler = () => {
    setIsMine((isMine) => !isMine);
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={isMine}
          onToggle={isMineToggleHandler}
          text={isMine ? '내 거' : '모두'}
        />
        <SeasonDropDown
          seasons={
            // 임시
            mode === 'rank'
              ? seasons_rank
              : mode === 'normal'
              ? seasons_normal
              : seasons_both
          }
          value={season}
          onSelect={seasonDropDownHandler}
        />
      </div>
      <ModeRadiobox mode={mode} onChange={modeChangeHandler} />
      {React.cloneElement(children as React.ReactElement, {
        mode,
        season,
        isMine,
      })}
    </div>
  );
}
