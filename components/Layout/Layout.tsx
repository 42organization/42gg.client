import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import instance from 'utils/axios';
import { userState, liveState } from 'utils/recoil/main';
import { currentMatchInfoState } from 'utils/recoil/match';
import { loginState } from 'utils/recoil/login';
import { UserData, LiveData } from 'types/mainType';
import Login from 'pages/login';
import Header from './Header';
import Footer from './Footer';
import CurrentMatchInfo from './CurrentMatchInfo';
import Modal from 'components/modal/Modal';
import InputScoreModal from 'components/modal/InputScoreModal';
import styles from 'styles/Layout/Layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [liveData, setLiveData] = useRecoilState<LiveData>(liveState);
  const [openCurrentInfo, setOpenCurrentInfo] = useRecoilState<boolean>(
    currentMatchInfoState
  );
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const presentPath = useRouter().asPath;
  const router = useRouter();
  const token = router.asPath.split('?token=')[1];

  useEffect(() => {
    if (token) localStorage.setItem('42gg-token', token);
    if (localStorage.getItem('42gg-token')) {
      setIsLoggedIn(true);
      getUserDataHandler();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (router.asPath.includes('token')) {
      router.push(`/`);
    }
  }, [token]);

  useEffect(() => {
    if (userData.userId) {
      getLiveDataHandler();
    }
  }, [presentPath, userData]);

  useEffect(() => {
    if (liveData?.event === 'match') setOpenCurrentInfo(true);
    else setOpenCurrentInfo(false);
  }, [liveData]);

  const getUserDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users`);
      setUserData(res?.data);
    } catch (e) {}
  };

  const getLiveDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLiveData(res?.data);
    } catch (e) {}
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div className={styles.mainContent}>
          <Header />
          {liveData.event === 'game' && (
            <Modal>
              <InputScoreModal />
            </Modal>
          )}
          {openCurrentInfo && <CurrentMatchInfo />}
          {presentPath !== '/match' && (
            <Link href='/match'>
              <a className={styles.matchingButton}>🏓</a>
            </Link>
          )}
          {children}
          <Footer />
        </div>
      ) : (
        <>{!isLoading && <Login />}</>
      )}
    </div>
  );
}
