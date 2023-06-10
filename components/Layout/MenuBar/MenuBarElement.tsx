import React, { MouseEvent, useContext, MouseEventHandler } from 'react';
import Link from 'next/link';
import styles from 'styles/Layout/MenuBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import Image from 'next/image';
import useAxiosGet from 'hooks/useAxiosGet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import { userState } from 'utils/recoil/layout';
import { User } from 'types/mainType';

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
  const menuList: { [key: string]: { [key: string]: string } } = {
    Ranking: {
      name: '랭킹',
      src: '/image/ranking_menu.png',
    },
    CurrentMatch: {
      name: '최근 경기',
      src: '/image/currentmatch_menu.png',
    },
    Announcement: {
      name: '공지사항',
      src: '/image/announcement_menu.png',
    },
    Manual: {
      name: '사용 설명서',
      src: '/image/manual_menu.png',
    },
    Report: {
      name: '건의하기',
      src: '/image/report_menu.png',
    },
    Statistics: {
      name: '통계페이지',
      src: '/image/statistics_menu.png',
    },
    Admin: {
      name: '관리자',
      src: '/image/admin_menu.png',
    },
  };
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <Image
          src={menuList[itemName].src}
          width={20}
          height={20}
          alt={itemName}
        />
      </div>
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
      <MenuItem itemName='Manual' onClick={() => getAnnouncementHandler()} />
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
        <Image src='/image/sign_out.png' width={20} height={20} alt='logout' />
      </div>
    </nav>
  );
};
