import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTypeRegistry,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

type chart = {
  chartType: string;
};

export default function StatisticsChart({ chartType }: chart) {
  const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  const chartData = {
    labels,
    datasets: [
      {
        type: chartType as keyof ChartTypeRegistry,
        label: '그래프 이름',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 2, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        data: [14, 22, 13, 24, 45, 16, 27],
      },
    ],
  };
  console.log(chartType);
  const options = {
    responsive: true,
  };

  return (
    <div>
      <Chart
        type={chartType as keyof ChartTypeRegistry}
        data={chartData}
        options={options}
      />
    </div>
  );
}
