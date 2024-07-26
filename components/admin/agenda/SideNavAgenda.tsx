import { useRouter } from 'next/router';
import { TbMessageReport } from 'react-icons/tb';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNavParty() {
  const currentPath = useRouter().asPath.replace('/admin', '');

  return (
    <>
      <SideNavContent
        type={'agenda'}
        url={'/agendaList'}
        menuName={'대회 관리'}
        currentPath={currentPath}
      >
        <TbMessageReport className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'agenda'}
        url={'/teamList'}
        menuName={'팀 관리'}
        currentPath={currentPath}
      >
        <TbMessageReport className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'agenda'}
        url={'/userList'}
        menuName={'유저 관리'}
        currentPath={currentPath}
      >
        <TbMessageReport className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'agenda'}
        url={'/ticket'}
        menuName={'티켓 관리'}
        currentPath={currentPath}
      >
        <TbMessageReport className={styles.logo} />
      </SideNavContent>
    </>
  );
}
