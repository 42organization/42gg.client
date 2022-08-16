import Head from 'next/head';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import ErrorChecker from 'components/error/ErrorChecker';
import LoginChecker from 'components/LoginChecker';
import Layout from 'components/Layout/Layout';
import ModalProvider from 'components/modal/ModalProvider';
import AdminChecker from 'components/AdminChecker';
import * as gtag from 'lib/gtag';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>42gg</title>
      </Head>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_ID}`}
      />
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <RecoilRoot>
        <LoginChecker>
          <ErrorChecker>
            <AdminChecker>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ModalProvider />
            </AdminChecker>
          </ErrorChecker>
        </LoginChecker>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
