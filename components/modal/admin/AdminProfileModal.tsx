import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { roleTypes, IUserInfo } from 'types/admin/adminUserTypes';
import { racketTypes } from 'types/userTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import useUploadImg from 'hooks/useUploadImg';
import styles from 'styles/admin/modal/AdminProfile.module.scss';

const STAT_MSG_LIMIT = 30;

export default function AdminProfileModal(props: { intraId: string }) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userId: 0,
    intraId: '',
    userImageUri: null,
    statusMessage: '',
    racketType: 'shakeHand',
    wins: '',
    losses: '',
    ppp: '',
    email: '',
    roleType: 'USER',
    coin: 0,
  });

  const { imgData, imgPreview, uploadImg } = useUploadImg({
    maxSizeMB: 0.03,
    maxWidthOrHeight: 150,
  });
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    try {
      const res = await instanceInManage.get(`/users/${props.intraId}`);
      setUserInfo(res?.data);
    } catch (e) {
      setSnackBar({
        toastName: 'profile',
        severity: 'error',
        message: `api 불러오기 실패 ${userInfo.intraId}`,
        clicked: true,
      });
    }
  };

  const inputHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'statusMessage' && value.length > STAT_MSG_LIMIT) return;
    setUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    if (userInfo.wins === 0 && userInfo.losses === 0) {
      setUserInfo({ ...userInfo, ppp: 1000 });
    }
  }, [userInfo.wins, userInfo.losses, userInfo.ppp]);

  const inputNumHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let intValue = parseInt(value);
    if (isNaN(intValue)) intValue = 0;
    setUserInfo({ ...userInfo, [name]: intValue });
  };

  const submitHandler = async () => {
    const formData = new FormData();
    const data = {
      statusMessage: userInfo.statusMessage,
      racketType: userInfo.racketType,
      wins: userInfo.wins,
      losses: userInfo.losses,
      ppp: userInfo.ppp,
      email: userInfo.email,
      roleType: userInfo.roleType,
      coin: userInfo.coin,
    };
    formData.append(
      'updateUserInfo',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );
    if (imgData) {
      formData.append('imgData', new Blob([imgData], { type: 'image/jpeg' }));
    }
    try {
      const res = await instanceInManage.put(
        `/users/${props.intraId}`,
        formData
      );
      if (res.status === 207) {
        setSnackBar({
          toastName: 'profile',
          severity: 'info',
          message: '이 유저는 승,패,ppp를 수정할 수 없습니다.',
          clicked: true,
        });
      } else {
        setSnackBar({
          toastName: 'profile',
          severity: 'success',
          message: '수정 완료',
          clicked: true,
        });
      }
      setModal({ modalName: null });
    } catch (e: any) {
      setSnackBar({
        toastName: 'profile',
        severity: 'error',
        message: `${e.response.message}`,
        clicked: true,
      });
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.title}>
          <div>회원 정보 수정</div>
        </div>
        <div className={styles.topWrap}>
          <div className={styles.top}>
            <div className={styles.imageWrap}>
              <label className={styles.image}>
                {userInfo.userImageUri && (
                  <Image
                    src={imgPreview ? imgPreview : `${userInfo?.userImageUri}`}
                    alt='Profile Image'
                    layout='fill'
                  />
                )}
                <input
                  type='file'
                  style={{ display: 'none' }}
                  onChange={uploadImg}
                />
              </label>
            </div>
            <div className={styles.topRightWrap}>
              <div className={styles.topRight}>
                <div>ID</div>
                <div className={styles.topRightInput}>{userInfo?.intraId}</div>
                <div>이메일</div>
                <div>
                  <input
                    className={styles.topRightInput}
                    name='email'
                    onChange={inputHandler}
                    value={userInfo.email ?? ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.messageCount}>
            <label>상태 메시지</label>
            <div>{`${userInfo.statusMessage.length} / ${STAT_MSG_LIMIT}`}</div>
          </div>
          <textarea
            name='statusMessage'
            onChange={inputHandler}
            value={userInfo.statusMessage ?? ''}
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.choice}>
            <div className={styles.choiceName}>
              <div>라켓 타입</div>
              <div>ROLE 타입</div>
              <div>승</div>
              <div>패</div>
              <div>PPP</div>
              <div>COIN</div>
            </div>
            <div className={styles.choiceBtn}>
              <div className={styles.racketTypeWrap}>
                <div className={styles.racketRadioButtons}>
                  {racketTypes.map((racket, index) => {
                    return (
                      <label key={index} htmlFor={racket.id}>
                        <input
                          type='radio'
                          name='racketType'
                          id={racket.id}
                          value={racket.id}
                          onChange={inputHandler}
                          checked={userInfo?.racketType === racket.id}
                        />
                        <div className={styles.radioButton}>{racket.id}</div>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className={styles.racketTypeWrap}>
                <div className={styles.racketRadioButtons}>
                  {roleTypes.map((role, index) => {
                    return (
                      <label key={index} htmlFor={role.id}>
                        <input
                          type='radio'
                          name='roleType'
                          id={role.id}
                          value={role.id}
                          onChange={inputHandler}
                          checked={userInfo?.roleType === role.id}
                        />
                        <div className={styles.radioButton}>{role.label}</div>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <input
                  name='wins'
                  onChange={inputNumHandler}
                  value={userInfo.wins ?? ''}
                />
              </div>
              <div>
                <input
                  name='losses'
                  onChange={inputNumHandler}
                  value={userInfo.losses ?? ''}
                />
              </div>
              <div>
                <input
                  name='ppp'
                  onChange={inputNumHandler}
                  value={userInfo.ppp ?? ''}
                />
              </div>
              <div>
                <input
                  name='coin'
                  value={userInfo.coin ?? ''}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btnWrap}>
          <div className={styles.btns}>
            <button className={styles.btnBlue} onClick={() => submitHandler()}>
              수정
            </button>
            <button
              className={styles.btnGray}
              onClick={() => setModal({ modalName: null })}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
