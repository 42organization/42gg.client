import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, liveState } from 'utils/recoil/layout';
import { reloadMatchState, openCurrentMatchState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { seasonListState } from 'utils/recoil/seasons';
import instance from 'utils/axios';
import Statistics from 'pages/statistics';
import Header from './Header';
import Footer from './Footer';
import CurrentMatch from './CurrentMatch';
import AdminLayout from '../admin/Layout';
import AdminReject from '../admin/AdminReject';
import styles from 'styles/Layout/Layout.module.scss';
import useAxiosWithToast from 'hooks/useAxiosWithToast';

import HeaderInfoContext from './HeaderContext';

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
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const presentPath = useRouter().asPath;
  const announcementTime = localStorage.getItem('announcementTime');

  useAxiosWithToast();

  useEffect(() => {
    getUserHandler();
    getSeasonListHandler();
  }, []);

  const getAnnouncementHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/announcement`);
      res.data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: res.data,
        });
    } catch (e) {
      setError('RJ01');
    }
  };
  const getSeasonListHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/seasonlist`);
      setSeasonList({ ...res?.data });
    } catch (e) {
      setError('DK02');
    }
  };

  useEffect(() => {
    if (presentPath === '/') {
      if (
        !announcementTime ||
        Date.parse(announcementTime) < Date.parse(new Date().toString())
      )
        getAnnouncementHandler();
    } else setModal({ modalName: null });
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

  return presentPath.includes('/admin') ? (
    user.isAdmin ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <AdminReject />
    )
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <div>
          {presentPath === '/statistics' && user.isAdmin ? (
            <Statistics />
          ) : (
            user.intraId && (
              <>
                <HeaderInfoContext>
                  <Header />
                </HeaderInfoContext>
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
