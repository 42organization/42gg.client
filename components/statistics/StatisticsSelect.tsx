import useChartSelection from 'hooks/statistics/useChartSelection';
import styles from 'styles/statistics/StatisticsSelect.module.scss';
import StatisticsChart from './StatisticsCharts';

export default function StatisticsSelect() {
  const { selectedChart, setSelectedChart, chartList } = useChartSelection();

  const returnCharList = () => {
    return chartList.map((chart, index) => (
      <div
        className={styles.listText}
        onClick={() => {
          setSelectedChart(chart);
        }}
        key={index}
      >
        {chart.chartName}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartSelectContainer}>
        <div>{returnCharList()}</div>
      </div>
      <StatisticsChart
        chartName={selectedChart.chartName}
        chartType={selectedChart.chartType}
        apiPath={selectedChart.apiPath}
      />
    </div>
  );
}
