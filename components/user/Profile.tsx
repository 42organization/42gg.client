import { isEditProfileState, profileInfoState } from 'utils/recoil/user';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const setIsEditProfile = useSetRecoilState(isEditProfileState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/users/${userId}/detail`);
        setProfileInfo(res?.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userId]);

  const {
    userImageUri,
    rank,
    ppp,
    wins,
    loses,
    winRate,
    racketType,
    statusMessage,
  } = profileInfo;

  const startEditHandler = () => {
    setIsEditProfile(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.scoreInfo}>
          <div className={styles.rank}>{rank}00</div>
          <div className={styles.pppAndracketType}>
            <div className={styles.ppp}>{ppp}점</div>{' '}
            <div className={styles.racketType}>{racketType.toUpperCase()}</div>
          </div>
        </div>
        <div className={styles.statusMessage}>{statusMessage}</div>
        <div>
          <span>승률 {winRate}</span>
          <span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.rightSide}>
          <div className={styles.image}></div>
          <div className={styles.userId}>{userId}</div>
        </div>
        <button onClick={startEditHandler}>수정</button>
      </div>
    </div>
  );
}
