import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import StoreModeRadioBox from 'components/mode/modeItems/StoreModeRadioBox';
import styles from 'styles/mode/StoreModeWrap.module.scss';

type StoreModeWrapProps = {
  currentMode: StoreMode;
  setStoreMode: Dispatch<SetStateAction<StoreMode>>;
};

export function StoreModeWrap({
  currentMode,
  setStoreMode,
}: StoreModeWrapProps) {
  const [coin, setCoin] = useState<ICoin>({ coin: 0 });
  useEffect(() => {
    getCoin();
    // TODO : 코인이 바뀔 때 마다 다시 불러와야 한다.
  }, []);
  const getCoin = useMockAxiosGet({
    url: '/users/coin',
    setState: setCoin,
    err: 'JY01',
    type: 'setError',
  });
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
