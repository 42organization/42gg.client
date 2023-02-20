import { useSetRecoilState } from 'recoil';
import { forwardRef, useEffect, useState } from 'react';
import styles from 'styles/admin/modal/AdminNotiAll.module.scss';
import { modalState } from 'utils/recoil/modal';
import CustomizedSnackbars from 'components/toastmsg/toastmsg';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import instance from 'utils/axios';
import { finished } from 'stream';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface EditedAllNoti {
  notification: string | number;
}

export default function AdminNotiAllModal(props: any) {
  const [allNoti, setAllNoti] = useState<any>(/* 초기값 필요 */);
  const [editedAllNoti, setEditedAllNoti] = useState<EditedAllNoti>({
    notification: '',
  });

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setEditedAllNoti((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log({ allNoti });
    return () => {
      console.log({ allNoti });
    };
  }, [allNoti]);
  const setModal = useSetRecoilState(modalState);
  const finishEditHandler = () => setModal({ modalName: null });
  const cancelEditHandler = () => setModal({ modalName: null });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className={styles.whole}>
      <div className={styles.body}>
        <div className={styles.title}>NOTI FOR ALL</div>

        <label className={styles.body}>
          To: everyone
          <textarea
            className={styles.blank}
            name='notification'
            onChange={inputChangeHandler}
            value={allNoti?.notification}
            placeholder={'모두에게 전달할 알림을 입력해주세요'}
          />
        </label>

        <div className={styles.btns}>
          <button
            onClick={() => {
              handleClick();
            }}
            className={styles.btn}
          >
            적용
          </button>
          <CustomizedSnackbars
            clicked={open}
            severity='success'
            message='Successfully Sent!'
          />
          <button className={styles.btn} onClick={cancelEditHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
