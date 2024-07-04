import { useState } from 'react';
import { getChartList } from 'utils/takgu/handleChartList';

type ChartData = {
  chartName: string;
  chartType: string;
  apiPath: string;
};

type UseChartSelection = {
  selectedChart: ChartData;
  setSelectedChart: (chart: ChartData) => void;
  chartList: ChartData[];
};

const useChartSelection = (): UseChartSelection => {
  const defaultChart: ChartData = {
    chartName: '통계 페이지',
    chartType: '',
    apiPath: '',
  };
  const [selectedChart, setSelectedChart] = useState<ChartData>(defaultChart);

  const chartList = getChartList().chartName;

  return {
    selectedChart,
    setSelectedChart,
    chartList,
  };
};

export default useChartSelection;
