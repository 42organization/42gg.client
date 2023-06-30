import NormalGame from './NormalGame';
import RankGame from './RankGame';
import useSubmitModal from 'hooks/modal/aftergame/useSubmitModal';
import useCurrentGame from 'hooks/modal/aftergame/useCurrentGame';

export default function AfterGameModal() {
  const { currentGame } = useCurrentGame();
  const { submitRankHandler, submitNormalHandler, openStatChangeModal } =
    useSubmitModal(currentGame);

  if (currentGame.startTime === '2022-07-13 11:50') return null;

  return currentGame.mode === 'NORMAL' ? (
    <NormalGame currentGame={currentGame} onSubmit={submitNormalHandler} />
  ) : (
    <RankGame
      currentGame={currentGame}
      onSubmit={
        currentGame.isScoreExist ? openStatChangeModal : submitRankHandler
      }
    />
  );
}
