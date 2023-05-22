import useSubmitModal from 'hooks/modal/aftergame/useSubmitModal';
import useCurrentGame from 'hooks/modal/aftergame/useCurrentGame';
import NormalGame from './NormalGame';
import RankGame from './RankGame';

export default function AfterGameModal() {
  const { currentGame } = useCurrentGame();
  const { submitRankHandler, submitNormalHandler, confirmRankHandler } =
    useSubmitModal(currentGame);

  if (currentGame.startTime === '2022-07-13 11:50') return null;

  return currentGame.mode === 'normal' ? (
    <NormalGame currentGame={currentGame} onSubmit={submitNormalHandler} />
  ) : (
    <RankGame
      currentGame={currentGame}
      onSubmit={
        currentGame.isScoreExist ? confirmRankHandler : submitRankHandler
      }
    />
  );
}
