import { useResetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import BackgroundPreview from 'components/modal/store/inventory/BackgroundPreview';
import EdgePreview from 'components/modal/store/inventory/EdgePreview';
import styles from 'styles/modal/store/GachaModal.module.scss';

type GachaModalProps = {
  randomItem: string;
};

export default function GachaModal({ randomItem }: GachaModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const randomBall = 'ball' + Math.floor(Math.random() * 11).toString();
  return (
    <div className={styles.container}>
      <div className={styles.ball}>
        <div className={`${styles[randomBall]}`}></div>
      </div>
      {/* TODO: 업데이트된 유저 정보 받기 */}
      {randomItem === 'edge' ? <EdgePreview /> : <BackgroundPreview />}
      <div className={styles.button}>
        <ModalButtonContainer>
          <ModalButton
            style='positive'
            value='확인'
            onClick={() => resetModal()}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
