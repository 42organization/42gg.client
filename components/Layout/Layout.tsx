import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserData, LiveData } from 'types/mainType';
import {
  menuBarState,
  notiBarState,
  userState,
  liveState,
  newLoginState,
} from 'utils/recoil/layout';
import { openCurrentMatchInfoState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import Header from './Header';
import Footer from './Footer';
import CurrentMatchInfo from './CurrentMatchInfo';
import Modal from 'components/modal/Modal';
import WelcomeModal from 'components/modal/WelcomeModal';
import InputScoreModal from 'components/modal/InputScoreModal';
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
  const newLogin = useRecoilValue(newLoginState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setOpenMenuBar = useSetRecoilState(menuBarState);
  const setOpenNotiBar = useSetRecoilState(notiBarState);
  const router = useRouter();
  const presentPath = router.asPath;

  useEffect(() => {
    getUserDataHandler();
  }, []);

  useEffect(() => {
    setOpenMenuBar(false);
    setOpenNotiBar(false);
  }, [presentPath]);

  useEffect(() => {
    if (userData.intraId) {
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
    } catch (e) {
      setErrorMessage('JB02');
    }
  };

  const getLiveDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLiveData(res?.data);
    } catch (e) {
      setErrorMessage('JB03');
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <div>
          <Header />
          {newLogin && (
            <Modal>
              <WelcomeModal />
            </Modal>
          )}
          {liveData.event === 'game' && (
            <Modal>
              <InputScoreModal />
            </Modal>
          )}
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
