import { PartyRoomDetail } from 'types/partyTypes';
import { getRemainTime } from 'utils/handleTime';
import usePartyCategory from 'hooks/party/usePartyCategory';
import PartyRoomDetailButton from './PartyDetailButton';

export default function PartyDetailTitleBox(partyRoomDetail: PartyRoomDetail) {
  const category = usePartyCategory().categories.find(
    (category) => category.categoryId === partyRoomDetail.categoryId
  )?.categoryName;

  return (
    <>
      <span>{'#' + category}</span>
      <PartyRoomDetailButton.ShareRoom />
      <span>{partyRoomDetail.title}</span>
      <span>
        {getRemainTime({ targetTime: new Date(partyRoomDetail.dueDate) })}
      </span>
      <PartyRoomDetailButton.ReportRoom roomId={partyRoomDetail.roomId} />
    </>
  );
}
