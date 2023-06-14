import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Announcement } from 'types/modalTypes';
import { QUILL_FORMATS } from 'types/quillTypes';
import 'react-quill/dist/quill.bubble.css';
import styles from 'styles/modal/event/AnnouncementModal.module.scss';

type AnnouncementModalProps = {
  announcement: Announcement;
};

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function AnnouncementModal({
  announcement,
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
    }
    setModal({ modalName: null });
  };

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
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={closeModalButtonHandler} type='button' value='닫기' />
        </div>
      </div>
    </div>
  );
}
