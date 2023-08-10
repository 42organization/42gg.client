import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { Modal } from 'types/modalTypes';
import { FaCoins } from 'react-icons/fa';
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

  return (
    <div>
      <div className={styles.topMenu}>
        <button className={styles.manual} onClick={handleManual}>
          매뉴얼
        </button>
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
