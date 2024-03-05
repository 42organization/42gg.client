import { useState } from 'react';
import {
  IcheckItem,
  Iquestion,
  Irecruit,
} from 'types/admin/adminRecruitmentsTypes';

function useRecruitmentEditInfo(initRecruitmentEditInfo: Irecruit) {
  const [recruitmentEditInfo, setRecruitmentEditInfo] = useState<Irecruit>(
    initRecruitmentEditInfo
  );

  const addQuestionAtIndex = (index: number, question: Iquestion) => {
    const updatedForm = [...recruitmentEditInfo.form];
    updatedForm.splice(index, 0, question);

    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  };

  const addCheckItemToQuestion = (
    questionId: number,
    checkItem: IcheckItem
  ) => {
    const updatedForm = recruitmentEditInfo.form.map((question) => {
      if (question.questionId === questionId && question.inputType !== 'TEXT') {
        // Only add check item if input type is SINGLE_CHECK or MULTI_CHECK
        const updatedCheckList = question.checkList
          ? [...question.checkList, checkItem]
          : [checkItem];
        return {
          ...question,
          checkList: updatedCheckList,
        };
      }
      return question;
    });

    setRecruitmentEditInfo({
      ...recruitmentEditInfo,
      form: updatedForm,
    });
  };

  return {
    recruitmentEditInfo,
    addQuestionAtIndex,
    addCheckItemToQuestion,
  };
}
