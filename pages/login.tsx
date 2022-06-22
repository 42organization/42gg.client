import React from 'react';

function Login() {
  return (
    <>
      <div> 4 2 A R C A D E </div>
      <a
        href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`}
      >
        <button>로그인</button>
      </a>
    </>
  );
}

export default Login;
