import { useResetRecoilState, useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import BackgroundPreview from 'components/modal/store/inventory/BackgroundPreview';
import EdgePreview from 'components/modal/store/inventory/EdgePreview';
import useBasicProfile from 'hooks/users/useBasicProfile';
import styles from 'styles/modal/store/GachaModal.module.scss';

type GachaModalProps = {
  randomItem: string;
};

export default function GachaModal({ randomItem }: GachaModalProps) {
  const resetModal = useResetRecoilState(modalState);
  const { intraId } = useRecoilValue(userState);
  const { userImageUri, edge, backgroundType } = useBasicProfile({
    profileId: intraId,
  });
  const randomBall = 'ball' + Math.floor(Math.random() * 11).toString();
  return (
    <div className={styles.container}>
      <div className={styles.ball}>
        <div className={`${styles[randomBall]}`}></div>
      </div>
      {randomItem === 'edge' ? (
        <EdgePreview userImageUri={userImageUri} edge={edge} />
      ) : (
        <BackgroundPreview backgroundType={backgroundType} />
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
