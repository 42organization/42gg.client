import React, { MouseEvent, useContext, MouseEventHandler } from 'react';
import Link from 'next/link';
import styles from 'styles/Layout/MenuBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import useAxiosGet from 'hooks/useAxiosGet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import { userState } from 'utils/recoil/layout';
import { User } from 'types/mainType';
import RankingEmoji from 'public/image/menu_ranking.svg';
import CurrentMatchEmoji from 'public/image/menu_currentMatch.svg';
import AnnouncementEmoji from 'public/image/menu_announcement.svg';
import ManualEmoji from 'public/image/menu_manual.svg';
import ReportEmoji from 'public/image/menu_report.svg';
import StatisticsEmoji from 'public/image/menu_statistics.svg';
import AdminEmoji from 'public/image/menu_admin.svg';
import SignOutEmoji from 'public/image/menu_signOut.svg';

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
    Ranking: {
      name: '랭킹',
      svg: <RankingEmoji />,
    },
    CurrentMatch: {
      name: '최근 경기',
      svg: <CurrentMatchEmoji />,
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
  };
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <div className={styles.imageWrapper}>{menuList[itemName].svg}</div>
      <div className={styles.menuText}>{menuList[itemName].name}</div>
    </div>
  );
};

const MenuLink = ({ link, onClick, itemName }: MenuLinkProps) => {
  return (
    <Link href={link}>
      <MenuItem itemName={itemName} onClick={onClick} />
    </Link>
  );
};

export const MainMenu = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const setModal = useSetRecoilState<Modal>(modalState);

  const getAnnouncementHandler = useAxiosGet({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

  return (
    <nav className={styles.mainMenu}>
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
  const { isAdmin } = useRecoilValue<User>(userState);
  const setModal = useSetRecoilState<Modal>(modalState);

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
      <div
        className={styles.logout}
        onClick={() => setModal({ modalName: 'MENU-LOGOUT' })}
      >
        <div>로그아웃</div>
        <SignOutEmoji />
      </div>
    </nav>
  );
};
