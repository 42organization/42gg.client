import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultBigScore from 'components/game/big/GameResultBigScore';
import GameResultBigTeam from 'components/game/big/GameResultBigTeam';
import styles from 'styles/game/GameResultItem.module.scss';
import { BigGameContainer } from 'styles/game/GameResultItem.styles';

interface GameResultBigItemProps {
  game: Game;
  type: 'LIGHT' | 'DARK';
  zIndex: number;
}

function GameResultBigItem({ game, type, zIndex }: GameResultBigItemProps) {
  const { mode, team1, team2, status, time, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);
  return (
    <BigGameContainer
      onClick={() => setClickedItemId(gameId)}
      id={String(gameId)}
      zIndex={zIndex}
      type={type}
    >
      <GameResultBigTeam team={team1} />
      <GameResultBigScore
        mode={mode}
        status={status}
        time={time}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
      />
      <GameResultBigTeam team={team2} />
    </BigGameContainer>
  );
}

export default React.memo(GameResultBigItem);
