import {
  IApplicantAnswerForm,
  IQuestionForm,
} from 'types/recruit/recruitments';

const answerDefault = (form: IQuestionForm): IApplicantAnswerForm => {
  const textDefault = {
    questionId: form.questionId,
    inputType: form.inputType,
    answer: null,
    checkedList: [],
  };
  const checkDefault = {
    questionId: form.questionId,
    inputType: form.inputType,
    answer: null,
    checkedList: [],
  };
  return form.inputType === 'TEXT' ? textDefault : checkDefault;
};

const applicationAnswerDefault = (form: IQuestionForm[]) => {
  const answerForms = [];
  for (const question of form) {
    answerForms.push(answerDefault(question));
  }
  return answerForms;
};

/**
 * @param formData 지원서 폼에 입력된 데이터
 * @param questionForms 지원서 질문 항목들
 * @returns 폼에 입력된 데이터를 질문들에 맞춰서 IapplicantAnswer[] 형태로 반환
 */
export const applicationAnswerSet = (
  formData: FormData,
  questionForms: IQuestionForm[]
) => {
  const answerForms = applicationAnswerDefault(questionForms);
  for (const [key, value] of formData.entries()) {
    const formDataKey = parseInt(key);
    const answer = answerForms.find(
      (answer) => answer.questionId === formDataKey
    );
    if (answer) {
      if (answer.inputType === 'TEXT') {
        answer.answer = value as string;
      }
      if (
        answer.inputType === 'SINGLE_CHECK' ||
        answer.inputType === 'MULTI_CHECK'
      ) {
        answer.checkedList?.push(parseInt(value as string));
      }
    }
  }
  return answerForms;
};
