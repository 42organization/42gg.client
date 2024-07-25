import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  IcheckItem,
  Iquestion,
  Irecruit,
} from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

export interface IFormManager {
  setQuestionContent: (questionIdx: number, contents: string) => void;
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
  initRecruitmentEditInfo: Irecruit
) {
  if (initRecruitmentEditInfo.forms === undefined) {
    initRecruitmentEditInfo.forms = new Array<Iquestion>();
  }

  const [recruitmentEditInfo, setRecruitmentEditInfo] = useState<Irecruit>(
    initRecruitmentEditInfo
  );

  const setSnackBar = useSetRecoilState(toastState);

  const setRecruitmentEditInfoField = (fieldName: string, value: any) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, [fieldName]: value }));
  };

  const setQuestionContent = (questionIdx: number, content: string) => {
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    const question = updatedForm[questionIdx];
    question.question = content;

    updateRecruitFrom(updatedForm);
  };

  const setCheckItemContent = (
    questionIdx: number,
    checkItemIdx: number,
    contents: string
  ) => {
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    const question = updatedForm[questionIdx];
    if (!question.checkList) return;

    const checkItem = question.checkList[checkItemIdx];
    checkItem.contents = contents;

    updateRecruitFrom(updatedForm);
  };

  const addEmptyQuestion = (questionIdx: number, inputType: string) => {
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    const question = makeEmptyQuestion(inputType);
    if (!question) return;

    updatedForm.splice(questionIdx + 1, 0, question);

    updateRecruitFrom(updatedForm);
  };

  const removeQuestion = (questionIdx: number) => {
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    updatedForm.splice(questionIdx, 1);

    updateRecruitFrom(updatedForm);
  };

  const addCheckItemToQuestion = (questionIdx: number) => {
    if (!recruitmentEditInfo.forms) return;
    const checkItem: IcheckItem = {
      contents: '',
    };
    const updatedForm = [...recruitmentEditInfo.forms];
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
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    const question = updatedForm[questionIdx];
    if (!question) return;

    if (question.checkList) {
      question.checkList.splice(checkItemIdx, 1);
      updateRecruitFrom(updatedForm);
    }
  };

  const changeQuestionInputType = (questionIdx: number, inputType: string) => {
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    const question = updatedForm[questionIdx];

    if (!question) return;

    const emptyQuestion = makeEmptyQuestion(inputType);
    if (emptyQuestion) {
      updatedForm.splice(questionIdx, 1, emptyQuestion);
    }

    updateRecruitFrom(updatedForm);
  };

  const switchQuestionIndex = (questionIdx: number, targetIdx: number) => {
    if (!recruitmentEditInfo.forms) return;
    const updatedForm = [...recruitmentEditInfo.forms];
    const question = updatedForm[questionIdx];
    if (!question) return;

    updatedForm.splice(questionIdx, 1);
    updatedForm.splice(targetIdx, 0, question);

    updateRecruitFrom(updatedForm);
  };

  function updateRecruitFrom(updatedForm: Iquestion[]) {
    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      forms: updatedForm,
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
    if (recruitId <= 0) return;
    try {
      const res = await instance.get('/admin/recruitments/' + recruitId);
      const data: Irecruit = {
        title: res.data.title,
        startDate: new Date(res.data.startDate),
        endDate: new Date(res.data.endDate),
        generation: res.data.generation,
        contents: res.data.contents,
        forms: res.data.forms,
      };
      if (data.forms === undefined) {
        data.forms = new Array<Iquestion>();
      }
      setRecruitmentEditInfo(data);
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
