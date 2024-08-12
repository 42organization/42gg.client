/**
 * @fileoverview 코알리숑의 개수를 세는 여러 함수들이 포함되어 있습니다.
 * 두 함수는 props가 다르기 때문에 별도로 정의되었습니다.
 * - countCoalitions: Coalition 배열을 받아 각 코알리숑의 개수를 셉니다.
 * - countHistoryCoalitions: TeamMate 배열을 받아 각 코알리숑의 개수를 셉니다.
 */

import { PeopleCount } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { coalitionValues } from 'types/agenda/coalitionTypes';
import { TeamMate } from 'types/agenda/profile/agendaHistoryTypes';
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

export const countHistoryCoalitions = (teamMates: TeamMate[]) => {
  const peopleCount: PeopleCount = {};

  teamMates.forEach((info) => {
    if (coalitionValues.includes(info.coalition as Coalition)) {
      if (!peopleCount[info.coalition as Coalition]) {
        peopleCount[info.coalition as Coalition] = 0; // 초기화
      }
      peopleCount[info.coalition as Coalition] += 1; // 개수 증가
    }
  });

  return peopleCount;
};
