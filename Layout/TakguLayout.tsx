import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import { openCurrentMatchState } from 'utils/recoil/takgu/match';
import ErrorChecker from 'components/error/ErrorChecker';
import LoginChecker from 'components/LoginChecker';
import AdminReject from 'components/takgu/admin/AdminReject';
import AdminLayout from 'components/takgu/admin/Layout';
import CurrentMatch from 'components/takgu/Layout/CurrentMatch';
import Footer from 'components/takgu/Layout/Footer';
import Header from 'components/takgu/Layout/Header';
import HeaderStateContext from 'components/takgu/Layout/HeaderContext';
import MainPageProfile from 'components/takgu/Layout/MainPageProfile';
import Megaphone from 'components/takgu/Layout/MegaPhone';
import RecruitLayout from 'components/takgu/recruit/RecruitLayout';
import Statistics from 'pages/takgu/statistics';
import useAnnouncementCheck from 'hooks/takgu/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/takgu/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/takgu/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/takgu/Layout/useSetAfterGameModal';
import { useUser } from 'hooks/takgu/Layout/useUser';
import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/takgu/Layout/Layout.module.scss';
import AgendaFooter from '../components/agenda/Layout/AgendaFooter';
import AgendaHeader from '../components/agenda/Layout/AgendaHeader';
import AgendaUserLayout from '../components/agenda/Layout/AgendaUserLayout';
import PlayButton from '../components/takgu/Layout/PlayButton';
import UserLayout from '../components/takgu/Layout/UserLayout';
import ModalProvider from '../components/takgu/modal/ModalProvider';
import CustomizedSnackbars from '../components/takgu/toastmsg/toastmsg';

type TakguLayoutProps = {
  children: React.ReactNode;
};

function TakguLayout({ children }: TakguLayoutProps) {
  const user = useUser();
  const presentPath = useRouter().asPath;
  const openCurrentMatch = useRecoilValue(openCurrentMatchState);

  useAxiosResponse();
  useGetUserSeason(presentPath);
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);

  if (!user || !user.intraId) return null;

  switch (true) {
    case presentPath.includes('/takgu/admin'):
      if (!user.isAdmin) return <AdminReject />;
      return <AdminLayout>{children}</AdminLayout>;

    case presentPath.includes('/takgu/recruit'):
      return <RecruitLayout>{children}</RecruitLayout>;

    case presentPath === '/takgu/statistics' && user.isAdmin:
      return (
        <UserLayout>
          <Statistics />
        </UserLayout>
      );

    case presentPath.includes('/takgu'):
      return (
        <>
          <UserLayout>
            <HeaderStateContext>
              <Header />
            </HeaderStateContext>
            <PlayButton />
            <div className={styles.topInfo}>
              <Megaphone />
              {openCurrentMatch && <CurrentMatch />}
              {presentPath === '/' && <MainPageProfile />}
            </div>
            {children}
            <Footer />
          </UserLayout>
          <ModalProvider />
        </>
      );
    default:
      return <>{children}</>;
  }
}

const TakguAppLayout = ({ children }: TakguLayoutProps) => {
  return (
    <LoginChecker>
      <ErrorChecker>
        <QueryClientProvider client={new QueryClient()}>
          <TakguLayout>{children}</TakguLayout>
          <ModalProvider />
          <CustomizedSnackbars />
        </QueryClientProvider>
      </ErrorChecker>
    </LoginChecker>
  );
};

export default TakguAppLayout;
