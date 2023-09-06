import { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest } from 'types/inventoryTypes';
import { Modal } from 'types/modalTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
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

export default function ChangeProfileEdgeModal({
  receiptId,
}: ChangeProfileEdgeModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetModal = useResetRecoilState(modalState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState<string>(errorState);

  const gachaAction = async () => {
    setIsLoading(true);
    const data: UseItemRequest = {
      receiptId: receiptId,
    };
    try {
      const res = await instance.patch('/pingpong/users/edge', data);
      setModal({
        modalName: 'USE-ITEM-GACHA',
        randomItem: {
          item: 'EDGE',
          color: res.data.edge,
        },
      });
      setIsLoading(false);
    } catch (error) {
      // TODO: 에러 코드 확인 후 수정
      alert('뽑기에 실패했습니다(˃̣̣̥ᴖ˂̣̣̥) 관리자에게 문의해주세요');
      setIsLoading(false);
      setError('HB04');
      resetModal();
    }
    setIsLoading(false);
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
