import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Announcement } from 'types/modalTypes';
import { QUILL_FORMATS } from 'types/quillTypes';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/event/AnnouncementModal.module.scss';
import 'react-quill/dist/quill.bubble.css';

type AnnouncementModalProps = {
  announcement: Announcement;
  isAttended?: boolean;
};

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function AnnouncementModal({
  announcement,
  isAttended,
}: AnnouncementModalProps) {
  const setModal = useSetRecoilState(modalState);
  const [neverSeeAgain, setNeverSeeAgain] = useState<boolean>(false);

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
    if (isAttended === false) {
      setModal({ modalName: 'EVENT-WELCOME' });
    } else {
      setModal({ modalName: null });
    }
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
      <Quill
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
