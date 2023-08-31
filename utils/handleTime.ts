/**
 * width 길이만큼 origin 앞에 0을 채움
 * @param {string} origin 시간 혹은 분
 * @param {number} width 원하는 길이
 * @return 0이 채워진 문자열
 * */
export const fillZero = (origin: string, width: number) => {
  const fillLen = width - origin.length;
  return (fillLen > 0 ? new Array(fillLen).fill(0).join('') : '') + origin;
};

/**
 * 시간 문자열을 받아 HH:MM 형식의 게임 시작 시간으로 반환
 * @param {Date | string} d 시간
 * @return 게임 시작 시간(HH:MM)
 * */
export const gameTimeToString = (d: Date | string) => {
  const date = typeof d === 'string' ? new Date(d) : d;
  const hour = date.getHours();
  const min = date.getMinutes();
  const hourString = fillZero(hour.toString(), 2);
  const minString = fillZero(min.toString(), 2);
  return `${hourString}:${minString}`;
};

/**
 * 현재시간이 게임시작까지 일정 시간(minute/주로 5분) 이내로 남았는지 확인
 * @param {string} gameTimeString 게임시간
 * @param {number} min 분
 * @return Boolean
 * */
export const isBeforeMin = (gameTimeString: string, min: number) => {
  const gameTime = new Date(gameTimeString);
  const afterMin = new Date();
  afterMin.setMinutes(afterMin.getMinutes() + min);
  return gameTime.getTime() <= afterMin.getTime();
};

/**
 * 현재시간이 게임시간으로부터 일정 시간(minute)이 지났는지 확인
 * @param {string} gameTimeString 게임시간
 * @param {number} min 분
 * @return Boolean
 * */
export const isAfterMin = (gameTimeString: string, min: number) => {
  const gameTime = new Date(gameTimeString);
  const beforeMin = new Date();
  beforeMin.setMinutes(beforeMin.getMinutes() - min);
  return gameTime.getTime() <= beforeMin.getTime();
};

/**
 * 시간을 YYYY-MM-DD HH:MM 형식으로 반환
 * @param {Date} d 시간 문자열
 * @return 시간(YYYY-MM-DD HH:MM)
 * */
export const dateToString = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  return `${year}-${month}-${date} ${hour}:${min}`;
};

/**
 * 현재 시간에서 특정 분(minute) 전 시간을 반환
 * @description 목업 데이터를 위해 임시로 만든 함수
 * @param {number} min 분(minute)
 * @return 몇 분 전 시간(YYYY-MM-DD HH:MM)
 * */
export const minuitesAgo = (min: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - min);
  return dateToString(date);
};

/**
 * 게임시간으로부터 현재까지 경과된 시간을 초(second) 단위로 반환
 * @param {string} gameTime 게임종료 시간
 * @return 초
 * */
export const getElapsedTimeSeconds = (gameTime: string) => {
  return (Number(new Date()) - Number(new Date(gameTime))) / 1000;
};

/**
 * 게임종료 시간을 받아 현재 시간으로부터 몇 년/개월/일/시간/분/방금 전인지 반환
 * @param {string} gameTime 게임종료 시간
 * @return 현재 시간으로부터 얼마 전
 * */
export const getTimeAgo = (gameTime: string) => {
  const elapsedTimeSeconds = getElapsedTimeSeconds(gameTime) - 60 * 10;
  const timeUnits = [
    { unit: '년', second: 60 * 60 * 24 * 365 },
    { unit: '개월', second: 60 * 60 * 24 * 30 },
    { unit: '일', second: 60 * 60 * 24 },
    { unit: '시간', second: 60 * 60 },
    { unit: '분', second: 60 },
  ];
  for (const timeUnit of timeUnits) {
    const elapsedTime = Math.floor(elapsedTimeSeconds / timeUnit.second);
    if (elapsedTime > 0) return `${elapsedTime}${timeUnit.unit} 전`;
  }
  return '방금 전';
};

export const getFormattedDateToString = (
  d: Date
): {
  year: string;
  month: string;
  date: string;
  hour: string;
  min: string;
} => {
  const year = d.getFullYear().toString();
  const month =
    d.getMonth() + 1 < 10
      ? `0${d.getMonth() + 1}`
      : (d.getMonth() + 1).toString();
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate().toString();
  const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours().toString();
  const min =
    d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes().toString();
  return { year, month, date, hour, min };
};

/**
 * 시간 문자열에서 hour와 min을 분리하여 반환하는
 * @return : number 타입과 string 타입 둘 다 반환
 * */

export const stringToHourMin = (
  d: string
): {
  nHour: number;
  nMin: number;
  sHour: string;
  sMin: string;
} => {
  const date = new Date(d);
  const nHour = date.getHours();
  const nMin = date.getMinutes();
  const sHour = fillZero(nHour.toString(), 2);
  const sMin = fillZero(nMin.toString(), 2);
  return { nHour, nMin, sHour, sMin };
};

/**
 * 시간을 YY-MM-DD HH:MM 형식으로 반환
 * @param {Date} d 시간 문자열
 * @return 시간(YY-MM-DD HH:MM)
 * */
export const dateToStringShort = (d: Date) => {
  const year = d.getFullYear().toString().slice(2, 4);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const date = d.getDate().toString().padStart(2, '0');
  const hour = d.getHours().toString().padStart(2, '0');
  const min = d.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${date} ${hour}:${min}`;
};
