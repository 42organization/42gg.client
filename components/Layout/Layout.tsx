import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { openCurrentMatchState } from 'utils/recoil/match';
import Statistics from 'pages/statistics';
import Header from './Header';
import Footer from './Footer';
import CurrentMatch from './CurrentMatch';
import AdminLayout from '../admin/Layout';
import AdminReject from '../admin/AdminReject';
import styles from 'styles/Layout/Layout.module.scss';
import useAxiosWithToast from 'hooks/useAxiosWithToast';

import useAnnouncementCheck from 'hooks/Layout/useAnnouncementCheck';
import useSetAfterGameModal from 'hooks/Layout/useSetAfterGameModal';
import useGetUserInfo from 'hooks/Layout/useGetUserInfo';
import useLiveCheck from 'hooks/Layout/useLiveCheck';
import HeaderStateContext from './HeaderContext';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useRecoilValue(userState);
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);
  const presentPath = useRouter().asPath;

  useAxiosWithToast();
  useGetUserInfo();
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);

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
                <HeaderStateContext>
                  <Header />
                </HeaderStateContext>
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
