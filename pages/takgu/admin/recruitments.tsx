import { useState } from 'react';
import {
  Irecruit,
  RecruitmentDetailProps,
  RecruitmentEditProps,
  RecruitmentsPages,
} from 'types/takgu/admin/adminRecruitmentsTypes';
import RecruitmentDetail from 'components/takgu/admin/recruitments/recruitmentsDetail/RecruitmentDetail';
import RecruitmentEdit from 'components/takgu/admin/recruitments/recruitmentsEdit/RecruitmentEdit';
import RecruitmentsMain from 'components/takgu/admin/recruitments/RecruitmentsMain';

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
