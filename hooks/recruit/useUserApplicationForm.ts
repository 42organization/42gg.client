import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import {
  ApplicationFormType,
  IApplicantAnswer,
} from 'types/recruit/recruitments';
import { instance } from 'utils/axios';

function useUserApplicationForm(
  recruitId: number,
  applicationId: number | null,
  mode: ApplicationFormType
) {
  const { mutate } = useMutation(
    (applicantAnswers: IApplicantAnswer[]): Promise<AxiosResponse> => {
      if (mode === 'APPLY' && applicationId === null) {
        return instance.post(`/recruitments/${recruitId}/applications`, {
          form: applicantAnswers,
        });
      }
      return instance.patch(
        `/recruitments/${recruitId}/applications/${applicationId}`,
        { form: applicantAnswers }
      );
    }
  );
  return { mutate };
}

export default useUserApplicationForm;
