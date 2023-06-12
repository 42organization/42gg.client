import { useState } from 'react';
import { useRouter } from 'next/router';
import { SeasonMode } from 'types/mainType';
import GameResult from 'components/game/GameResult';
import GameModeWrap from 'components/mode/modeWraps/GameModeWrap';
import styles from 'styles/game/GameResultItem.module.scss';

export default function Game() {
  const router = useRouter();
  const [clickTitle, setClickTitle] = useState<boolean>(false);
  const [radioMode, setRadioMode] = useState<SeasonMode>('BOTH');

  const clickTitleHandler = () => {
    router.push(`/game`, undefined, {
      shallow: true,
    });
    setClickTitle(true);
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={`${styles.title}`} onClick={clickTitleHandler}>
        Record
      </h1>
      <GameModeWrap
        clickTitle={clickTitle}
        setClickTitle={setClickTitle}
        radioMode={radioMode}
        setRadioMode={setRadioMode}
      >
        <GameResult />
      </GameModeWrap>
    </div>
  );
}
