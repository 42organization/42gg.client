import dynamic from 'next/dynamic';
import { MdPeopleAlt } from 'react-icons/md';
import { ITournamentEditInfo } from 'types/admin/adminTournamentTypes';
import { QUILL_FORMATS } from 'types/quillTypes';
import { dateToString } from 'utils/handleTime';
import DynamicQuill from 'components/DynamicQuill';
import styles from 'styles/admin/tournament/TournamentModalPreview.module.scss';

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
        <div className={styles.startTime}>{tournamentEditInfo.startTime}</div>
        <div className={styles.participants}>
          <MdPeopleAlt />
          <div className={styles.player}>0 / 8</div>
        </div>
      </div>
      <DynamicQuill
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
