import Image from 'next/image';
import { Tooltip } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsGiftFill, BsCircleFill } from 'react-icons/bs';
import { InventoryItem } from 'types/inventoryTypes';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/store/Inventory.module.scss';

type inventoryItemProps = {
  item: InventoryItem;
};

export function InvetoryItem({ item }: inventoryItemProps) {
  const user = useRecoilValue(userState);
  const setModal = useSetRecoilState(modalState);

  const {
    receiptId,
    itemName,
    imageUri,
    purchaserIntra,
    itemType,
    itemStatus,
  } = item;

  function handleUseItem() {
    setModal({
      modalName: `USE-ITEM-${item.itemType}`,
      useItemInfo: {
        receiptId: item.receiptId,
      },
    });
  }

  function handleEditItem() {
    if (itemType !== 'MEGAPHONE') {
      alert('편집할 수 없는 아이템입니다.');
      return;
    }
    setModal({
      modalName: `EDIT-ITEM-MEGAPHONE`,
      useItemInfo: {
        receiptId: item.receiptId,
      },
    });
  }

  function handleTouch(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault();
    itemStatus === 'USING' ? handleEditItem() : handleUseItem();
  }

  return (
    <div key={receiptId} className={styles.inventoryItem}>
      <div className={styles.badgeContainer}>
        {user.intraId !== purchaserIntra && (
          <Tooltip
            title={`from ${purchaserIntra}`}
            className={styles.giftBadge}
          >
            <button>
              <BsGiftFill />
            </button>
          </Tooltip>
        )}
        <div
          className={`${styles.usingBadge} ${
            styles[itemStatus === 'USING' ? 'using' : 'before']
          }`}
        >
          <BsCircleFill /> {itemStatus === 'USING' ? '사용중' : '사용 전'}
        </div>
      </div>
      <div className={styles.overlay}>
        {itemStatus === 'USING' ? (
          <button onClick={handleEditItem}>삭제하기</button>
        ) : (
          <button onClick={handleUseItem}>사용하기</button>
        )}
      </div>
      <div onTouchEnd={handleTouch}>
        <div className={styles.imgContainer}>
          <Image className={styles.img} src={imageUri} alt={itemName} fill />
        </div>
        <div className={styles.itemName}>{itemName}</div>
      </div>
    </div>
  );
}
