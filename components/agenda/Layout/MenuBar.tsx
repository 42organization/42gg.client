import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useUser } from 'hooks/agenda/Layout/useUser';
import styles from 'styles/agenda/Layout/MenuBar.module.scss';
import MenuBarContent from './MenuBarContent';
import { useModal } from '../modal/useModal';

const MenuBar = ({ isActive }: { isActive: boolean }) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const handleLogout = () => {
    openModal({
      type: 'proceedCheck',
      title: '로그아웃',
      description: '로그아웃 하시겠습니까?',
      onProceed: () => {
        // fetch('/api/user/logout', {
        //   method: 'POST',
        //   credentials: 'include',
        // }).then((res) => {
        //   if (res.status === 204) {
        //     queryClient.removeQueries('user').then(() => {
        //       router.push('/agenda/login');
        //     });
        //   }
        // });

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
          isActive ? styles.active : styles.inactive
        }`}
      >
        <MenuBarContent
          content={`Hello. ${user?.intraId}`}
          href='/agenda/profile'
          as='h2'
        />
        <MenuBarContent content='Agenda' href='/agenda' as='h1' />
        <div className={styles.divider} />
        <MenuBarContent content='진행중인 대회' href='/agenda' />
        <MenuBarContent content='티켓 확인하기' href='/agenda/ticket' />
        {user?.isAdmin && (
          <>
            <MenuBarContent content='admin' href='/agenda/admin' as='h1' />
          </>
        )}
        <MenuBarContent content='로그아웃' onClick={handleLogout} />
      </div>

      <div
        className={`${styles.bg} ${
          isActive ? styles.activebg : styles.inactivebg
        }`}
      />
    </>
  );
};

export default MenuBar;
