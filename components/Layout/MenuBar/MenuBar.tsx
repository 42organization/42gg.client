import Link from 'next/link';
import React, { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { User } from 'types/mainType';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { MainMenu, AdminMenu } from './MenuBarElement';
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
  const user = useRecoilValue<User>(userState);

  const tierList = ['손', '빨', '노', '초', '파', '검', '무'];
  const tierColor = [
    'none',
    'red',
    'yellow',
    'green',
    'blue',
    'black',
    'rainbow',
  ];
  const index = tierList.findIndex((tier) => tier[0] === user.tierName[0]);
  const tierId = tierColor[index];
  const findTierIndex =
    tierId === 'none' ? styles.tierId : styles['tierId' + tierId];

  return (
    <div className={styles.menuProfileWrapper}>
      <Link
        className={styles.myImage}
        href={`/users/detail?intraId=${user.intraId}`}
        onClick={HeaderState?.resetOpenMenuBarState}
      >
        <PlayerImage
          src={user.userImageUri}
          styleName={'menuProfile'}
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
            <div className={`${styles.tierId} ${findTierIndex}`}>
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
