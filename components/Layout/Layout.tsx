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
    if (userData.intraId || matchRefreshBtn) {
      getLiveDataHandler();
    }
  }, [presentPath, userData, matchRefreshBtn]);

  useEffect(() => {
    if (liveData?.event === 'match') setOpenCurrentInfo(true);
    else {
      if (liveData?.event === 'game')
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
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLiveData(res?.data);
      if (matchRefreshBtn) setMatchRefreshBtn(false);
    } catch (e) {
      setErrorMessage('JB03');
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <div>
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
        </div>
      </div>
    </div>
  );
}
