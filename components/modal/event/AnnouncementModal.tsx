import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Announcement } from 'types/modalTypes';
import styles from 'styles/modal/AnnouncementModal.module.scss';

type AnnouncementModalProps = {
  announcements: Announcement[];
};
export default function AnnouncementModal({
  announcements,
}: AnnouncementModalProps) {
  const [modal, setModal] = useRecoilState(modalState);
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
      <div className={styles.announcementTitle}>Notice!</div>
      <div className={styles.phrase}>
        <div className={styles.emoji}></div>
        <ul className={styles.announcementList}>
          {announcements.map((el: Announcement, index) => {
            return (
              <li key={index}>
                <div className={styles.title}>{el.title}</div>
                <ul className={styles.content}>
                  {el.content.map((e: string, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <input
          type='checkbox'
          id='neverSeeAgain'
          name='neverSeeAgain'
          onChange={onCheck}
          checked={neverSeeAgain}
          className={styles.checkBox}
        />
        <label htmlFor='neverSeeAgain' className={styles.checkBoxLabel}>
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
