import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/AdminProfile.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import Image from 'next/image';
import axios from 'axios';
import useUploadImg from 'hooks/useUploadImg';

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

  const { imgData, imgPreview, uploadImg } = useUploadImg();

  const racketTypes = [
    { id: 'penholder', label: 'PENHOLDER' },
    { id: 'shakehand', label: 'SHAKEHAND' },
    { id: 'dual', label: 'DUAL' },
  ];

  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    getBasicProfileHandler();
  }, []);

  const getBasicProfileHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/users`);
    const data = await res.json();
    setUserInfo(data[0]);
  };

  const onChange = ({ target: { name, value } }: any | any) => {
    setUserInfo((current: any) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitHandler = async (e: any) => {
    const formData = new FormData();
    console.log(imgData);
    const data = {
      userId: userInfo.userId,
      intraId: userInfo.intraId,
      statusMessage: userInfo.statusMessage,
      racketType: userInfo.racketType,
      wins: userInfo.wins,
      losses: userInfo.losses,
      ppp: userInfo.ppp,
      email: userInfo.email,
      roleType: userInfo.roleType,
    };
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
        <div className={styles.title}>회원 정보 수정</div>
        <div className={styles.top}>
          <label className={styles.image}>
            <Image
              src={imgPreview ? imgPreview : `${userInfo?.userImageUri}`}
              layout='fill'
              alt=''
            />
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={uploadImg}
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
            <input name='wins' onChange={onChange} value={userInfo?.wins} />
            <label>패</label>
            <input name='losses' onChange={onChange} value={userInfo?.losses} />
            <label>PPP</label>
            <input
              type='text'
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
