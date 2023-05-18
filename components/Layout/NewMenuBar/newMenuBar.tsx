import React from 'react';
import { useResetRecoilState } from 'recoil';
import { openMenuBarState } from 'utils/recoil/layout';
import styles from 'styles/Layout/MenuBar.module.scss';
import MenuBarProvider from './MenuBarProvider';

const MenuBar = () => {
  const resetOpenMenuBar = useResetRecoilState(openMenuBarState);

  return (
    <>
      <div className={styles.backdrop} onClick={resetOpenMenuBar}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <button onClick={resetOpenMenuBar}>&#10005;</button>
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
  );
};

export default MenuBar;
