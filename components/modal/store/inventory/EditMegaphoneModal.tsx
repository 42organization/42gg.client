import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UseItemRequest } from 'types/inventoryTypes';
import { mockInstance } from 'utils/mockAxios';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { MegaphoneContainer } from 'components/Layout/MegaPhone';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type EditMegaphoneProps = UseItemRequest;
type MegaphoneData = {
  megaphoneId: number;
  content: string;
};

const caution = [
  '매일 23:55 - 00:05 사이에는 확성기를 삭제할 수 없습니다.',
  '삭제한 확성기는 다시 복구할 수 없습니다.',
];

const failMessage = '확성기 데이터를 불러오는데 실패했습니다.';

export default function EditMegaphoneModal({ receiptId }: EditMegaphoneProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useRecoilValue(userState);
  const [megaphoneData, setMegaphoneData] = useState<MegaphoneData>({
    megaphoneId: -1,
    content: '',
  });
  const getMegaphoneData = useMockAxiosGet<MegaphoneData>({
    url: `/megaphones/receipt/${receiptId}`,
    setState: setMegaphoneData,
    err: 'JY05',
    type: 'setError',
  });
  useEffect(() => {
    getMegaphoneData();
  }, []);

  function handleDeleteMegaphone() {
    const confirm = window.confirm(
      '확성기를 삭제하시겠습니까?\n삭제한 확성기는 다시 복구할 수 없습니다.'
    );
    if (!confirm) return;
    mockInstance
      .delete(`/megaphones/${megaphoneData.megaphoneId}`)
      .then(() => {
        alert('확성기가 삭제되었습니다.');
        resetModal();
        // TODO : 삭제 이후에 item 목록에 삭제된 확성기가 보이지 않는지 확인 필요함.
      })
      .catch(() => {
        // TODO : 에러 코드 정의 필요함.
        alert('확성기 삭제에 실패했습니다.');
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>확성기 삭제</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>확성기 문구</div>
          <div>
            {megaphoneData.content === '' ? failMessage : megaphoneData.content}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <MegaphoneContainer play={'running'} clickPause={() => void 0}>
            {megaphoneData.content === '' ? (
              <li>{failMessage}</li>
            ) : (
              <li>
                {user.intraId} : {megaphoneData.content}
              </li>
            )}
          </MegaphoneContainer>
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
            value='삭제하기'
            onClick={() => handleDeleteMegaphone()}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
