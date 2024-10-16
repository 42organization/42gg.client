import { useRouter } from 'next/router';
import {
  TbNote,
  TbFileReport,
  TbMessageReport,
  TbBuildingWarehouse,
  TbPlaylistAdd,
} from 'react-icons/tb';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNavParty() {
  const currentPath = useRouter().asPath.replace('/admin', '');

  return (
    <>
      <SideNavContent
        type={'takgu'}
        url={'partyPenalty'}
        menuName={'패널티 관리'}
        currentPath={currentPath}
      >
        <TbMessageReport className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'partyReport'}
        menuName={'신고 관리'}
        currentPath={currentPath}
      >
        <TbFileReport className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'partyRoom'}
        menuName={'방 관리'}
        currentPath={currentPath}
      >
        <TbBuildingWarehouse className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'partyTemplate'}
        menuName={'템플릿 관리'}
        currentPath={currentPath}
      >
        <TbNote className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'partyCategory'}
        menuName={'카테고리 관리'}
        currentPath={currentPath}
      >
        <TbPlaylistAdd className={styles.logo} />
      </SideNavContent>
    </>
  );
}
