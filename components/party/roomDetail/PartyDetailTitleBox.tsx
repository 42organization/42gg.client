import { PartyRoomStatus } from 'types/partyTypes';
import { getRemainTime } from 'utils/handleTime';
import usePartyCategory from 'hooks/party/usePartyCategory';
import styles from 'styles/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyDetailTitleBoxProps = {
  categoryId: number;
  title: string;
  roomId: number;
  dueDate: string;
  status: PartyRoomStatus;
};

export default function PartyDetailTitleBox({
  categoryId,
  title,
  roomId,
  dueDate,
  status,
}: PartyDetailTitleBoxProps) {
  const category = usePartyCategory().categories.find(
    (category) => category.categoryId === categoryId
  )?.categoryName;
  const time_message =
    status === 'OPEN'
      ? getRemainTime({ targetTime: new Date(dueDate) })
      : '모집마감';

  return (
    <div className={styles.titleBox}>
      <div className={styles.titleLine}>
        <div className={styles.titleCategory}>{`#${category || '기타'}`}</div>
        <span>
          <PartyRoomDetailButton.ReportRoom roomId={roomId} />
          <PartyRoomDetailButton.ShareRoom />
        </span>
      </div>
      <div className={styles.titleLine}>
        <div className={styles.titleContent}>{title}</div>
        <span className={styles.remainTime}>{time_message}</span>
      </div>
    </div>
  );
}
