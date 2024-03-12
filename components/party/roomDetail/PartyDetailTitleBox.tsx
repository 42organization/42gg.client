import { getRemainTime } from 'utils/handleTime';
import usePartyCategory from 'hooks/party/usePartyCategory';
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
    <>
      <span>{`#${category}`}</span>
      <PartyRoomDetailButton.ShareRoom />
      <span>{title}</span>
      <span>{getRemainTime({ targetTime: new Date(dueDate) })}</span>
      <PartyRoomDetailButton.ReportRoom roomId={roomId} />
    </>
  );
}
