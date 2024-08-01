// import { useRouter } from 'next/router';
import Footer from 'components/takgu/Layout/Footer';
import { useUser } from 'hooks/agenda/Layout/useUser';
import styles from 'styles/agenda/Layout/Layout.module.scss';

type AgendaLayoutProps = {
  children: React.ReactNode;
};

function AgendaAppLayout({ children }: AgendaLayoutProps) {
  const user = useUser();
  // const presentPath = useRouter().asPath;

  // useAxiosResponse();

  console.log(user);
  if (!user || !user.intraId) return null;
  return (
    <div className={styles.background}>
      {children}
      <Footer />
    </div>
  );
}

export default AgendaAppLayout;
