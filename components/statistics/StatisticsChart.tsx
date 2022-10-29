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
import { Graphs, GraphValue } from 'types/chartTypes';
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

type ChartType = {
  chartType: string;
  chart: Graphs;
};

export default function StatisticsChart({ chartType, chart }: ChartType) {
  const chartLabel = chart ? chart.graphs[0].graphName : '';
  const chartLabels = chart
    ? chart.graphs[0].graphData.map((item: GraphValue) => item.date)
    : [];
  const charData = chart
    ? chart.graphs[0].graphData.map((item: GraphValue) => item.count)
    : '';
  const options = {
    responsive: true,
  };
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        type: chartType as keyof ChartTypeRegistry,
        label: chartLabel,
        backgroundColor: ['rgba(255, 99, 132, 1)'],
        data: charData,
      },
    ],
  };

  return (
    <div>
      <Chart type='bar' data={chartData} options={options} />
    </div>
  );
}
