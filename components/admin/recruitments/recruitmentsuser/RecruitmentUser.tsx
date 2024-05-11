import React, { useState } from 'react';
import useRecruitmentUserFilter from 'hooks/recruitments/useRecruitmentUserFilter';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
import DetailRecruitUserList from './DetailRecruitUserList';
import RecruitmentFilterOptions from './RecruitmentFilterOptions';
import RecruitSearchBar from './RecruitSearchBar';

function RecruitmentPage({ recruitId }: { recruitId: number }) {
  const {
    recruitUserData,
    handleChecklistChange,
    checklistIds,
    recruitUserFilterData,
    initSearch,
  } = useRecruitmentUserFilter(recruitId);

  return (
    <div>
      <div className={styles.filterWrap}>
        <div className={styles.searchWrap}>
          <RecruitSearchBar recruitId={recruitId} initSearch={initSearch} />
        </div>
        <RecruitmentFilterOptions
          recruitId={recruitId}
          checklistIds={checklistIds}
          handleChecklistChange={handleChecklistChange}
          recruitUserData={recruitUserData}
        />
      </div>
      <DetailRecruitUserList
        recruitId={recruitId}
        recruitUserFilter={recruitUserFilterData}
      />
    </div>
  );
}

export default RecruitmentPage;
