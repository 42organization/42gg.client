import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
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
  return (
    <div>
      <div className={styles.topMenu}>
        <button>매뉴얼</button>
        <div className={styles.coins}>
          {coin.coin}
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
