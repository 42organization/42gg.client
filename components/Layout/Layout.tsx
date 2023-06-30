import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { colorModeState } from 'utils/recoil/colorMode';
import { loginState } from 'utils/recoil/login';
import { userState } from 'utils/recoil/layout';
import { openCurrentMatchState } from 'utils/recoil/match';
import Statistics from 'pages/statistics';
import Header from './Header';
import Footer from './Footer';
import AdminLayout from '../admin/Layout';
import AdminReject from '../admin/AdminReject';
import HeaderStateContext from './HeaderContext';
import StyledButton from 'components/StyledButton';
import MainPageProfile from './MainPageProfile';
import CurrentMatch from './CurrentMatch';
import useAnnouncementCheck from 'hooks/Layout/useAnnouncementCheck';
import useSetAfterGameModal from 'hooks/Layout/useSetAfterGameModal';
import useGetUserSeason from 'hooks/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/Layout/useLiveCheck';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/Layout/Layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useRecoilValue(userState);
  const colorMode = useRecoilValue(colorModeState);
  const presentPath = useRouter().asPath;
  const router = useRouter();
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);

  useAxiosResponse();
  useGetUserSeason();
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);
  const onClickMatch = () => {
    router.replace('/');
    router.push(`/match`);
  };

  return presentPath.includes('/admin') ? (
    user.isAdmin ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <AdminReject />
    )
  ) : (
    <div className={styles.appContainer}>
      <div
        className={`${styles.background} ${styles[colorMode.toLowerCase()]}`}
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
                    <div className={styles.buttonWrapper}>
                      <StyledButton onClick={onClickMatch} width={'5.5rem'}>
                        Play
                      </StyledButton>
                    </div>
                  </div>
                )}
                <div className={styles.topInfo}>
                  {openCurrentMatch && <CurrentMatch />}
                  {presentPath === '/' && <MainPageProfile />}
                </div>
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
