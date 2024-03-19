import { MutableRefObject } from 'react';
import { Paper } from '@mui/material';
import {
  IQuestionForm,
  IRecruitmentDetail,
  refMap,
} from 'types/recruit/recruitments';
import applicationStyle from 'styles/recruit/application.module.scss';
import MultiCheckForm from './applicationFormItems/MultiCheck';
import SingleCheckForm from './applicationFormItems/SingleCheck';
import TextForm from './applicationFormItems/TextForm';

interface IFormItemProps {
  data: IRecruitmentDetail;
  formRefs: MutableRefObject<refMap>;
}

export default function ApplicationFormItem(props: IFormItemProps) {
  const { data, formRefs } = props;

  return (
    <>
      {data.forms.map((form: IQuestionForm, index: number) => (
        <Paper className={applicationStyle.questionContainer} key={index}>
          {form.inputType === 'TEXT' ? (
            <TextForm form={form} formRefs={formRefs} />
          ) : form.inputType === 'SINGLE_CHECK' ? (
            <SingleCheckForm form={form} formRefs={formRefs} />
          ) : form.inputType === 'MULTI_CHECK' ? (
            <MultiCheckForm form={form} formRefs={formRefs} />
          ) : (
            <span>유효하지 않은 폼입니다</span>
          )}
        </Paper>
      ))}
    </>
  );
}
