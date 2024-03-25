import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { FaSdCard } from 'react-icons/fa';
import {
  IcheckItem,
  Iquestion,
  IrecruitEditInfo,
} from 'types/admin/adminRecruitmentsTypes';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';

export interface IFormManager {
  setQuestionContent: (questionIdx: number, content: string) => void;
  setCheckItemContent: (
    questionIdx: number,
    checkItemIdx: number,
    contents: string
  ) => void;
  addEmptyQuestion: (questionIdx: number, inputType: string) => void;
  removeQuestion: (questionIdx: number) => void;
  addCheckItemToQuestion: (questionIdx: number) => void;
  removeCheckItemFromQuestion: (
    checkItemIdx: number,
    questionIdx: number
  ) => void;
  changeQuestionInputType: (questionIdx: number, inputType: string) => void;
  switchQuestionIndex: (questionIdx: number, targetIdx: number) => void;
}

export default function useRecruitmentEditInfo(
  initRecruitmentEditInfo: IrecruitEditInfo
) {
  const [recruitmentEditInfo, setRecruitmentEditInfo] =
    useState<IrecruitEditInfo>(initRecruitmentEditInfo);

  const setSnackBar = useSetRecoilState(toastState);

  const setRecruitmentEditInfoField = (fieldName: string, value: any) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, [fieldName]: value }));
  };

  const setQuestionContent = (questionIdx: number, content: string) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];
    question.question = content;

    updateRecruitFrom(updatedForm);
  };

  const setCheckItemContent = (
    questionIdx: number,
    checkItemIdx: number,
    contents: string
  ) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];
    if (!question.checkList) return;

    const checkItem = question.checkList[checkItemIdx];
    checkItem.contents = contents;

    updateRecruitFrom(updatedForm);
  };

  const addEmptyQuestion = (questionIdx: number, inputType: string) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = makeEmptyQuestion(inputType);
    if (!question) return;

    updatedForm.splice(questionIdx + 1, 0, question);

    updateRecruitFrom(updatedForm);
  };

  const removeQuestion = (questionIdx: number) => {
    const updatedForm = [...recruitmentEditInfo.form];
    updatedForm.splice(questionIdx, 1);

    updateRecruitFrom(updatedForm);
  };

  const addCheckItemToQuestion = (questionIdx: number) => {
    const checkItem: IcheckItem = {
      contents: '',
    };
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];

    if (!question) return;

    if (
      question.inputType === 'SINGLE_CHECK' ||
      question.inputType === 'MULTI_CHECK'
    ) {
      if (!question.checkList) {
        question.checkList = [checkItem];
      } else {
        question.checkList.splice(question.checkList.length, 0, checkItem);
      }

      updateRecruitFrom(updatedForm);
    }
  };

  const removeCheckItemFromQuestion = (
    checkItemIdx: number,
    questionIdx: number
  ) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];
    if (!question) return;

    if (question.checkList) {
      question.checkList.splice(checkItemIdx, 1);
      updateRecruitFrom(updatedForm);
    }
  };

  const changeQuestionInputType = (questionIdx: number, inputType: string) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];

    if (!question) return;

    const emptyQuestion = makeEmptyQuestion(inputType);
    if (emptyQuestion) {
      updatedForm.splice(questionIdx, 1, emptyQuestion);
    }

    updateRecruitFrom(updatedForm);
  };

  const switchQuestionIndex = (questionIdx: number, targetIdx: number) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];
    if (!question) return;

    updatedForm.splice(questionIdx, 1);
    updatedForm.splice(targetIdx, 0, question);

    updateRecruitFrom(updatedForm);
  };

  function updateRecruitFrom(updatedForm: Iquestion[]) {
    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  }

  function makeEmptyQuestion(inputType: string): Iquestion | null {
    switch (inputType) {
      case 'TEXT':
        return {
          question: '',
          inputType: 'TEXT',
        };
      case 'SINGLE_CHECK':
        return {
          question: '',
          inputType: 'SINGLE_CHECK',
          checkList: [],
        };
      case 'MULTI_CHECK':
        return {
          question: '',
          inputType: 'MULTI_CHECK',
          checkList: [],
        };
      default:
        return null;
    }
  }

  const formManager: IFormManager = {
    setQuestionContent,
    setCheckItemContent,
    addEmptyQuestion,
    removeQuestion,
    addCheckItemToQuestion,
    removeCheckItemFromQuestion,
    changeQuestionInputType,
    switchQuestionIndex,
  };

  const importRecruitmentInfo = async (recruitId: number) => {
    try {
      const res = await mockInstance.get('/recruitments/' + recruitId);
      console.log(res.data);
      setRecruitmentEditInfo(res.data);
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  return {
    recruitmentEditInfo,
    setRecruitmentEditInfoField,
    formManager,
    importRecruitmentInfo,
  };
}
