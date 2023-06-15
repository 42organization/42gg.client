import React, { useContext, useEffect } from 'react';
import styles from 'styles/Layout/MenuBar.module.scss';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { User } from 'types/mainType';
import Link from 'next/link';
import PlayerImage from 'components/PlayerImage';
import { profileState } from 'utils/recoil/user';
import { ProfileBasic } from 'types/userTypes';
import { MainMenu, AdminMenu } from './MenuBarElement';
import useAxiosGet from 'hooks/useAxiosGet';

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
  const [profile, setProfile] = useRecoilState<ProfileBasic>(profileState);

  const getProfile = useAxiosGet({
    url: `/pingpong/users/${user.intraId}`,
    setState: setProfile,
    err: 'SJ03',
    type: 'setError',
  });

  useEffect(() => {
    getProfile();
  }, []);

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
          탁구왕&nbsp;
          <Link
            href={`/users/detail?intraId=${user.intraId}`}
            onClick={HeaderState?.resetOpenMenuBarState}
          >
            {user.intraId}
          </Link>
          님
        </div>
        <div className={styles.userLevel}>LV.{profile.level}</div>
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
