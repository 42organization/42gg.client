import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { SelectChangeEvent } from '@mui/material';
import {
  IcheckItem,
  IrecruitArrayTable,
} from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

// FIXME : 페이지네이션 여부 담당자와 다시 확인하기 (현재 페이지네이션 없음)
// const useRecruitmentUserFilter = (recruitId: number, currentPage?: number) => {
const useRecruitmentUserFilter = (recruitId: number) => {
  const [recruitUserData, setRecruitUserData] = useState<IrecruitArrayTable>({
    applicationResults: [],
    totalPage: 0,
    currentPage: 0,
  });
  const setSnackBar = useSetRecoilState(toastState);
  const [checklistIds, setChecklistIds] = useState<Array<IcheckItem>>([]);
  const [searchString, setSearchString] = useState<string>('');

  const getRecruitUserHandler = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/recruitments/${recruitId}/applications`, {
      //     params: {
      //       page: currentPage,
      //       size: 20,
      //       question: questionId,
      //       checks: checklistIds.map((check) => check).join(','),
      //       search: search,
      //     }
      //   }
      // );
      const res = await instance.get(
        `/admin/recruitments/${recruitId}/applications`,
        {
          params: {
            page: 1,
            size: 20,
            // question: questionId,
            // checks: checklistIds.map((check) => check).join(','),
            // search: searchString,
          },
        }
      );
      console.log(res.data);
      // FIXME: 페이지네이션 x (페이지네이션이 없는 api?) 임시로 1페이지로 고정
      setRecruitUserData({
        applicationResults: res.data.applicationResults,
        totalPage: 1,
        currentPage: 1,
      });
      // setRecruitUserData({
      //   applications: res.data.applications,
      //   totalPage: res.data.totalPages,
      //   currentPage: res.data.number + 3,
      // });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
    // }, [currentPage, searchString, checklistIds]);
  }, [searchString, checklistIds]);

  useEffect(() => {
    getRecruitUserHandler();
    // }, [currentPage, searchString, checklistIds]);
  }, [searchString, checklistIds]);

  const questions = recruitUserData.applicationResults.reduce(
    (acc: string[], application: { forms: { question: string }[] }) => {
      if (application.forms) {
        application.forms.forEach(({ question }) => {
          if (acc.indexOf(question) === -1) {
            acc.push(question);
          }
        });
      }
      return acc;
    },
    []
  );

  const handleChecklistChange = (
    event: SelectChangeEvent<typeof checklistIds>
  ) => {
    const {
      target: { value },
    } = event;
    typeof value !== 'string' ? setChecklistIds(value) : value;
  };

  const initSearch = useCallback((searchString?: string) => {
    setSearchString(searchString || '');
  }, []);

  return {
    checklistIds,
    searchString,
    setChecklistIds,
    setSearchString,
    getRecruitUserHandler,
    recruitUserData,
    questions,
    initSearch,
    handleChecklistChange,
  };
};

export default useRecruitmentUserFilter;
