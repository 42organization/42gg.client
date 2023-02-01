import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminProfile.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import Image from 'next/image';

export default function AdminProfileModal(props: any) {
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
    <div className={styles.modal}>
      <div className={styles.title}>회원 정보 수정</div>
      <div className={styles.top}>
        <div className={styles.image}>
          <Image
            src={userPreviewImg ? userPreviewImg : `${userInfo?.userImageUrl}`}
            layout='fill'
            alt=''
          />
          <input
            type='file'
            style={{ display: 'none' }}
            onChange={photoUpload}
          />
        </div>
        <div className={styles.topRight}>
          <ul>ID : {userInfo?.intraId}</ul>
          <ul>
            이메일:
            <input name='e_mail' onChange={onChange} value={userInfo?.e_mail} />
          </ul>
        </div>
      </div>
      <div className={styles.middle}>
        <label>상태 메시지:</label>
        <input
          name='status_message'
          onChange={onChange}
          value={userInfo?.status_message}
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles.racketTypeWrap}>
          <div className={styles.editType}>라켓 타입</div>
          <div className={styles.racketRadioButtons}>
            {racketTypes.map((racket, index) => {
              return (
                <label key={index} htmlFor={racket.id}>
                  <input
                    type='radio'
                    name='racket_type'
                    id={racket.id}
                    value={racket.id}
                    onChange={onChange}
                    checked={userInfo?.racket_type === racket.id}
                  />
                  <div className={styles.radioButton}>{racket.label}</div>
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.rate}>
          <label>승</label>
          <input name='wins' onChange={onChange} value={userInfo?.wins} />
          <label>패</label>
          <input name='losses' onChange={onChange} value={userInfo?.losses} />
          <label>PPP</label>
          <input name='ppp' onChange={onChange} value={userInfo?.ppp} />
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={() => console.log(userInfo)}>Edit</button>
        <button onClick={() => setModal({ modalName: null })}>CANCEL</button>
      </div>
    </div>
  );
}
