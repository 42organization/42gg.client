import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import CoinPopcon from 'components/modal/CoinPopcon';
import styles from 'styles/modal/event/WelcomeModal.module.scss';

export default function WelcomeModal() {
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState(errorState);
  const [buttonState, setButtonState] = useState(false);
  const content = {
    title: 'Welcome!',
    message:
      '42GG에 오신걸 환영합니다.\n당신의 행복한 탁구 생활을\n응원합니다! 총총총...',
  };

  const postCoinHandler = async () => {
    try {
      const res = await instance.post(`/pingpong/users/attendance`);
      return res.data;
    } catch (e: any) {
      if (e.response.status === 400) {
        alert('현재 출석완료상태입니다.');
        return;
      }
      setError('SM01');
      return;
    }
  };

  const openPageManual = () => {
    window.open(
      'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
    );
  };

  const openAttendanceCoin = async () => {
    try {
      setButtonState(true);
      const updatedcoin = await postCoinHandler();
      if (updatedcoin == null) return;
      setModal({
        modalName: 'COIN-ANIMATION',
        CoinResult: {
          isAttended: true,
          afterCoin: updatedcoin.afterCoin,
          beforeCoin: updatedcoin.beforeCoin,
          coinIncrement: updatedcoin.coinIncrement,
        },
      });
    } catch (error) {
      setError('SM02');
      return;
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.phrase}>
          <div className={styles.emoji}></div>
          <div className={styles.title}>{content.title}</div>
          <div className={styles.message}>{content.message}</div>
          <div className={styles.rose}>
            <span>{`@`}</span>
            <span>{`)->->--`}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.negative}>
            <input onClick={openPageManual} type='button' value='페이지 소개' />
          </div>
          <div className={styles.positive}>
            <input
              onClick={openAttendanceCoin}
              type='button'
              value='출석하기'
            />
            {buttonState && <CoinPopcon amount={8} coin={0} />}
          </div>
        </div>
      </div>
    </div>
  );
}
