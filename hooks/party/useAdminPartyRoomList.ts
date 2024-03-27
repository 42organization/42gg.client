import { useEffect, useState } from 'react';
import { PartyRoom } from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';

type PartyRoomListProps = {
  searchTitle?: string;
  page: number;
};
type RoomListResponse = {
  adminRoomList: PartyRoom[];
  totalPages: number;
};

export default function useAdminPartyRoomList(
  { searchTitle, page }: PartyRoomListProps = { page: 1 }
) {
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const getRoomsAxios = (title?: string) => {
    const titleQuery = title ? `&title=${title}` : '';
    return instanceInPartyManage.get<RoomListResponse>(
      `/rooms?page=${page}&size=10${titleQuery}`
    );
  };

  useEffect(() => {
    getRoomsAxios().then(({ data }) => {
      setPartyRooms(data.adminRoomList);
      setTotalPages(data.totalPages);
    });
  }, [searchTitle, page]);

  return {
    partyRooms,
    totalPages,
  };
}
