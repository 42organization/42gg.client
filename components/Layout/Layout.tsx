import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState, liveState } from '../../utils/recoil/main';
import { UserData, LiveData } from '../../types/mainType';
import Modal from '../modal/Modal';
import InputScore from '../modal/InputScore';
import CurrentMatchInfo from './CurrentMatchInfo';
import Header from './Header';
import Footer from './Footer';
import instance from '../../utils/axios';
import { RiPingPongFill } from 'react-icons/ri';
import Login from '../../pages/login';
import { loginState } from '../../utils/recoil/login';
import styles from '../../styles/Layout/Layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [liveData, setLiveData] = useRecoilState<LiveData>(liveState);
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
              <InputScore />
            </Modal>
          )}
          {liveData.event === 'match' && <CurrentMatchInfo />}
          {presentPath !== '/match' && (
            <Link href='/match'>
              <a className={styles.matchingButton}>🏓</a>
            </Link>
          )}
          {children}
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
