import React, { useContext } from 'react';
import styles from 'styles/Layout/MenuBar.module.scss';
import MenuBarProvider from './MenuBarProvider';
import NewMenuContext from './MenuBarProvider';
import { HeaderContextState, HeaderContext } from '../HeaderContext';

const MenuBar = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <NewMenuContext>
      <>
        <div
          className={styles.backdrop}
          onClick={HeaderState?.resetOpenMenuBarState}
        >
          <div
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={HeaderState?.resetOpenMenuBarState}>
              &#10005;
            </button>
            <nav>
              <div className={styles.menu}>
                <MenuBarProvider.mainMenu />
                <MenuBarProvider.subMenu />
              </div>
              <MenuBarProvider.AdminMenu />
            </nav>
          </div>
        </div>
      </>
    </NewMenuContext>
  );
};

export default MenuBar;
