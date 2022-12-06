import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
import { pageState, scrollState } from 'utils/recoil/myRank';

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
  const page = useRecoilValue(pageState);
  const [scroll, setScroll] = useRecoilState(scrollState);
  const setSeasonList = useSetRecoilState(seasonListState);
  const setCurrentMatch = useSetRecoilState(currentMatchState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const presentPath = useRouter().asPath;
  const topScroll = useRef<HTMLInputElement>(null);

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
    if (!scroll.myRank) topScroll.current?.scrollIntoView(true);
  }, [presentPath, page]);

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
        {openCurrentMatch && <CurrentMatch />}
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
          <div className={styles.buttonContainer}>
            <Link href='/match'>
              <a className={styles.fixedButton}>🏓</a>
            </Link>
          </div>
        )}
        <div className={styles.pageContent}>
          <div ref={topScroll}>
            {openCurrentMatch && <div className={styles.blank}></div>}
            {children}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
