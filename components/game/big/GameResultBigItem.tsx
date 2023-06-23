import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultBigScore from 'components/game/big/GameResultBigScore';
import GameResultBigTeam from 'components/game/big/GameResultBigTeam';
import styles from 'styles/game/GameResultItem.module.scss';
import { SeasonMode } from 'types/mainType';

interface GameResultBigItemProps {
  game: Game;
  radioMode?: SeasonMode;
  zIndexList: boolean;
}

function GameResultBigItem({
  game,
  zIndexList,
  radioMode,
}: GameResultBigItemProps) {
  const { mode, team1, team2, status, time, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);
  return (
    <div
      onClick={() => setClickedItemId(gameId)}
      id={String(gameId)}
      className={`${styles['bigItemContainer']} ${
        zIndexList ? styles['zIndexList'] : ''
      } ${radioMode ? styles[radioMode.toLowerCase()] : ''}`}
    >
      <GameResultBigTeam team={team1} zIndexList={zIndexList} />
      <GameResultBigScore
        mode={mode}
        status={status}
        time={time}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
        radioMode={radioMode}
      />
      <GameResultBigTeam team={team2} zIndexList={zIndexList} />
    </div>
  );
}

export default React.memo(GameResultBigItem);
