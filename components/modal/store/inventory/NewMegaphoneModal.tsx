import { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest, UseMegaphoneRequest } from 'types/inventoryTypes';
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
import styles from 'styles/modal/store/InventoryModal.module.scss';

type NewMegaphoneProps = UseItemRequest;

const MAX_LENGTH = 30;

// TODO : 주의사항 구체화 필요
const caution = [
  '매일 23:55 - 00:05 사이에는 확성기를 등록할 수 없습니다.',
  '등록된 확성기는 다음날 00시부터 24시간 동안 보입니다.',
  '등록 이후에는 취소만 가능하고 수정은 불가능합니다.',
  '관리자의 판단에 따라 부적절한 내용의 확성기는 삭제될 수 있습니다.',
];

const errorCode = [
  'ME200',
  'RC100',
  'RC500',
  'IT200',
  'RC200',
  'CM007',
] as const;

type errorCodeType = (typeof errorCode)[number];

type errorPayload = {
  status: number;
  message: string;
  code: errorCodeType;
};

const { COMMON, MEGAPHONE } = ITEM_ALERT_MESSAGE;

const errorMessages: Record<errorCodeType, string> = {
  ME200: MEGAPHONE.TIME_ERROR,
  RC100: COMMON.ITEM_ERROR,
  RC500: COMMON.ITEM_ERROR,
  IT200: COMMON.ITEM_ERROR,
  RC200: COMMON.USED_ERROR,
  CM007: MEGAPHONE.FORMAT_ERROR,
};

export default function NewMegaphoneModal({ receiptId }: NewMegaphoneProps) {
  const user = useUser();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  async function handleUseMegaphone() {
    if (content.length === 0) {
      alert(MEGAPHONE.NULL_ERROR);
      return;
    }
    const data: UseMegaphoneRequest = {
      receiptId: receiptId,
      content: content,
    };
    setIsLoading(true);
    try {
      await instance.post('/pingpong/megaphones', data);
      alert(MEGAPHONE.SUCCESS);
    } catch (error: unknown) {
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (errorCode.includes(code) && code !== 'RC100')
          alert(errorMessages[code]);
        else setError('JY06');
      } else setError('JY06');
    } finally {
      setIsLoading(false);
      resetModal();
    }
  }

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>확성기 등록</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <MegaphoneItem
            content={
              content.length === 0 ? '등록할 내용을 입력해주세요' : content
            }
            intraId={user.intraId}
          />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>확성기 메시지 편집</div>
          <div className={styles.textArea}>
            <textarea
              value={content}
              rows={1}
              name='newMegaphoneContent'
              onChange={(e) => {
                let input = e.target.value;
                if (e.target.value.length > MAX_LENGTH)
                  input = e.target.value.slice(0, MAX_LENGTH);
                setContent(input);
              }}
              maxLength={MAX_LENGTH}
              placeholder='확성기 내용을 입력해주세요.'
            ></textarea>
            <div>
              {content.length}/{MAX_LENGTH}
            </div>
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
            onClick={() => handleUseMegaphone()}
            isLoading={isLoading}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
