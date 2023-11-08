import dynamic from 'next/dynamic';
import { useSetRecoilState } from 'recoil';
import { TournamentInfo } from 'types/modalTypes';
import { QUILL_FORMATS } from 'types/quillTypes';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/event/AnnouncementModal.module.scss';
import 'react-quill/dist/quill.bubble.css';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function TournamentRegistryModal({
  title,
  contents,
  startDate,
  status,
  type,
  winnerId,
  winnerImage,
  endDate,
}: TournamentInfo) {
  const setModal = useSetRecoilState(modalState);

  const registTournament = () => {
    console.log('토너먼트에 등록하시겠습니까.');
  };

  const closeModalButtonHandler = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.title}>{startDate}</div>
      <Quill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={contents}
        theme='bubble'
      />
      <div>
        <ModalButtonContainer>
          <ModalButton
            onClick={closeModalButtonHandler}
            value='나가기'
            style='positive'
          />
        </ModalButtonContainer>
        <ModalButtonContainer>
          <ModalButton
            onClick={registTournament}
            value='등록'
            style='positive'
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
