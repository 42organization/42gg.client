import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { FaCoins } from 'react-icons/fa';
import { Modal } from 'types/modalTypes';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { modalState } from 'utils/recoil/modal';
import StoreModeRadioBox from 'components/mode/modeItems/StoreModeRadioBox';
import styles from 'styles/mode/StoreModeWrap.module.scss';

type StoreModeWrapProps = {
  coin: ICoin;
  currentMode: StoreMode;
  setStoreMode: Dispatch<SetStateAction<StoreMode>>;
};

export function StoreModeWrap({
  coin,
  currentMode,
  setStoreMode,
}: StoreModeWrapProps) {
  const setModal = useSetRecoilState<Modal>(modalState);

  const handleManual = () => {
    setModal({
      modalName: 'STORE-MANUAL',
      storeManual: {
        radioMode: 'COIN_POLICY',
      },
    });
  };

  const viewCoinHistory = () => {
    setModal({
      modalName: 'STORE-COIN_HISTORY',
      totalCoin: coin,
    });
  };

  return (
    <div>
      <div className={styles.topMenu}>
        <button className={styles.manual} onClick={handleManual}>
          매뉴얼
        </button>
        <div className={styles.coins} onClick={viewCoinHistory}>
          {coin.coin.toLocaleString()}
          <FaCoins />
        </div>
      </div>
      <StoreModeRadioBox
        mode={currentMode}
        onChange={(e) => setStoreMode(e.target.value as StoreMode)}
      />
    </div>
  );
}
