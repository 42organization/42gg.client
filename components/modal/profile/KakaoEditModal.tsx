import router from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import styles from 'styles/modal/menu/KakaoEditModal.module.scss';

type UserType = 'kakao' | 'fortyTwo' | 'both' | '';

export default function KakaoEditModal() {
  const [userType, setUserType] = useState<UserType>('');
  const setError = useSetRecoilState<string>(errorState);

  const userTypeHandler = async () => {
    try {
      const res = await instance.get('/pingpong/users/oauth');
      setUserType(res.data.oauthType);
    } catch (e: any) {
      setError('SW04');
    }
  };

  useEffect(() => {
    userTypeHandler();
  }, []);

  const clickLinkHandler = () => {
    if (userType === 'fortyTwo') {
      router.push(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/kakao`
      );
    } else if (userType === 'kakao') {
      router.push(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/oauth2/authorization/42`
      );
    }
    setUserType('both');
  };

  const clickUnlinkHandler = async () => {
    try {
      await instance.delete('/pingpong/users/oauth/kakao');
      alert('카카오톡 연동이 해제되었습니다.');
      setUserType('fortyTwo');
    } catch (e: any) {
      alert('카카오톡 연동 해제에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        {userType === 'kakao' ? '42 intra 연동' : '카카오톡 연동'}
      </div>
      <div className={styles.buttons}>
        <button onClick={clickLinkHandler} disabled={userType === 'both'}>
          연동하기
        </button>
        <button onClick={clickUnlinkHandler} disabled={userType !== 'both'}>
          연동 해제하기
        </button>
      </div>
    </div>
  );
}
