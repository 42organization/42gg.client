import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import { SeasonMode } from 'types/mainType';
import { clickedGameItemState } from 'utils/recoil/game';
import { profileState } from 'utils/recoil/user';
import GameResultBigScore from 'components/game/big/GameResultBigScore';
import GameResultBigTeam from 'components/game/big/GameResultBigTeam';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigItemProps {
  game: Game;
  radioMode?: SeasonMode;
  zIndexList: boolean;
  page: string;
}

function GameResultBigItem({
  game,
  zIndexList,
  radioMode,
  page,
}: GameResultBigItemProps) {
  const { mode, team1, team2, status, time, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);
  const { background } = useRecoilValue(profileState);

  return (
    <div
      onClick={() => setClickedItemId(gameId)}
      id={String(gameId)}
      className={`${styles['bigItemContainer']} 
        ${zIndexList ? styles['zIndexList'] : ''} 
        ${page === 'profile' ? styles[background.toLowerCase()] : styles[page]}
        ${radioMode ? styles[radioMode.toLowerCase()] : ''}`}
    >
      <GameResultBigTeam team={team1} zIndexList={zIndexList} />
      <GameResultBigScore
        mode={mode}
        status={status}
        time={time}
        page={page}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
        radioMode={radioMode}
      />
      <GameResultBigTeam team={team2} zIndexList={zIndexList} />
    </div>
  );
}

export default React.memo(GameResultBigItem);
