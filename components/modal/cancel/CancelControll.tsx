import { isBeforeMin } from 'utils/handleTime';
import CancelBeforeFiveMinModal from './CancelBeforeFiveMinModal';
import CancelModal from './CancelModal';

type CancelType = {
  slotId: number;
  time: string;
  enemyTeam: string[];
};

export default function CancelControll({
  slotId,
  time,
  enemyTeam,
}: CancelType) {
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
