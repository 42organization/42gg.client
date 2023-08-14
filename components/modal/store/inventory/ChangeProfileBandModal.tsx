// import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { UseItemRequest } from 'types/inventoryTypes';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ChangeProfileBandModalProps = UseItemRequest;

// TODO : 주의사항 구체화 필요
const caution = ['주의사항~~~'];

// 랜덤 프로필 이미지띠 변경
export default function ChangeProfileBandModal({
  receiptId,
}: ChangeProfileBandModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useRecoilValue(userState);

  return (
    <div className={styles.container}>
      <div className={styles.title}>아이디 색상 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>색상 선택</div>
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
            value='등록'
            onClick={() => resetModal()}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
