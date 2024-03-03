import { useState } from 'react';
import PartyCategory from './PartyCategory';
import PartyPenalty from './PartyPenalty';
import PartyReport from './PartyReport';
import PartyRoom from './PartyRoom';
import PartyTemplate from './PartyTemplate';
import styles from '../../../styles/party/PartyNav.module.scss';

export default function PartyNav() {
  const [navValue, setNavValue] = useState('penalty');
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.ullist}>
          <li className={styles.lilist} onClick={() => setNavValue('penalty')}>
            패널티
          </li>
          <li className={styles.lilist} onClick={() => setNavValue('report')}>
            신고 관리
          </li>
          <li className={styles.lilist} onClick={() => setNavValue('room')}>
            방 관리
          </li>
          <li className={styles.lilist} onClick={() => setNavValue('template')}>
            템플릿 관리
          </li>
          <li className={styles.lilist} onClick={() => setNavValue('category')}>
            카테고리 관리
          </li>
        </ul>

        {navValue === 'penalty' && <PartyPenalty />}
        {navValue === 'report' && <PartyReport />}
        {navValue === 'room' && <PartyRoom />}
        {navValue === 'template' && <PartyTemplate />}
        {navValue === 'category' && <PartyCategory />}
      </div>
    </>
  );
}
