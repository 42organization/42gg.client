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
import {
  Irecruit,
  IrecruitEditInfo,
  IrecruitTable,
} from 'types/admin/adminRecruitmentsTypes';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/ActionSelectorButtons.module.scss';

interface ActionSelectorButtonsProps {
  recruitmentEditInfo: IrecruitEditInfo;
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
      //   `/recruitments?page=${currentPage}&size=20`
      // );
      const res = await mockInstance.get(`admin/recruitments`);
      setRecruitmentsHistory(res.data.recruitment);
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  const selectChangehandler = ({ target }: SelectChangeEvent) => {
    setSelectedId(target.value);
  };

  useEffect(() => {
    getRecruitHandler();
  });

  // actionType = 'MODIFY';
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
            {recruitmentsHistory &&
              recruitmentsHistory.map((recruit: Irecruit) => {
                return (
                  <MenuItem key={recruit.id} value={recruit.id}>
                    {recruit.title}
                  </MenuItem>
                );
              })}
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
        <Button variant='contained'>공고 생성</Button>
      )}
      {actionType === 'MODIFY' && (
        <Button variant='contained'>공고 수정</Button>
      )}
    </div>
  );
}
