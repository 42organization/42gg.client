import { useState } from 'react';
import styles from 'styles/statistics/StatisticsSelect.module.scss';
import StatisticsChart from './StatisticsCharts';

export default function StatisticsSelect() {
  const [chartType, setChartType] = useState<string>('line');

  const charts = {
    chartName: [
      { key: '일일 접속자 수', value: 'line' },
      { key: '일일 접속자 수 대비 일일 매치 이용자 수 ', value: 'pie' },
      { key: '시간별 슬롯 이용률', value: 'bar' },
      { key: '매칭 취소 횟수 & 유저리스트', value: 'line' },
      { key: '랭크별 일일 접속자 수', value: 'bar' },
      { key: '랭크별 일일 매치 이용자 수', value: 'pie' },
      { key: '기수별 매칭 이용자 수', value: 'line' },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartSelectContainer}>
        {charts.chartName.map((chart) => (
          <div
            className={styles.listText}
            onClick={() => setChartType(chart.value)}
          >
            {chart.key}
          </div>
        ))}
      </div>
      <div className={styles.chart}>
        <StatisticsChart chartType={chartType} />
      </div>
    </div>
  );
}
