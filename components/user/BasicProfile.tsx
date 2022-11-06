import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { profileState } from 'utils/recoil/user';
import { userState } from 'utils/recoil/layout';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import fallBack from 'public/image/fallBackSrc.jpeg';
import styles from 'styles/user/Profile.module.scss';

interface ProfileProps {
  intraId: string;
}

export default function BasicProfile({ intraId }: ProfileProps) {
  const user = useRecoilValue(userState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/users/${intraId}/detail`);
        setProfile(res?.data);
        setImgError(false);
      } catch (e) {
        console.log(e.response.data.code);
        setError('SJ03');
      }
    })();
  }, [intraId]);

  const {
    userImageUri,
    racketType,
    statusMessage,
    level,
    currentExp,
    maxExp,
    expRate,
  } = profile;

  const startEditHandler = () => {
    setModal({ modalName: 'USER-PROFILE_EDIT' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.userImage}>
          <div>
            {userImageUri && (
              <Image
                src={imgError ? fallBack : userImageUri}
                alt='prfImg'
                layout='fill'
                objectFit='cover'
                sizes='30vw'
                quality='30'
                unoptimized={imgError}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>
        <div className={styles.levelRacketWrap}>
          <div className={styles.level}>Lv. {level}</div>
          <div className={styles.exp}>
            <div className={styles.expRate}>
              {currentExp} / {maxExp}
            </div>
            <div className={styles.bar}>
              <span
                className={styles.expCurrent}
                style={{ width: `${expRate}%` }}
              ></span>
              <span
                className={styles.expLeft}
                style={{ width: `${100 - expRate}%` }}
              ></span>
            </div>
          </div>
          <div className={styles.racket}>{racketType.toUpperCase()}</div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.statusMessage}>
          <div className={styles.messaage}>
            {user.intraId === intraId && statusMessage.length === 0
              ? '상태메시지를 입력해보세요!'
              : statusMessage}
          </div>
          <div className={styles.buttons}>
            {user.intraId === intraId && (
              <div className={styles.positive}>
                <input type='button' onClick={startEditHandler} value='edit' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
