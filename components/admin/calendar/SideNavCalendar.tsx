import { useRouter } from 'next/router';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNavCalendar() {
  const currentPath = useRouter().asPath.replace('/admin', '');

  return (
    <>
      <SideNavContent
        type={'calendar'}
        url={'CalendarList'}
        menuName={'캘린더 조회'}
        currentPath={currentPath}
      >
        <FaRegCalendarCheck className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'calendar'}
        url={'CalendarSearch'}
        menuName={'캘린더 검색'}
        currentPath={currentPath}
      >
        <RiTeamLine className={styles.logo} />
      </SideNavContent>
    </>
  );
}
