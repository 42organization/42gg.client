import React, { ReactNode, MouseEvent, useContext } from 'react';
import Link from 'next/link';
import styles from 'styles/Layout/MenuBar.module.scss';
import { NewMenuContextState, NewMenuContext } from './MenuBarProvider';
import { HeaderContextState, HeaderContext } from '../HeaderContext';

interface MenuLinkProps {
  link: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

interface SubLinkProps {
  link: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
}
interface AdminMenuProps {
  isAdmin: boolean | undefined;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
}

const MenuLink = ({ link, onClick, children }: MenuLinkProps) => (
  <Link href={link}>
    <div onClick={onClick}>{children}</div>
  </Link>
);

const SubMenuLink = ({ link, children }: SubLinkProps) => (
  <div onClick={() => window.open(link)}>{children}</div>
);

const AdminMenuLink = ({ isAdmin, onClick }: AdminMenuProps) => (
  <div>
    {isAdmin && (
      <div className={styles.subMenu}>
        <Link href='/statistics'>
          <div>📊 통계페이지</div>
        </Link>
        <Link href='/admin'>
          <div onClick={onClick}>😎 관리자</div>
        </Link>
      </div>
    )}
  </div>
);

export const MainMenu = () => {
  const MenuContext = useContext<NewMenuContextState | null>(NewMenuContext);
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  const menuList = [
    {
      name: `${MenuContext?.seasonMode === 'normal' ? 'VIP' : '랭킹'}`,
      link: '/rank',
    },
    { name: '최근 경기', link: '/game' },
    { name: '내 정보', link: `/users/detail?intraId=${MenuContext?.intraId}` },
  ];

  return (
    <div>
      {menuList.map((menu, index) => (
        <MenuLink
          key={index}
          link={menu.link}
          onClick={HeaderState?.resetOpenMenuBarState}
        >
          {menu.name}
        </MenuLink>
      ))}
    </div>
  );
};

export const SubMenu = () => {
  const MenuContext = useContext<NewMenuContextState | null>(NewMenuContext);

  const submenuList = [
    {
      name: '공지사항',
      link: 'https://far-moonstone-7ff.notion.site/91925f9c945340c6a139f64fb849990d',
    },
    {
      name: '사용 설명서',
      link: 'https://far-moonstone-7ff.notion.site/917df2bd339d42c3a7689277246e7f64',
    },
  ];

  return (
    <div className={styles.subMenu}>
      {submenuList.map((submenu, index) => (
        <SubMenuLink key={index} link={submenu.link}>
          {submenu.name}
        </SubMenuLink>
      ))}
      <div onClick={() => MenuContext?.setModal({ modalName: 'MENU-REPORT' })}>
        건의하기
      </div>
    </div>
  );
};

export const AdminMenu = () => {
  const MenuContext = useContext<NewMenuContextState | null>(NewMenuContext);
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <div className={styles.subMenu} id={styles.logout}>
      <AdminMenuLink
        isAdmin={MenuContext?.isAdmin}
        onClick={HeaderState?.resetOpenMenuBarState}
      ></AdminMenuLink>
      <div onClick={() => MenuContext?.setModal({ modalName: 'MENU-LOGOUT' })}>
        로그아웃
      </div>
    </div>
  );
};
