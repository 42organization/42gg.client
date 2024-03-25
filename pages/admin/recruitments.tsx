import { useState } from 'react';
import {
  RecruitmentDetailProps,
  RecruitmentsPages,
} from 'types/admin/adminRecruitmentsTypes';
import RecruitmentDetail from 'components/admin/recruitments/recruitmentsDetail/RecruitmentDetail';
import RecruitmentEdit from 'components/admin/recruitments/recruitmentsEdit/RecruitmentEdit';
import RecruitmentsMain from 'components/admin/recruitments/RecruitmentsMain';

export default function Recruitments() {
  const [page, setPage] = useState<RecruitmentsPages>({
    pageType: 'MAIN',
    props: null,
  });

  switch (page.pageType) {
    case 'MAIN':
      return <RecruitmentsMain setPage={setPage} />;
    case 'EDIT':
      return <RecruitmentEdit setPage={setPage} />;
    case 'DETAIL': {
      const props = page.props as RecruitmentDetailProps;
      return <RecruitmentDetail recruit={props.recruit} setPage={setPage} />;
    }
  }
}
