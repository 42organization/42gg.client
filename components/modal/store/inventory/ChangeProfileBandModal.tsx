// import { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { UseItemRequest } from 'types/inventoryTypes';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { Modal } from 'types/modalTypes';
import styles from 'styles/modal/store/InventoryModal.module.scss';
import GachaMachine from './GachaMachine';
import GachaBall from './GachaBall';

type ChangeProfileBandModalProps = UseItemRequest;

// TODO : 주의사항 구체화 필요
const caution = [
  '색상은 랜덤으로 결정됩니다.',
  '아이템을 사용한 후에는 취소가 불가능합니다.',
];

// 랜덤 프로필 이미지띠 변경
export default function ChangeProfileBandModal({
  receiptId,
}: ChangeProfileBandModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useRecoilValue(userState);
  const setModal = useSetRecoilState<Modal>(modalState);

  const gachaAction = () => {
    setModal({
      modalName: 'USE-ITEM-GACHA',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 이미지띠 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}></div>
          <GachaMachine />
          {/* <GachaBall /> */}
        </div>
        <ItemCautionContainer caution={caution} />
        <ModalButtonContainer>
          <ModalButton
            style='negative'
            value='취소'
            onClick={() => resetModal()}
          />
          <ModalButton
            style='positive'
            value='뽑기'
            onClick={() => gachaAction()}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
