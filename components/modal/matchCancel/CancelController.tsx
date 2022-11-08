import { Cancel } from 'types/modalTypes';
import { isBeforeMin } from 'utils/handleTime';
import CancelRejectModal from './CancelRejectModal';
import CancelModal from './CancelModal';

export default function CancelController({ isMatched, slotId, time }: Cancel) {
  const cancelLimit = 5;
  const canCancel = isBeforeMin(time, cancelLimit);

  return (
    <>
      {canCancel && isMatched ? (
        <CancelRejectModal minute={cancelLimit} />
      ) : (
        <CancelModal slotId={slotId} />
      )}
    </>
  );
}
