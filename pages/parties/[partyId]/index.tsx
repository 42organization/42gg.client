import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import PartyDetail from 'components/party/PartyRoomDetail';

export default function PartyDetailPage() {
  const roomId = Number(useRouter().query.partyId);
  const [onClick, setOnClick] = useState(false);
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  useEffect(() => {
    fetchRoomDetail();
  }, [onClick]);

  const fetchRoomDetail = async () => {
    try {
      mockInstance.get(`/party/rooms/${roomId}`).then(({ data }) => {
        setPartyRoomDetail(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const { partyRoomDetail } = usePartyDetail({ roomId });
  return partyRoomDetail === undefined ? (
    <div>로딩중</div>
  ) : partyRoomDetail.roomStatus !== 'HIDDEN' ? (
    <PartyDetail
      partyRoomDetail={partyRoomDetail}
      onClick={onClick}
      setOnClick={setOnClick}
    />
  ) : (
    <div>해당 방이 존재하지 않습니다.</div>
  );
}
