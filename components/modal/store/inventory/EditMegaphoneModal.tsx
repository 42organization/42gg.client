import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest } from 'types/inventoryTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { MegaphoneItem } from 'components/Layout/MegaPhone';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import useAxiosGet from 'hooks/useAxiosGet';
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

const errorCode = ['ME200', 'RC500', 'RC200'] as const;

type errorCodeType = (typeof errorCode)[number];

type errorPayload = {
  status: number;
  message: string;
  code: errorCodeType;
};

const errorMessages: Record<errorCodeType, string> = {
  ME200: '확성기를 찾을 수 없습니다.',
  RC500: '삭제할 수 없는 확성기입니다.',
  RC200: '삭제할 수 없는 확성기입니다.',
};

export default function EditMegaphoneModal({ receiptId }: EditMegaphoneProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useRecoilValue(userState);
  const [megaphoneData, setMegaphoneData] = useState<MegaphoneData>({
    megaphoneId: -1,
    content: '',
  });
  const setError = useSetRecoilState(errorState);
  const getMegaphoneData = useAxiosGet<MegaphoneData>({
    url: `/pingpong/megaphones/receipt/${receiptId}`,
    setState: setMegaphoneData,
    err: 'JY05',
    type: 'setError',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getMegaphoneData();
  }, []);

  function handleDeleteMegaphone() {
    const confirm = window.confirm(
      '확성기를 삭제하시겠습니까?\n삭제한 확성기는 다시 복구할 수 없습니다.'
    );
    if (!confirm) return;
    setIsLoading(true);
    instance
      .delete(`/pingpong/megaphones/${megaphoneData.megaphoneId}`)
      .then(() => {
        alert('확성기가 삭제되었습니다.');
      })
      .catch((error: unknown) => {
        if (isAxiosError<errorPayload>(error) && error.response) {
          const { code } = error.response.data;
          if (errorCode.includes(code) && code !== 'ME200')
            alert(errorMessages[code]);
          else setError('JY07');
        } else setError('JY07');
      })
      .finally(() => {
        setIsLoading(false);
        resetModal();
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>확성기 삭제</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <MegaphoneItem
            content={
              megaphoneData.content === '' ? failMessage : megaphoneData.content
            }
            intraId={user.intraId}
          />
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
            isLoading={isLoading}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
