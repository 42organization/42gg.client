import React from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { Mode, UserData } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import { useEffect, useState } from 'react';
import ModeToggle from './ModeToggle';
import SeasonDropDown from './SeasonDropDown';
import ModeRadiobox from './ModeRadiobox';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function ModeSeasonProvider({ children }: ModeSelectProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [mode, setMode] = useState(userData?.mode);
  const [isMine, setIsMine] = useState(false);
  const [season, setSeason] = useState('');
  const [seasonList, setSeasonList] = useState<string[]>(); // 임시

  useEffect(() => {
    getSeasonList();
  }, [mode]);

  const getSeasonList = async () => {
    try {
      // const res = await instance.get(`/pingpong/seasonlist`);
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/seasonlist`
      ); // api 연결 후 삭제 예정
      setSeasonList(res?.data.seasonList);
    } catch (e) {}
  };

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
        {mode === 'rank' && seasonList !== undefined && (
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
