import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { SelectChangeEvent } from '@mui/material';
import {
  IcheckItem,
  IrecruitArrayTable,
} from 'types/admin/adminRecruitmentsTypes';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';

const useRucruitmentUserFilter = (currentPage?: number, recruitId?: number) => {
  const [recruitUserData, setRecruitUserData] = useState<IrecruitArrayTable>({
    applications: [],
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
      const id = recruitId;
      const res = await mockInstance.get(`/admin/recruitments/${id}`);
      setRecruitUserData({
        applications: res.data.applications,
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
  }, [currentPage, searchString, checklistIds]);

  const questions = recruitUserData.applications.reduce(
    (acc: string[], application: { form: { question: string }[] }) => {
      application.form.forEach(({ question }) => {
        if (acc.indexOf(question) === -1) {
          acc.push(question);
        }
      });
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

export default useRucruitmentUserFilter;
