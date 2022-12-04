import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, liveState } from 'utils/recoil/layout';
import {
  reloadMatchState,
  openCurrentMatchState,
  currentMatchState,
} from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { seasonListState } from 'utils/recoil/seasons';
import instance from 'utils/axios';
import Header from './Header';
import Footer from './Footer';
import CurrentMatch from './CurrentMatch';
import styles from 'styles/Layout/Layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [user, setUser] = useRecoilState(userState);
  const [live, setLive] = useRecoilState(liveState);
  const [openCurrentMatch, setOpenCurrentMatch] = useRecoilState(
    openCurrentMatchState
  );
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setSeasonList = useSetRecoilState(seasonListState);
  const setCurrentMatch = useSetRecoilState(currentMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const presentPath = useRouter().asPath;

  useEffect(() => {
    getUserHandler();
    getSeasonListHandler();
  }, []);

  const getSeasonListHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/seasonlist`);
      setSeasonList({ ...res?.data });
    } catch (e) {
      setError('DK02');
    }
  };

  useEffect(() => {
    setModal({ modalName: null });
  }, [presentPath]);

  useEffect(() => {
    if (user.intraId) {
      getLiveHandler();
      if (reloadMatch) setReloadMatch(false);
    }
  }, [presentPath, user, reloadMatch]);

  useEffect(() => {
    if (live?.event === 'match') setOpenCurrentMatch(true);
    else {
      if (live?.event === 'game') setModal({ modalName: 'FIXED-AFTER_GAME' });
      setCurrentMatch({
        slotId: 0,
        time: '',
        isMatched: false,
        myTeam: [],
        enemyTeam: [],
        mode: '',
      });
      setOpenCurrentMatch(false);
    }
  }, [live]);

  const getUserHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users`);
      setUser(res?.data);
    } catch (e) {
      setError('JB02');
    }
  };

  const getLiveHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/live`);
      setLive({ ...res?.data });
    } catch (e) {
      setError('JB03');
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <Header />
        <div className={styles.pageContent}>
          {openCurrentMatch && <CurrentMatch />}
          {openCurrentMatch && <div className={styles.blank}></div>}
          {user.isAdmin && (
            <div className={`${styles.buttonContainer} ${styles.trigger}`}>
              <button
                className={styles.fixedButton}
                onClick={() => setModal({ modalName: 'MENU-MATCHTRIGGER' })}
              >
                🛎️
              </button>
            </div>
          )}
          {presentPath !== '/match' && (
            <Link href='/match'>
              <div className={styles.buttonContainer}>
                <a className={styles.fixedButton}>🏓</a>
              </div>
            </Link>
          )}
          {children}
          <div className={styles.footerWrap}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
