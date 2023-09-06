import { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest, UseIdColorRequest } from 'types/inventoryTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import ColorPicker from 'components/modal/store/inventory/ColorPicker';
import IdPreviewComponent from 'components/modal/store/inventory/IdPreviewComponent';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ChangeIdColorModalProps = UseItemRequest;

// TODO : 주의사항 구체화 필요
const caution = [
  '아이템을 사용한 후에는 취소가 불가능합니다.',
  '색상 변경은 아이템 당 1회만 가능합니다.',
];

// error types
const errorCode = [
  'IT200',
  'RC200',
  'RC100',
  'RC403',
  'UR100',
  'UR403',
] as const;

type errorCodeType = (typeof errorCode)[number];

type errorPayload = {
  status: number;
  message: string;
  code: errorCodeType;
};

const errorMessages: Record<errorCodeType, string> = {
  IT200: '사용할 수 없는 아이템입니다.',
  RC200: '이미 사용한 아이템입니다.',
  RC100: '사용할 수 없는 아이템입니다.',
  RC403: '사용할 수 없는 아이템입니다.',
  UR100: 'USER NOT FOUND', // setError로 alert 띄우지 않고 처리
  UR403: '유효하지 않은 색깔입니다.',
};

export default function ChangeIdColorModal({
  receiptId,
}: ChangeIdColorModalProps) {
  const setError = useSetRecoilState(errorState);
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
      await instance.patch('/pingpong/users/text-color', data);
      alert('아이디 색상이 변경되었습니다.');
    } catch (error: unknown) {
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (code === 'UR100') setError('JY02');
        else if (errorCode.includes(code)) alert(errorMessages[code]);
        else setError('JY02');
      } else setError('JY02');
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
