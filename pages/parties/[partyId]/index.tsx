import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import {
  PartyButtton,
  PartyComment,
  PartyDescription,
} from 'components/party/PartyRoomDetail';

export default function PartyDetailPage() {
  const roomId = Number(useRouter().query.partyId);
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  const fetchRoomDetail = async () => {
    try {
      mockInstance.get(`/party/rooms/${roomId}`).then(({ data }) => {
        setPartyRoomDetail(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return partyRoomDetail === undefined ? (
    <div>로딩중</div>
  ) : partyRoomDetail.roomStatus !== 'HIDDEN' ? (
    <div>
      <PartyDescription
        partyRoomDetail={partyRoomDetail}
        fetchRoomDetail={fetchRoomDetail}
      />
      <PartyButtton
        partyRoomDetail={partyRoomDetail}
        fetchRoomDetail={fetchRoomDetail}
      />
      <PartyComment
        partyRoomDetail={partyRoomDetail}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : (
    <div>해당 방이 존재하지 않습니다.</div>
  );
}
