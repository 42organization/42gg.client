import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Irecruit } from 'types/admin/adminRecruitmentsTypes';
import { instance, instanceInManage } from 'utils/axios';
import { dateToDateTimeLocalString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import useInfiniteRecruitList from 'hooks/admin/recruit/useInfiniteRecruitList';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/ActionSelectorButtons.module.scss';

interface ActionSelectorButtonsProps {
  recruitmentEditInfo: Irecruit;
  importRecruitmentInfo: (recruitId: number) => void;
  actionType: 'CREATE' | 'MODIFY';
}

export default function ActionSelectorButtons({
  recruitmentEditInfo,
  importRecruitmentInfo,
  actionType,
}: ActionSelectorButtonsProps) {
  const [recruitmentsHistory, setRecruitmentsHistory] = useState<Irecruit[]>(
    []
  );

  // const getRecruitHandler = async () => {
  //   try {
  //     // FIXME : 1페이지 고정인 부분 주석으로 설명 추가해주세요. (의도된것인지 / 최근 100개만 보는 것인지 등)
  //     const res = await instance.get(
  //       `/admin/recruitments?page=${1}&size=${100}`
  //     );
  //     setRecruitmentsHistory(res.data.recruitmentDtoList);
  //   } catch (e: any) {
  //     setSnackBar({
  //       toastName: 'get recruitment',
  //       severity: 'error',
  //       message: `이전 공고를 불러오는데 실패했습니다.`,
  //       clicked: true,
  //     });
  //   }
  // };

  const [selectedId, setSelectedId] = useState<string>('');

  const { data, isLoading, isError, targetRef } = useInfiniteRecruitList();

  const setSnackBar = useSetRecoilState(toastState);

  const createRecruitmentHandler = async () => {
    try {
      const res = await instance.post(`/admin/recruitments`, {
        title: recruitmentEditInfo.title,
        startDate: dateToDateTimeLocalString(recruitmentEditInfo.startDate),
        endDate: dateToDateTimeLocalString(recruitmentEditInfo.endDate),
        generation: recruitmentEditInfo.generation,
        contents: recruitmentEditInfo.contents,
        form: recruitmentEditInfo.form,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'post recruitment',
        severity: 'error',
        message: e.response.data.message,
        clicked: true,
      });
    }
  };

  const modifyRecruitmentHandler = async () => {
    try {
      const res = await instance.put(
        `/admin/recruitments/${recruitmentEditInfo.id}`,
        {
          title: recruitmentEditInfo.title,
          startDate: dateToDateTimeLocalString(recruitmentEditInfo.startDate),
          endDate: dateToDateTimeLocalString(recruitmentEditInfo.endDate),
          generation: recruitmentEditInfo.generation,
          contents: recruitmentEditInfo.contents,
          form: recruitmentEditInfo.form,
        }
      );
    } catch (e: any) {
      setSnackBar({
        toastName: 'put recruitment',
        severity: 'error',
        message: e.response.data.message,
        clicked: true,
      });
    }
  };

  const selectChangehandler = ({ target }: SelectChangeEvent) => {
    setSelectedId(target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.importWrapper}>
        <FormControl fullWidth size='small'>
          <InputLabel>기존 공고</InputLabel>
          <Select
            defaultValue={''}
            value={selectedId}
            label='기존 공고'
            style={{ backgroundColor: 'white' }}
            onChange={selectChangehandler}
          >
            {data?.pages.map((page, pageIndex) => {
              return page.recruitments?.map((recruit) => {
                return (
                  <MenuItem key={recruit.id} value={recruit.id}>
                    {recruit.title}
                  </MenuItem>
                );
              });
            })}
            {/* {recruitmentsHistory.length === 0 ? (
              <MenuItem key={-1} value={-1}>
                기존 공고가 없습니다.
              </MenuItem>
            ) : (
              recruitmentsHistory.map((recruit: Irecruit) => (
                <MenuItem key={recruit.id} value={recruit.id}>
                  {recruit.title}
                </MenuItem>
              ))
            )} */}
          </Select>
        </FormControl>
        <Button
          variant='contained'
          style={{ marginLeft: '0.5rem', width: '8rem' }}
          onClick={() => {
            if (selectedId === '') return;
            importRecruitmentInfo(Number(selectedId));
          }}
        >
          불러오기
        </Button>
      </div>
      {actionType === 'CREATE' && (
        <Button variant='contained' onClick={createRecruitmentHandler}>
          공고 생성
        </Button>
      )}
      {actionType === 'MODIFY' && (
        <Button variant='contained' onClick={modifyRecruitmentHandler}>
          공고 수정
        </Button>
      )}
    </div>
  );
}
