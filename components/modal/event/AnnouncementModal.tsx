import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/EventModal.module.scss';

export default function AnnouncementModal() {
  const setModal = useSetRecoilState(modalState);
  const [neverSeeAgain, setNeverSeeAgain] = useState<boolean>(false);

  const onCheck = () => {
    setNeverSeeAgain((prev) => !prev);
  };

  const closeModalButtonHandler = () => {
    // if (neverSeeAgain);
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}></div>
        <div className={styles.title}>{/* {content.title} */}</div>
        {/* {content.event} */}
      </div>
      <div>
        <input
          type='checkbox'
          id='neverSeeAgain'
          name='neverSeeAgain'
          onChange={onCheck}
          checked={neverSeeAgain}
        />
        <label htmlFor='neverSeeAgain'>
          <div>다시 보지 않기</div>
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
