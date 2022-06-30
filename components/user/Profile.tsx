import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { isEditProfileState, profileInfoState } from 'utils/recoil/user';
import { userState } from 'utils/recoil/main';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';

interface ProfileProps {
  intraId: string;
}

export default function Profile({ intraId }: ProfileProps) {
  const userData = useRecoilValue(userState);
  const setIsEditProfile = useSetRecoilState(isEditProfileState);
  const setErrorMessage = useSetRecoilState(errorState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/users/${intraId}/detail`);
        setProfileInfo(res?.data);
      } catch (e) {
        setErrorMessage('Profile Error');
      }
    })();
  }, [intraId]);

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
          <div className={styles.rank}>{rank}</div>
          <div className={styles.pppAndracketType}>
            <div className={styles.ppp}>{ppp}점</div>{' '}
            <div className={styles.racketType}>{racketType.toUpperCase()}</div>
          </div>
        </div>
        <div className={styles.winRate}>
          <div className={styles.winRateStr}>승률 {winRate}</div>
          <div className={styles.winRateBar}>
            <div
              style={{ width: `${parseInt(winRate)}%` }}
              className={styles.wins}
            ></div>
            <div
              className={styles.loses}
              style={{ width: `${100 - parseInt(winRate)}%` }}
            ></div>
          </div>
        </div>
        <div className={styles.statusMessage}>{statusMessage}</div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.rightTopSide}>
          <div className={styles.image}></div>
          <div className={styles.intraId}>{intraId}</div>
        </div>
        {userData.intraId === intraId && (
          <input
            type='button'
            className={styles.editButton}
            onClick={startEditHandler}
            value='edit'
          />
        )}
      </div>
    </div>
  );
}
