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
      <Profile roomUsers={roomUsers} roomStatus={roomStatus} />
      <Button
        roomStatus={roomStatus}
        myNickname={partyRoomDetail.myNickname}
        roomId={roomId}
        roomUsers={roomUsers}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  );
}

/*------------------------profile------------------------------ */

type ProfileProps = {
  roomUsers: PartyRoomUser[];
  roomStatus: PartyRoomStatus;
};

function Profile({ roomUsers, roomStatus }: ProfileProps) {
  return (
    <ul>
      {roomUsers.map((partyRoomUser: PartyRoomUser) =>
        partyRoomUser.intraId ? (
          <li key={partyRoomUser.intraId}>{partyRoomUser.intraId}</li>
        ) : (
          <li key={partyRoomUser.nickname}>{partyRoomUser.nickname}</li>
        )
      )}
    </ul>
  );
}

/*-----------------------button------------------------------ */

type ButtonProps = {
  roomId: number;
  roomStatus: PartyRoomStatus;
  myNickname: string | null;
  roomUsers: PartyRoomUser[];
  fetchRoomDetail: () => void;
};

function Button({
  roomStatus,
  myNickname,
  roomId,
  roomUsers,
  fetchRoomDetail,
}: ButtonProps) {
  return roomStatus !== 'OPEN' ? (
    <></>
  ) : !myNickname ? (
    <PartyRoomDetailButton.JoinRoom
      roomId={roomId}
      fetchRoomDetail={fetchRoomDetail}
    />
  ) : roomUsers[0].nickname !== myNickname ? (
    <PartyRoomDetailButton.LeaveRoom
      roomId={roomId}
      fetchRoomDetail={fetchRoomDetail}
    />
  ) : (
    <>
      <PartyRoomDetailButton.StartRoom />
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </>
  );
}
