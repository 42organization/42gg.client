import { useRouter } from 'next/router';
import { FaRegCalendarCheck, FaRegUserCircle } from 'react-icons/fa';
import { GrAnnounce } from 'react-icons/gr';
import { RiTeamLine } from 'react-icons/ri';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNavParty() {
  const currentPath = useRouter().asPath.replace('/admin', '');

  return (
    <>
      <SideNavContent
        type={'agenda'}
        url={'agendaList'}
        menuName={'아젠다 관리'}
        currentPath={currentPath}
      >
        <FaRegCalendarCheck className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'agenda'}
        url={'teamList'}
        menuName={'팀 관리'}
        currentPath={currentPath}
      >
        <RiTeamLine className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'agenda'}
        url={'announcements'}
        menuName={'공지사항 관리'}
        currentPath={currentPath}
      >
        <GrAnnounce className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'agenda'}
        url={'userList'}
        menuName={'유저 관리'}
        currentPath={currentPath}
      >
        <FaRegUserCircle className={styles.logo} />
      </SideNavContent>
    </>
  );
}
