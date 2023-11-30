import dynamic from 'next/dynamic';
import { MdPeopleAlt } from 'react-icons/md';
import { ITournamentEditInfo } from 'types/admin/adminTournamentTypes';
import { QUILL_FORMATS } from 'types/quillTypes';
import { dateToString } from 'utils/handleTime';
import {
  ModalButton,
  ModalButtonContainer,
} from 'components/modal/ModalButton';
import styles from 'styles/admin/tournament/TournamentModalPreview.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface TournamentModalPreviewProps {
  tournamentEditInfo: ITournamentEditInfo;
}

export default function TournamentModalPreview({
  tournamentEditInfo,
}: TournamentModalPreviewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.closeButtonContainer}>
        <div className={styles.modalButtonContainer}>
          <div className={styles['close']}>
            <input type='button' value={'X'} />
          </div>
        </div>
      </div>
      <div className={styles.title}>{tournamentEditInfo.title}</div>
      <div className={styles.tournamentInfo}>
        <div className={styles.startTime}>
          {dateToString(tournamentEditInfo.startTime)}
        </div>
        <div className={styles.participants}>
          <MdPeopleAlt />
          <div className={styles.player}>0 / 8</div>
        </div>
      </div>
      <Quill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={tournamentEditInfo.contents}
        theme='bubble'
      />
      <div>
        <div className={styles.closeButtonContainer}>
          <div className={styles.modalButtonContainer}>
            <div className={styles['positive']}>
              <input type='button' value={'등록'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
