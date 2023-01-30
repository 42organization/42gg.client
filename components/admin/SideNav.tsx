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
    </div>
  );
}
