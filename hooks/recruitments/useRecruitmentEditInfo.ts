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
    console.log(recruitmentEditInfo);
  };

  const addQuestionToIndex = (index: number, question: Iquestion) => {
    const updatedForm = [...recruitmentEditInfo.form];
    updatedForm.splice(index, 0, question);

    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  };

  const addCheckItemToQuestion = (
    questionIdx: number,
    checkItemIdx: number,
    checkItem: IcheckItem
  ) => {
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
        question.checkList.splice(checkItemIdx + 1, 0, checkItem);
      }

      setRecruitmentEditInfo({
        ...recruitmentEditInfo,
        form: updatedForm,
      });
    }
  };

  return {
    recruitmentEditInfo,
    setTitle,
    setStartDate,
    setEndDate,
    setGeneration,
    setContent,
    addQuestionToIndex,
    addCheckItemToQuestion,
  };
}
