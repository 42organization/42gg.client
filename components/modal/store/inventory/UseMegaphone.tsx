import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { UseItemRequest } from 'types/inventoryTypes';
import { MegaphoneContainer } from 'components/Layout/MegaPhone';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonConatainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type UseMegaphoneProps = UseItemRequest;

const MAX_LENGTH = 30;

// TODO : 주의사항 구체화 필요
const caution = [
  '등록된 확성기는 다음날 00시부터 24시간 동안 보입니다.',
  '등록 이후에는 취소만 가능하고 수정은 불가능합니다.',
  '관리자의 판단에 따라 부적절한 내용의 확성기는 삭제될 수 있습니다.',
];

export default function UseMegaphone({ receiptId }: UseMegaphoneProps) {
  const user = useRecoilValue(userState);
  const [content, setContent] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.title}>확성기 등록</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>미리보기</div>
          <MegaphoneContainer play={'running'} clickPause={() => void 0}>
            {content.length === 0 ? (
              <li>등록할 확성기 내용을 입력해주세요.</li>
            ) : (
              <li>
                {user.intraId} : {content}
              </li>
            )}
          </MegaphoneContainer>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>확성기 메시지 편집</div>
          <div className={styles.textArea}>
            <textarea
              value={content}
              rows={1}
              name='newMegaphoneContent'
              onChange={(e) => setContent(e.target.value)}
              maxLength={MAX_LENGTH}
              placeholder='확성기 내용을 입력해주세요.'
            ></textarea>
            <div>
              {content.length}/{MAX_LENGTH}
            </div>
          </div>
        </div>
        <ItemCautionContainer caution={caution} />
        <ModalButtonConatainer>
          <ModalButton style='negative' value='취소' onClick={() => void 0} />
          <ModalButton style='positive' value='등록' onClick={() => void 0} />
        </ModalButtonConatainer>
      </div>
    </div>
  );
}
