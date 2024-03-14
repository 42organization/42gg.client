import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import {
  IApplicantAnswer,
  IQuestionForm,
  refMap,
} from 'types/recruit/recruitments';

interface IapplicationFormCheckProps {
  formRefs: MutableRefObject<refMap>;
  setAlertOn: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  userAnswers: IApplicantAnswer[];
}

export const applicationFormCheck = (props: IapplicationFormCheckProps) => {
  const { formRefs, setAlertOn, setModalOpen, userAnswers } = props;

  for (const ans of userAnswers) {
    if (
      (ans.inputType === 'TEXT' && !ans.answer?.length) ||
      ((ans.inputType === 'SINGLE_CHECK' || ans.inputType === 'MULTI_CHECK') &&
        !ans.checkedList?.length)
    ) {
      formRefs.current[ans.questionId].focus();
      setAlertOn(true);
      return;
    }
  }
  setModalOpen(true);
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
      console.log(11, updateUserAnswers);
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
