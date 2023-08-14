import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { UseItemRequest, UseIdColorRequest } from 'types/inventoryTypes';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { ItemCautionContainer } from './ItemCautionContainer';
import IdPreviewComponent from './IdPreviewComponent';
import styles from 'styles/modal/store/InventoryModal.module.scss';
import ColorPicker from './ColorPicker';
import { mockInstance } from 'utils/mockAxios';

type ChangeIdColorModalProps = UseItemRequest;

// TODO : 주의사항 구체화 필요
const caution = [
  '아이템을 사용한 후에는 취소가 불가능합니다.',
  '색상 변경은 아이템 당 1회만 가능합니다.',
];

export default function ChangeIdColorModal({
  receiptId,
}: ChangeIdColorModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useRecoilValue(userState);
  const [color, setColor] = useState<string>('#000000');

  async function handleChangeIdColor() {
    const data: UseIdColorRequest = {
      receiptId: receiptId,
      textColor: color,
    };
    // 색상 입력값 확인.
    const ret = confirm(
      `아이디 색상을 ${color}로 변경하시겠습니까?\n(아이템을 사용한 후에는 취소가 불가능합니다.)`
    );
    if (!ret) return;
    try {
      // await mockInstance.post('/users/text-color', data);
      // NOTE : 테스트를 위해 응답 body를 console에 출력 <- 아이디 색상 변경 결과 확인. 추후 삭제
      const response = await mockInstance.patch('/users/text-color', data);
      console.log(response.data);
      //
      alert('아이디 색상이 변경되었습니다.');
    } catch (error: unknown) {
      // TODO : error 정의 필요
      console.log(error);
    } finally {
      resetModal();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>아이디 색상 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <IdPreviewComponent intraId={user.intraId} color={color} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>색상 선택</div>
          <ColorPicker color={color} setColor={setColor} />
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
            onClick={() => handleChangeIdColor()}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
