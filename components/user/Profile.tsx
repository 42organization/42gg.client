import Image from 'next/image';
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { profileInfoState } from 'utils/recoil/user';
import { userState } from 'utils/recoil/layout';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';

interface ProfileProps {
  intraId: string;
  isRank?: boolean;
}

export default function Profile({ intraId, isRank }: ProfileProps) {
  const userData = useRecoilValue(userState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setModalInfo = useSetRecoilState(modalState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/users/${intraId}/detail`);
        setProfileInfo(res?.data);
      } catch (e) {
        setErrorMessage('SJ03');
      }
    })();
  }, [intraId]);

  const {
    userImageUri,
    rank,
    ppp,
    wins,
    losses,
    winRate,
    racketType,
    statusMessage,
  } = profileInfo;

  const startEditHandler = () => {
    setModalInfo({ modalName: 'USER-PROFILE_EDIT' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameInfoWrap}>
        <div className={styles.playerInfo}>
          <div className={styles.userImage}>
            {userImageUri && (
              <Image
                src={userImageUri}
                alt='prfImg'
                layout='fill'
                objectFit='cover'
                sizes='30vw'
                quality='30'
              />
            )}
          </div>
          <div className={styles.racketType}>{racketType.toUpperCase()}</div>
        </div>
        <div className={styles.gameInfo}>
          <div className={styles.rank}>
            <span>순위</span>
            <span>{rank === -1 ? '-' : rank}</span>
          </div>
          <div className={styles.rankDetail}>
            <div className={styles.string}>
              <div className={styles.ppp}>
                <span>{ppp} 점</span>
              </div>
              <div className={styles.winRate}>
                <span>
                  {wins}승 {losses}패
                </span>
                <span>승률 {winRate}%</span>
              </div>
            </div>
            <div className={styles.bar}>
              <span
                className={styles.wins}
                style={{ width: `${parseInt(winRate)}%` }}
              ></span>
              <span
                className={styles.losses}
                style={{ width: `${100 - parseInt(winRate)}%` }}
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statusMessage}>
        <div className={styles.messaage}>
          {userData.intraId === intraId && statusMessage.length === 0
            ? '상태메시지를 입력해보세요!'
            : statusMessage}
        </div>
        <div className={styles.buttons}>
          {userData.intraId === intraId && (
            <div className={styles.positive}>
              <input type='button' onClick={startEditHandler} value='edit' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
