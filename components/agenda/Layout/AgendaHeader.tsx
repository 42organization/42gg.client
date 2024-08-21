import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Logo from 'public/image/main-logo.svg';
import styles from 'styles/agenda/Layout/Header.module.scss';
import MenuBar from './MenuBar';

export interface HeaderContextState {
  openMenuState: boolean;
  setOpenMenuBarState: Dispatch<SetStateAction<boolean>>;
  resetOpenMenuBarState: () => void;
  moveTo: (href: string) => void;
}

export const HeaderContext = createContext<HeaderContextState | null>(null);

export default function AgendaHeader() {
  const [menu, setMenu] = useState<boolean>(false);
  const router = useRouter();
  const resetMenuHandler = () => {
    setMenu(false);
  };

  const moveTo = (href: string) => () => {
    resetMenuHandler();
    router.push(href);
  };

  const HeaderState: HeaderContextState = {
    openMenuState: menu,
    setOpenMenuBarState: setMenu,
    resetOpenMenuBarState: resetMenuHandler,
    moveTo: moveTo,
  };

  return (
    <HeaderContext.Provider value={HeaderState}>
      <div className={styles.headerContainer}>
        <div className={styles.headerWrap}>
          <div className={styles.headerLeft}>
            <Link href='/'>
              <Logo className={styles.logo} />
            </Link>
          </div>
          <FiMenu
            className={styles.menuIcon}
            onClick={() => HeaderState?.setOpenMenuBarState(!menu)}
          />
        </div>
      </div>
      <MenuBar isActive={HeaderState.openMenuState} />
    </HeaderContext.Provider>
  );
}
