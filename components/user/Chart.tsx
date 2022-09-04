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
import { useSetRecoilState } from 'recoil';
import { ChartDataItem } from 'types/userTypes';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import styles from 'styles/user/Chart.module.scss';

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
      text: 'PingPong Power',
      color: '#FFFFFF',
    },
  },
  scales: {
    yAxes: {
      grid: {
        drawBorder: true,
        color: '#FFFFFF',
      },
      ticks: {
        beginAtZero: true,
        color: '#FFFFFF',
        fontSize: 12,
      },
    },
    xAxes: {
      grid: {
        drawBorder: true,
        color: '#FFFFFF',
      },
      ticks: {
        beginAtZero: true,
        color: '#FFFFFF',
        fontSize: 12,
      },
    },
  },
};

interface ChartProps {
  intraId: string;
  season?: string;
}

export default function Chart({ intraId, season }: ChartProps) {
  const setErrorMessage = useSetRecoilState(errorState);
  const [chartData, setChartData] = useState<ChartDataItem[]>([
    { ppp: 0, date: '1970-01-01' },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(
          // `/pingpong/users/${intraId}/historics?season=${season}`
          // 백에서 아직 현재 시즌(season=0)에 대한 구현이 안되어 season=1로 고정해둡니다.
          `/pingpong/users/${intraId}/historics?season=1`
        );
        setChartData(res?.data.historics);
      } catch (e) {
        setErrorMessage('SJ02');
      }
    })();
  }, [intraId]);

  const data = useMemo(
    () => ({
      labels: chartData.map((e) => gameTimeToString(e.date)),
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
    <div className={styles.chartWrapper}>
      <Line options={options} data={data} height={180} />
    </div>
  );
}

function gameTimeToString(dateString: string) {
  const newDate = new Date(dateString);
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  return `${month}월${date}일`;
}
