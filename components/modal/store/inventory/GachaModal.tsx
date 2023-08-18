import { useResetRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
// import styles from 'styles/modal/store/GachaModal.module.scss';
import { EdgePreview } from './EdgePreview';

export default function GachaModal() {
  const user = useRecoilValue(userState);
  const resetModal = useResetRecoilState(modalState);
  return (
    <div>
      {/* 미리보기용 임시 컴포넌트입니다 */}
      <EdgePreview />
      <ModalButtonContainer>
        <ModalButton
          style='positive'
          value='확인'
          onClick={() => resetModal()}
        />
      </ModalButtonContainer>
    </div>
  );
}
