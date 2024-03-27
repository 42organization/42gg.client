import { useState } from 'react';
import {
  Irecruit,
  RecruitmentDetailProps,
  RecruitmentEditProps,
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
    case 'EDIT': {
      const props = page.props as RecruitmentEditProps;
      console.log(props);
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
