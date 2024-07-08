type chartListElement = {
  chartName: string;
  chartType: string;
  apiPath: string;
};

type chartList = {
  chartName: chartListElement[];
};

const charts: chartList = {
  chartName: [
    { chartName: '일일 접속자 수', chartType: 'line', apiPath: `visit` },
    {
      chartName: '랭크별 접속자 수',
      chartType: 'line',
      apiPath: 'visit/types/rank/section/3',
    },
    { chartName: '매치 이용자 수', chartType: 'line', apiPath: 'match' },
    {
      chartName: '랭크별 매치 이용자 수',
      chartType: 'line',
      apiPath: 'match/types/rank/section/3',
    },
    { chartName: '시간별 슬롯 이용률', chartType: 'line', apiPath: 'slottime' },
    {
      chartName: '슬롯 등록 시간별 이용자 수',
      chartType: 'pie',
      apiPath: 'slotin',
    },
    {
      chartName: '매칭 취소 횟수 & 유저리스트',
      chartType: '',
      apiPath: 'match/cancel',
    },
    {
      chartName: '기수별 매칭 이용자 수',
      chartType: 'line',
      apiPath: 'match/types/generation',
    },
  ],
};

export const getChartList = () => {
  return charts;
};
