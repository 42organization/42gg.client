import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { profileState } from 'utils/recoil/user';
import { userState } from 'utils/recoil/layout';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/user/Profile.module.scss';

interface ProfileProps {
  profileId: string;
}

export default function BasicProfile({ profileId }: ProfileProps) {
  const user = useRecoilValue(userState);
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [
    {
      intraId,
      userImageUri,
      racketType,
      statusMessage,
      level,
      currentExp,
      maxExp,
      expRate,
    },
    setProfile,
  ] = useRecoilState(profileState);
  const MAX_LEVEL = 42;

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users/${profileId}/detail`);
      setProfile(res?.data);
    } catch (e) {
      setError('SJ03');
    }
  };

  const startEditHandler = () => {
    setModal({ modalName: 'USER-PROFILE_EDIT' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        {intraId && (
          <PlayerImage src={userImageUri} styleName={'profile'} size={30} />
        )}
        <div className={styles.levelRacketWrap}>
          <div className={styles.level}>Lv. {level}</div>
          <div className={styles.exp}>
            <div className={styles.expRate}>
              {level !== MAX_LEVEL
                ? `EXP : ${currentExp} / ${maxExp}`
                : `EXP : ${currentExp} / Max Exp`}
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
            {user.intraId === profileId && statusMessage.length === 0
              ? '상태메시지를 입력해보세요!'
              : statusMessage}
          </div>
          <div className={styles.buttons}>
            {user.intraId === profileId && (
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
