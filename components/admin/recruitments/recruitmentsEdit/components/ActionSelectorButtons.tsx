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
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/ActionSelectorButtons.module.scss';

// interface PagenatedResponse {
//   recruitmentHistory: Irecruit[];
//   totalPage: number;
// }

// function fetchRecruitMemtHistoryData(page: number) {
//   return instance.get(`/recruitments?page=${page}&size=${8}`).then((res) => {
//     return res.data;
//   });
// }

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

  const getRecruitHandler = async () => {
    try {
      const res = await instanceInManage.get(
        `/recruitments?page=${1}&size=${100}`
      );
      console.log(res.data.recruitments);
      setRecruitmentsHistory(res.data.recruitments);
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `이전 공고를 불러오는데 실패했습니다.`,
        clicked: true,
      });
    }
  };

  // const { data, error, isLoading, hasNextPage, fetchNextPage } =
  //   InfiniteScroll<PagenatedResponse>(
  //     'recruitment',
  //     fetchRecruitMemtHistoryData,
  //     'RT04'
  //   );

  const [selectedId, setSelectedId] = useState<string>('');

  const setSnackBar = useSetRecoilState(toastState);

  const createRecruitmentHandler = async () => {
    try {
      const convertedForm = recruitmentEditInfo.form?.map((question) => {
        if (question.inputType === 'TEXT') {
          return {
            question: question.question,
            inputType: question.inputType,
          };
        } else {
          const stringCheckList = question.checkList?.map(
            (item) => item.content
          );
          return {
            question: question.question,
            inputType: question.inputType,
            checkList: stringCheckList,
          };
        }
      });

      const res = await instance.post(`/admin/recruitments`, {
        title: recruitmentEditInfo.title,
        startDateTime: '2024-04-06T08:29:07.424Z', //recruitmentEditInfo.startDate.toISOString(),
        endDateTime: '2024-04-08T08:29:07.424Z', //recruitmentEditInfo.endDate.toISOString(),
        generation: recruitmentEditInfo.generation,
        contents: recruitmentEditInfo.contents,
        form: convertedForm,
      });
      // const res = await mockInstance.post(`admin/recruitments`, {
      //   title: recruitmentEditInfo.title,
      //   startDate: recruitmentEditInfo.startDate,
      //   endDate: recruitmentEditInfo.endDate,
      //   generation: recruitmentEditInfo.generation,
      //   contents: recruitmentEditInfo.contents,
      //   form: recruitmentEditInfo.form,
      // });
    } catch (e: any) {
      setSnackBar({
        toastName: 'post recruitment',
        severity: 'error',
        message: `생성 요청에 실패하였습니다.`,
        clicked: true,
      });
    }
  };

  const selectChangehandler = ({ target }: SelectChangeEvent) => {
    setSelectedId(target.value);
  };

  useEffect(() => {
    getRecruitHandler();
  }, []);

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
            {recruitmentsHistory.length === 0 ? (
              <MenuItem key={-1} value={-1}>
                기존 공고가 없습니다.
              </MenuItem>
            ) : (
              recruitmentsHistory.map((recruit: Irecruit) => (
                <MenuItem key={recruit.id} value={recruit.id}>
                  {recruit.title}
                </MenuItem>
              ))
            )}
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
        <Button variant='contained'>공고 수정</Button>
      )}
    </div>
  );
}
