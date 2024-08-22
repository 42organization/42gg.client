import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import ErrorChecker from 'components/error/ErrorChecker';
import LoginChecker from 'components/LoginChecker';
import Header from 'components/takgu/Layout/Header';
import HeaderStateContext from 'components/takgu/Layout/HeaderContext';
import ModalProvider from 'components/takgu/modal/ModalProvider';
import CustomizedSnackbars from 'components/toastmsg/toastmsg';
import LayoutProvider from 'Layout/LayoutProvider';
import * as gtag from 'lib/gtag';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 10, // 10분 동안은 캐시를 사용
        cacheTime: 60 * 1000 * 10, // 20분 동안 캐시를 유지
        retry: 1, // 에러가 났을 때 1번 재시도
        refetchOnMount: false,
      },
    },
  });

  useEffect(() => {
    const handleRouteChange = (url: string) => {
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
        <LoginChecker>
          <ErrorChecker>
            <QueryClientProvider client={queryClient} contextSharing={true}>
              <LayoutProvider>
                <HeaderStateContext>
                  <Header />
                </HeaderStateContext>
                <Component {...pageProps} />
              </LayoutProvider>
              <CustomizedSnackbars />
            </QueryClientProvider>
          </ErrorChecker>
        </LoginChecker>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
