import React, { SetStateAction } from 'react';
import styles from 'styles/tournament-record/LeagueButtonGroup.module.scss';

interface LeagueButtonGroupProps {
  onSelect: React.Dispatch<SetStateAction<string>>;
}

export default function LeagueButtonGroup({
  onSelect,
}: LeagueButtonGroupProps) {
  const handleRookieButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onSelect('ROOKIE');
  };
  const handleMasterButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onSelect('MASTER');
  };
  const handleCustomButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    onSelect('CUSTOM');
  };

  return (
    <div className={styles.leagueButtonWrapper}>
      <button onClick={handleRookieButtonClick}>Rookie</button>
      <button onClick={handleMasterButtonClick}>Master</button>
      <button onClick={handleCustomButtonClick}>Custom</button>
    </div>
  );
}
