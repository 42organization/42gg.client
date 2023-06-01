import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultSmallScore from 'components/game/small/GameResultSmallScore';
import GameResultSmallTeam from 'components/game/small/GameResultSmallTeam';
import styles from 'styles/game/GameResultItem.module.scss';
import { SmallGameContiainer } from 'styles/game/GameResultItem.styles';

interface GameResultSmallItemProps {
  game: Game;
  type: 'LIGHT' | 'DARK';
  zIndex: number;
  isFirst: boolean;
}

function GameResultSmallItem({
  game,
  type,
  zIndex,
  isFirst,
}: GameResultSmallItemProps) {
  const { mode, team1, team2, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);
  return (
    <SmallGameContiainer
      id={String(gameId)}
      isFirst={isFirst}
      zIndex={zIndex}
      type={type}
    >
      <GameResultSmallTeam team={team1} position={'Left'} />
      <GameResultSmallScore
        mode={mode}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
      />
      <GameResultSmallTeam team={team2} position={'Right'} />
    </SmallGameContiainer>
  );
}

export default React.memo(GameResultSmallItem);
