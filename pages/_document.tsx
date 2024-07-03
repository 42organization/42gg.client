import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/image/takgu/favicon.png' />
        <link rel='shortcut icon' href='/image/takgu/favicon.png' />
        <link rel='apple-touch-icon' href='/image/takgu/favicon.png' />
        <meta name='author' content='개발자국' />
        <meta name='description' content='42좋은 42서울인을 위한 탁구 생활' />
        <meta name='keywords' content='42gg, 42GG, 42gg.kr, 42seoul, 42서울' />
        <meta property='og:url' content='https://42gg.kr/' />
        <meta property='og:title' content='42gg' />
        <meta
          property='og:description'
          content='42좋은 42서울인을 위한 탁구 생활'
        />
        <meta property='og:site_name' content='42gg' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/image/takgu/meta_image.png' />
        <meta property='og:image:width' content='600' />
        <meta property='og:image:height' content='315' />
        <meta property='og:locale' content='ko_KR' />
        <meta
          httpEquiv='Cache-Control'
          content='no-cache, no-store, must-revalidate'
        />
        <meta httpEquiv='Pragma' content='no-cache' />
        <meta httpEquiv='Expires' content='0' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
