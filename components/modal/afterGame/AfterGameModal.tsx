import NormalGame from 'components/modal/afterGame/NormalGame';
import RankGame from 'components/modal/afterGame/RankGame';
import useCurrentGame from 'hooks/modal/aftergame/useCurrentGame';
import useSubmitModal from 'hooks/modal/aftergame/useSubmitModal';

export default function AfterGameModal() {
  const { currentGame } = useCurrentGame();
  const { submitRankHandler, submitNormalHandler, openStatChangeModal } =
    useSubmitModal(currentGame);

  if (currentGame.startTime === '2022-07-13 11:50') return null;

  return currentGame.mode === 'NORMAL' ? (
    <NormalGame
      currentGame={currentGame}
      onSubmit={submitNormalHandler}
      openStatChange={openStatChangeModal}
    />
  ) : (
    <RankGame
      currentGame={currentGame}
      // FIXME - 동작 확인되면 주석 지울 것
      // onSubmit={
      //   currentGame.isScoreExist ? openStatChangeModal : submitRankHandler
      // }
      onSubmit={submitRankHandler}
      openStatChange={openStatChangeModal}
    />
  );
}
