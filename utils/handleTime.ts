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

export const filterDate = (fullTime: string) => {
  const month = fullTime.split('T')[0].split('-')[1];
  const day = fullTime.split('T')[0].split('-')[2];
  const time = fullTime.split('T')[1].slice(0, 5);
  return `${month}-${day} ${time}`;
};
