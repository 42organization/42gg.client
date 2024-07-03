import StatisticsChart from 'components/takgu/statistics/StatisticsChart';
import useChartsData from 'hooks/takgu/statistics/useChartsData';
import styles from 'styles/statistics/StatisticsSelect.module.scss';

type chartElementprops = {
  chartName: string;
  chartType: string;
  apiPath: string;
};

export default function StatisticsCharts({
  chartName,
  chartType,
  apiPath,
}: chartElementprops) {
  const {
    startDate,
    endDate,
    chart,
    clickGetChart,
    startDateHandler,
    endDateHandler,
  } = useChartsData();

  return (
    <div className={styles.chart}>
      <h1>{chartName}</h1>
      <hr></hr>
      <input
        className={styles.date}
        type={'date'}
        onChange={startDateHandler}
        value={startDate}
        min={'2022-09-05'}
      ></input>
      ~
      <input
        className={styles.date}
        type={'date'}
        onChange={endDateHandler}
        value={endDate}
        min={startDate}
      ></input>
      <input
        className={styles.submitButton}
        type={'button'}
        value={'요청'}
        onClick={clickGetChart}
      ></input>
      {chart ? <StatisticsChart chartType={chartType} chart={chart} /> : ''}
    </div>
  );
}
