import { useReducer } from 'react';
import {
  PartyCreateForm,
  PartyTemplateWithoutCategory,
} from 'types/partyTypes';
import { customTemplate } from 'constants/party/createOptions';

type PartyFormAction =
  | { type: 'UPDATE_TITLE'; title: string }
  | { type: 'UPDATE_MIN_PEOPLE'; minPeople: number }
  | { type: 'UPDATE_MAX_PEOPLE'; maxPeople: number }
  | { type: 'UPDATE_CONTENT'; content: string }
  | {
      type: 'UPDATE_OPEN_PERIOD';
      openPeriod: number;
    }
  | {
      type: 'APPLY_TEMPLATE';
      template: PartyTemplateWithoutCategory;
      categoryName: string;
    };

const reducer: React.Reducer<PartyCreateForm, PartyFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      if (action.title.length > 15) return state;
      return { ...state, title: action.title };
    case 'UPDATE_MIN_PEOPLE':
      return { ...state, minPeople: action.minPeople };
    case 'UPDATE_MAX_PEOPLE':
      return { ...state, maxPeople: action.maxPeople };
    case 'UPDATE_CONTENT':
      if (action.content.length > 1000) return state;
      return { ...state, content: action.content };
    case 'UPDATE_OPEN_PERIOD':
      return {
        ...state,
        openPeriod: action.openPeriod,
      };
    case 'APPLY_TEMPLATE':
      return action.template.gameTemplateId === customTemplate.gameTemplateId
        ? {
            title: '',
            categoryName: action.categoryName,
            minPeople: action.template.minGamePeople,
            maxPeople: action.template.maxGamePeople,
            content: '',
            openPeriod: 60,
          }
        : {
            title: `${action.template.gameName}`,
            categoryName: action.categoryName,
            minPeople: action.template.minGamePeople,
            maxPeople: action.template.maxGamePeople,
            content:
              `난이도: ${action.template.difficulty}\n` +
              `장르: ${action.template.genre}\n` +
              `게임 시간: ${action.template.minGameTime} - ${action.template.maxGameTime}\n` +
              `설명: ${action.template.summary}`,
            openPeriod: 60,
          };
    default:
      return state;
  }
};

export default function usePartyForm() {
  const [partyForm, dispatchPartyForm] = useReducer(reducer, {
    title: '',
    categoryName: '', // ''은 아직 카테고리가 설정되지않음을 나타냄
    minPeople: 2,
    maxPeople: 2,
    content: '',
    openPeriod: 60,
  });

  return {
    partyForm,
    dispatchPartyForm,
  };
}
