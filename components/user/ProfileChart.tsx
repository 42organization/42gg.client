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
import { PppChart } from 'types/userTypes';
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
      color: 'white',
    },
  },
  scales: {
    yAxes: {
      grid: {
        drawBorder: true,
        color: 'white',
      },
      ticks: {
        beginAtZero: true,
        color: 'white',
        fontSize: 12,
      },
    },
    xAxes: {
      grid: {
        drawBorder: true,
        color: 'white',
      },
      ticks: {
        beginAtZero: true,
        color: 'white',
        fontSize: 12,
      },
    },
  },
};

interface ProfileChartProps {
  profileId: string;
  season?: number;
}

export default function ProfileChart({ profileId, season }: ProfileChartProps) {
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
