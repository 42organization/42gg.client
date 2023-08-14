import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import useAxiosGet from 'hooks/useAxiosGet';
import { useState, useEffect } from 'react';
import { instance } from 'utils/axios';
import { CoinResult } from 'types/coinTypes';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import styles from 'styles/modal/event/WelcomeModal.module.scss';
import { mockInstance } from 'utils/mockAxios';

export default function WelcomeModal() {
  const setModal = useSetRecoilState<Modal>(modalState);
  const [coin, setCoin] = useState<CoinResult>();
  const setError = useSetRecoilState(errorState);

  const content = {
    title: 'Welcome!',
    message:
      '42GG에 오신걸 환영합니다.\n당신의 행복한 탁구 생활을\n응원합니다! 총총총...',
  };

  /*   const postCoinHandler = async() => {
    try {
      const res = await instance.post(
        `/pingpong/users/attendance`
      );
      setCoin(res.data);
      return res.data;
    } catch (error) {
      setError('SM01');
    }
  };

  useEffect(() => {
    postCoinHandler();
	}, []); */

  const getCoinHandler = async () => {
    try {
      const res = await mockInstance.get(`/users/attendance`);
      if (res && res.data) {
        setCoin(res.data);
        return res.data;
      }
    } catch (error) {
      setError('SM01');
      return null;
    }
  };

  const openPageManual = () => {
    window.open(
      'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
    );
  };

  const openAttendanceCoin = async () => {
    try {
      const updatedCoin = await getCoinHandler();
      //const updatedCoin = await postCoinHandler();

      if (!updatedCoin) return null;

      setModal({
        modalName: 'COIN-ANIMATION',
        CoinResult: {
          afterCoin: updatedCoin?.afterCoin,
          beforeCoin: updatedCoin?.beforeCoin,
          coinIncrement: updatedCoin?.coinIncrement,
        },
      });
    } catch (error) {
      setError('SM02');
    }
  };

  const openStatChangeModal = () => {
    setModal({
      modalName: 'FIXED-STAT',
      exp: {
        gameId: 0,
        mode: 'RANK',
      },
    });
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
          </div>
        </div>
      </div>
    </div>
  );
}
