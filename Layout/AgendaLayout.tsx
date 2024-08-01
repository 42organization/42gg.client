// import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorChecker from 'components/error/AgendaErrorChecker';
import LoginChecker from 'components/LoginChecker';
import Footer from 'components/takgu/Layout/Footer';
import { useUser } from 'hooks/agenda/Layout/useUser';
// import useAxiosResponse from 'hooks/useAxiosResponse';
import styles from 'styles/agenda/Layout/Layout.module.scss';
import ModalProvider from '../components/takgu/modal/ModalProvider';
import CustomizedSnackbars from '../components/takgu/toastmsg/toastmsg';

type AgendaLayoutProps = {
  children: React.ReactNode;
};

function AgendaAppLayout({ children }: AgendaLayoutProps) {
  const user = useUser();
  // const presentPath = useRouter().asPath;

  // useAxiosResponse();
  // useGetUserSeason(presentPath);
  // useSetAfterGameModal();
  // useLiveCheck(presentPath);
  // useAnnouncementCheck(presentPath);

  console.log(user);
  if (!user || !user.intraId) return null;
  return (
    <div className={styles.background}>
      <LoginChecker>
        <ErrorChecker>
          <QueryClientProvider client={new QueryClient()}>
            {children}
            <Footer />
            <ModalProvider />
            <CustomizedSnackbars />
          </QueryClientProvider>
        </ErrorChecker>
      </LoginChecker>
    </div>
  );
}

export default AgendaAppLayout;
