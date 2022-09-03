import React from 'react';
import { Mode } from 'types/mainType';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { seasonState } from 'utils/recoil/seasons';
import ModeToggle from './ModeToggle';
import SeasonDropDown from './SeasonDropDown';
import ModeRadiobox from './ModeRadiobox';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function ModeSeasonProvider({ children }: ModeSelectProps) {
  const [mode, setMode] = useState<Mode>('both');
  const [isMine, setIsMine] = useState(false);
  const [season, setSeason] = useState('');
  const seasonList = useRecoilValue(seasonState);

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
        {mode === 'rank' && seasonList && (
          <SeasonDropDown
            seasons={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
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
