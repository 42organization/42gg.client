import { useRouter } from 'next/router';
import { useState } from 'react';
import { SeasonMode } from 'types/takgu/mainType';
import GameResult from 'components/takgu/game/GameResult';
import GameModeWrap from 'components/takgu/mode/modeWraps/GameModeWrap';
import useColorMode from 'hooks/useColorMode';
import styles from 'styles/takgu/game/GameResultItem.module.scss';

export default function Game() {
  const router = useRouter();
  const [clickTitle, setClickTitle] = useState<boolean>(false);
  const [radioMode, setRadioMode] = useState<SeasonMode>('BOTH');

  useColorMode('GAME');

  const clickTitleHandler = () => {
    router.push(`/takgu/game`, undefined, {
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
