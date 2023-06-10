import React, { useContext } from 'react';
import styles from 'styles/Layout/MenuBar.module.scss';
import MenuBarProvider from './MenuBarProvider';
import NewMenuContext from './MenuBarProvider';
import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { User } from 'types/mainType';
import Link from 'next/link';
import PlayerImage from 'components/PlayerImage';
import { profileState } from 'utils/recoil/user';
import { ProfileBasic } from 'types/userTypes';
import { IoIosArrowForward } from 'react-icons/io';

const MenuBar = () => {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const user = useRecoilValue<User>(userState);
  const userLevel = useRecoilValue<ProfileBasic>(profileState).level;

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

            <div className={styles.menuProfileWrapper}>
              <PlayerImage
                src={user.userImageUri}
                styleName={'mainPageProfile'}
                size={18}
              />
              <div className={styles.userInfoWrapper}>
                <div className={styles.userId}>{user.intraId}</div>
                <div className={styles.userLevel}>LV.{userLevel}</div>
              </div>
              <Link
                className={styles.myImage}
                href={`/users/detail?intraId=${user.intraId}`}
              >
                <IoIosArrowForward />
              </Link>
            </div>

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
