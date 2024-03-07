import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PartyRoom } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomProps = {
  isAdmin?: boolean;
  withJoined?: boolean;
};

export default function usePartyRoomList({
  isAdmin = false,
  withJoined = false,
}: PartyRoomProps = {}) {
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);
  const [joinedPartyRooms, setJoinedPartyRooms] = useState<PartyRoom[]>([]);

  const getRoomsAxios = async (
    title?: string
  ): Promise<AxiosResponse<PartyRoom[]>> => {
    const query = title ? `?title${title}` : '';
    return isAdmin
      ? mockInstance.get('/party/admin/rooms' + query)
      : mockInstance.get('/party/rooms' + query);
  };

  useEffect(() => {
    const axioses = [getRoomsAxios()];
    withJoined && axioses.push(mockInstance.get('/party/rooms/joined'));

    Promise.all(axioses).then(([roomsRes, joinedRoomsRes]) => {
      setPartyRooms(roomsRes.data);
      setJoinedPartyRooms(joinedRoomsRes?.data ?? []); // joinedRooms는 조건부로 가져오므로 ?.data로 접근
    });
  }, []);

  function updateRoomsByTitle(title: string) {
    getRoomsAxios(title).then(({ data }: { data: PartyRoom[] }) =>
      setPartyRooms(data)
    );
  }

  return { partyRooms, joinedPartyRooms, updateRoomsByTitle };
}
