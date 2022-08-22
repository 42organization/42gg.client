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
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import axios from 'utils/axios';
import { ChartInterface, GraphData } from 'types/chartTypes';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import ModeSeasonMineProvider from 'components/mode/ModeSeasonMineProvider';

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
};

export default function StatisticsChart({ chartType }: ChartType) {
  const [chart, getChart] = useState<ChartInterface>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    getChartDataHandler();
  }, []);

  const getChartDataHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/stat/visit`
      );
      getChart(res.data);
    } catch (e) {
      setErrorMessage('KP01');
    }
  };

  const chartLabel = chart ? `${chart.graphs[0].graphName}` : '';
  const chartLabels = chart
    ? `${chart.graphs[0].graphData.map((item: GraphData) => item.date)}`
    : '';
  const inchartData = chart
    ? `${chart.graphs[0].graphData.map((item: GraphData) => item.count)}`
    : '';
  const chartData = {
    labels: chartLabels.split(','),
    datasets: [
      {
        type: chartType as keyof ChartTypeRegistry,
        label: [chartLabel],
        backgroundColor: ['rgba(255, 99, 132, 1)'],
        data: inchartData.split(','),
      },
    ],
  };
  const options = {
    responsive: true,
  };

  const startDateHandler = ({
    target: date,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(date.value);
  };
  const endDateHandler = ({
    target: date,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(date.value);
  };

  return (
    <div>
      <input
        type={'date'}
        onChange={startDateHandler}
        value={startDate}
      ></input>
      <input type={'date'} onChange={endDateHandler} value={endDate}></input>
      <input type={'button'} value={'요청'}></input>
      <Chart data={chartData} options={options} />
    </div>
  );
}
