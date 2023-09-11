import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { FaArrowRight } from 'react-icons/fa';
import { TbQuestionMark } from 'react-icons/tb';
import { UseItemRequest } from 'types/inventoryTypes';
import { instance, isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import useUploadImg from 'hooks/useUploadImg';
import styles from 'styles/modal/store/InventoryModal.module.scss';
import { ItemCautionContainer } from './ItemCautionContainer';

type ProfileImageProps = UseItemRequest;

// TODO : 주의사항 문구 확정 필요
const cautions = [
  '변경한 프로필 이미지는 취소할 수 없습니다.',
  '프로필 이미지는 50KB 이하의 jpg 파일만 업로드 가능합니다.', // api 명세에 따라 변경될 수 있음
  '관리자의 판단 결과 부적절한 이미지는 삭제될 수 있습니다.',
];

// error types
const errorCode = [
  'IT200',
  'RC200',
  'RC100',
  'RC403',
  'UR100',
  'UR200',
  'UR401',
  'UR402',
] as const;

type errorCodeType = (typeof errorCode)[number];

type errorPayload = {
  status: number;
  message: string;
  code: errorCodeType;
};

const message = {
  SUCCESS: '프로필 이미지가 변경되었습니다.',
  ITEM_ERROR: '사용할 수 없는 아이템입니다.',
  USER_ERROR: 'USER NOT FOUND',
  NULL_ERROR: '이미지를 선택해주세요.',
  FORMAT_ERROR: '프로필 이미지는 50KB 이하의 jpeg 파일만 업로드 가능합니다.',
};

const errorMessage: Record<errorCodeType, string> = {
  IT200: message.ITEM_ERROR,
  RC200: message.ITEM_ERROR,
  RC100: message.ITEM_ERROR,
  RC403: message.ITEM_ERROR,
  UR100: message.USER_ERROR, // alert을 띄우지 않고 setError만 호출
  UR200: message.NULL_ERROR,
  UR401: message.FORMAT_ERROR,
  UR402: message.FORMAT_ERROR,
};

export default function ProfileImageModal({ receiptId }: ProfileImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setError = useSetRecoilState(errorState);
  const user = useRecoilValue(userState);
  const resetModal = useResetRecoilState(modalState);
  const { imgData, imgPreview, uploadImg } = useUploadImg({
    maxSizeMB: 0.03,
    maxWidthOrHeight: 150,
  });

  async function handleProfileImageUpload() {
    if (!imgData) {
      alert(message.NULL_ERROR);
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        'userProfileImageRequestDto',
        new Blob([JSON.stringify({ receiptId: receiptId })], {
          type: 'application/json',
        })
      );
      formData.append(
        'profileImage',
        new Blob([imgData], { type: 'image/jpeg' })
      );
      await instance.post('/pingpong/users/profile-image', formData);
      alert(message.SUCCESS);
    } catch (error: unknown) {
      if (isAxiosError<errorPayload>(error) && error.response) {
        const { code } = error.response.data;
        if (code === 'UR100') setError('JY08');
        else if (errorCode.includes(code)) alert(errorMessage[code]);
        else setError('JY08');
      } else setError('JY08');
    } finally {
      setIsLoading(false);
      resetModal();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 이미지 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <form
            id='profile-image-form'
            className={styles.profilePreviewContainer}
          >
            <Image
              src={user.userImageUri}
              width={80}
              height={80}
              alt='profile image'
            />
            <FaArrowRight />
            <label>
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
              <input
                type='file'
                accept='image/jpeg'
                style={{ display: 'none' }}
                onChange={uploadImg}
              />
            </label>
          </form>
          <ItemCautionContainer caution={cautions} />
        </div>
        <ModalButtonContainer>
          <ModalButton
            style='negative'
            value='취소'
            onClick={() => resetModal()}
          />
          <ModalButton
            style='positive'
            value='변경하기'
            form='profile-image-form'
            onClick={() => handleProfileImageUpload()}
            isLoading={isLoading}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
