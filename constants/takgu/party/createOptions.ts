import { PartyTemplateWithoutCategory } from 'types/partyTypes';

const custumTemplateId = 0;
export const customTemplate: PartyTemplateWithoutCategory = {
  gameTemplateId: custumTemplateId,
  gameName: '직접 입력',
  minGamePeople: 2,
  maxGamePeople: 8,
  minGameTime: 15,
  maxGameTime: 30,
  genre: '',
  difficulty: '',
  summary: '',
};

export const peopleOptions = [2, 3, 4, 5, 6, 7, 8];
export const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const minuteOptions = [0, 15, 30, 45];
