import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Graphs } from 'types/chartTypes';
import { errorState } from 'utils/recoil/error';
import axios from 'axios';
import StatisticsChart from './StatisticsChart';
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chart, setChart] = useState<Graphs>();
  const setError = useSetRecoilState(errorState);

  const clickGetChart = () => {
    getChartHandler();
  };

  const getChartHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/stat/visit`
      );
      setChart(res.data);
    } catch (e) {
      setError('KP02');
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
