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
import { PppChart } from 'types/userTypes';
import styles from 'styles/user/Chart.module.scss';
import useAxiosGet from 'hooks/useAxiosGet';

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
  const [chart, setChart] = useState<PppChart[]>([
    { ppp: 0, date: '1970-01-01' },
  ]);

  useEffect(() => {
    if (season != undefined) getProfileChartHandler();
  }, [season]);

  const getProfileChartHandler = useAxiosGet({
    url: `/pingpong/users/${profileId}/historics?season=${season}`,
    setState: (data) => {
      setChart(data.historics);
    },
    err: 'SJ02',
    type: 'setError',
  });

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
