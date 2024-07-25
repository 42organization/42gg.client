import { useRouter } from 'next/router';
import { BsShop } from 'react-icons/bs';
import { GoSettings } from 'react-icons/go';
import {
  GrUserSettings,
  GrNotification,
  GrStatusWarning,
  GrAnnounce,
} from 'react-icons/gr';
import { IoGameControllerOutline, IoReceiptOutline } from 'react-icons/io5';
import { MdOutlineMessage } from 'react-icons/md';
import {
  TbCalendarTime,
  TbCoin,
  TbPaperBag,
  TbTrophy,
  TbWallet,
} from 'react-icons/tb';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNavTakgu() {
  const currentPath = useRouter().asPath.replace('/admin', '');
  return (
    <>
      <SideNavContent
        type={'takgu'}
        url={'/users'}
        menuName={'유저 관리'}
        currentPath={currentPath}
      >
        <GrUserSettings className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/feedback'}
        menuName={'피드백 관리'}
        currentPath={currentPath}
      >
        <MdOutlineMessage className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/announcement'}
        menuName={'공지사항 관리'}
        currentPath={currentPath}
      >
        <GrAnnounce className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/notification'}
        menuName={'알림 관리'}
        currentPath={currentPath}
      >
        <GrNotification className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/penalty'}
        menuName={'페널티 관리'}
        currentPath={currentPath}
      >
        <GrStatusWarning className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/slot'}
        menuName={'슬롯 관리'}
        currentPath={currentPath}
      >
        <GoSettings className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/games'}
        menuName={'게임 관리'}
        currentPath={currentPath}
      >
        <IoGameControllerOutline className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/season'}
        menuName={'시즌 관리'}
        currentPath={currentPath}
      >
        <TbCalendarTime className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/receipt'}
        menuName={'구매내역 관리'}
        currentPath={currentPath}
      >
        <IoReceiptOutline className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/usageHistory'}
        menuName={'사용내역 관리'}
        currentPath={currentPath}
      >
        <TbPaperBag className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/store'}
        menuName={'상점 관리'}
        currentPath={currentPath}
      >
        <BsShop className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/coin'}
        menuName={'재화 정책 관리'}
        currentPath={currentPath}
      >
        <TbCoin className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/tournament'}
        menuName={'토너먼트 관리'}
        currentPath={currentPath}
      >
        <TbTrophy className={styles.logo} />
      </SideNavContent>
      <SideNavContent
        type={'takgu'}
        url={'/recruitments'}
        menuName={'공고 관리'}
        currentPath={currentPath}
      >
        <TbWallet className={styles.logo} />
      </SideNavContent>
    </>
  );
}
