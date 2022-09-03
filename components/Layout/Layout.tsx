import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, liveState } from 'utils/recoil/layout';
import {
  matchRefreshBtnState,
  openCurrentMatchInfoState,
} from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { seasonState } from 'utils/recoil/seasons';
import Header from './Header';
import Footer from './Footer';
import CurrentMatchInfo from './CurrentMatchInfo';
import instance from 'utils/axios';
import styles from 'styles/Layout/Layout.module.scss';
import Statistics from 'pages/statistics';
import axios from 'axios';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [userData, setUserData] = useRecoilState(userState);
  const [liveData, setLiveData] = useRecoilState(liveState);
  const [openCurrentInfo, setOpenCurrentInfo] = useRecoilState(
    openCurrentMatchInfoState
  );
  const [matchRefreshBtn, setMatchRefreshBtn] =
    useRecoilState(matchRefreshBtnState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
  const presentPath = useRouter().asPath;
  const setSeasonList = useSetRecoilState(seasonState);

  useEffect(() => {
    getUserDataHandler();
    getSeasonListHandler();
  }, []);

  const getSeasonListHandler = async () => {
    try {
      // const res = await instance.get(`/pingpong/seasonlist`);
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/seasonlist`
      ); // api 연결 후 삭제 예정
      setSeasonList(res?.data);
    } catch (e) {}
  };

  useEffect(() => {
    setModalInfo({ modalName: null });
  }, [presentPath]);

  useEffect(() => {
    if (userData.intraId) {
      getLiveDataHandler();
      if (matchRefreshBtn) setMatchRefreshBtn(false);
    }
  }, [presentPath, userData, matchRefreshBtn]);

  useEffect(() => {
    if (liveData?.event === 'match') setOpenCurrentInfo(true);
    else {
      if (liveData?.event === 'game')
        setModalInfo({ modalName: 'FIXED-AFTER_GAME' });
      setOpenCurrentInfo(false);
    }
  }, [liveData]);

  const getUserDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users`);
      setUserData({ ...res?.data, mode: 'normal' }); // 임시
      //setUserData({ ...res?.data, mode: 'rank' }); // 임시
    } catch (e) {
      setErrorMessage('JB02');
    }
  };

  const getLiveDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLiveData({ ...res?.data, mode: 'normal' }); // 임시
      //setLiveData({ ...res?.data, mode: 'rank' }); // 임시
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
