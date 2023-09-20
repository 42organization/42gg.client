import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { colorModeState } from 'utils/recoil/colorMode';
import { openCurrentMatchState } from 'utils/recoil/match';
import AdminReject from 'components/admin/AdminReject';
import AdminLayout from 'components/admin/Layout';
import CurrentMatch from 'components/Layout/CurrentMatch';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import HeaderStateContext from 'components/Layout/HeaderContext';
import MainPageProfile from 'components/Layout/MainPageProfile';
import Megaphone from 'components/Layout/MegaPhone';
import StyledButton from 'components/StyledButton';
import Statistics from 'pages/statistics';
import useAnnouncementCheck from 'hooks/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/Layout/useSetAfterGameModal';
import { useUser } from 'hooks/Layout/useUser';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/Layout/Layout.module.scss';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useUser();
  const colorMode = useRecoilValue(colorModeState);
  const presentPath = useRouter().asPath;
  const router = useRouter();
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);

  useAxiosResponse();
  useGetUserSeason(presentPath);
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);

  const onClickMatch = () => {
    router.replace('/');
    router.push(`/match`);
  };

  if (!user) return null;

  return presentPath.includes('/admin') ? (
    user.isAdmin ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <AdminReject />
    )
  ) : (
    <div className={styles.appContainer}>
      <div
        className={`${styles.background} ${
          colorMode ? styles[colorMode.toLowerCase()] : styles.basic
        } `}
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
