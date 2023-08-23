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
import useChartModule from 'hooks/users/useChartModule';
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

interface ProfileChartProps {
  profileId: string;
  season?: number;
}

export default function ProfileChart({ profileId, season }: ProfileChartProps) {
  const { data } = useChartModule(profileId, season);

  return (
    <div className={styles.chartWrapper}>
      <Line options={options} data={data} height={180} />
    </div>
  );
}

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
