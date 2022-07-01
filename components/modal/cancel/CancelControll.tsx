import CancelBeforeFiveMinModal from './CancelBeforeFiveMinModal';
import CancelModal from './CancelModal';

type CancelType = {
  slotId: number;
  time: string;
};

export function CancelControll({ slotId, time }: CancelType) {
  function isBeforeMin(gameTimeString: string, min: number) {
    const gameTime = new Date(gameTimeString);
    const afterMin = new Date();
    afterMin.setMinutes(afterMin.getMinutes() + min);
    return gameTime.getTime() <= afterMin.getTime();
  }

  const matchStartBefore5Min = isBeforeMin(time, 5);
  return (
    <>
      {matchStartBefore5Min ? (
        <CancelBeforeFiveMinModal />
      ) : (
        <CancelModal slotId={slotId} />
      )}
    </>
  );
}
