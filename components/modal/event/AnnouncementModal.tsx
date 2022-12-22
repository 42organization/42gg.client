import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { Announcement } from 'types/modalTypes';
import styles from 'styles/modal/event/AnnouncementModal.module.scss';

type AnnouncementModalProps = {
  announcements: Announcement[];
};
export default function AnnouncementModal({
  announcements,
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
      <div className={styles.title}>Notice!</div>
      <ul className={styles.announcementList}>
        {announcements.map((el: Announcement, index) => {
          return (
            <li key={index}>
              <div>{`<${el.title}>`}</div>
              <ul className={styles.contentList}>
                {el.content.map((e: string, idx) => (
                  <li key={idx}>{e}</li>
                ))}
                {el.link && (
                  <a href={el.link} target='_blank' rel="noreferrer">
                    {`-> 링크 바로가기`}
                  </a>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
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
