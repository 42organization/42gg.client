import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileState } from 'utils/recoil/user';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/user/Profile.module.scss';
import { racketTypes } from 'types/userTypes';

interface EditedProfile {
  racketType: string;
  statusMessage: string;
  snsNotiOpt: 'NONE' | 'SLACK' | 'EMAIL' | 'BOTH';
}

const CHAR_LIMIT = 30;

export default function EditProfileModal() {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    racketType: profile.racketType,
    statusMessage: '',
    snsNotiOpt: 'SLACK',
  });
  const [slack, setSlack] = useState<boolean>(true);
  const [email, setEmail] = useState<boolean>(false);

  const { racketType, statusMessage, snsNotiOpt } = profile;

  useEffect(() => {
    setEditedProfile((prev) => ({
      ...prev,
      racketType,
      statusMessage,
      snsNotiOpt,
    }));
  }, [profile]);

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
    if (slack && email) editedProfile.snsNotiOpt = 'BOTH';
    else if (slack && !email) editedProfile.snsNotiOpt = 'SLACK';
    else if (!slack && email) editedProfile.snsNotiOpt = 'EMAIL';
    else editedProfile.snsNotiOpt = 'NONE';

    setProfile((prev) => ({
      ...prev,
      ...editedProfile,
    }));
    try {
      await instance.put(`/pingpong/users/detail`, editedProfile);
      alert('프로필이 성공적으로 등록되었습니다.');
    } catch (e) {
      setError('JH02');
    }
    setModal({ modalName: null });
  };

  const cancelEditHandler = () => setModal({ modalName: null });

  return (
    <div className={styles.editContainer}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>✏️</div>
        <div className={styles.editModalTitle}>프로필 수정</div>
      </div>
      <div className={styles.statusMessageWrap}>
        <div className={styles.editType}>상태메시지</div>
        <div className={styles.textareaWrap}>
          <textarea
            value={editedProfile.statusMessage}
            name='statusMessage'
            onChange={inputChangeHandler}
            maxLength={CHAR_LIMIT}
            placeholder={'상태메시지를 입력해주세요 ;)'}
          ></textarea>
          <div>{`${editedProfile.statusMessage.length}/${CHAR_LIMIT}`}</div>
        </div>
      </div>
      <div className={styles.racketTypeWrap}>
        <div className={styles.editType}>라켓 타입</div>
        <div className={styles.racketRadioButtons}>
          {racketTypes.map((racket, index) => {
            return (
              <label key={index} htmlFor={racket.id}>
                <input
                  type='radio'
                  name='racketType'
                  id={racket.id}
                  value={racket.id}
                  onChange={inputChangeHandler}
                  checked={editedProfile.racketType === racket.id}
                />
                <div className={styles.radioButton}>{racket.label}</div>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <div className={styles.editType}>알림 받기</div>
        <div className={styles.snsWrap}>
          <div
            className={`${styles.snsButton} ${
              slack === true ? styles.snsClicked : ''
            }`}
            onClick={() => setSlack(!slack)}
          >
            Slack
          </div>
          <div
            className={`${styles.snsButton} ${
              email === true ? styles.snsClicked : ''
            }`}
            onClick={() => setEmail(!email)}
          >
            Email
          </div>
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
