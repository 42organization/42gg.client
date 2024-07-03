import { Graphs, GraphValue } from 'types/chartTypes';

type ChartData = {
  labels: string[];
  data: number[];
};

export const useChartData = (chart: Graphs): ChartData => {
  const chartLabels = chart.graphs[0].graphData.map(
    (item: GraphValue) => item.date
  );
  const chartData = chart.graphs[0].graphData.map(
    (item: GraphValue) => item.count
  );
  return {
    labels: chartLabels,
    data: chartData,
  };
};

export default useChartData;
