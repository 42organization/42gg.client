import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import {
  ApplicationFormType,
  IApplicantAnswer,
} from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

function useUserApplicationForm(
  recruitId: number,
  applicationId: number | null,
  mode: ApplicationFormType
) {
  const { mutate } = useMutation(
    (applicantAnswers: IApplicantAnswer[]): Promise<AxiosResponse> => {
      if (mode === 'APPLY' && applicationId === null) {
        return mockInstance.post(`/recruitments/${recruitId}/applications`, {
          form: applicantAnswers,
        });
      }
      return mockInstance.patch(
        `/recruitments/${recruitId}/applications/${applicationId}`,
        { form: applicantAnswers }
      );
    }
  );
  return { mutate };
}

export default useUserApplicationForm;
