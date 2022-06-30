import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { isEditProfileState, profileInfoState } from 'utils/recoil/user';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';

interface ProfileProps {
  intraId: string;
}

export default function Profile({ intraId }: ProfileProps) {
  const setIsEditProfile = useSetRecoilState(isEditProfileState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/users/${intraId}/detail`);
        setProfileInfo(res?.data);
      } catch (e) {
        console.log(e);
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
        <input
          type='button'
          className={styles.editButton}
          onClick={startEditHandler}
          value='edit'
        />
      </div>
    </div>
  );
}
