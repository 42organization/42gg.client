import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import ErrorChecker from 'components/error/ErrorChecker';
import LoginChecker from 'components/LoginChecker';
import CustomizedSnackbars from 'components/takgu/toastmsg/toastmsg';
import * as gtag from 'lib/gtag';
import 'styles/globals.css';
import LayoutProvider from '../Layout/LayoutProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

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
        {router.pathname.startsWith('/agenda') && (
          <link rel='stylesheet' href='/styles/reset.css' />
        )}
      </Head>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_ID}`}
      />
      <Script
        id='gtag-script'
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
        {/* <LoginChecker>
          <ErrorChecker> */}
        <QueryClientProvider client={queryClient}>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
          {/* <ModalProvider /> */}
          <CustomizedSnackbars />
        </QueryClientProvider>
        {/* </ErrorChecker>
        </LoginChecker> */}
      </RecoilRoot>
    </>
  );
}

export default MyApp;
