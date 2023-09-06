import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { updateCoinState } from 'utils/recoil/updateCoin';
import { StoreModeWrap } from 'components/mode/modeWraps/StoreModeWrap';
import { Inventory } from 'components/store/Inventory';
import ItemsList from 'components/store/purchase/ItemsList';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/store/StoreContainer.module.scss';

export default function Store() {
  const [mode, setMode] = useState<StoreMode>('BUY');
  const [coin, setCoin] = useState<ICoin>({ coin: 0 });
  const [reloadCoin, updateCoin] = useRecoilState(updateCoinState);
  const resetUpdateCoinState = useResetRecoilState(updateCoinState);

  const getCoin = useAxiosGet({
    url: '/pingpong/users/coin',
    setState: setCoin,
    err: 'JY01',
    type: 'setError',
  });

  useEffect(() => {
    getCoin();
    return () => {
      resetUpdateCoinState();
    };
  }, []);

  useEffect(() => {
    if (reloadCoin) {
      getCoin();
      updateCoin(false);
    }
  }, [reloadCoin]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>GG Store</h1>
      <StoreModeWrap currentMode={mode} setStoreMode={setMode} coin={coin} />
      <div className={styles.storeContainer}>
        {mode === 'BUY' ? <ItemsList coin={coin.coin} /> : <Inventory />}
      </div>
    </div>
  );
}
