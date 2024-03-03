import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PartyRoomDetail, RoomStatus } from 'types/partyTypes';

export default function PartyDetailPage() {
  const router = useRouter();
  const roomId = Number(router.query.partyId);
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  const fetchRoomDetail = async () => {
    if (!roomId) return;
    try {
      await axios
        // .get(`/party/rooms/${roomId}`) // TODO: api 경로 수정
        .get(`/api/pingpong/party/rooms/${roomId}`)
        .then(({ data }) => {
          setPartyRoomDetail(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (partyRoomDetail === undefined) {
    return <div>로딩중...</div>;
  } else if (partyRoomDetail === null) {
    return <div>존재하지 않는 파티입니다.</div>;
  }

  const arr = {
    [RoomStatus.END]: end(partyRoomDetail),
    [RoomStatus.WAITING]: waiting(partyRoomDetail),
    [RoomStatus.PLAYING]: playing(partyRoomDetail),
    [RoomStatus.HIDDEN]: hidden(partyRoomDetail),
  };

  return arr[partyRoomDetail.roomStatus];
}

function end(partyRoomDetail: PartyRoomDetail) {
  return <div>end</div>;
}

function waiting(partyRoomDetail: partyRoomDetail) {
  return <div>waiting</div>;
}

function playing(partyRoomDetail: PartyRoomDetail) {
  return <div>playing</div>;
}

function hidden(partyRoomDetail: PartyRoomDetail) {
  return <div>hidden</div>;
}
