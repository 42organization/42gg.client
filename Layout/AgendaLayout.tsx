// import { useRouter } from 'next/router';
import AgendaModalProvider from 'components/agenda/modal/AgendaModalProvider';
import Footer from 'components/takgu/Layout/Footer';
import CustomizedSnackbars from 'components/toastmsg/toastmsg';
import { useUser } from 'hooks/agenda/Layout/useUser';
import styles from 'styles/agenda/Layout/Layout.module.scss';

type AgendaLayoutProps = {
  children: React.ReactNode;
};

function AgendaAppLayout({ children }: AgendaLayoutProps) {
  const user = useUser();

  if (!user || !user.intraId) return null;

  return (
    <>
      <div className={styles.background}>
        {children}
        <Footer />
      </div>
      <AgendaModalProvider />
      <CustomizedSnackbars />
    </>
  );
}

export default AgendaAppLayout;
