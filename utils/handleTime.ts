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
