import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest } from 'types/inventoryTypes';
import { Modal } from 'types/modalTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { ITEM_ALERT_MESSAGE } from 'constants/store/itemAlertMessage';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import GachaBall from 'components/modal/store/inventory/GachaBall';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ChangeProfileEdgeModalProps = UseItemRequest;

const caution = [
  '색상은 랜덤으로 결정됩니다.',
  '아이템을 사용한 후에는 취소가 불가능합니다.',
];

const errorCode = ['IT200', 'RC200', 'RC100', 'RC403', 'UR100'] as const;

type errorCodeType = (typeof errorCode)[number];

type errorPayload = {
  status: number;
  message: string;
  code: errorCodeType;
};

const { COMMON } = ITEM_ALERT_MESSAGE;

const errorMessages: Record<errorCodeType, string> = {
  IT200: COMMON.ITEM_ERROR,
  RC200: COMMON.USED_ERROR,
  RC100: COMMON.ITEM_ERROR,
  RC403: COMMON.ITEM_ERROR,
  UR100: COMMON.USER_ERROR, // setError로 alert 띄우지 않고 처리
};

export default function ChangeProfileEdgeModal({
  receiptId,
}: ChangeProfileEdgeModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetModal = useResetRecoilState(modalState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const queryClient = useQueryClient();

  const gachaAction = async () => {
    const data: UseItemRequest = {
      receiptId: receiptId,
    };
    const ret = confirm(
      `정말로 사용하시겠습니까?\n(뽑은 색상은 바로 적용되며 되돌릴 수 없습니다.)`
    );
    if (!ret) return;
    setIsLoading(true);
    try {
      const res = await instance.patch('/pingpong/users/edge', data);
      queryClient.invalidateQueries('inventory');
      queryClient.invalidateQueries('user');
      setIsLoading(false);
      setModal({
        modalName: 'USE-ITEM-GACHA',
        randomItem: {
          item: 'EDGE',
          color: res.data.edge ? res.data.edge : 'BASIC',
        },
      });
    } catch (error: unknown) {
      setIsLoading(false);
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (errorCode.includes(code) && code !== 'UR100') {
          alert(errorMessages[code]);
        } else {
          setError('HB04');
        }
      } else {
        setError('HB04');
      }
      resetModal();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 이미지띠 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}></div>
          <GachaBall />
        </div>
        <ItemCautionContainer caution={caution} />
        <ModalButtonContainer>
          <ModalButton style='negative' value='취소' onClick={resetModal} />
          <ModalButton
            style='positive'
            value='뽑기'
            isLoading={isLoading}
            onClick={gachaAction}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
