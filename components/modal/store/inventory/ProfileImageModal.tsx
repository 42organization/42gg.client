import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { FaArrowRight } from 'react-icons/fa';
import { UseItemRequest } from 'types/inventoryTypes';
import { modalState } from 'utils/recoil/modal';
import { userState } from 'utils/recoil/layout';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ProfileImageProps = UseItemRequest;

export default function ProfileImageModal({ receiptId }: ProfileImageProps) {
  const resetModal = useResetRecoilState(modalState);
  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 이미지 변경</div>
      <div className={styles.phrase}>
        {/* 기존 프로필 */}
        <FaArrowRight />
        {/* 새로운 프로필 (업로드와 프리뷰) */}
        <ModalButtonContainer>
          <ModalButton
            style='negative'
            value='취소'
            onClick={() => resetModal()}
          />
          <ModalButton
            style='positive'
            value='삭제하기'
            onClick={() => void 0}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
