import {
  PartyRoomDetail,
  PartyRoomStatus,
  PartyRoomUser,
} from 'types/partyTypes';
import { dateToStringShort } from 'utils/handleTime';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyDetailProfileProps = {
  partyRoomDetail: PartyRoomDetail;
  fetchRoomDetail: () => void;
};

type ProfileProps = {
  partyRoomUser: PartyRoomUser;
  roomStatus: PartyRoomStatus;
};

export default function PartyDetailProfile({
  partyRoomDetail,
  fetchRoomDetail,
}: PartyDetailProfileProps) {
  const { currentPeople, maxPeople, dueDate, roomId, roomStatus, roomUsers } =
    partyRoomDetail;
  // TODO: 방장에게 왕관 모양 씌워주기.
  return (
    <div>
      <span>{`참여인원 : ${currentPeople}/${maxPeople}`}</span>
      <span>{`마감기한 : ${dateToStringShort(new Date(dueDate))}`}</span>
      {roomStatus !== 'OPEN' && <span>방장</span>}
      {roomUsers.map((partyRoomUser) => (
        <Profile
          key={partyRoomUser.intraId}
          partyRoomUser={partyRoomUser}
          roomStatus={roomStatus}
        />
      ))}
      <PartyRoomDetailButton.JoinRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  );
}

function Profile({ partyRoomUser, roomStatus }: ProfileProps) {
  const { intraId } = partyRoomUser;

  return roomStatus === 'HIDDEN' || !intraId ? (
    <></>
  ) : roomStatus === 'OPEN' ? (
    <>
      <li>{partyRoomUser.nickname}</li>
    </>
  ) : (
    <span>
      <li key={intraId}>
        <span>{partyRoomUser.nickname}</span>
      </li>
    </span>
  );
}
