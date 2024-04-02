import { useRouter } from 'next/router';
import { useState } from 'react';
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
  TbNote,
  TbChartBar,
  TbFileReport,
  TbMessageReport,
  TbBuildingWarehouse,
  TbPlaylistAdd,
} from 'react-icons/tb';
import SideNavContent from 'components/admin/SideNavContent';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNav() {
  const currentPath = useRouter().asPath.replace('/admin', '');
  const [isPartyOpen, setPartyOpen] = useState(false);

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

      <SideNavContent
        url={'/games'}
        menuName={'게임 관리'}
        currentPath={currentPath}
      >
        <IoGameControllerOutline className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/season'}
        menuName={'시즌 관리'}
        currentPath={currentPath}
      >
        <TbCalendarTime className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/receipt'}
        menuName={'구매내역 관리'}
        currentPath={currentPath}
      >
        <IoReceiptOutline className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/usageHistory'}
        menuName={'사용내역 관리'}
        currentPath={currentPath}
      >
        <TbPaperBag className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/store'}
        menuName={'상점 관리'}
        currentPath={currentPath}
      >
        <BsShop className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/coin'}
        menuName={'재화 정책 관리'}
        currentPath={currentPath}
      >
        <TbCoin className={styles.logo} />
      </SideNavContent>

      <SideNavContent
        url={'/tournament'}
        menuName={'토너먼트 관리'}
        currentPath={currentPath}
      >
        <TbTrophy className={styles.logo} />
      </SideNavContent>

      <div
        className={styles.menuItem}
        onClick={() => setPartyOpen(!isPartyOpen)}
      >
        <TbChartBar className={styles.logo} />
        <span className={styles.menuName}>파티 관리탭</span>
        {isPartyOpen ? <span>▼</span> : <span>►</span>}
      </div>

      {isPartyOpen && (
        <div className={styles.subMenu}>
          <SideNavContent
            url={'/partyPenalty'}
            menuName={'패널티 관리'}
            currentPath={currentPath}
          >
            <TbMessageReport className={styles.logo} />
          </SideNavContent>

          <SideNavContent
            url={'/partyReport'}
            menuName={'신고 관리'}
            currentPath={currentPath}
          >
            <TbFileReport className={styles.logo} />
          </SideNavContent>

          <SideNavContent
            url={'/partyRoom'}
            menuName={'방 관리'}
            currentPath={currentPath}
          >
            <TbBuildingWarehouse className={styles.logo} />
          </SideNavContent>

          <SideNavContent
            url={'/partyTemplate'}
            menuName={'템플릿 관리'}
            currentPath={currentPath}
          >
            <TbNote className={styles.logo} />
          </SideNavContent>

          <SideNavContent
            url={'/partyCategory'}
            menuName={'카테고리 관리'}
            currentPath={currentPath}
          >
            <TbPlaylistAdd className={styles.logo} />
          </SideNavContent>
        </div>
      )}
    </div>
  );
}
