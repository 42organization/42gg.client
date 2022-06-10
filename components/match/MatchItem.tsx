import { Slot, EnrollInfo } from '../../types/matchTypes';
import { enrollInfoState } from '../../utils/recoil/match';
import { useSetRecoilState } from 'recoil';
import { fillZero } from '../../utils/handleTime';

interface MatchItemProps {
  slot: Slot;
  type: string;
  intervalMinute: number;
}

export default function MatchItem({
  type,
  slot,
  intervalMinute,
}: MatchItemProps) {
  const setEnrollInfo = useSetRecoilState<EnrollInfo | null>(enrollInfoState);
  const { headCount, slotId, status, time } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const startTime = new Date(time);
  const endTime = new Date(time);
  endTime.setMinutes(endTime.getMinutes() + intervalMinute);

  const onClick = () => {
    setEnrollInfo({
      slotId,
      type,
      startTime,
      endTime,
    });
  };

  return (
    <button disabled={status === 'close'} onClick={onClick}>
      <span>
        {minuiteToStr(startTime.getMinutes())} -{' '}
        {minuiteToStr(endTime.getMinutes())}
      </span>
      <span> {headCount === 0 ? '+' : `${headCount}/${headMax}`} </span>
    </button>
  );
}

function minuiteToStr(min: number) {
  return fillZero(min.toString(), 2);
}
