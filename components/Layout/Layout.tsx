import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { UserData, LiveData } from 'types/mainType';
import { userState, liveState } from 'utils/recoil/layout';
import {
  matchRefreshBtnState,
  openCurrentMatchInfoState,
} from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import Header from './Header';
import Footer from './Footer';
import CurrentMatchInfo from './CurrentMatchInfo';
import instance from 'utils/axios';
import styles from 'styles/Layout/Layout.module.scss';
import Statistics from 'pages/statistics';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [liveData, setLiveData] = useRecoilState<LiveData>(liveState);
  const [openCurrentInfo, setOpenCurrentInfo] = useRecoilState<boolean>(
    openCurrentMatchInfoState
  );
  const [matchRefreshBtn, setMatchRefreshBtn] =
    useRecoilState(matchRefreshBtnState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
  const presentPath = useRouter().asPath;

  useEffect(() => {
    getUserDataHandler();
  }, []);

  useEffect(() => {
    setModalInfo({ modalName: null }); // TODO 내가 왜 이렇게 짰을까... 왜 여기서...? layout 에서 하면 안돼..?
  }, [presentPath]);

  useEffect(() => {
    if (userData.intraId || matchRefreshBtn) {
      getLiveDataHandler();
    }
  }, [presentPath, userData, matchRefreshBtn]);

  useEffect(() => {
    if (liveData?.event === 'match') setOpenCurrentInfo(true);
    else {
      if (liveData?.event === 'game' && liveData?.mode === 'rank')
        setModalInfo({ modalName: 'FIXED-INPUT_SCORE' });
      setOpenCurrentInfo(false);
    }
  }, [liveData]);

  const getUserDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users`);
      setUserData({ ...res?.data, mode: 'normal' }); // 임시
    } catch (e) {
      setErrorMessage('JB02');
    }
  };

  const getLiveDataHandler = async () => {
    // TODO matchRefreshBtn 을 사용하지 말고 getAPIData 함수들을 한곳에 모아둔 다음에 가져다가 사용하는게 어떨까?
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLiveData({ ...res?.data, mode: 'normal' }); // 임시
      if (matchRefreshBtn) setMatchRefreshBtn(false); // TODO 여기서 할 필요 없이 41번째 줄에서 하면 안되나?
    } catch (e) {
      setErrorMessage('JB03');
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <div>
          {presentPath === '/statistics' && userData.isAdmin ? (
            <Statistics />
          ) : (
            userData.intraId && (
              <>
                <Header />
                {openCurrentInfo && <CurrentMatchInfo />}
                {presentPath !== '/match' && presentPath !== '/manual' && (
                  <Link href='/match'>
                    <div className={styles.buttonContainer}>
                      <a className={styles.matchingButton}>🏓</a>
                    </div>
                  </Link>
                )}
                {children}
                <Footer />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
