import { useEffect, useState } from 'react';
import { PartyRoom } from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';

type PartyRoomListProps = {
  searchTitle?: string;
};
type RoomListResponse = {
  adminRoomList: PartyRoom[];
};

export default function useAdminPartyRoomList({
  searchTitle,
}: PartyRoomListProps = {}) {
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);

  const getRoomsAxios = (title?: string) => {
    const query = title ? `?title=${title}` : '';
    return instanceInPartyManage.get<RoomListResponse>(
      '/rooms?page=1&size=10' + query
    );
  };

  useEffect(() => {
    getRoomsAxios().then(({ data }) => {
      setPartyRooms(data.adminRoomList);
    });
  }, [searchTitle]);

  return { partyRooms };
}
