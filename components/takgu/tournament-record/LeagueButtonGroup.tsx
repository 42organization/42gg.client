import React, { SetStateAction, useState } from 'react';
import styles from 'styles/takgu/tournament-record/LeagueButtonGroup.module.scss';

interface LeagueButtonGroupProps {
  onSelect: React.Dispatch<SetStateAction<string>>;
}

export default function LeagueButtonGroup({
  onSelect,
}: LeagueButtonGroupProps) {
  const [activeButton, setActiveButton] = useState('ROOKIE');

  const handleClick = (league: string) => {
    onSelect(league);
    setActiveButton(league);
  };

  return (
    <div className={styles.leagueButtonWrapper}>
      <button
        onClick={() => handleClick('ROOKIE')}
        className={activeButton === 'ROOKIE' ? styles.active : ''}
      >
        Rookie
      </button>
      <button
        onClick={() => handleClick('MASTER')}
        className={activeButton === 'MASTER' ? styles.active : ''}
      >
        Master
      </button>
      <button
        onClick={() => handleClick('CUSTOM')}
        className={activeButton === 'CUSTOM' ? styles.active : ''}
      >
        Custom
      </button>
    </div>
  );
}
