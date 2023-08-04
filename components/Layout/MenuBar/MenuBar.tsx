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
  const tierId = '빨강 탁구채';
  const tierImageUri =
    'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/sangmipa-0a8bc4cc-14a3-4d3a-bea9-cfea82bc5fb4.jpeg';

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
  });

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
          <div className={styles.tierId}>
            <PlayerImage src={tierImageUri} styleName={'ranktier'} size={50} />
            &nbsp;
            {tierId}
            <br />
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
