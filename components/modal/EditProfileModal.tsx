import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileInfoState, editProfileModalState } from 'utils/recoil/user';
import { errorState } from 'utils/recoil/error';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';

interface EditedProfile {
  racketType: string;
  statusMessage: string;
}

const CHAR_LIMIT = 30;

export default function EditProfileModal() {
  const setIsEditProfile = useSetRecoilState(editProfileModalState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileInfoState);
  const setErrorMessage = useSetRecoilState(errorState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    racketType: 'penholder',
    statusMessage: '',
  });
  const { racketType, statusMessage } = profileInfo;

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
      await instance.put(`/pingpong/users/detail`, editedProfile);
      alert('프로필이 성공적으로 등록되었습니다.');
    } catch (e) {
      setErrorMessage('JH02');
    }
  };

  const cancelEditHandler = () => setIsEditProfile(false);

  return (
    <div className={styles.editContainer}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>✏️</div>
        <div className={styles.editModalTitle}>프로필 수정</div>
      </div>
      <div className={styles.statusMessageWrap}>
        <div className={styles.editType}>상태메세지</div>
        <div className={styles.textareaWrap}>
          <textarea
            value={editedProfile.statusMessage}
            name='statusMessage'
            onChange={inputChangeHandler}
            maxLength={CHAR_LIMIT}
            placeholder={'상태메세지를 입력해주세요 ;)'}
          ></textarea>
          <div>{`${editedProfile.statusMessage.length}/${CHAR_LIMIT}`}</div>
        </div>
      </div>
      <div className={styles.racketTypeWrap}>
        <div className={styles.editType}>라켓 타입</div>
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
      </div>

      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input type='button' onClick={cancelEditHandler} value='취소' />
        </div>
        <div className={styles.positive}>
          <input type='button' onClick={finishEditHandler} value='확인' />
        </div>
      </div>
    </div>
  );
}
