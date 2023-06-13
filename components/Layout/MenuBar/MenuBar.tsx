import React, { useContext } from 'react';
import styles from 'styles/Layout/MenuBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { User } from 'types/mainType';
import Link from 'next/link';
import PlayerImage from 'components/PlayerImage';
import { profileState } from 'utils/recoil/user';
import { ProfileBasic } from 'types/userTypes';
import { MainMenu, AdminMenu } from './MenuBarElement';

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
  const user = useRecoilValue<User>(userState);
  const userLevel = useRecoilValue<ProfileBasic>(profileState).level;

  return (
    <div className={styles.menuProfileWrapper}>
      <Link
        className={styles.myImage}
        href={`/users/detail?intraId=${user.intraId}`}
      >
        <PlayerImage
          src={user.userImageUri}
          styleName={'menuProfile'}
          size={18}
        />
      </Link>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userId}>
          탁구왕&nbsp;
          <Link href={`/users/detail?intraId=${user.intraId}`}>
            {user.intraId}
          </Link>
          님
        </div>
        <div className={styles.userLevel}>LV.{userLevel}</div>
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
