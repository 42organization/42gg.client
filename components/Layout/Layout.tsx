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
import StyledButton from 'components/StyledButton';

import useModeToggle from 'hooks/mode/useModeToggle';
import { useEffect } from 'react';
type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useRecoilValue(userState);
  const presentPath = useRouter().asPath;
  const router = useRouter();
  const { Mode, setMode } = useModeToggle();

  useGetUserSeason();
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);
  const onClickMatch = () => {
    router.replace('/');
    router.push(`/match`);
  };

  useEffect(() => {
    setMode('RANK');
  }, [router]);

  return presentPath.includes('/admin') ? (
    user.isAdmin ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <AdminReject />
    )
  ) : (
    <div className={styles.appContainer}>
      <div
        className={`${styles.background} ${Mode === 'NORMAL' && styles.normal}`}
      >
        <div>
          {presentPath === '/statistics' && user.isAdmin ? (
            <Statistics />
          ) : (
            user.intraId && (
              <>
                <HeaderStateContext>
                  <Header />
                </HeaderStateContext>
                {presentPath !== '/match' && presentPath !== '/manual' && (
                  <div className={styles.buttonContainer}>
                    <StyledButton onClick={onClickMatch} width={'5.5rem'}>
                      Play
                    </StyledButton>
                  </div>
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
