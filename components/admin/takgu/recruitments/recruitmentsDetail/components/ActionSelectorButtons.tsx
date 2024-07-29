import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button, FormControlLabel, Switch } from '@mui/material';
import {
  Irecruit,
  RecruitmentEditProps,
  RecruitmentsPages,
} from 'types/admin/takgu/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/takgu/recruitments/recruitmentDetail/components/ActionSelectorButtons.module.scss';

interface ActionSelectorButtonsProps {
  setPage: Dispatch<SetStateAction<RecruitmentsPages>>;
  recruitmentInfo: Irecruit;
  actionType: 'CREATE' | 'MODIFY';
}

export default function ActionSelectorButtons({
  setPage,
  recruitmentInfo,
}: ActionSelectorButtonsProps) {
  const [isFinish, setIsFinish] = useState<boolean>(
    recruitmentInfo.isFinish as boolean
  );

  const isStarted = recruitmentInfo.startDate > new Date();
  const setSnackBar = useSetRecoilState(toastState);

  const goToEditPage = (mode: string) => {
    setPage({
      pageType: 'EDIT',
      props: {
        setPage: setPage,
        recruitmentInfo: recruitmentInfo,
        mode: mode,
      } as RecruitmentEditProps,
    });
  };

  const deleteRecruitHandler = async () => {
    try {
      const res = await instance.delete(
        `/admin/recruitments/${recruitmentInfo.id}`
      );
      alert('성공적으로 삭제가 완료되었습니다.');
      setPage({ pageType: 'MAIN', props: null });
    } catch (e: any) {
      setSnackBar({
        toastName: 'post recruitment',
        severity: 'error',
        message: e.response.data.message,
        clicked: true,
      });
    }
  };

  const switchChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    try {
      const res = await instance.patch(
        `/admin/recruitments/${recruitmentInfo.id}/status`,
        {
          finish: !checked,
        }
      );
      setIsFinish(!checked);
      console.log(res);
    } catch (e: any) {
      setSnackBar({
        toastName: 'patch recruitment',
        severity: 'error',
        message: 'API 요청에 실패하였습니다.',
        clicked: true,
      });
    }
  };

  return (
    <>
      {isStarted ? (
        <div className={styles.mainContainer}>
          <Button
            variant='contained'
            className={styles.button}
            onClick={deleteRecruitHandler}
          >
            삭제하기
          </Button>
          <Button
            variant='contained'
            className={styles.button}
            onClick={() => goToEditPage('MODIFY')}
          >
            수정하기
          </Button>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <FormControlLabel
            control={
              <Switch
                checked={!isFinish}
                onChange={switchChangeHandler}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={isFinish ? '모집완료' : '모집중'}
          />
          <Button
            variant='contained'
            className={styles.button}
            onClick={() => {
              goToEditPage('CREATE');
            }}
          >
            이 양식으로 공고생성
          </Button>
        </div>
      )}
    </>
  );
}
