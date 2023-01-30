import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoSettings } from 'react-icons/go';
import { MdOutlineMessage } from 'react-icons/md';
import {
  GrUserSettings,
  GrNotification,
  GrStatusWarning,
  GrAnnounce,
} from 'react-icons/gr';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNav() {
  const currentPath = useRouter().asPath;
  const [selectedPath, setSelectedPath] = useState(currentPath);

  useEffect(
    () => setSelectedPath(currentPath.replace('/admin', '')),
    [currentPath]
  );

  return (
    <div className={styles.container}>
      <Link href='/admin/users'>
        <div
          className={`${styles.content} ${
            selectedPath === '/users' && styles.selected
          }`}
        >
          <GrUserSettings className={styles.logo} />
          <div className={styles.contentText}>유저 관리</div>
        </div>
      </Link>
      <Link href='/admin/feedback'>
        <div
          className={`${styles.content} ${
            selectedPath === '/feedback' && styles.selected
          }`}
        >
          <MdOutlineMessage className={styles.logo} />
          <div className={styles.contentText}>피드백 관리</div>
        </div>
      </Link>
      <Link href='/admin/announcement'>
        <div
          className={`${styles.content} ${
            selectedPath === '/announcement' && styles.selected
          }`}
        >
          <GrAnnounce className={styles.logo} />
          <div className={styles.contentText}>공지사항 관리</div>
        </div>
      </Link>
      <Link href='/admin/notification'>
        <div
          className={`${styles.content} ${
            selectedPath === '/notification' && styles.selected
          }`}
        >
          <GrNotification className={styles.logo} />
          <div className={styles.contentText}>알림 관리</div>
        </div>
      </Link>
      <Link href='/admin/penalty'>
        <div
          className={`${styles.content} ${
            selectedPath === '/penalty' && styles.selected
          }`}
        >
          <GrStatusWarning className={styles.logo} />
          <div className={styles.contentText}>페널티 관리</div>
        </div>
      </Link>
      <Link href='/admin/slot'>
        <div
          className={`${styles.content} ${
            selectedPath === '/slot' && styles.selected
          }`}
        >
          <GoSettings className={styles.logo} />
          <div className={styles.contentText}>슬롯 관리</div>
        </div>
      </Link>
    </div>
  );
}
