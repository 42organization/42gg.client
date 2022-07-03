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
        // setErrorMessage('Profile Error'); // CORS 에러로 인한 일시적 주석처리. 본 서버 연동 후 해제 예정.
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
      <div className={styles.top}>
        <div className={styles.gameInfo}>
          <div className={styles.rank}>
            <span>순위</span>
            <span>{rank}</span>
          </div>
          <div className={styles.pppRacketWrap}>
            <div className={styles.ppp}>{ppp}점</div>
            <div className={styles.racketType}>{racketType.toUpperCase()}</div>
          </div>
          <div className={styles.winRate}>
            <div className={styles.winRateStr}>
              <span>승률 </span>
              <span>{winRate}</span>
            </div>
            <div className={styles.winRateBar}>
              <span
                className={styles.wins}
                style={{ width: `${parseInt(winRate)}%` }}
              ></span>
              <span
                className={styles.loses}
                style={{ width: `${100 - parseInt(winRate)}%` }}
              ></span>
            </div>
          </div>
        </div>
        <div className={styles.playerInfo}>
          <div className={styles.image}></div>
          <div className={styles.intraId}>{intraId}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.statusMessage}>
          <div className={styles.messaage}>{statusMessage}</div>
          <div className={styles.buttons}>
            {userData.intraId === intraId && (
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
