import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserData } from 'types/mainType';
import { Seasons } from 'types/seasonTypes';
import { userState } from 'utils/recoil/layout';
import ModeToggle from './ModeToggle';
import SeasonDropDown from './SeasonDropDown';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
  setModeProps: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModeSeasonProvider({
  children,
  setModeProps,
}: ModeSelectProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [mode, setMode] = useState(userData?.mode);
  const [season, setSeason] = useState('');
  const [displaySeasons, setDisplaySeasons] = useState(true);
  const [seasonList, setSeasonList] = useState<Seasons>(); // 임시

  useEffect(() => {
    getSeasonList();
    setDisplaySeasons(mode === 'rank');
    setModeProps(mode);
  }, [mode]);

  const getSeasonList = async () => {
    try {
      // const res = await instance.get(`/pingpong/seasonlist`);
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/seasonlist`
      ); // api 연결 후 삭제 예정
      setSeasonList(res?.data);
    } catch (e) {}
  };

  const modeToggleHandler = () => {
    setMode((mode) => (mode === 'rank' ? 'normal' : 'rank'));
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={mode === 'rank'}
          onToggle={modeToggleHandler}
          text={mode === 'rank' ? '랭크' : '일반'}
        />
        {displaySeasons && seasonList && (
          <SeasonDropDown
            seasons={seasonList}
            value={season}
            onSelect={seasonDropDownHandler}
          />
        )}
      </div>
      {React.cloneElement(children as React.ReactElement, {
        mode,
        season,
      })}
    </div>
  );
}
