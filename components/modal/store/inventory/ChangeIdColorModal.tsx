import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseIdColorRequest, UseItemData } from 'types/inventoryTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { ITEM_ALERT_MESSAGE } from 'constants/store/itemAlertMessage';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import ColorPicker from 'components/modal/store/inventory/ColorPicker';
import IdPreviewComponent from 'components/modal/store/inventory/IdPreviewComponent';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import { useUser } from 'hooks/Layout/useUser';
import styles from 'styles/modal/store/InventoryModal.module.scss';

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

const { COMMON, ID_COLOR } = ITEM_ALERT_MESSAGE;

const errorMessages: Record<errorCodeType, string> = {
  IT200: COMMON.ITEM_ERROR,
  RC200: COMMON.USED_ERROR,
  RC100: COMMON.ITEM_ERROR,
  RC403: COMMON.ITEM_ERROR,
  UR100: COMMON.USER_ERROR, // setError로 alert 띄우지 않고 처리
  UR403: ID_COLOR.INVALID_ERROR,
};

export default function ChangeIdColorModal({
  receiptId,
  itemName,
}: UseItemData) {
  const setError = useSetRecoilState(errorState);
  const resetModal = useResetRecoilState(modalState);
  // const user = useRecoilValue(userState);
  const user = useUser();
  const [color, setColor] = useState<string>('#000000');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const pickerHandler = useCallback(() => {
    setOpenPicker((prev) => !prev);
  }, []);
  
  const queryClient = useQueryClient();

  if (!user) return null;

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
    setIsLoading(true);
    try {
      await instance.patch('/pingpong/users/text-color', data);
      alert(ID_COLOR.SUCCESS);
      queryClient.invalidateQueries('inventory');
    } catch (error: unknown) {
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (code === 'UR100') setError('JY02');
        else if (errorCode.includes(code)) alert(errorMessages[code]);
        else setError('JY02');
      } else setError('JY02');
    } finally {
      setIsLoading(false);
      resetModal();
    }
  }

  return (
    <div
      className={styles.container}
      onClick={() => (openPicker ? setOpenPicker(false) : null)}
    >
      <div className={styles.title}>{itemName}</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <IdPreviewComponent intraId={user.intraId} color={color} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>색상 선택 (HEX 코드)</div>
          <div className={styles.colorPickerWrapper}>
            <ColorPicker
              color={color}
              setColor={setColor}
              openPicker={openPicker}
              pickerHandler={pickerHandler}
            />
          </div>
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
            isLoading={isLoading}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
