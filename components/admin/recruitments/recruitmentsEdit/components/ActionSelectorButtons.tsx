import { useCallback, useEffect, useState } from 'react';
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
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
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

  const [selectedId, setSelectedId] = useState<string>('');

  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitHandler = async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/recruitments`
      // );
      const res = await mockInstance.get(`admin/recruitments`);
      setRecruitmentsHistory(res.data.recruitment);
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `이전 공고를 불러오는데 실패했습니다.`,
        clicked: true,
      });
    }
  };

  const createRecruitmentHandler = async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/recruitments`
      // );
      const res = await mockInstance.post(`admin/recruitments`, {
        title: recruitmentEditInfo.title,
        startDate: recruitmentEditInfo.startDate,
        endDate: recruitmentEditInfo.endDate,
        generation: recruitmentEditInfo.generation,
        contents: recruitmentEditInfo.contents,
        form: recruitmentEditInfo.form,
      });
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
            onClick={getRecruitHandler}
            onChange={selectChangehandler}
          >
            {recruitmentsHistory.map((recruit: Irecruit) => (
              <MenuItem key={recruit.id} value={recruit.id}>
                {recruit.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant='contained'
          style={{ marginLeft: '0.5rem', width: '8rem' }}
          onClick={() => {
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
