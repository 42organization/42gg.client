import { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/takgu/modal/ModalButton';
import useLogoutCheck from 'hooks/Login/useLogoutCheck';
import styles from 'styles/takgu/modal/menu/LogoutModal.module.scss';

export default function LogoutModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [onReturn, onLogout] = useLogoutCheck();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    setIsLoading(true);
    onLogout()
      .then(() => queryClient.removeQueries('user'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🥲</div>
        <div className={styles.message}>
          로그아웃
          <br />
          하시겠습니까?
        </div>
      </div>
      <ModalButtonContainer>
        <ModalButton onClick={onReturn} style='negative' value='아니오' />
        <ModalButton
          onClick={handleLogout}
          style='positive'
          value='예'
          isLoading={isLoading}
        />
      </ModalButtonContainer>
    </div>
  );
}
