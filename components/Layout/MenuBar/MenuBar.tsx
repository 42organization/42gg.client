import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { User } from 'types/mainType';
import { ProfileBasic } from 'types/userTypes';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { MainMenu, AdminMenu } from './MenuBarElement';
import useAxiosGet from 'hooks/useAxiosGet';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
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
    tierName: '손',
  });
  /*   const getProfile = useAxiosGet({
    url: `/pingpong/users/${user.intraId}`,
    setState: setProfile,
    err: 'SJ03',
    type: 'setError',
  }); */
  const getProfile = useMockAxiosGet<any>({
    url: `users/intraId`,
    setState: (data) => {
      setProfile(data);
    },
    err: 'SJ03',
    type: 'setError',
  });

  useEffect(() => {
    getProfile();
  }, []);

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
  const index = tierList.findIndex((tier) => tier[0] === profile.tierName[0]);
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
