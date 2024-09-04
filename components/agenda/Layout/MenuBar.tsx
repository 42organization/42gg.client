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

        alert('로그아웃 api가 필요합니다.');
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
        <MenuBarContent
          content={`Hello. ${user?.intraId}`}
          href={`/agenda/profile/user?id=${user?.intraId}`}
          as='h2'
        />
        <MenuBarContent content='Agenda' href='/agenda' as='h1' />
        <div className={styles.divider} />
        <MenuBarContent content='진행중인 대회' href='/agenda' />
        <MenuBarContent content='티켓 확인하기' href='/agenda/ticket' />
        {user?.isAdmin && (
          <>
            <MenuBarContent content='admin' href='/admin/agenda' as='h1' />
          </>
        )}
        <MenuBarContent content='로그아웃' onClick={handleLogout} />
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
