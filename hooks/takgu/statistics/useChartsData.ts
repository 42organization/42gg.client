import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Graphs } from 'types/takgu/chartTypes';
import { errorState } from 'utils/takgu/recoil/error';

export const useChartsData = () => {
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

  return {
    startDate,
    endDate,
    chart,
    clickGetChart,
    startDateHandler,
    endDateHandler,
  };
};

export default useChartsData;
