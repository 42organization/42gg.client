import { isBeforeMin } from 'utils/handleTime';
import CancelBeforeFiveMinModal from './CancelBeforeFiveMinModal';
import CancelModal from './CancelModal';

type CancelType = {
  slotId: number;
  time: string;
};

export function CancelControll({ slotId, time }: CancelType) {
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
