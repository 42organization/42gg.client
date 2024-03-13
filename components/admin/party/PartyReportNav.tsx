import { useState } from 'react';
import styles from 'styles/party/PartyNav.module.scss';
import AdminCommentReport from './AdminCommentReport';
import AdminPartyRoomReport from './AdminPartyRoomReport';
import PartyNoShowReport from './PartyNoShowReport';

export default function PartyReportNav() {
  const [navValue, setNavValue] = useState('noshow');
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.ullist}>
          <li className={styles.lilist} onClick={() => setNavValue('noshow')}>
            노쇼 관리
          </li>
          <li className={styles.lilist} onClick={() => setNavValue('comment')}>
            댓글 관리
          </li>
          <li className={styles.lilist} onClick={() => setNavValue('room')}>
            방 관리
          </li>
        </ul>
        {navValue === 'noshow' && <PartyNoShowReport />}
        {navValue === 'comment' && <AdminCommentReport />}
        {navValue === 'room' && <AdminPartyRoomReport />}
      </div>
    </>
  );
}
