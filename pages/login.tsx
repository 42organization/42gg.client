// import { Link } from 'react-router-dom';
// import { TopBar, PageName, Squares } from 'styles/styled';
// import {
//   AppContainer,
//   PageContainer,
//   ContentContainer,
//   SeoulImg,
//   TextWrap,
//   LoginButtonWrap,
// } from './styled';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { loginState } from '../utils/recoil/login';
import { useRouter } from 'next/router';

function Login() {
  // const isLoggedIn = useRecoilValue(loginState);
  // const router = useRouter();

  // if (isLoggedIn) router.push(`/`);
  return (
    <>
      <div> 4 2 A R C A D E </div>
      <a href={`http://211.253.28.235:9090/oauth2/authorization/42`}>
        <button>로그인</button>
      </a>
    </>
  );
}

export default Login;
