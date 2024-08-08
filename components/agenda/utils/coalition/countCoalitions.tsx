import { PeopleCount } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { coalitionValues } from 'types/agenda/coalitionTypes';
import { Coalition } from 'constants/agenda/agenda';

export function countCoalitions(coalitions: Coalition[]): PeopleCount {
  const peopleCount: PeopleCount = {};

  coalitions.forEach((item) => {
    if (coalitionValues.includes(item as Coalition)) {
      if (!peopleCount[item as Coalition]) {
        peopleCount[item as Coalition] = 0; // 초기화
      }
      peopleCount[item as Coalition] += 1; // 개수 증가
    }
  });

  return peopleCount;
}
