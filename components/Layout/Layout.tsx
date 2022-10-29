import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, liveState } from 'utils/recoil/layout';
import {
  matchRefreshBtnState,
  openCurrentMatchState,
} from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { seasonListState } from 'utils/recoil/seasons';
import instance from 'utils/axios';
import Statistics from 'pages/statistics';
import Header from './Header';
import Footer from './Footer';
import CurrentMatch from './CurrentMatch';
import styles from 'styles/Layout/Layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const [userLive, setUserLive] = useRecoilState(liveState);
  const [openCurrentMatch, setOpenCurrentMatch] = useRecoilState(
    openCurrentMatchState
  );
  const [matchRefreshBtn, setMatchRefreshBtn] =
    useRecoilState(matchRefreshBtnState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const presentPath = useRouter().asPath;
  const setSeasonList = useSetRecoilState(seasonListState);

  useEffect(() => {
    getUserHandler();
    getSeasonListHandler();
  }, []);

  const getSeasonListHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/seasonlist`);
      setSeasonList(res?.data);
    } catch (e) {
      setErrorMessage('DK02');
    }
  };

  useEffect(() => {
    setModal({ modalName: null });
  }, [presentPath]);

  useEffect(() => {
    if (user.intraId) {
      getLiveDataHandler();
      if (matchRefreshBtn) setMatchRefreshBtn(false);
    }
  }, [presentPath, user, matchRefreshBtn]);

  useEffect(() => {
    if (userLive?.event === 'match') setOpenCurrentMatch(true);
    else {
      if (userLive?.event === 'game')
        setModal({ modalName: 'FIXED-AFTER_GAME' });
      setOpenCurrentMatch(false);
    }
  }, [userLive]);

  const getUserHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users`);
      setUser({ ...res?.data });
    } catch (e) {
      setErrorMessage('JB02');
    }
  };

  const getLiveDataHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setUserLive({ ...res?.data });
    } catch (e) {
      setErrorMessage('JB03');
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <div>
          {presentPath === '/statistics' && user.isAdmin ? (
            <Statistics />
          ) : (
            user.intraId && (
              <>
                <Header />
                {openCurrentMatch && <CurrentMatch />}
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
