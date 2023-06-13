import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { profileState } from 'utils/recoil/user';
import { ProfileBasic, racketTypes } from 'types/userTypes';
import styles from 'styles/user/Profile.module.scss';
import useEditProfileModal from 'hooks/modal/useEditProfileModal';

export interface EditedProfile {
  racketType: string;
  statusMessage: string;
  snsNotiOpt: 'NONE' | 'SLACK' | 'EMAIL' | 'BOTH';
}

const CHAR_LIMIT = 30;

export default function EditProfileModal() {
  const [profile, setProfile] = useRecoilState<ProfileBasic>(profileState);
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    racketType: profile.racketType,
    statusMessage: '',
    snsNotiOpt: 'SLACK',
  });
  const [slack, setSlack] = useState<boolean>(true);
  const [email, setEmail] = useState<boolean>(false);

  const { racketType, statusMessage, snsNotiOpt } = profile;

  const [finishEditHandler, cancelEditHandler] = useEditProfileModal({
    slack: slack,
    email: email,
    editedProfile: editedProfile,
    setProfile: setProfile,
    intraId: profile.intraId,
  });

  useEffect(() => {
    setEditedProfile((prev) => ({
      ...prev,
      racketType,
      statusMessage,
      snsNotiOpt,
    }));
    if (snsNotiOpt === 'BOTH') {
      setSlack(true);
      setEmail(true);
    } else if (snsNotiOpt === 'SLACK') {
      setSlack(true);
      setEmail(false);
    } else if (snsNotiOpt === 'EMAIL') {
      setSlack(false);
      setEmail(true);
    } else {
      setSlack(false);
      setEmail(false);
    }
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

  return (
    <div className={styles.editContainer}>
      <div className={styles.phrase}>
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
                <div className={styles.radioButton}>{racket.id}</div>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <div className={styles.editType}>알림 받기</div>
        <div className={styles.snsWrap}>
          <div
            className={`${styles.snsButton} ${slack ? styles.snsClicked : ''}`}
            onClick={
              () =>
                alert('슬랙 알림은 현재 준비중입니다.') /* setSlack(!slack) */
            }
          >
            Slack
          </div>
          <div
            className={`${styles.snsButton} ${email ? styles.snsClicked : ''}`}
            onClick={() => setEmail(!email)}
          >
            Email
          </div>
        </div>
      </div>
      <div className={styles.modalbuttons}>
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
