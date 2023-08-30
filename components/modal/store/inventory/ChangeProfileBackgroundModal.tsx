import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest } from 'types/inventoryTypes';
import { Modal } from 'types/modalTypes';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import GachaBall from 'components/modal/store/inventory/GachaBall';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ChangeProfileBackgroundModalProps = UseItemRequest;

// TODO : 주의사항 구체화 필요
const caution = [
  '색상은 랜덤으로 결정됩니다.',
  '아이템을 사용한 후에는 취소가 불가능합니다.',
];

export default function ChangeProfileBackgroundModal({
  receiptId,
}: ChangeProfileBackgroundModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState<string>(errorState);

  const gachaAction = async () => {
    const data: UseItemRequest = {
      receiptId: receiptId,
    };
    try {
      const res = await mockInstance.patch('/users/background', data);
      setModal({
        modalName: 'USE-ITEM-GACHA',
        randomItem: {
          item: 'background',
          color: res.data,
        },
      });
    } catch (error) {
      setError('HB05');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 배경색 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}></div>
          <GachaBall />
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
