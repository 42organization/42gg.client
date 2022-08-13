import { useRecoilValue } from 'recoil';
import { UserData } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import { useState } from 'react';
import styles from 'styles/mode/ModeSelect.module.scss';
import ModeToggle from './ModeToggle';
import React from 'react';

interface ModeSelectProps {
  children: React.ReactNode;
}

export default function ModeSelect({ children }: ModeSelectProps) {
  const userData = useRecoilValue<UserData>(userState);
  const [isRank, setIsRank] = useState(userData?.mode === 'normal');
  const seasons_normal = ['season4', 'season2']; // 임시
  const seasons_rank = ['season3', 'season1']; // 임시
  const toggleHandler = () => {
    setIsRank((isRank) => !isRank);
  };
  // cloneElement 문서화하기
  // 하위 컴포넌트에 season 넘겨주기
  return (
    <div>
      <div className={styles.wrapper}>
        <ModeToggle
          checked={isRank}
          onToggle={toggleHandler}
          text={isRank ? '랭크' : '일반'}
        />
        <SeasonDropDown seasons={isRank ? seasons_rank : seasons_normal} />
      </div>
      {React.cloneElement(children as React.ReactElement, { isRank })}
    </div>
  );
}

function SeasonDropDown({ seasons }: { seasons: string[] }) {
  return (
    <select>
      {seasons.map((season) => (
        <option key={season} value={season}>
          {season}
        </option>
      ))}
    </select>
  );
}
