import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import { IApplicantAnswer, IQuestionForm } from 'types/recruit/recruitments';
import { IapplicationModal } from './recoil/application';

export const applicationAnswerDefault = (form: IQuestionForm[] | undefined) => {
  if (!form) return [];

  const defaultAnswer = [];
  for (const question of form) {
    defaultAnswer.push({
      questionId: question.questionId,
      inputType: question.inputType,
      checkedList: [],
      answer: '',
    });
  }
  return defaultAnswer;
};
interface IapplicationFormCheckProps {
  setInvalidInput: Dispatch<SetStateAction<number>>;
  setAlertOn: Dispatch<SetStateAction<boolean>>;
  setModalState: Dispatch<SetStateAction<IapplicationModal>>;
  userAnswers: IApplicantAnswer[];
}

export const applicationFormCheck = (props: IapplicationFormCheckProps) => {
  const { setInvalidInput, setAlertOn, setModalState, userAnswers } = props;

  console.log(userAnswers);
  for (const ans of userAnswers) {
    if (
      (ans.inputType === 'TEXT' && !ans.answer?.length) ||
      ((ans.inputType === 'SINGLE_CHECK' || ans.inputType === 'MULTI_CHECK') &&
        !ans.checkedList?.length)
    ) {
      setInvalidInput(ans.questionId);
      setAlertOn(true);
      return;
    }
  }
  setModalState({ state: true, content: 'APPLY' });
};

interface IupdateUserAnswersProps {
  updateAnswer: IApplicantAnswer;
  userAnswers: IApplicantAnswer[];
  setUserAnswers: SetterOrUpdater<IApplicantAnswer[]>;
}

export function updateUserAnswers(props: IupdateUserAnswersProps) {
  const { updateAnswer, userAnswers, setUserAnswers } = props;
  const updateUserAnswers = [...userAnswers];

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i].questionId === updateAnswer.questionId) {
      updateUserAnswers.splice(i, 1, updateAnswer);
      setUserAnswers(updateUserAnswers);
      return;
    }
  }

  // 새로운 값 대입
  updateUserAnswers.push(updateAnswer);
  updateUserAnswers.sort((a, b) => a.questionId - b.questionId);
  setUserAnswers(updateUserAnswers);
}

export function findUserAnswer(id: number, answerList: IApplicantAnswer[]) {
  for (const answer of answerList) {
    if (answer.questionId === id) {
      return answer;
    }
  }
}

export const inputDefault = (form: IQuestionForm) => {
  const textInput = {
    questionId: form.questionId,
    inputType: form.inputType,
    answer: '',
  };
  const checkInput = {
    questionId: form.questionId,
    inputType: form.inputType,
    checkedList: [],
  };
  return form.inputType === 'TEXT' ? textInput : checkInput;
};
