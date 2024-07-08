import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { PppChart } from 'types/takgu/userTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useChartModule = (profileId: string, season?: number) => {
  const setError = useSetRecoilState(errorState);
  const [chart, setChart] = useState<PppChart[]>([
    { ppp: 0, date: '1970-01-01' },
  ]);

  useEffect(() => {
    if (season != undefined) getProfileChartHandler();
  }, [season]);

  const getProfileChartHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/users/${profileId}/historics?season=${season}`
      );
      setChart(res?.data.historics);
    } catch (e) {
      setError('SJ02');
    }
  };

  const data = useMemo(
    () => ({
      labels: chart.map((e) => gameTimeToString(e.date)),
      datasets: [
        {
          label: 'ppp',
          data: chart.map((e) => e.ppp),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }),
    [chart]
  );

  function gameTimeToString(dateString: string) {
    const newDate = new Date(dateString);
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    return `${month}월${date}일`;
  }

  return { data };
};

export default useChartModule;
