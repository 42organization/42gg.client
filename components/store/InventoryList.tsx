import React from 'react';
import { instance } from 'utils/axios';
import { InfinityScroll } from 'utils/infinityScroll';
import EmptyImage from 'components/EmptyImage';
import { InfiniteScrollComponent } from 'components/store/InfiniteScrollComponent';
import { InvetoryItem } from 'components/store/InventoryItem';
import styles from 'styles/store/Inventory.module.scss';

function fetchInventoryData(page: number) {
  return instance.get(`/pingpong/items?page=${page}&size=${8}`).then((res) => {
    return res.data;
  });
}

export function InventoryList() {
  const { data, error, isLoading, hasNextPage, fetchNextPage } = InfinityScroll(
    'inventory',
    fetchInventoryData,
    'JY04'
  );

  // TODO : 에러 컴포넌트 구체화 필요함.
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No data</div>;

  if (data.pages[0].storageItemList.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        <p>
          보유한 아이템이 없습니다.
          <br /> 상점 탭에서 아이템을 구입해 보세요!
        </p>
        <EmptyImage />
      </div>
    );
  }

  return (
    <div className={styles.inventoryList}>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.storageItemList.length === 0
            ? null
            : page.storageItemList.map((item) => (
                <InvetoryItem key={item.receiptId} item={item} />
              ))}
        </React.Fragment>
      ))}
      <InfiniteScrollComponent
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
