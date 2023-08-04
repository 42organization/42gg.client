import React from 'react';
import { InvetoryItem } from './InventoryItem';
import { InfinityScroll } from 'utils/infinityScroll';
import { mockInstance } from 'utils/mockAxios';
import styles from 'styles/store/Inventory.module.scss';

function fetchInventoryData(page: number) {
  return mockInstance.get(`items?page=${page}&size=${8}`).then((res) => {
    return res.data;
  });
}

export function InventoryList() {
  const { data, error, isLoading, hasNextPage, fetchNextPage } = InfinityScroll(
    'inventory',
    fetchInventoryData,
    'JY03'
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className={styles.inventoryList}>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.storageItemList.map((item) => (
            <InvetoryItem key={item.itemId} item={item} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
