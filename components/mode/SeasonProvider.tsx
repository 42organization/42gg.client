import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Seasons } from 'types/seasonTypes';
import SeasonDropDown from './SeasonDropDown';
import styles from 'styles/mode/ModeSelect.module.scss';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function SeasonProvider({ children }: ModeSelectProps) {
  const [season, setSeason] = useState('');
  const [seasonList, setSeasonList] = useState<Seasons>(); // 임시

  useEffect(() => {
    getSeasonListHandler();
  }, []);

  const getSeasonListHandler = async () => {
    try {
      // const res = await instance.get(`/pingpong/seasonlist`);
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/seasonlist`
      ); // api 연결 후 삭제 예정
      setSeasonList(res?.data);
    } catch (e) {}
  };

  const seasonDropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(e.target.value);
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
