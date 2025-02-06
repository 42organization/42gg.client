import { useRouter } from 'next/router';
import { FaSearchPlus, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCreate } from 'react-icons/io5';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNavCalendar() {
  const currentPath = useRouter().asPath.replace('/admin', '');

  return (
    <>
      <SideNavContent
        type={'calendar'}
        url={'calendarList'}
        menuName={'캘린더 조회'}
        currentPath={currentPath}
      >
        <FaRegCalendarAlt className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        type={'calendar'}
        url={'calendarSearch'}
        menuName={'캘린더 검색'}
        currentPath={currentPath}
      >
        <FaSearchPlus className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        type={'calendar'}
        url={'calendarCreate'}
        menuName={'캘린더 일정 추가'}
        currentPath={currentPath}
      >
        <IoCreate className={styles.logo} />
      </SideNavContent>
    </>
  );
}
