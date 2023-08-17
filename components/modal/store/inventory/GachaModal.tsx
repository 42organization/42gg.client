import { useResetRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/GachaModal.module.scss';

export default function GachaModal() {
  // 미리보기에 사용할 예정
  const user = useRecoilValue(userState);
  const resetModal = useResetRecoilState(modalState);
  return (
    <div>
      {/* TODO: 뽑기 당첨 애니메이션 적용 */}
      <div className={styles.randomBox}>
        <div className={styles.capsule}></div>
      </div>
      {/* TODO: 애니메이션이 끝나면 미리보기 결과와 확인 버튼 보이도록 하기 */}
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
