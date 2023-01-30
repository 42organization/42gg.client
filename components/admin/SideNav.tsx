import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from 'styles/admin/SideNav.module.scss';
import userLogo from '/public/image/adminNav/userLogo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
          <div className={styles.img}>
            <Image src={userLogo} alt='userLogo' width={18} height={18} />
          </div>
          <div className={styles.contentText}>유저 관리</div>
        </div>
      </Link>
      <Link href='/admin/feedback'>
        <div
          className={`${styles.content} ${
            selectedPath === '/feedback' && styles.selected
          }`}
        >
          <div className={styles.img}>
            <Image src={userLogo} alt='userLogo' width={18} height={18} />
          </div>
          <div className={styles.contentText}>피드백 관리</div>
        </div>
      </Link>
      <Link href='/admin/announcement'>
        <div
          className={`${styles.content} ${
            selectedPath === '/announcement' && styles.selected
          }`}
        >
          <div className={styles.img}>
            <Image src={userLogo} alt='userLogo' width={18} height={18} />
          </div>
          <div className={styles.contentText}>공지사항 관리</div>
        </div>
      </Link>
      <Link href='/admin/notification'>
        <div
          className={`${styles.content} ${
            selectedPath === '/notification' && styles.selected
          }`}
        >
          <div className={styles.img}>
            <Image src={userLogo} alt='userLogo' width={18} height={18} />
          </div>
          <div className={styles.contentText}>알림 관리</div>
        </div>
      </Link>
      <Link href='/admin/penalty'>
        <div
          className={`${styles.content} ${
            selectedPath === '/penalty' && styles.selected
          }`}
        >
          <div className={styles.img}>
            <Image src={userLogo} alt='userLogo' width={18} height={18} />
          </div>
          <div className={styles.contentText}>페널티 관리</div>
        </div>
      </Link>
    </div>
  );
}
