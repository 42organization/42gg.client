import { Html, Head, Main, NextScript } from 'next/document';
// 공통적으로 적용할 HTML 마크업 중심
// 꼭 <Html>, <Head>, <Main>, <NextScript> 요소를 리턴해줘야 함
// 언제나 서버에서 실행되므로 브라우저 api 또는 이벤트 핸들러가 포함된 코드는 실행되지 않음

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/image/pingpong.png' />
        <link rel='shortcut icon' href='/image/pingpong.png' />
        <link rel='apple-touch-icon' href='/image/pingpong.png' />
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
        <meta property='og:image' content='/image/meta_logo.png' />
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
