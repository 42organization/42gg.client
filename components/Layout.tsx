import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { RiPingPongFill } from 'react-icons/ri';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const presentPath = router.asPath;

  return (
    <>
      <Header />
      {presentPath !== '/match' && (
        <Link href="/match">
          <a className="matchingButton">
            <RiPingPongFill />
          </a>
        </Link>
      )}
      {children}
      <Footer />
    </>
  );
}
