import { useState } from 'react';
import { getChartList } from 'utils/handleChartList';
import StatisticsChartData from './StatisticsChartData';
import styles from 'styles/statistics/StatisticsSelect.module.scss';

type chartListElement = {
  chartName: string;
  chartType: string;
  apiPath: string;
};

export default function StatisticsSelect() {
  const defaultChart: chartListElement = {
    chartName: '통계 페이지',
    chartType: '',
    apiPath: '',
  };
  const [selectChart, setSelectChart] =
    useState<chartListElement>(defaultChart);

  const charts = getChartList();
  const setNewChart = (chart: chartListElement) => {
    setSelectChart(chart);
  };
  const returnCharList = () => {
    return charts.chartName.map((chart, index) => (
      <div
        className={styles.listText}
        onClick={() => {
          setNewChart(chart);
        }}
        key={index}
      >
        {chart.chartName}
      </div>
    ));
  };
  const { chartName, chartType, apiPath } = selectChart;
  return (
    <div className={styles.container}>
      <div className={styles.chartSelectContainer}>
        <div>{returnCharList()}</div>
      </div>
      <StatisticsChartData
        chartName={chartName}
        chartType={chartType}
        apiPath={apiPath}
      />
    </div>
  );
}
