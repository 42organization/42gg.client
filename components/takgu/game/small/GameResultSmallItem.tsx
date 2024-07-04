import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Game } from 'types/takgu/gameTypes';
import { SeasonMode } from 'types/takgu/mainType';
import { clickedGameItemState } from 'utils/recoil/game';
import { profileState } from 'utils/recoil/user';
import GameResultSmallScore from 'components/takgu/game/small/GameResultSmallScore';
import GameResultSmallTeam from 'components/takgu/game/small/GameResultSmallTeam';
import styles from 'styles/takgu/game/GameResultItem.module.scss';

interface GameResultSmallItemProps {
  game: Game;
  type: 'LIGHT' | 'DARK';
  zIndexList: boolean;
  radioMode?: SeasonMode;
  page: string;
}

function GameResultSmallItem({
  game,
  type,
  zIndexList,
  radioMode,
  page,
}: GameResultSmallItemProps) {
  const { mode, team1, team2, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);
  const { background } = useRecoilValue(profileState);

  return (
    <div
      onClick={() => setClickedItemId(gameId)}
      id={String(gameId)}
      className={`${styles['smallItemContainer']}
        ${styles[type.toLowerCase()]}
        ${page === 'profile' ? styles[background.toLowerCase()] : styles[page]}
        ${radioMode !== undefined ? styles[radioMode.toLowerCase()] : ''}
        ${zIndexList ? styles['zIndexList'] : ''}`}
    >
      <GameResultSmallTeam team={team1} position={'Left'} />
      <GameResultSmallScore
        mode={mode}
        status={game.status}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
      />
      <GameResultSmallTeam team={team2} position={'Right'} />
    </div>
  );
}

export default React.memo(GameResultSmallItem);
