import { useEffect, useState } from 'react';
import { Gift } from 'types/itemTypes';
import { PriceTag } from 'types/modalTypes';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import GiftSearchBar from 'components/store/purchase/GiftSearchBar';
import useGiftModal from 'hooks/modal/store/purchase/useGiftModal';
import styles from 'styles/modal/store/GiftModal.module.scss';

export default function GiftModal({ itemId, product, price }: PriceTag) {
  const [recipient, setRecipient] = useState<string>('');
  const [gift, setGift] = useState<Gift>({
    itemId: -1,
    ownerId: '',
  });
  const { onPurchase, onCancel } = useGiftModal(gift);

  useEffect(() => {
    setGift({
      itemId: itemId,
      ownerId: recipient,
    });
  }, [itemId, recipient]);

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🎁</div>
        <div className={styles.message}>선물하기</div>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>
            <div>아이템:</div>
            <div>{product}</div>
          </div>
          <div className={styles.itemPrice}>
            <div>가격:</div>
            <div>{price} 코인</div>
          </div>
        </div>
        <GiftSearchBar setRecipient={setRecipient} />
        {recipient !== '' && (
          <div className={styles.recipient}>
            <span>{recipient}</span>님에게 선물하시겠습니까?
          </div>
        )}
        <div className={styles.warning}>
          <p>⚠ 선물한 아이템은 환불 및 취소가 불가합니다 ⚠</p>
        </div>
      </div>
      <ModalButtonContainer>
        <ModalButton style='negative' value='취소' onClick={onCancel} />
        <ModalButton style='positive' value='보내기' onClick={onPurchase} />
      </ModalButtonContainer>
    </div>
  );
}
