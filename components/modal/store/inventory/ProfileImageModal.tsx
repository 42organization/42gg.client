import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { UseItemRequest } from 'types/inventoryTypes';
import { modalState } from 'utils/recoil/modal';
import { userState } from 'utils/recoil/layout';
import useUploadImg from 'hooks/useUploadImg';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';
import { TbQuestionMark } from 'react-icons/tb';

type ProfileImageProps = UseItemRequest;

export default function ProfileImageModal({ receiptId }: ProfileImageProps) {
  const user = useRecoilValue(userState);
  const resetModal = useResetRecoilState(modalState);
  const { imgData, imgPreview, uploadImg } = useUploadImg();
  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 이미지 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <div className={styles.profilePreviewContainer}>
            <Image
              src={user.userImageUri}
              width={80}
              height={80}
              alt='profile image'
            />
            <FaArrowRight />
            {imgPreview ? (
              <Image
                src={imgPreview}
                width={80}
                height={80}
                alt='new profile image'
              />
            ) : (
              <div className={styles.profilePreview}>
                <TbQuestionMark />
              </div>
            )}
          </div>
        </div>
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
