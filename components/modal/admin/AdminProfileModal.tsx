import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  AdminProfileProps,
  roleTypes,
  UserInfo,
} from 'types/admin/adminUserTypes';
import { racketTypes } from 'types/userTypes';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import useUploadImg from 'hooks/useUploadImg';
import styles from 'styles/admin/modal/AdminProfile.module.scss';

export default function AdminProfileModal(props: AdminProfileProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: 0,
    intraId: props.value,
    userImageUri: null,
    statusMessage: '',
    racketType: 'shakeHand',
    wins: 0,
    losses: 0,
    ppp: 0,
    eMail: '',
    roleType: 'ROLE_USER',
  });

  const { imgData, imgPreview, uploadImg } = useUploadImg();
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/users`); //admin/users/{props.intraId}/detail
    const data = await res.json();
    setUserInfo(data[0]);
  };

  const inputHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const inputNumHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let intValue = parseInt(value);
    if (isNaN(intValue)) {
      intValue = 0;
    }
    setUserInfo({ ...userInfo, [name]: intValue });
  };

  const submitHandler = async () => {
    //const formData = new FormData();
    console.log(userInfo);
    // const data = {
    //   userId: userInfo.userId,
    //   intraId: userInfo.intraId,
    //   statusMessage: userInfo.statusMessage,
    //   racketType: userInfo.racketType,
    //   wins: userInfo.wins,
    //   losses: userInfo.losses,
    //   ppp: userInfo.ppp,
    //   eMail: userInfo.eMail,
    //   roleType: userInfo.roleType,
    // };
    //formData.append('files', imgData);
    // formData.append(
    //   'data',
    //   new Blob([JSON.stringify(data)], {
    //     type: 'application/json',
    //   })
    // );
    // await instance.put(`/admin/users/${userInfo.userId}`, e);
    // try {
    //   const result = await axios.put(`/admin/users/daijeong/detail`);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <div
        className={
          styles.modal
        } /* method="put"  */ /* encType="multipart/form-data" */
      >
        <div className={styles.title}>
          <div>회원 정보 수정</div>
        </div>
        <div className={styles.topWrap}>
          <div className={styles.top}>
            <div className={styles.imageWrap}>
              <label className={styles.image}>
                <Image
                  src={imgPreview ? imgPreview : `${userInfo?.userImageUri}`}
                  layout='fill'
                  alt='Profile Image'
                />
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
                    name='eMail'
                    onChange={inputHandler}
                    value={userInfo?.eMail}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <label>상태 메시지</label>
          <textarea
            name='statusMessage'
            onChange={inputHandler}
            value={userInfo?.statusMessage}
          ></textarea>
        </div>
        <div className={styles.bottom}>
          <div className={styles.choice}>
            <div className={styles.choiceName}>
              <div>라켓 타입</div>
              <div>ROLE 타입</div>
              <div>승</div>
              <div>패</div>
              <div>PPP</div>
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
                        <div className={styles.radioButton}>{racket.label}</div>
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
                  value={userInfo?.wins}
                />
              </div>
              <div>
                <input
                  name='losses'
                  onChange={inputNumHandler}
                  value={userInfo?.losses}
                />
              </div>
              <div>
                <input
                  name='ppp'
                  onChange={inputNumHandler}
                  value={userInfo?.ppp}
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
