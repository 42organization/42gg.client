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
import { Line } from 'react-chartjs-2';
import { useEffect, useState, useMemo } from 'react';
import { ChartDataItem } from '../../types/userTypes';
import { getData } from '../../utils/axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Pingpong Power 추이',
    },
  },
};

interface ChartProps {
  userId: string;
}

export default function Chart({ userId }: ChartProps) {
  const [chartData, setChartData] = useState<ChartDataItem[]>([
    { ppp: 0, date: '1970-01-01' },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(
          `/pingpong/users/${userId}/historics?chartType=rank`
        );
        setChartData(data.historics);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const data = useMemo(
    () => ({
      labels: chartData.map((e) => dateToString(e.date)),
      datasets: [
        {
          label: 'ppp',
          data: chartData.map((e) => e.ppp),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }),
    [chartData]
  );

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

function dateToString(dateString: string) {
  const newDate = new Date(dateString);
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  return `${month}월${date}일`;
}
