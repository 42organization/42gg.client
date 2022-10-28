import { Cancel } from 'types/modalTypes';
import { isBeforeMin } from 'utils/handleTime';
import CancelBeforeFiveMinModal from './CancelBeforeFiveMinModal';
import CancelModal from './CancelModal';

export default function CancelController({ slotId, time, enemyTeam }: Cancel) {
  const matchStartBefore5Min = isBeforeMin(time, 5);

  return (
    <>
      {matchStartBefore5Min && enemyTeam.length ? (
        <CancelBeforeFiveMinModal />
      ) : (
        <CancelModal slotId={slotId} />
      )}
    </>
  );
}
