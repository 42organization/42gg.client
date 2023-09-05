import { useResetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import BackgroundPreview from 'components/modal/store/inventory/BackgroundPreview';
import EdgePreview from 'components/modal/store/inventory/EdgePreview';
import GachaConfetti from 'components/modal/store/inventory/GachaConfetti';
import styles from 'styles/modal/store/GachaModal.module.scss';

type GachaModalProps = {
  item: string;
  color: string;
};

export default function GachaModal({ item, color }: GachaModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const randomBall = 'ball' + Math.floor(Math.random() * 11).toString();

  return (
    <div className={styles.container}>
      <div className={styles.ball}>
        <div className={`${styles[randomBall]}`}></div>
      </div>
      <GachaConfetti />
      {item === 'EDGE' ? (
        <EdgePreview edge={color} />
      ) : (
        <BackgroundPreview background={color} />
      )}
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
