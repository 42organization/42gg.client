import Link from 'next/link';
import React, { useContext } from 'react';
import {
  HeaderContextState,
  HeaderContext,
} from 'components/Layout/HeaderContext';
import { MainMenu, AdminMenu } from 'components/Layout/MenuBar/MenuBarElement';
import PlayerImage from 'components/PlayerImage';
import { useUser } from 'hooks/Layout/useUser';
import styles from 'styles/Layout/MenuBar.module.scss';

const MenuTop = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  return (
    <div className={styles.menuTopWrapper}>
      <div className={styles.menuLogo}>42GG</div>
      <button onClick={HeaderState?.resetOpenMenuBarState}>&#10005;</button>
    </div>
  );
};

const MenuProfile = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const user = useUser();

  const tierColor: { [key: string]: string } = {
    손: 'none',
    빨: 'red',
    노: 'yellow',
    초: 'green',
    파: 'blue',
    검: 'black',
    무: 'rainbow',
  };

  if (!user) return null;

  return (
    <div className={styles.menuProfileWrapper}>
      <Link
        className={styles.myImage}
        href={`/users/detail?intraId=${user.intraId}`}
        onClick={HeaderState?.resetOpenMenuBarState}
      >
        <PlayerImage
          src={user.userImageUri}
          styleName={`menuProfile ${
            user.edgeType ? user.edgeType.toLowerCase() : 'basic'
          }`}
          size={18}
        />
      </Link>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userId}>
          <div className={`${styles.tierContainer}`}>
            <PlayerImage
              src={user.tierImageUri}
              styleName={'ranktier'}
              size={50}
            />
            &nbsp;
            <div
              className={`${styles.tierId} ${
                styles[tierColor[user.tierName[0]]]
              }`}
            >
              {user.tierName}
            </div>
          </div>
          <Link
            href={`/users/detail?intraId=${user.intraId}`}
            onClick={HeaderState?.resetOpenMenuBarState}
          >
            {user.intraId}
          </Link>
          님
        </div>
        <div className={styles.userLevel}>LV.{user.level}</div>
      </div>
    </div>
  );
};

const MenuBar = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

  return (
    <div
      className={styles.backdrop}
      onClick={HeaderState?.resetOpenMenuBarState}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <MenuTop />
        <MenuProfile />
        <MainMenu />
        <AdminMenu />
      </div>
    </div>
  );
};

export default MenuBar;
