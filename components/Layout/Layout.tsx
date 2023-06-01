import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import Statistics from 'pages/statistics';
import Header from './Header';
import Footer from './Footer';
import AdminLayout from '../admin/Layout';
import AdminReject from '../admin/AdminReject';
import styles from 'styles/Layout/Layout.module.scss';

import useAnnouncementCheck from 'hooks/Layout/useAnnouncementCheck';
import useSetAfterGameModal from 'hooks/Layout/useSetAfterGameModal';
import useGetUserSeason from 'hooks/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/Layout/useLiveCheck';
import HeaderStateContext from './HeaderContext';
import MainPageProfile from './MainPageProfile';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useRecoilValue(userState);
  const presentPath = useRouter().asPath;

  useGetUserSeason();
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
                <MainPageProfile />
                {presentPath !== '/match' && presentPath !== '/manual' && (
                  <Link href='/match'>
                    <div className={styles.buttonContainer}>
                      <div className={styles.matchingButton}>🏓</div>
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
