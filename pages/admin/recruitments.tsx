import { useState } from 'react';
import RecruitmentEdit from 'components/admin/recruitments/recruitmentsEdit/RecruitmentEdit';
import RecruitmentsMain from 'components/admin/recruitments/RecruitmentsMain';

export default function Recruitments() {
  const [pageType, setPageType] = useState<'MAIN' | 'EDIT'>('MAIN');

  switch (pageType) {
    case 'MAIN':
      return <RecruitmentsMain setPageType={setPageType} />;
    case 'EDIT':
      return <RecruitmentEdit setPageType={setPageType} />;
  }
}
