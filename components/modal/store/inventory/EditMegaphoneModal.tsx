import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { UseItemRequest } from 'types/inventoryTypes';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';
import { MegaphoneContainer } from 'components/Layout/MegaPhone';

type EditMegaphoneProps = UseItemRequest;

const caution = [
  '매일 23:55 - 00:05 사이에는 확성기를 삭제할 수 없습니다.',
  '삭제한 확성기는 다시 복구할 수 없습니다.',
];

export default function EditMegaphoneModal({ receiptId }: EditMegaphoneProps) {
  const resetModal = useResetRecoilState(modalState);

  return (
    <div className={styles.container}>
      <div className={styles.title}>확성기 삭제</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <MegaphoneContainer play={'running'} clickPause={() => void 0}>
            확성기 내용
          </MegaphoneContainer>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>주의사항</div>
          <ItemCautionContainer caution={caution} />
        </div>
      </div>
    </div>
  );
}
