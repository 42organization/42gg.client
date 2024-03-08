import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import ApplyModal from '../recruitment/ApplyModal';

export default function RecruitmentModal() {
  const { modalName, recruitId, applicantAnswers } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'RECRUITMENT-APPLY':
      recruitId && applicantAnswers ? (
        <ApplyModal recruitId={recruitId} applicantAnswers={applicantAnswers} />
      ) : null,
  };

  if (!modalName) return null;
  return content[modalName];
}
