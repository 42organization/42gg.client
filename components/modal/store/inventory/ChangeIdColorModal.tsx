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
import IdPreviewComponent from './IdPreviewComponent';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ChangeIdColorModalProps = UseItemRequest;

export default function ChangeIdColorModal({
  receiptId,
}: ChangeIdColorModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useRecoilValue(userState);
  const [color, setColor] = useState<string>('#000000');
  return (
    <div className={styles.container}>
      <div className={styles.title}>아이디 색상 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <IdPreviewComponent color={color} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>색상 선택</div>
          <div className={styles.colorPicker}>
            <HexColorPicker color={color} onChange={setColor} />
            <HexColorInput color={color} onChange={setColor} prefixed alpha />
          </div>
        </div>
        <ModalButtonContainer>
          <ModalButton
            style='negative'
            value='취소'
            onClick={() => resetModal()}
          />
          <ModalButton style='positive' value='등록' onClick={() => void 0} />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
