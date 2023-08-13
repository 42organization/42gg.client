import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { UseItemRequest } from 'types/inventoryTypes';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ChangeIdColorModalProps = UseItemRequest;

export default function ChangeIdColorModal({
  receiptId,
}: ChangeIdColorModalProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>아이디 색상 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          {/* 랭크와 일반 버전 두개 미리 보기 */}
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>색상 선택</div>
          <div className={styles.colorPicker}>
            <HexColorPicker />
            <HexColorInput />
          </div>
        </div>
      </div>
    </div>
  );
}
