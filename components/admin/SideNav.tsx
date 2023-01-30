import { useRouter } from 'next/router';
import SideNavContent from './SideNavContent';
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
  const currentPath = useRouter().asPath.replace('/admin', '');

  return (
    <div className={styles.container}>
      <SideNavContent
        url={'/users'}
        menuName={'유저 관리'}
        currentPath={currentPath}
      >
        <GrUserSettings className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/feedback'}
        menuName={'피드백 관리'}
        currentPath={currentPath}
      >
        <MdOutlineMessage className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/announcement'}
        menuName={'공지사항 관리'}
        currentPath={currentPath}
      >
        <GrAnnounce className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/notification'}
        menuName={'알림 관리'}
        currentPath={currentPath}
      >
        <GrNotification className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/penalty'}
        menuName={'페널티 관리'}
        currentPath={currentPath}
      >
        <GrStatusWarning className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/slot'}
        menuName={'슬롯 관리'}
        currentPath={currentPath}
      >
        <GoSettings className={styles.logo} />
      </SideNavContent>
    </div>
  );
}
