import { useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest } from 'types/inventoryTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { ITEM_ALERT_MESSAGE } from 'constants/store/itemAlertMessage';
import { MegaphoneItem } from 'components/Layout/MegaPhone';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import { ItemCautionContainer } from 'components/modal/store/inventory/ItemCautionContainer';
import { useUser } from 'hooks/Layout/useUser';
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

const loadingMessage = '확성기 불러오는 중... ᪤ࡇ᪤';

const errorCode = ['ME200', 'RC500', 'RC200'] as const;

type errorCodeType = (typeof errorCode)[number];

type errorPayload = {
  status: number;
  message: string;
  code: errorCodeType;
};

const { EDIT_MEGAPHONE } = ITEM_ALERT_MESSAGE;

const errorMessages: Record<errorCodeType, string> = {
  ME200: EDIT_MEGAPHONE.NOT_FOUND_ERROR,
  RC500: EDIT_MEGAPHONE.ITEM_ERROR,
  RC200: EDIT_MEGAPHONE.ITEM_ERROR,
};

export default function EditMegaphoneModal({ receiptId }: EditMegaphoneProps) {
  const resetModal = useResetRecoilState(modalState);
  const user = useUser();
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
        alert(EDIT_MEGAPHONE.SUCCESS);
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

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>확성기 삭제</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <MegaphoneItem
            content={
              megaphoneData.content ? megaphoneData.content : loadingMessage
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
