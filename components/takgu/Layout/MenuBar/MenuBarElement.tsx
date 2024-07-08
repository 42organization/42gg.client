import Link from 'next/link';
import React, { MouseEvent, useContext, MouseEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { AiFillShop } from 'react-icons/ai';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/takgu/modal';
import {
  HeaderContextState,
  HeaderContext,
} from 'components/takgu/Layout/HeaderContext';
import AdminEmoji from 'public/image/takgu/menu_admin.svg';
import AnnouncementEmoji from 'public/image/takgu/menu_announcement.svg';
import CurrentMatchEmoji from 'public/image/takgu/menu_currentMatch.svg';
import HallOfFameEmoji from 'public/image/takgu/menu_halloffame.svg';
import ManualEmoji from 'public/image/takgu/menu_manual.svg';
import RankingEmoji from 'public/image/takgu/menu_ranking.svg';
import RecruitEmoji from 'public/image/takgu/menu_recruit.svg';
import ReportEmoji from 'public/image/takgu/menu_report.svg';
import SignOutEmoji from 'public/image/takgu/menu_signOut.svg';
import StatisticsEmoji from 'public/image/takgu/menu_statistics.svg';
import { useUser } from 'hooks/takgu/Layout/useUser';
import useCheckRecruit from 'hooks/takgu/recruit/useCheckRecruit';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/takgu/Layout/MenuBar.module.scss';

interface MenuLinkProps {
  link: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  itemName: string;
}
interface menuItemProps {
  itemName: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const MenuItem = ({ itemName, onClick }: menuItemProps) => {
  const menuList: { [key: string]: { [key: string]: string | JSX.Element } } = {
    Store: {
      name: '상점',
      svg: <AiFillShop />,
    },
    Ranking: {
      name: '랭킹',
      svg: <RankingEmoji />,
    },
    CurrentMatch: {
      name: '최근 경기',
      svg: <CurrentMatchEmoji />,
    },
    HallOfFame: {
      name: '명예의 전당',
      svg: <HallOfFameEmoji />,
    },
    Announcement: {
      name: '공지사항',
      svg: <AnnouncementEmoji />,
    },
    Manual: {
      name: '사용 설명서',
      svg: <ManualEmoji />,
    },
    Report: {
      name: '건의하기',
      svg: <ReportEmoji />,
    },
    Statistics: {
      name: '통계페이지',
      svg: <StatisticsEmoji />,
    },
    Admin: {
      name: '관리자',
      svg: <AdminEmoji />,
    },
    Recruit: {
      name: '지원하기',
      svg: <RecruitEmoji />,
    },
  };
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <div
        className={
          itemName === 'Recruit' ? styles.recruit : styles.imageWrapper
        }
      >
        {menuList[itemName].svg}
      </div>
      <div className={styles.menuText}>{menuList[itemName].name}</div>
    </div>
  );
};

const MenuLink = ({ link, onClick, itemName }: MenuLinkProps) => {
  return (
    <Link href={`/takgu${link}`}>
      <MenuItem itemName={itemName} onClick={onClick} />
    </Link>
  );
};

export const MainMenu = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const setModal = useSetRecoilState<Modal>(modalState);
  const { isRecruiting } = useCheckRecruit();

  const getAnnouncementHandler = useAxiosGet<any>({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
          isAttended: true,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

  return (
    <nav className={styles.mainMenu}>
      {isRecruiting && (
        <MenuLink
          link='/recruit'
          itemName='Recruit'
          onClick={HeaderState?.resetOpenMenuBarState}
        />
      )}
      <MenuLink
        link='/store'
        itemName='Store'
        onClick={HeaderState?.resetOpenMenuBarState}
      />
      <MenuLink
        link='/rank'
        itemName='Ranking'
        onClick={HeaderState?.resetOpenMenuBarState}
      />
      <MenuLink
        link='/game'
        itemName='CurrentMatch'
        onClick={HeaderState?.resetOpenMenuBarState}
      />
      <MenuLink
        link='/tournament-record'
        itemName='HallOfFame'
        onClick={HeaderState?.resetOpenMenuBarState}
      />
      <MenuItem
        itemName='Announcement'
        onClick={() => getAnnouncementHandler()}
      />
      <MenuItem
        itemName='Manual'
        onClick={() =>
          setModal({ modalName: 'MATCH-MANUAL', manual: { radioMode: 'BOTH' } })
        }
      />
      <MenuItem
        itemName='Report'
        onClick={() => setModal({ modalName: 'MENU-REPORT' })}
      />
    </nav>
  );
};

export const AdminMenu = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const setModal = useSetRecoilState<Modal>(modalState);
  const user = useUser();

  if (!user) return null;
  const { isAdmin } = user;

  const logutBottomStyle = isAdmin ? styles.admin : styles.normal;

  return (
    <nav className={styles.adminMenu} id={styles.logout}>
      {isAdmin && (
        <div>
          <MenuLink link='/statistics' itemName='Statistics' />
          <MenuLink
            link='/admin'
            onClick={HeaderState?.resetOpenMenuBarState}
            itemName='Admin'
          />
        </div>
      )}
      <div className={`${styles.logoutWrap} ${logutBottomStyle}`}>
        <div
          className={styles.logout}
          onClick={() => setModal({ modalName: 'MENU-LOGOUT' })}
        >
          <div>로그아웃</div>
          <SignOutEmoji />
        </div>
      </div>
    </nav>
  );
};
