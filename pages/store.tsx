import { useEffect, useState } from 'react';
import { StoreMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';
import { StoreModeWrap } from 'components/mode/modeWraps/StoreModeWrap';
import { Inventory } from 'components/store/Inventory';
import ItemsList from 'components/store/purchase/ItemsList';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/store/StoreContainer.module.scss';

export default function Store() {
  const [mode, setMode] = useState<StoreMode>('BUY');
  const [coin, setCoin] = useState<ICoin>({ coin: 0 });
  const [updateCoin, setUpdateCoin] = useState<boolean>(true);

  const getCoin = useAxiosGet({
    url: '/pingpong/users/coin',
    setState: setCoin,
    err: 'JY01',
    type: 'setError',
  });

  useEffect(() => {
    if (updateCoin) {
      getCoin();
      setUpdateCoin(false);
    }
  }, [updateCoin]);

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
