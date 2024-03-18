import { useEffect, useState } from 'react';
import { PartyRoom } from 'types/partyTypes';
import { instance, instanceInPartyManage } from 'utils/axios';

type PartyRoomProps = {
  isAdmin?: boolean;
  withJoined?: boolean;
};
type RoomsResponse = {
  roomList: PartyRoom[];
};

export default function usePartyRoomList({
  isAdmin = false,
  withJoined = false,
}: PartyRoomProps = {}) {
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);
  const [joinedPartyRooms, setJoinedPartyRooms] = useState<PartyRoom[]>([]);

  const getRoomsAxios = (title?: string) => {
    const query = title ? `?title${title}` : '';
    return isAdmin
      ? instanceInPartyManage.get<RoomsResponse>('/party/admin/rooms' + query)
      : instance.get<RoomsResponse>('/party/rooms' + query);
  };

  useEffect(() => {
    const axioses = [getRoomsAxios()];
    if (withJoined)
      axioses.push(instance.get<RoomsResponse>('/party/rooms/joined'));

    Promise.all(axioses).then(([roomsRes, joinedRoomsRes]) => {
      setPartyRooms(roomsRes.data.roomList);
      setJoinedPartyRooms(joinedRoomsRes?.data.roomList ?? []); // joinedRooms는 조건부로 가져오므로 ?.data로 접근
    });
  }, []);

  function updateRoomsByTitle(title: string) {
    getRoomsAxios(title).then(({ data }: { data: RoomsResponse }) =>
      setPartyRooms(data.roomList)
    );
  }

  return { partyRooms, joinedPartyRooms, updateRoomsByTitle };
}
