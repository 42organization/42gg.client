import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { colorModeState } from 'utils/recoil/colorMode';
import { userState } from 'utils/recoil/layout';
import { openCurrentMatchState } from 'utils/recoil/match';
import StyledButton from 'components/StyledButton';
import Statistics from 'pages/statistics';
import useAnnouncementCheck from 'hooks/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/Layout/useSetAfterGameModal';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/Layout/Layout.module.scss';
import CurrentMatch from './CurrentMatch';
import Footer from './Footer';
import Header from './Header';
import HeaderStateContext from './HeaderContext';
import MainPageProfile from './MainPageProfile';
import Megaphone from './MegaPhone';
import AdminReject from '../admin/AdminReject';
import AdminLayout from '../admin/Layout';

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
  useGetUserSeason(presentPath);
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath, user);

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
                {presentPath !== '/match' &&
                  presentPath !== '/manual' &&
                  presentPath !== '/store' && (
                    <div className={styles.buttonContainer}>
                      <div className={styles.buttonWrapper}>
                        <StyledButton onClick={onClickMatch} width={'5.5rem'}>
                          Play
                        </StyledButton>
                      </div>
                    </div>
                  )}
                <div className={styles.topInfo}>
                  <Megaphone />
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
