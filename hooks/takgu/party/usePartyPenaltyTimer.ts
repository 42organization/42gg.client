import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { instance } from 'utils/axios';
import { calculatePeriod } from 'utils/handleTime';

type PartyPenaltyRes = {
  penaltyEndTime: string | null;
};

export default function usePartyPenaltyTimer() {
  const { data, isLoading: isQueryLoading } = useQuery({
    queryKey: 'partyPenalty',
    queryFn: () =>
      instance.get<PartyPenaltyRes>('/party/penalty').then(({ data }) => ({
        ...data,
        penaltyEndTime:
          data.penaltyEndTime && data.penaltyEndTime
            ? new Date(data.penaltyEndTime)
            : null,
      })),
    staleTime: 5 * 60 * 1000, // 5분
  });
  const partyPenalty = data ?? { penaltyEndTime: null };
  const [penaltyPeroid, setPenaltyPeroid] = useState(
    partyPenalty.penaltyEndTime && calculatePeriod(partyPenalty.penaltyEndTime)
  );
  const [isPenaltyLoading, setIsPenaltyLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!isQueryLoading) {
      if (
        partyPenalty.penaltyEndTime &&
        partyPenalty.penaltyEndTime.getTime() > Date.now()
      ) {
        setIsPenaltyLoading(false);

        setPenaltyPeroid(calculatePeriod(partyPenalty.penaltyEndTime));
        intervalId = setInterval(() => {
          if (partyPenalty.penaltyEndTime!.getTime() > Date.now())
            setPenaltyPeroid(calculatePeriod(partyPenalty.penaltyEndTime!));
          else {
            setPenaltyPeroid(null);
            clearInterval(intervalId);
          }
        }, 1000);
      } else {
        setIsPenaltyLoading(false);
      }
    }

    return () => clearInterval(intervalId);
  }, [isQueryLoading, partyPenalty.penaltyEndTime]);

  return { penaltyPeroid, isPenaltyLoading };
}
