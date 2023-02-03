import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/adminProfile.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

export default function AdminProfileModal(props: any) {
  const [userInfo, setUserInfo] = useState<any>();
  //   userId
  //   intraId
  //   userImageUri
  //   racketType
  //   statusMessage
  //   wins
  //   losses
  //   ppp
  //   email
  //   roleType

  const racketTypes = [
    { id: 'penholder', label: 'PENHOLDER' },
    { id: 'shakehand', label: 'SHAKEHAND' },
    { id: 'dual', label: 'DUAL' },
  ];

  const [userProfileImg, setUserProfileImg] = useState<File>();
  const [userPreviewImg, setPreviewImg] = useState<string>();
  const setModal = useSetRecoilState(modalState);

  const imgCompress = async (fileSrc: File) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 320,
      useWebWorker: true,
    };
    try {
      const userProfileImg = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(userProfileImg);
      setUserInfo((current: any) => ({
        ...current,
        userImageUri: userProfileImg,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = ({ target: { name, value } }: any | any) => {
    setUserInfo((current: any) => ({
      ...current,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (userProfileImg) {
      imgCompress(userProfileImg);
    }
  }, [userProfileImg]);

  const photoUpload = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setUserProfileImg(file);
    }
  };

  useEffect(() => {
    fetch('/admin/users?page=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/users`);
    const data = await res.json();
    setUserInfo(data[0]);
  };

  const submitHandler = async (e: any) => {
    const formData = new FormData();
    formData.append('userId', userInfo.userId);
    formData.append('intraId', userInfo.intraId);
    //formData.append('userImageUri', userInfo.userImageUri);
    formData.append('statusMessage', userInfo.statusMessage);
    formData.append('racketType', userInfo.racketType);
    formData.append('wins', userInfo.wins);
    formData.append('losses', userInfo.losses);
    formData.append('ppp', userInfo.ppp);
    formData.append('email', userInfo.email);
    formData.append('roleType', userInfo.roleType);
    // await instance.put(`/admin/users/${userInfo.userId}`, e);
    try {
      const result = await axios.put(`/admin/users/daijeong/detail`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={
          styles.modal
        } /* method="put"  */ /* encType="multipart/form-data" */
      >
        <div className={styles.title}>회원 정보 수정</div>
        <div className={styles.top}>
          <label className={styles.image}>
            <Image
              src={
                userPreviewImg ? userPreviewImg : `${userInfo?.userImageUri}`
              }
              layout='fill'
              alt=''
            />
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={photoUpload}
            />
          </label>
          <div className={styles.topRight}>
            <ul>ID : {userInfo?.intraId}</ul>
            <ul>
              이메일:
              <input name='email' onChange={onChange} value={userInfo?.email} />
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <label>상태 메시지:</label>
          <textarea
            name='statusMessage'
            onChange={onChange}
            value={userInfo?.statusMessage}
          ></textarea>
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
                      name='racketType'
                      id={racket.id}
                      value={racket.id}
                      onChange={onChange}
                      checked={userInfo?.racketType === racket.id}
                    />
                    <div className={styles.radioButton}>{racket.label}</div>
                  </label>
                );
              })}
            </div>
          </div>
          <div className={styles.rate}>
            <label>승</label>
            <input
              pattern='[0-9]+'
              name='wins'
              onChange={onChange}
              value={userInfo?.wins}
            />
            <label>패</label>
            <input
              pattern='[0-9]+'
              name='losses'
              onChange={onChange}
              value={userInfo?.losses}
            />
            <label>PPP</label>
            <input
              type='text'
              pattern='[0-9]+'
              name='ppp'
              onChange={onChange}
              value={userInfo?.ppp}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <button onClick={() => submitHandler(userInfo)}>Edit</button>
        </div>
      </div>
      <button onClick={() => setModal({ modalName: null })}>CANCEL</button>
    </>
  );
}
