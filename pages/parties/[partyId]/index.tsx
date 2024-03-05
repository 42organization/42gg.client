import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import PartyDetail, { Hidden } from '../../../components/party/PartyRoomDetail';

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
      // instance 사용할  것
      mockInstance
        // .get(`/party/rooms/${roomId}`) // TODO: api 경로 수정
        .get(`/party/rooms/${roomId}`)
        .then(({ data }) => {
          setPartyRoomDetail(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return partyRoomDetail === undefined ? (
    <div>로딩중</div>
  ) : partyRoomDetail.roomStatus !== 'HIDDEN' ? (
    <PartyDetail {...partyRoomDetail} />
  ) : (
    <Hidden />
  );
}
