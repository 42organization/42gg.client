import { useState } from 'react';
import { useRouter } from 'next/router';
import GameResult from 'components/game/GameResult';
import GameModeWrap from 'components/mode/modeWraps/GameModeWrap';
import styles from 'styles/game/GameResultItem.module.scss';

export default function Game() {
  const router = useRouter();
  const [clickedTitle, setClickedTitle] = useState<boolean>(false);

  const clickedTitleHandler = () => {
    router.push(`/game`, undefined, {
      shallow: true,
    });
    setClickedTitle(true);
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title} onClick={clickedTitleHandler}>
        Record
      </h1>
      <GameModeWrap
        clickedTitle={clickedTitle}
        setClickedTitle={setClickedTitle}
      >
        <GameResult />
      </GameModeWrap>
    </div>
  );
}
