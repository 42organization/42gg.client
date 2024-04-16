import { useEffect, useState } from 'react';
import { PartyRoom } from 'types/partyTypes';
import { instance } from 'utils/axios';

type PartyRoomListProps = {
  withJoined?: boolean;
  searchTitle?: string;
};
type RoomListResponse = {
  roomList: PartyRoom[];
};

export default function usePartyRoomList({
  withJoined = false,
  searchTitle,
}: PartyRoomListProps = {}) {
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);
  const [joinedPartyRooms, setJoinedPartyRooms] = useState<PartyRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRoomsAxios = (title?: string) => {
    const query = title ? `?title=${title}` : '';
    return instance.get<RoomListResponse>('/party/rooms' + query);
  };

  useEffect(() => {
    const axioses = [getRoomsAxios(searchTitle)];
    if (withJoined)
      axioses.push(instance.get<RoomListResponse>('/party/rooms/joined'));

    Promise.all(axioses).then(([roomsRes, joinedRoomsRes]) => {
      // 추후에 query를 통한 검색으로 변경
      setPartyRooms(
        roomsRes.data.roomList.filter((r) =>
          r.title.includes(searchTitle ?? '')
        )
      );
      setJoinedPartyRooms(joinedRoomsRes?.data.roomList ?? []); // joinedRooms는 조건부로 가져오므로 ?.data로 접근
      setIsLoading(false);
    });
  }, [searchTitle]);

  return { partyRooms, joinedPartyRooms, partyRoomsLoading: isLoading };
}
