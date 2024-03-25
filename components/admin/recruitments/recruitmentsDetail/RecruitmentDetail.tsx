import { Dispatch, SetStateAction } from 'react';
import {
  RecruitmentDetailProps,
  RecruitmentsMainProps,
} from 'types/admin/adminRecruitmentsTypes';

export default function RecruitmentDetail({
  setPage,
  recruit,
}: RecruitmentDetailProps) {
  console.log(recruit.id);
  return (
    <>
      <h1>RecruitmentDetail Page</h1>
      <button
        onClick={() => {
          const props = { setPage: setPage } as RecruitmentsMainProps;
          setPage({ pageType: 'MAIN', props: props });
        }}
      >
        홈으로 돌아가기
      </button>
    </>
  );
}
