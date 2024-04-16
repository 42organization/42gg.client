import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material';
import {
  Irecruit,
  RecruitmentEditProps,
  RecruitmentsPages,
} from 'types/admin/adminRecruitmentsTypes';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/recruitments/recruitmentDetail/components/ActionSelectorButtons.module.scss';

interface ActionSelectorButtonsProps {
  setPage: Dispatch<SetStateAction<RecruitmentsPages>>;
  recruitmentInfo: Irecruit;
  actionType: 'CREATE' | 'MODIFY';
}

export default function ActionSelectorButtons({
  setPage,
  recruitmentInfo,
  actionType,
}: ActionSelectorButtonsProps) {
  const STATE = recruitmentInfo.status === '모집중' ? false : true;

  const [isEnded, setIsEnded] = useState<boolean>(STATE);

  const isStarted = recruitmentInfo.startDate > new Date();

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

  const switchChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    // 공고 상태 수정 API 호출
    setIsEnded(checked);
  };

  return (
    <>
      {isStarted ? (
        <div className={styles.mainContainer}>
          <Button variant='contained' className={styles.button}>
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
                checked={isEnded}
                onChange={switchChangeHandler}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={isEnded ? '완료' : '모집중'}
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
