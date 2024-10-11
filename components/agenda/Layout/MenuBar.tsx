import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useLogoutCheck from 'hooks/Login/useLogoutCheck';
import styles from 'styles/agenda/Layout/MenuBar.module.scss';
import { HeaderContextState } from './AgendaHeader';
import MenuBarContent from './MenuBarContent';
import { useModal } from '../modal/useModal';

const MenuBar = ({ headerstate }: { headerstate: HeaderContextState }) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const loading = useState(false);
  const [onReturn, onLogout] = useLogoutCheck();

  const handleLogout = () => {
    openModal({
      type: 'proceedCheck',
      title: '로그아웃',
      description: '로그아웃 하시겠습니까?',
      onProceed: () => {
        loading[1](true);
        onLogout()
          .then(() => queryClient.removeQueries('user'))
          .finally(() => {
            loading[1](false);
          });

        closeModal();
      },
      onCancel: closeModal,
    });
  };

  return (
    <>
      <div
        className={`${styles.container} ${
          headerstate.openMenuState ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.row}>
          <MenuBarContent
            content={`Hello, ${user?.intraId}`}
            href={`/agenda/profile/user?id=${user?.intraId}`}
            as='h2'
          />
        </div>
        {/* <button className={styles.profile}>내 프로필</button> */}

        <MenuBarContent content='Home' href='/' as='h1' />
        <div className={styles.divider} />
        <MenuBarContent content='Agenda' href='/agenda' as='h1' />
        <MenuBarContent
          content='내 프로필'
          href={`/agenda/profile/user?id=${user?.intraId}`}
        />
        <MenuBarContent content='티켓 확인하기' href='/agenda/ticket' />
        <div className={styles.divider} />
        <MenuBarContent content='PingPong' href='/takgu' as='h1' />
        <MenuBarContent content='랭크' href='/takgu/rank' />
        <MenuBarContent content='게임' href='/takgu/game' />
        <MenuBarContent content='상점' href='/takgu/store' />
        <div className={styles.divider} />
        <MenuBarContent content='지원하기' href='/takgu/recruit' />
        <div className={styles.last}>
          {user?.isAdmin ? (
            <>
              <MenuBarContent content='Admin' href='/admin' as='h2' />
            </>
          ) : null}
          <MenuBarContent content='Logout' onClick={handleLogout} as='h2' />
        </div>
      </div>

      <div
        className={`${styles.bg} ${
          headerstate.openMenuState ? styles.activebg : styles.inactivebg
        }`}
        onClick={headerstate.resetOpenMenuBarState}
      />
    </>
  );
};

export default MenuBar;
