import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorChecker from 'components/error/ErrorChecker';
import LoginChecker from 'components/LoginChecker';
import Footer from 'components/takgu/Layout/Footer';
import useAnnouncementCheck from 'hooks/takgu/Layout/useAnnouncementCheck';
import useGetUserSeason from 'hooks/takgu/Layout/useGetUserSeason';
import useLiveCheck from 'hooks/takgu/Layout/useLiveCheck';
import useSetAfterGameModal from 'hooks/takgu/Layout/useSetAfterGameModal';
import { useUser } from 'hooks/takgu/Layout/useUser';
import useAxiosResponse from 'hooks/useAxiosResponse';
import ModalProvider from '../components/takgu/modal/ModalProvider';
import CustomizedSnackbars from '../components/takgu/toastmsg/toastmsg';

type AgendaLayoutProps = {
  children: React.ReactNode;
};

function AgendaAppLayout({ children }: AgendaLayoutProps) {
  const user = useUser();
  const presentPath = useRouter().asPath;

  useAxiosResponse();
  useGetUserSeason(presentPath);
  useSetAfterGameModal();
  useLiveCheck(presentPath);
  useAnnouncementCheck(presentPath);

  if (!user || !user.intraId) return null;
  return (
    <>
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
    </>
  );
}

// const AgendaAppLayout = () => (
//   <LoginChecker>
//     <ErrorChecker>
//       <QueryClientProvider client={new QueryClient()}>
//         <>{AgendaLayout}</>
//         <ModalProvider />
//         <CustomizedSnackbars />
//       </QueryClientProvider>
//     </ErrorChecker>
//   </LoginChecker>
// );

export default AgendaAppLayout;
