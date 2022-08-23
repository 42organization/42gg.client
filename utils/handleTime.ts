export const fillZero = (origin: string, width: number) => {
  const fillLen = width - origin.length;
  return (fillLen > 0 ? new Array(fillLen).fill(0).join('') : '') + origin;
};

export const gameTimeToString = (d: Date | string) => {
  const date = typeof d === 'string' ? new Date(d) : d;
  const hour = date.getHours();
  const min = date.getMinutes();
  const hourString = fillZero(hour.toString(), 2);
  const minString = fillZero(min.toString(), 2);

  return `${hourString}:${minString}`;
};

export const isBeforeMin = (gameTimeString: string, min: number) => {
  const gameTime = new Date(gameTimeString);
  const afterMin = new Date();
  afterMin.setMinutes(afterMin.getMinutes() + min);
  return gameTime.getTime() <= afterMin.getTime();
};

export const dateToString = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();

  return `${year}-${month}-${date} ${hour}:${min}`;
};

export const minuitesAgo = (min: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - min);
  return dateToString(date);
};

export const isAfterMin = (gameTimeString: string, min: number) => {
  const gameTime = new Date(gameTimeString);
  const beforeMin = new Date();
  beforeMin.setMinutes(beforeMin.getMinutes() - min);
  return gameTime.getTime() <= beforeMin.getTime();
};
