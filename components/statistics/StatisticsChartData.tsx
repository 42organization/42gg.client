import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ChartInterface } from 'types/chartTypes';
import { errorState } from 'utils/recoil/error';
import styles from 'styles/statistics/StatisticsSelect.module.scss';
import StatisticsChart from './StatisticsCharts';

type chartListElement = {
  chartName: string;
  chartType: string;
  apiPath: string;
};

export default function StatisticsChartData({
  chartName,
  chartType,
  apiPath,
}: chartListElement) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chart, setChart] = useState<ChartInterface>();
  const setErrorMessage = useSetRecoilState(errorState);

  const clickGetChart = () => {
    getChartDataHandler();
  };

  const getChartDataHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/stat/visit`
      );
      setChart(res.data);
    } catch (e) {
      setErrorMessage('KP01');
    }
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
