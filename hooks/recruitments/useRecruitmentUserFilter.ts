import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { SelectChangeEvent } from '@mui/material';
import { IrecruitArrayTable } from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

interface filterParam {
  page: number;
  size: number;
  checks?: string;
  search?: string;
  question?: number | undefined | null;
}

// FIXME : 페이지네이션 여부 담당자와 다시 확인하기 (현재 페이지네이션 없음)
const useRecruitmentUserFilter = (recruitId: number) => {
  const [recruitUserData, setRecruitUserData] = useState<IrecruitArrayTable>({
    applicationResults: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [recruitUserFilterData, setRecruitUserFilterData] =
    useState<IrecruitArrayTable>({
      applicationResults: [],
      totalPage: 0,
      currentPage: 0,
    });
  const setSnackBar = useSetRecoilState(toastState);
  const [checklistIds, setChecklistIds] = useState<Array<string>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>('');
  const [questionId, setQuestionId] = useState<number | null>();
  const [checkIds, setCheckIds] = useState<Array<number | undefined>>([]);

  const getRecruitUserHandler = useCallback(async () => {
    try {
      const res = await instance.get(
        `/admin/recruitments/${recruitId}/applications`
      );

      setRecruitUserData({
        applicationResults: res.data.applicationResults,
        totalPage: res.data.totalPages,
        currentPage: res.data.number + 3,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage, searchString, checklistIds]);

  const getRecruitUserFilterHandler = useCallback(async () => {
    try {
      const params: filterParam = {
        page: currentPage,
        size: 20,
      };
      if (checkIds?.length) {
        params.checks = checkIds
          .map((checkId) => checkId?.toString())
          .join(',');
        params.question = questionId;
      } else if (searchString) {
        params.search = searchString;
      }
      const res = await instance.get(
        `/admin/recruitments/${recruitId}/applications`,
        { params }
      );
      setRecruitUserFilterData({
        applicationResults: res.data.applicationResults,
        totalPage: res.data.totalPages,
        currentPage: res.data.number + 3,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage, searchString, checklistIds]);

  useEffect(() => {
    getRecruitUserHandler();
    getRecruitUserFilterHandler();
  }, [searchString, checklistIds, recruitId, currentPage]);

  const handleChecklistChange = (event: SelectChangeEvent<Array<string>>) => {
    const {
      target: { value },
    } = event;
    typeof value !== 'string' ? setChecklistIds(value) : value;
    recruitUserData.applicationResults.forEach((application) => {
      application.forms.forEach((form) => {
        if (form.checkedList) {
          form.checkedList.forEach((check) => {
            if (value.length === 0) setCheckIds([]);
            typeof value !== 'string'
              ? value.forEach((checkContent) => {
                  if (check.contents === checkContent) {
                    setQuestionId(form.questionId);
                    setCheckIds((prevCheckIds) => {
                      if (!prevCheckIds.includes(check.checkId)) {
                        return [...prevCheckIds, check.checkId];
                      } else {
                        return prevCheckIds;
                      }
                    });
                  }
                })
              : value;
          });
        }
      });
    });
  };

  const initSearch = useCallback(
    (searchString?: string) => {
      setSearchString(searchString || '');
    },
    [searchString]
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    checklistIds,
    searchString,
    setChecklistIds,
    setSearchString,
    getRecruitUserHandler,
    recruitUserData,
    initSearch,
    handleChecklistChange,
    handlePageChange,
    recruitUserFilterData,
    checkIds,
  };
};

export default useRecruitmentUserFilter;
