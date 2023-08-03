import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import useAxiosGet from 'hooks/useAxiosGet';
import useMockAxiosGet from 'hooks/useAxiosGet';
import { useState, useEffect } from 'react';
import { CoinResult } from 'types/coinTypes';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/event/WelcomeModal.module.scss';

export default function WelcomeModal() {
  const setModal = useSetRecoilState<Modal>(modalState);
  const [coin, setCoin] = useState<CoinResult>({
    afterCoin: 6,
    beforeCoin: 3,
    coinIncrement: 3,
  });

  const content = {
    title: 'Welcome!',
    message:
      '42GG에 오신걸 환영합니다.\n당신의 행복한 탁구 생활을\n응원합니다! 총총총...',
  };

  /* 	const postCoinHandler = useMockAxiosGet({
    url: `/users/attendance`,
    setState: setCoin,
    err: 'SM01',
    type: 'setError',
  });

  useEffect(() => {
    getCoinHandler();
	}, []); */

  const openPageManual = () => {
    window.open(
      'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
    );
  };

  if (!coin) return null;

  const openAttendanceCoin = () => {
    setModal({
      modalName: 'COIN-ANIMATION',
      CoinResult: {
        afterCoin: coin?.afterCoin,
        beforeCoin: coin?.beforeCoin,
        coinIncrement: coin?.coinIncrement,
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
