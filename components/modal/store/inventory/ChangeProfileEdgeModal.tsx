import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { UseItemRequest } from 'types/inventoryTypes';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { Modal } from 'types/modalTypes';
import styles from 'styles/modal/store/InventoryModal.module.scss';
import GachaBall from './GachaBall';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';

type ChangeProfileEdgeModalProps = UseItemRequest;

// TODO : 주의사항 구체화 필요
const caution = [
  '색상은 랜덤으로 결정됩니다.',
  '아이템을 사용한 후에는 취소가 불가능합니다.',
];

// 랜덤 프로필 이미지띠 변경
export default function ChangeProfileEdgeModal({
  receiptId,
}: ChangeProfileEdgeModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState<string>(errorState);

  const gachaAction = async () => {
    const data: UseItemRequest = {
      receiptId: receiptId,
    };
    try {
      const res = await mockInstance.patch('/users/edge', data);
      // api 테스트용 -> 나중에 지우기
      console.log(`프로필 이미지띠: ${res.data}`);
      // 가챠 애니메이션 모달
      setModal({
        modalName: 'USE-ITEM-GACHA',
      });
    } catch (error) {
      setError('HB04');
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
