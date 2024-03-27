import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { instance } from 'utils/axios';
import PartyDetailContentCommentBox from 'components/party/roomDetail/PartyDetailContentCommentBox';
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
      <button className={styles.exitBtn} onClick={() => router.push('/party')}>
        X
      </button>
      <PartyDetailTitleBox {...partyRoomDetail} />
      <PartyDetailProfile
        partyRoomDetail={partyRoomDetail}
        nameToRGB={nameToRGB}
        fetchRoomDetail={fetchRoomDetail}
      />
      <PartyDetailContentCommentBox
        partyRoomDetail={partyRoomDetail}
        nameToRGB={nameToRGB}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : partyRoomDetail === undefined ? (
    <div>loading...</div>
  ) : (
    <div>방이 존재하지 않습니다.</div>
  );
}

function nameToRGB(name: string): string {
  const randomCode = [
    name.charCodeAt(0) % 128,
    name.charCodeAt(1) % 128,
    name.charCodeAt(2) % 128,
  ];

  if (randomCode[0] < 64 || randomCode[1] < 64 || randomCode[2] < 64) {
    randomCode[randomCode[0] % 3] = 128 - randomCode[randomCode[0] % 3];
  }
  const red = randomCode[0] + 128;
  const green = randomCode[1] + 128;
  const blue = randomCode[2] + 128;

  return `rgb(${red}, ${green}, ${blue})`;
}
