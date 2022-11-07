import { Cancel } from 'types/modalTypes';
import { isBeforeMin } from 'utils/handleTime';
import CancelRejectModal from './CancelRejectModal';
import CancelModal from './CancelModal';

export default function CancelController({ slotId, time, enemyTeam }: Cancel) {
  const cancelLimit = 5;
  const canCancel = isBeforeMin(time, cancelLimit);

  return (
    <>
      {canCancel && enemyTeam.length ? (
        <CancelRejectModal minute={cancelLimit} />
      ) : (
        <CancelModal slotId={slotId} />
      )}
    </>
  );
}
