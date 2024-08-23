/**
import { dateToString } from 'utils/handleTime';
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
  const month = fillZero((d.getMonth() + 1).toString(), 2);
  const date = fillZero(d.getDate().toString(), 2);
  const hour = fillZero(d.getHours().toString(), 2);
  const min = fillZero(d.getMinutes().toString(), 2);
  return `${year}-${month}-${date} ${hour}:${min}`;
};

/**
 * @description 시간을 YYYY년 MM월 DD일 E요일 HH시 MM분 형식으로 반환
 * @param {Date} d 시간 문자열
 * @return 시간(YYYY년 MM월 DD일 E요일 HH시 MM분)
 */

export const dateToKRFullString = (d: Date) => {
  const year = d.getFullYear();
  const month = fillZero((d.getMonth() + 1).toString(), 2);
  const date = fillZero(d.getDate().toString(), 2);
  const day = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  const hour = fillZero(d.getHours().toString(), 2);
  const min = fillZero(d.getMinutes().toString(), 2);
  return `${year}년 ${month}월 ${date}일 ${day}요일 ${hour}시 ${min}분`;
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

export const dateToDateTimeLocalString = (d: Date) => {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }

  const offset = d.getTimezoneOffset() * 60000;
  const dateOffset = new Date(d.getTime() - offset);

  const dateString = dateOffset.toISOString().slice(0, 16);
  return dateString;
};

export const dateToKRIOSString = (d: Date) => {
  const offset = d.getTimezoneOffset() * 60000;
  const dateOffset = new Date(d.getTime() - offset);

  return dateOffset.toISOString();
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

/**
 * 시간을 YYYY년 MM월 DD일 형식으로 포매팅하여 반환
 * @param {Date} d 시간 문자열
 * @return 시간(YYYY년 MM월 DD일)
 * */
export const dateToStringFormat = (d: Date) => {
  const year = d.getFullYear();
  const month = fillZero((d.getMonth() + 1).toString(), 2);
  const date = fillZero(d.getDate().toString(), 2);
  return `${year}년 ${month}월 ${date}일`;
};

/**
 * 시간만 포매팅하여 반환
 * @param {Date} d 시간 문자열
 * @return 시간(HH:MM)
 * */
export const timeToString = (d: Date) => {
  const hour = fillZero(d.getHours().toString(), 2);
  const min = fillZero(d.getMinutes().toString(), 2);
  return `${hour}:${min}`;
};

/**
 * 시간을 YYYY-MM-DDTHH:MM 형식으로 반환 : Input default value 용
 * @param {Date} d 시간 문자열
 * @return 시간(YYYY-MM-DDTHH:MM)
 * */

export function dateToInputFormat(d: Date): string {
  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const date = d.getDate().toString().padStart(2, '0');
  const hour = d.getHours().toString().padStart(2, '0');
  const min = d.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${date}T${hour}:${min}`;
}

/**
 *  시간을 YYYY-MM-DD 오후/오전 HH:MM 형식으로 반환
 *  @param {Date} d
 *  @return 시간 문자열(YYYY-MM-DD 오후/오전 HH:MM)
 */
export const dateToKRLocaleTimeString = (d: Date) => {
  return d.toLocaleTimeString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    hour12: true,
  });
};

/**
 *  타겟 시간과 비교 시간을 받아 남은 시간을 반환
 *  @param {Date} targetTime
 *  @param {Date} cmpTime default: 현재 시간
 *  @return x년, x월, x일, x시간, x분 순으로 값이 있으면 그 값을 반환.
 */
export const getRemainTime = ({
  targetTime,
  cmpTime,
}: {
  targetTime: Date;
  cmpTime?: Date;
}) => {
  const suffix = cmpTime ? '' : ' 남음';

  cmpTime = cmpTime || new Date();
  const year = targetTime.getFullYear() - cmpTime.getFullYear();
  const month = targetTime.getMonth() - cmpTime.getMonth();
  const day = targetTime.getDate() - cmpTime.getDate();
  const hour = targetTime.getHours() - cmpTime.getHours();
  const min = targetTime.getMinutes() - cmpTime.getMinutes();

  return year > 0
    ? `${year}년`
    : month > 0
    ? `${month}개월${suffix}`
    : day > 0
    ? `${day}일${suffix}`
    : hour > 0
    ? `${hour}시간${suffix}`
    : min > 0
    ? `${min}분${suffix}`
    : `마감`;
};

/**
 *  현재 시간부터 타겟 시간까지의 시간을 계산
 *  @param {string | Date} dateString
 *  @return 문자열 "HH:MM:SS"
 */
export function calculatePeriod(dateString: string | Date) {
  const targetDate =
    typeof dateString === 'string' ? new Date(dateString) : dateString;
  const timeDifference = targetDate.getTime() - Date.now(); // 밀리초 단위의 차이

  if (timeDifference < 0) {
    return '00:00:00'; // 이미 기간이 지난 경우 00:00 반환
  }

  const hour = Math.floor(timeDifference / (60 * 60 * 1000));
  const minute = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
  const second = Math.floor((timeDifference % (60 * 1000)) / 1000);

  // 시간과 분을 항상 두 자리 숫자로 포맷팅
  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
  const formattedSecond = second < 10 ? `0${second}` : `${second}`;

  return formattedHour + ':' + formattedMinute + ':' + formattedSecond;
}

/**
 *  기간 계산
 *  일정이 하루 이내 진행될 경우 YY:MM:DD HH:MM ~ HH:MM 형식으로 반환
 *  일정이 하루 이상 진행될 경우 YY:MM:DD ~ YY:MM:DD 형식으로 반환
 *  @param {string | Date} dateString
 *  @return 문자열 "YY:MM:DD HH:MM ~ HH:MM" or "YY:MM:DD ~ YY:MM:DD"
 */

export function showPeriod({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  if (
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${dateToStringFormat(startDate)} ${timeToString(
      startDate
    )} ~ ${timeToString(endDate)}`;
  } else {
    return `${dateToStringFormat(startDate)} ~ ${dateToStringFormat(endDate)}`;
  }
}
