import { coalitionValues } from 'types/agenda/coalitionTypes';
import { Coalition } from 'constants/agenda/agenda';

export function getCoalitionEnum(
  input: string[] | Coalition[] | string | Coalition
): Coalition[] {
  if (!Array.isArray(input)) {
    return getCoalitionEnum([input]);
  }

  return input
    .map((item) => {
      if (typeof item === 'string') {
        if (coalitionValues.includes(item as Coalition)) {
          return item as Coalition;
        }
      } else if (coalitionValues.includes(item)) {
        return item;
      }
      return undefined; // 아니면 undefined 반환
    })
    .filter((item): item is Coalition => item !== undefined); // undefined 필터링
}
