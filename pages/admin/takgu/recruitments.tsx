import { useState } from 'react';
import {
  Irecruit,
  RecruitmentDetailProps,
  RecruitmentEditProps,
  RecruitmentsPages,
} from 'types/admin/takgu/adminRecruitmentsTypes';
import RecruitmentDetail from 'components/admin/takgu/recruitments/recruitmentsDetail/RecruitmentDetail';
import RecruitmentEdit from 'components/admin/takgu/recruitments/recruitmentsEdit/RecruitmentEdit';
import RecruitmentsMain from 'components/admin/takgu/recruitments/RecruitmentsMain';

export default function Recruitments() {
  const [page, setPage] = useState<RecruitmentsPages>({
    pageType: 'MAIN',
    props: null,
  });

  switch (page.pageType) {
    case 'MAIN':
      return <RecruitmentsMain setPage={setPage} />;
    case 'EDIT': {
      const props = page.props as RecruitmentEditProps;
      return (
        <RecruitmentEdit
          setPage={setPage}
          recruitmentInfo={props.recruitmentInfo}
          mode={props.mode}
        />
      );
    }
    case 'DETAIL': {
      const props = page.props as RecruitmentDetailProps;
      return <RecruitmentDetail recruit={props.recruit} setPage={setPage} />;
    }
  }
}
