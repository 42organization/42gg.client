import { getRemainTime } from 'utils/handleTime';
import usePartyCategory from 'hooks/party/usePartyCategory';
import styles from 'styles/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyDetailTitleBoxProps = {
  categoryId: number;
  title: string;
  roomId: number;
  dueDate: string;
};

export default function PartyDetailTitleBox({
  categoryId,
  title,
  roomId,
  dueDate,
}: PartyDetailTitleBoxProps) {
  const category = usePartyCategory().categories.find(
    (category) => category.categoryId === categoryId
  )?.categoryName;

  return (
    <div className={styles.titleBox}>
      <div className={styles.titleLine}>
        <div className={styles.titleCategory}>{`#${category}`}</div>
        <PartyRoomDetailButton.ShareRoom />
      </div>
      <div className={styles.titleContent}>{title}</div>
      <div className={styles.titleLine}>
        <span className={styles.remainTime}>
          {getRemainTime({ targetTime: new Date(dueDate) })}
        </span>
        <PartyRoomDetailButton.ReportRoom roomId={roomId} />
      </div>
    </div>
  );
}
