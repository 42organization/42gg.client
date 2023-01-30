import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/user/Profile.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import Image from 'next/image';

export default function AdminProfileModal(user: any) {
  const [userInfo, setUserInfo] = useState<any>();
  //   userId
  //   intraId
  //   userImageUrl
  //   racket_type
  //   status_message
  //   wins
  //   losses
  //   ppp
  //   e_mail
  //   role_type

  const [userProfileImg, setUserProfileImg] = useState<File>();
  const [userPreviewImg, setPreviewImg] = useState<string>();
  const racketTypes = [
    { id: 'penholder', label: 'PENHOLDER' },
    { id: 'shakehand', label: 'SHAKEHAND' },
    { id: 'dual', label: 'DUAL' },
  ];
  const onChange = ({ target: { name, value } }: any | any) => {
    setUserInfo((current: any) => ({
      ...current,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (userProfileImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(userProfileImg);
    }
    setUserInfo((current: any) => ({
      ...current,
      userImageUrl: userProfileImg,
    }));
  }, [userProfileImg]);

  const photoUpload = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setUserProfileImg(file);
    }
  };

  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/users`);
    const data = await res.json();
    setUserInfo(data[0]);
  };

  return (
    <div className={styles.editContainer} id='modalOutside'>
      <div className={styles.phrase}>
        <div className={styles.container}>
          <div className={styles.phrase}>
            <div className={styles.editType}>회원 정보 수정</div>
            <div>
              <label>
                <Image
                  src={
                    userPreviewImg
                      ? userPreviewImg
                      : `${userInfo?.userImageUrl}`
                  }
                  width='150'
                  height='150'
                  alt=''
                />
                <input
                  type='file'
                  style={{ display: 'none' }}
                  onChange={photoUpload}
                />
              </label>
              <br />
              <label>ID : {userInfo?.intraId}</label>
              <br />
              <label>
                이메일:{' '}
                <input
                  name='e_mail'
                  onChange={onChange}
                  value={userInfo?.e_mail}
                />
              </label>
              <br />
              <label>
                상태 메시지:
                <input
                  name='status_message'
                  onChange={onChange}
                  value={userInfo?.status_message}
                />
              </label>
              <br />
              {racketTypes.map((racket, index) => {
                return (
                  <label key={index} htmlFor={racket.id}>
                    <div>{racket.label}</div>
                    <input
                      type='radio'
                      name='racket_type'
                      id={racket.id}
                      value={racket.id}
                      onChange={onChange}
                      checked={userInfo?.racket_type === racket.id}
                    />
                  </label>
                );
              })}
              <br />
              <label>
                승 :
                <input id='wins' onChange={onChange} value={userInfo?.wins} />
              </label>
              <br />
              <label>
                패 :
                <input
                  id='losses'
                  onChange={onChange}
                  value={userInfo?.losses}
                />
              </label>
              <br />
              <label>
                PPP :
                <input id='ppp' onChange={onChange} value={userInfo?.ppp} />
              </label>
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.negative}></div>
            <div className={styles.positive}>
              <button onClick={() => console.log(userInfo)}>Edit</button>
              <button onClick={() => setModal({ modalName: null })}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
