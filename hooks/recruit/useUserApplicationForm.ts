import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import {
  ApplicationFormType,
  IApplicantAnswerForm,
} from 'types/recruit/recruitments';
import { instance } from 'utils/axios';

function useUserApplicationForm(
  recruitId: number,
  applicationId: number | null,
  mode: ApplicationFormType
) {
  const { mutate, isLoading } = useMutation(
    (applicantAnswers: IApplicantAnswerForm[]): Promise<AxiosResponse> => {
      if (mode === 'APPLY' && applicationId === null) {
        return instance.post(`/recruitments/${recruitId}/applications`, {
          forms: applicantAnswers,
        });
      }
      return instance.patch(
        `/recruitments/${recruitId}/applications/${applicationId}`,
        { forms: applicantAnswers }
      );
    }
  );
  return { mutate, isLoading };
}

export default useUserApplicationForm;
