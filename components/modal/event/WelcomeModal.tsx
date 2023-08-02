import { useSetRecoilState } from 'recoil';
import { firstVisitedState } from 'utils/recoil/modal';
import { CoinResult } from 'types/coinTypes';
import CoinAnimation from "../CoinAnimation";
import styles from 'styles/modal/event/WelcomeModal.module.scss';
import modalStyles from 'styles/modal/Modal.module.scss';
import { useState, useEffect } from 'react';
import useAxiosGet from 'hooks/useAxiosGet';
import CoinStat from 'components/modal/statChange/CoinStatChange';

export default function WelcomeModal() {
  const setFirstVisited = useSetRecoilState(firstVisitedState);
  //const [coin, setCoin] = useState<CoinResult>();
  const beforeCoin = 3;
  const afterCoin = 3;
  const coinIncrement = 3;
  const content = {
    title: 'Welcome!',
    message:
      '42GG에 오신걸 환영합니다.\n당신의 행복한 탁구 생활을\n응원합니다! 총총총...',
  };

/*   useEffect(() => {
    getCoinHandler();
  }, []);

  const getCoinHandler = useAxiosGet({
    url: `/pingpong/users/attendance`,
    setState: setCoin,
    err: 'KP03',
    type: 'setError',
  }); */

  const openPageManual = () => {
    window.open(
      'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
    );
  };

  const closeModalBackdropHandler = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      setFirstVisited(false);
    }
  };

  const closeModalButtonHandler = () => {
    setFirstVisited(false);
  };

  return (
    <div
      className={modalStyles.backdrop}
      id='modalOutside'
      onClick={closeModalBackdropHandler}
    >
      <div className={styles.container}>
        <div className={styles.phrase}>
          <div className={styles.emoji}></div>
          <div className={styles.title}>{content.title}</div>
          <div className={styles.message}>{content.message}</div>
          {/* <CoinStat before={coin?.beforeCoin} after={coin?.afterCoin} /> */}
          <CoinStat before={beforeCoin} after={afterCoin} />
          {/* <CoinAnimation amount={coin?.coinIncrement}/> */}
          <CoinAnimation amount={coinIncrement}/>
        </div>
        <div className={styles.buttons}>
          <div className={styles.negative}>
            <input onClick={openPageManual} type='button' value='페이지 소개' />
          </div>
          <div className={styles.positive}>
            <input
              onClick={closeModalButtonHandler}
              type='button'
              value='출석하기'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
