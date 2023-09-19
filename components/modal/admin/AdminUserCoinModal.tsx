import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IUserCoin } from 'types/admin/adminUserTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminUserCoin.module.scss';

export default function AdminUserCoinModal(props: { intraId: string }) {
  const MAX_LENGTH = 30;
  const [currentCoin, setCurrentCoin] = useState<number>(0);
  const [userCoinInfo, setUserCoinInfo] = useState<IUserCoin>({
    intraId: props.intraId,
    change: 0,
    content: '',
  });
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const getCurrentCoinHandler = async () => {
    try {
      const res = await instanceInManage.get(`/users/${props.intraId}`);
      setCurrentCoin(res?.data.coin);
    } catch (e) {
      setSnackBar({
        toastName: 'profile',
        severity: 'error',
        message: `api 불러오기 실패 ${props.intraId}`,
        clicked: true,
      });
    }
  };

  useEffect(() => {
    getCurrentCoinHandler();
  }, []);

  const isNumeric = (num: string) => {
    const regex = /^[+-]?\d*$/;
    return regex.test(num);
  };

  const inputHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'change') {
      if (!isNumeric(value) || value === '0') {
        return setSnackBar({
          toastName: 'userCoin',
          severity: 'error',
          message: '지급(차감)액은 0이 아닌 숫자만 입력 가능합니다.',
          clicked: true,
        });
      }
      setUserCoinInfo({ ...userCoinInfo, [name]: Number(value) });
    } else {
      setUserCoinInfo({ ...userCoinInfo, [name]: value });
    }
  };

  const changeCoinHanlder = async () => {
    const { intraId, change, content } = userCoinInfo;
    if (intraId !== props.intraId) {
      setSnackBar({
        toastName: 'userCoin',
        severity: 'error',
        message: `intra ID가 일치하지 않습니다.`,
        clicked: true,
      });
      return;
    }
    if (!content || !change) {
      setSnackBar({
        toastName: 'userCoin',
        severity: 'error',
        message: `모든 항목을 입력해주세요.`,
        clicked: true,
      });
      return;
    }
    try {
      const res = await instanceInManage.put(`/coin`, {
        intraId,
        change,
        content,
      });
      if (res.status === 404) {
        setSnackBar({
          toastName: 'userCoin',
          severity: 'error',
          message: '해당 유저를 찾을 수 없습니다',
          clicked: true,
        });
      } else {
        setSnackBar({
          toastName: 'userCoin',
          severity: 'success',
          message: '코인 수정 성공',
          clicked: true,
        });
      }
      setModal({ modalName: null });
    } catch (e) {
      setSnackBar({
        toastName: 'userCoin',
        severity: 'error',
        message: `잘못된 요청입니다`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>코인 수정</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.intraWrap}>
            <div className={styles.bodyText}>intra ID:</div>
            <input
              className={styles.intraBlank}
              name='intraID'
              value={props.intraId}
              readOnly
            />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>내용:</div>
            <input
              className={styles.contentBlank}
              name='content'
              placeholder={'내용을 입력하세요(30자)'}
              maxLength={MAX_LENGTH}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.coinWrap}>
            <div className={styles.bodyText}>현재 코인:</div>
            <input
              className={styles.coinBlank}
              name='currentCoin'
              value={currentCoin}
              readOnly
            />
          </div>
          <div className={styles.coinWrap}>
            <div className={styles.bodyText}>지급(차감):</div>
            <input
              className={styles.coinBlank}
              name='change'
              type='number'
              placeholder={'코인 지급(차감)액을 입력하세요'}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.coinWrap}>
            <div className={styles.bodyText}>최종 코인:</div>
            <input
              className={styles.coinBlank}
              name='afterCoin'
              value={currentCoin + Number(userCoinInfo.change)}
              readOnly
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={() => {
              changeCoinHanlder();
            }}
            className={styles.btn1}
          >
            적용
          </button>
          <button
            className={styles.btn2}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
