import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileInfoState, isEditProfileState } from 'utils/recoil/user';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';

interface EditedProfile {
  racketType: string;
  statusMessage: string;
}

const CHAR_LIMIT = 30;

export default function EditProfileModal() {
  const setIsEditProfile = useSetRecoilState(isEditProfileState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    racketType: 'penholder',
    statusMessage: '',
  });
  const {
    intraId,
    userImageUri,
    rank,
    ppp,
    winRate,
    racketType,
    statusMessage,
  } = profileInfo;

  useEffect(() => {
    setEditedProfile((prev) => ({
      ...prev,
      racketType,
      statusMessage,
    }));
  }, [profileInfo]);

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'statusMessage' && value.length > CHAR_LIMIT)
      value = value.slice(0, CHAR_LIMIT);
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const finishEditHandler = async () => {
    setProfileInfo((prev) => ({
      ...prev,
      ...editedProfile,
    }));
    setIsEditProfile(false);

    try {
      const res = await instance.put(`/pingpong/users/detail`, editedProfile);
      alert(res?.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEditHandler = () => setIsEditProfile(false);

  return (
    <div className={styles.editContainer}>
      <div className={styles.emoji}>✏️</div>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.scoreInfo}>
            <div className={styles.rank}>{rank}00</div>
            <div className={styles.pppAndracketType}>
              <div className={styles.ppp}>{ppp}점</div>{' '}
              <div className={styles.racketType}>
                {racketType.toUpperCase()}
              </div>
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
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightTopSide}>
            <div className={styles.image}></div>
            <div className={styles.intraId}>{intraId}</div>
          </div>
        </div>
      </div>
      <div className={styles.racketRadioButtons}>
        <label htmlFor='penholder'>
          <input
            type='radio'
            name='racketType'
            id='penholder'
            value='penholder'
            onChange={inputChangeHandler}
            checked={editedProfile.racketType === 'penholder'}
          />{' '}
          <div className={styles.radioButton}>PENHOLDER</div>
        </label>
        <label htmlFor='shakehand'>
          <input
            type='radio'
            name='racketType'
            id='shakehand'
            value='shakehand'
            onChange={inputChangeHandler}
            checked={editedProfile.racketType === 'shakehand'}
          />{' '}
          <div className={styles.radioButton}>SHAKEHAND</div>
        </label>
      </div>
      <div>
        <div className={styles.statusTitle}>
          <span>상태메세지</span>
        </div>
        <div className={styles.textareaWrapper}>
          <textarea
            value={editedProfile.statusMessage}
            name='statusMessage'
            onChange={inputChangeHandler}
            maxLength={CHAR_LIMIT}
          ></textarea>
          <div>{`${editedProfile.statusMessage.length}/${CHAR_LIMIT}`}</div>
        </div>
      </div>
      <div>
        <button className={styles.cancelButton} onClick={cancelEditHandler}>
          취소
        </button>
        <button className={styles.finishButton} onClick={finishEditHandler}>
          확인
        </button>
      </div>
    </div>
  );
}
