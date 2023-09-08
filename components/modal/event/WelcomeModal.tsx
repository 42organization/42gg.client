import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { CoinResult } from 'types/coinTypes';
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
  const [coin, setCoin] = useState<CoinResult>();
  const setError = useSetRecoilState(errorState);
  const [buttonState, setButtonState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    title: 'Welcome!',
    message:
      '42GG에 오신걸 환영합니다.\n당신의 행복한 탁구 생활을\n응원합니다! 총총총...',
  };

  const postCoinHandler = async () => {
    try {
      setIsLoading(true);
      const res = await instance.post(`/pingpong/users/attendance`);
      setIsLoading(false);
      setCoin(res.data);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setError('SM01');
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
      const updatedCoin = await postCoinHandler();

      if (!updatedCoin) return null;

      setModal({
        modalName: 'COIN-ANIMATION',
        CoinResult: {
          isAttended: true,
          afterCoin: updatedCoin.afterCoin,
          beforeCoin: updatedCoin.beforeCoin,
          coinIncrement: updatedCoin.coinIncrement,
        },
      });
    } catch (error) {
      setError('SM02');
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
          {buttonState && <CoinPopcon amount={8} coin={1} />}
        </ModalButtonContainer>
      </div>
    </div>
  );
}
