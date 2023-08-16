import React from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { FaCoins } from 'react-icons/fa';
import styles from 'styles/modal/store/UserCoinHistoryModal.module.scss';
import { ICoin } from 'types/userTypes';
import CoinHistoryContainer from './CoinHistoryContainer';

export default function UserCoinHistoryModal({ coin }: ICoin) {
  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setModal({
      modalName: null,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>GG코인 내역</div>
      <div className={styles.balance}>
        <div>현재 코인</div>
        <div className={styles.currentCoin}>
          {coin} &nbsp;
          <FaCoins />
        </div>
      </div>
      <CoinHistoryContainer />
      <ModalButtonContainer>
        <ModalButton style='positive' value='확인' onClick={closeModal} />
      </ModalButtonContainer>
    </div>
  );
}