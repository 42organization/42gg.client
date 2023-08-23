import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { User } from 'types/mainType';
import { ProfileBasic } from 'types/userTypes';
import { userState } from 'utils/recoil/layout';
import { tierIdSelector } from 'utils/recoil/tierColor';
import {
  HeaderContextState,
  HeaderContext,
} from 'components/Layout/HeaderContext';
import { MainMenu, AdminMenu } from 'components/Layout/MenuBar/MenuBarElement';
import PlayerImage from 'components/PlayerImage';
import useAxiosGet, { useMockAxiosGet } from 'hooks/useAxiosGet';
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

  const [profile, setProfile] = useState<ProfileBasic>({
    intraId: '',
    userImageUri: '',
    racketType: 'shakeHand',
    statusMessage: '',
    level: 0,
    currentExp: 0,
    maxExp: 0,
    expRate: 0,
    snsNotiOpt: 'SLACK',
    tierImageUri: '',
    tierName: '',
    edge: 'BASIC',
    backgroundType: 'BASIC',
  });

  /*   const getProfile = useAxiosGet({
    url: `/pingpong/users/${user.intraId}`,
    setState: setProfile,
    err: 'SJ03',
    type: 'setError',
  }); */
  const getProfile = useMockAxiosGet({
    url: `users/intraId`,
    setState: setProfile,
    err: 'SJ03',
    type: 'setError',
  });

  useEffect(() => {
    getProfile();
  }, []);

  const tierId = useRecoilValue(tierIdSelector);
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
          styleName={`menuProfile ${user.edge.toLowerCase()}`}
          size={18}
        />
      </Link>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userId}>
          <div className={`${styles.tierContainer}`}>
            <PlayerImage
              src={profile.tierImageUri}
              styleName={'ranktier'}
              size={50}
            />
            &nbsp;
            <div className={`${styles.tierId} ${findTierIndex}`}>
              {profile.tierName}
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
