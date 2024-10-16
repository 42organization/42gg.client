import { useResetRecoilState } from 'recoil';
import { IRandomItem } from 'types/takgu/modalTypes';
import { modalState } from 'utils/recoil/takgu/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/takgu/modal/ModalButton';
import BackgroundPreview from 'components/takgu/modal/store/inventory/BackgroundPreview';
import EdgePreview from 'components/takgu/modal/store/inventory/EdgePreview';
import GachaConfetti from 'components/takgu/modal/store/inventory/GachaConfetti';
import styles from 'styles/takgu/modal/store/GachaModal.module.scss';

export default function GachaModal({ item, color }: IRandomItem) {
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
