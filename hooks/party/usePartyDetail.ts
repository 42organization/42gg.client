import { useEffect, useState } from 'react';
import { PartyRoomDetail } from 'types/partyTypes';
import { instance } from 'utils/axios';

const PartyButtonEvent = ({
  roomId,
  status,
  comment = '',
}: {
  roomId: number;
  status: 'JOIN' | 'LEAVE' | 'START' | 'COMMENT';
  comment?: string;
}) => {
  const [partyRoomDetail, setPartyRoomDetail] = useState<PartyRoomDetail>({});
  const [click, setClick] = useState(false);
  const fetchRoomDetail = async () => {
    instance.get(`/party/rooms/${roomId}`).then(({ data }) => {
      setPartyRoomDetail(data);
    });
  };

  useEffect(() => {
    switch (status) {
      case 'JOIN':
        instance.post(`/party/rooms/${roomId}`);
        break;
      case 'LEAVE':
        instance.patch(`/party/rooms/${roomId}`);
        break;
      case 'START':
        instance.post(`/party/rooms/${roomId}/start`);
        break;
      case 'COMMENT':
        instance
          .post(`/party/rooms/${roomId}/comments`, { comment })
          .catch((err) => {
            console.error(err);
          });
        break;
    }
    fetchRoomDetail();
  }, [partyRoomDetail]);
  setClick(!click);

  return { partyRoomDetail };
};

export default PartyButtonEvent;
