import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Announcement } from 'types/takgu/modalTypes';
import { QUILL_FORMATS } from 'types/takgu/quillTypes';
import { modalState } from 'utils/recoil/takgu/modal';
import DynamicQuill from 'components/DynamicQuill';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/takgu/modal/ModalButton';
import { useUser } from 'hooks/takgu/Layout/useUser';
import styles from 'styles/takgu/modal/event/AnnouncementModal.module.scss';
import 'react-quill/dist/quill.bubble.css';

type AnnouncementModalProps = {
  announcement: Announcement;
  // isAttended?: boolean;
};

export default function AnnouncementModal({
  announcement,
}: // isAttended,
AnnouncementModalProps) {
  const setModal = useSetRecoilState(modalState);
  const [neverSeeAgain, setNeverSeeAgain] = useState<boolean>(false);
  // const user = useUser();

  const onCheck = () => {
    setNeverSeeAgain((prev) => !prev);
  };

  const closeModalButtonHandler = () => {
    if (neverSeeAgain) {
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      localStorage.setItem('announcementTime', expires.toString());
    } else {
      localStorage.removeItem('announcementTime');
    }
    // if (user && user.isAttended === false) {
    //   setModal({ modalName: 'EVENT-WELCOME' });
    // } else {
    //   setModal({ modalName: null });
    // }
    setModal({ modalName: null });
  };

  useEffect(() => {
    const announcementTime = localStorage.getItem('announcementTime');
    if (announcementTime) {
      const now = new Date();
      if (new Date(announcementTime) > now) {
        setNeverSeeAgain(true);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Notice</div>
      <DynamicQuill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={announcement.content}
        theme='bubble'
      />
      <div className={styles.checkBox}>
        <input
          type='checkbox'
          id='neverSeeAgain'
          name='neverSeeAgain'
          onChange={onCheck}
          checked={neverSeeAgain}
        />
        <label htmlFor='neverSeeAgain'>
          <div>하루 동안 열지 않기</div>
        </label>
      </div>
      <ModalButtonContainer>
        <ModalButton
          onClick={closeModalButtonHandler}
          value='닫기'
          style='positive'
        />
      </ModalButtonContainer>
    </div>
  );
}
