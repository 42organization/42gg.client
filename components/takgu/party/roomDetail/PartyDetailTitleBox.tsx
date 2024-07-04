import { PartyRoomDetail } from 'types/partyTypes';
import { dateToKRLocaleTimeString, getRemainTime } from 'utils/handleTime';
import styles from 'styles/takgu/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

export default function PartyDetailTitleBox({
  categoryName,
  title,
  dueDate,
  roomId,
  content,
  status,
  minPeople,
  maxPeople,
}: PartyRoomDetail) {
  const timeViewer =
    status === 'OPEN'
      ? `마감 시간 : ${dateToKRLocaleTimeString(new Date(dueDate))}`
      : '마감';

  const startPerson =
    minPeople === maxPeople ? maxPeople : `${minPeople} ~ ${maxPeople}`;

  return (
    <div className={styles.titleBox}>
      <div className={styles.titleLine}>
        <div className={styles.tag}>
          <div className={styles.category}>{`# ${categoryName || '기타'}`}</div>
          <div className={styles.category}>{`# ${startPerson}인`}</div>
        </div>
        <PartyRoomDetailButton.ShareRoom />
      </div>
      <div className={styles.titleLine}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.endTime}>
        {timeViewer}
        <PartyRoomDetailButton.ReportRoom roomId={roomId} />
      </div>
      <hr />
      <div className={styles.detailContent}>{content}</div>
    </div>
  );
}
