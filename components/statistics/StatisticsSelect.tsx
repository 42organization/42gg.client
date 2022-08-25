import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { start } from 'repl';
import styles from 'styles/statistics/StatisticsSelect.module.scss';
import { ChartInterface } from 'types/chartTypes';
import { errorState } from 'utils/recoil/error';
import StatisticsChart from './StatisticsCharts';

type chartListElement = {
  key: string;
  value: string;
  apiPath: string;
};

type chartList = {
  chartName: chartListElement[];
};

export default function StatisticsSelect() {
  const [chartType, setChartType] = useState<string>('line');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chart, setChart] = useState<ChartInterface>();
  const [statApiPath, setStatApiPath] = useState('');
  const setErrorMessage = useSetRecoilState(errorState);

  const clickGetChart = () => {
    getChartDataHandler();
  };

  const getChartDataHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/stat/${statApiPath}`
      );
      setChart(res.data);
    } catch (e) {
      setErrorMessage('KP01');
    }
  };

  console.log(startDate, ' ', endDate, ' ', statApiPath);

  const charts: chartList = {
    chartName: [
      { key: '일일 접속자 수', value: 'line', apiPath: `visit/${startDate}/` },
      {
        key: '일일 접속자 수 대비 일일 매치 이용자 수 ',
        value: 'pie',
        apiPath: 'visit',
      },
      { key: '시간별 슬롯 이용률', value: 'bar', apiPath: 'slottime' },
      {
        key: '매칭 취소 횟수 & 유저리스트',
        value: 'line',
        apiPath: 'match/cancel',
      },
      { key: '랭크별 일일 접속자 수', value: 'bar', apiPath: 'visit' },
      { key: '랭크별 일일 매치 이용자 수', value: 'pie', apiPath: 'visit' },
      { key: '기수별 매칭 이용자 수', value: 'line', apiPath: 'visit' },
    ],
  };
  const setNewChart = (chart: chartListElement) => {
    setChartType(chart.value);
    setStatApiPath(chart.apiPath);
    // setChart(undefined);
    setStartDate('');
    setEndDate('');
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
        {chart.key}
      </div>
    ));
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
    <div className={styles.container}>
      <div className={styles.chartSelectContainer}>
        <div>통계</div>
        <div>{returnCharList()}</div>
      </div>
      <div className={styles.chart}>
        <input
          type={'date'}
          onChange={startDateHandler}
          value={startDate}
        ></input>
        <input type={'date'} onChange={endDateHandler} value={endDate}></input>
        <input type={'button'} value={'요청'} onClick={clickGetChart}></input>
        {chart ? <StatisticsChart chartType={chartType} chart={chart} /> : ''}
      </div>
    </div>
  );
}
