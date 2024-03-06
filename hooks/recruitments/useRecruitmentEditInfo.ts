import { useState } from 'react';
import {
  IcheckItem,
  Iquestion,
  IrecruitEditInfo,
} from 'types/admin/adminRecruitmentsTypes';

export default function useRecruitmentEditInfo(
  initRecruitmentEditInfo: IrecruitEditInfo
) {
  const [recruitmentEditInfo, setRecruitmentEditInfo] =
    useState<IrecruitEditInfo>(initRecruitmentEditInfo);

  const setTitle = (title: string) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, title: title }));
  };

  const setStartDate = (startDate: string) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, startDate: startDate }));
  };

  const setEndDate = (endDate: string) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, endDate: endDate }));
  };

  const setGeneration = (generation: string) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, generation: generation }));
  };

  const setContent = (content: string) => {
    setRecruitmentEditInfo((prev) => ({ ...prev, content: content }));
  };

  const setQuestionContent = (questionIdx: number, content: string) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];
    question.question = content;

    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  };

  const setCheckItemContent = (
    questionIdx: number,
    checkItemIdx: number,
    content: string
  ) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];

    if (!question.checkList) return;
    const checkItem = question.checkList[checkItemIdx];
    checkItem.content = content;

    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  };

  const addEmptyQuestion = (questionIdx: number, inputType: string) => {
    const updatedForm = [...recruitmentEditInfo.form];
    const question = makeEmptyQuestion(inputType);
    question && updatedForm.splice(questionIdx + 1, 0, question);

    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  };

  const addCheckItemToQuestion = (questionIdx: number) => {
    const checkItem: IcheckItem = {
      content: '',
    };
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];

    if (
      question &&
      (question.inputType === 'SINGLE_CHECK' ||
        question.inputType === 'MULTI_CHECK')
    ) {
      if (!question.checkList) {
        question.checkList = [checkItem];
      } else {
        question.checkList.splice(question.checkList.length, 0, checkItem);
      }

      setRecruitmentEditInfo({
        ...recruitmentEditInfo,
        form: updatedForm,
      });
    }
  };

  const changeQuestionInputType = (questionIdx: number, inputType: string) => {
    console.log(questionIdx, inputType);
    const updatedForm = [...recruitmentEditInfo.form];
    const question = updatedForm[questionIdx];

    if (question) {
      const emptyQuestion = makeEmptyQuestion(inputType);
      if (emptyQuestion) {
        updatedForm.splice(questionIdx, 1, emptyQuestion);
      }

      setRecruitmentEditInfo({
        ...recruitmentEditInfo,
        form: updatedForm,
      });
    }
  };

  function makeEmptyQuestion(inputType: string): Iquestion | null {
    let emptyQuestion: Iquestion | null = null;

    switch (inputType) {
      case 'TEXT':
        emptyQuestion = {
          question: '',
          inputType: 'TEXT',
        };
        break;
      case 'SINGLE_CHECK':
        emptyQuestion = {
          question: '',
          inputType: 'SINGLE_CHECK',
          checkList: [],
        };
        break;
      case 'MULTI_CHECK':
        emptyQuestion = {
          question: '',
          inputType: 'MULTI_CHECK',
          checkList: [],
        };
    }

    return emptyQuestion;
  }

  return {
    recruitmentEditInfo,
    setTitle,
    setStartDate,
    setEndDate,
    setGeneration,
    setContent,
    setQuestionContent,
    setCheckItemContent,
    addEmptyQuestion,
    addCheckItemToQuestion,
    changeQuestionInputType,
  };
}
