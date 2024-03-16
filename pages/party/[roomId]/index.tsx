import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { instance } from 'utils/axios';
import PartyDetailContentCommentBox from 'components/party/roomDetail/PartyDetailContentCommentBox';
import PartyDetailProfile from 'components/party/roomDetail/PartyDetailProfile';
import PartyDetailTitleBox from 'components/party/roomDetail/PartyDetailTitleBox';
import styles from 'styles/party/PartyDetailRoom.module.scss';

export default function PartyDetailPage() {
  const roomId = useRouter().query.roomId;
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  const fetchRoomDetail = () => {
    instance
      .get(`/party/rooms/${roomId}`)
      .then(({ data }) => {
        setPartyRoomDetail(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return partyRoomDetail && partyRoomDetail.roomStatus !== 'HIDDEN' ? (
    <div className={styles.detailPage}>
      <PartyDetailTitleBox {...partyRoomDetail} />
      <PartyDetailProfile
        partyRoomDetail={partyRoomDetail}
        fetchRoomDetail={fetchRoomDetail}
      />
      <PartyDetailContentCommentBox
        partyRoomDetail={partyRoomDetail}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : partyRoomDetail === undefined ? (
    <div>loading...</div>
  ) : (
    <div>방이 존재하지 않습니다.</div>
  );
}
