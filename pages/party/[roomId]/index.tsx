import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { instance } from 'utils/axios';
import PartyDetailCommentBox from 'components/party/roomDetail/PartyDetailContentCommentBox';
import PartyDetailProfile from 'components/party/roomDetail/PartyDetailProfile';
import PartyDetailTitleBox from 'components/party/roomDetail/PartyDetailTitleBox';
import usePartyColorMode from 'hooks/party/usePartyColorMode';
import styles from 'styles/party/PartyDetailRoom.module.scss';

export default function PartyDetailPage() {
  const roomId = useRouter().query.roomId;
  const router = useRouter();
  const [partyRoomDetail, setPartyRoomDetail] = useState<
    PartyRoomDetail | undefined
  >(undefined);

  console.log('roomId:', roomId);

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  const fetchRoomDetail = () => {
    instance
      .get(`/party/rooms/${roomId}`)
      .then(({ data }) => {
        setPartyRoomDetail(data);
      })
      .catch(() => {
        alert('방 정보를 불러오는데 실패했습니다.');
        router.push('/party');
      });
  };

  usePartyColorMode('PARTY-MAIN');

  return partyRoomDetail && partyRoomDetail.status !== 'HIDDEN' ? (
    <div className={styles.detailPage}>
      <PartyDetailTitleBox {...partyRoomDetail} />
      <PartyDetailProfile
        partyRoomDetail={partyRoomDetail}
        fetchRoomDetail={fetchRoomDetail}
      />
      <PartyDetailCommentBox
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
