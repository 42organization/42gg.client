import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { More } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Irecruit, recruitListData } from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { dateToDateTimeLocalString } from 'utils/handleTime';
import { InfiniteScroll } from 'utils/infinityScroll';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/ActionSelectorButtons.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  const [selectedId, setSelectedId] = useState<string>('');

  const fetchRecruitList = (page: number) => {
    return instance
      .get(`/admin/recruitments?page=${page}&size=${5}`)
      .then((res) => {
        return res.data;
      });
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    InfiniteScroll<recruitListData>(['recruitList'], fetchRecruitList, 'JY09');

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
            style={{
              backgroundColor: 'white',
            }}
            MenuProps={MenuProps}
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
            {hasNextPage && (
              <Button onClick={() => fetchNextPage()}>
                <MoreHorizIcon />
              </Button>
            )}
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
