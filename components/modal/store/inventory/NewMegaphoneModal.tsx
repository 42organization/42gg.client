import { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { UseItemRequest, UseMegaphoneRequest } from 'types/inventoryTypes';
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

const errorMessages: Record<errorCodeType, string> = {
  ME200: '23:55-00:05 사이에는 확성기 사용이 불가능합니다.',
  RC100: '아이템을 찾을 수 없습니다.',
  RC500: '사용 불가능한 아이템입니다.',
  IT200: '사용 불가능한 아이템입니다.',
  RC200: '이미 등록한 확성기 아이템입니다.',
  CM007: '확성기에 등록할 수 있는 글자수는 1 이상 30 이하입니다.',
};

export default function NewMegaphoneModal({ receiptId }: NewMegaphoneProps) {
  const user = useRecoilValue(userState);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetModal = useResetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  async function handleUseMegaphone() {
    if (content.length === 0) {
      alert('확성기 내용을 입력해주세요.');
      return;
    }
    const data: UseMegaphoneRequest = {
      receiptId: receiptId,
      content: content,
    };
    setIsLoading(true);
    try {
      await instance.post('/pingpong/megaphones', data);
      alert('확성기가 등록되었습니다.');
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
