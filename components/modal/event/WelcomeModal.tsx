import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import CoinPopcon from 'components/modal/CoinPopcon';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/event/WelcomeModal.module.scss';

export default function WelcomeModal() {
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState(errorState);
  const [buttonState, setButtonState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const content = {
    title: 'Welcome!',
    message:
      '42GG에 오신걸 환영합니다.\n당신의 행복한 탁구 생활을\n응원합니다! 총총총...',
  };

  // const postCoinHandler = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await instance.post(`/pingpong/users/attendance`);
  //     return res.data;
  //   } catch (e: any) {
  //     if (e.response.status === 409) {
  //       alert('출석은 하루에 한 번만 가능합니다.');
  //       setModal({ modalName: null });
  //       return;
  //     }
  //     setError('SM01');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const openPageManual = () => {
    window.open('https://www.notion.so/bfbe7ad164d4450295e4978ce3121398?pvs=4');
  };

  const openAttendanceCoin = async () => {
    try {
      setButtonState(true);
      setIsLoading(true);
      const res = await instance.post(`/pingpong/users/attendance`);
      const updatedcoin = res.data;
      if (!updatedcoin) return;
      setModal({
        modalName: 'COIN-ANIMATION',
        CoinResult: {
          isAttended: true,
          afterCoin: updatedcoin.afterCoin,
          beforeCoin: updatedcoin.beforeCoin,
          coinIncrement: updatedcoin.coinIncrement,
        },
      });
    } catch (error: any) {
      if (error.response.status === 409) {
        setButtonState(false);
        alert('출석은 하루에 한 번만 가능합니다.');
        queryClient.invalidateQueries('user').then(() => {
          setModal({ modalName: null });
          window.location.reload();
        });
      } else {
        setError('SM01');
      }
    } finally {
      setIsLoading(false);
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
        <ModalButtonContainer>
          <ModalButton
            style='negative'
            onClick={openPageManual}
            value='페이지 소개'
          />
          <ModalButton
            style='positive'
            onClick={openAttendanceCoin}
            value='출석하기'
            isLoading={isLoading}
          />
          {buttonState && <CoinPopcon amount={5} coin={0} />}
        </ModalButtonContainer>
      </div>
    </div>
  );
}
