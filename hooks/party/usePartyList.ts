import { useEffect, useState } from 'react';
import { PartyRoom } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomProps = {
  isAdmin?: boolean;
  withJoined?: boolean;
};

const usePartyRoom = ({
  isAdmin = false,
  withJoined = false,
}: PartyRoomProps = {}) => {
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);
  const [joinedPartyRooms, setJoinedPartyRooms] = useState<PartyRoom[]>([]);

  useEffect(() => {
    const getRoomsUrl = isAdmin ? '/party/admin/rooms' : '/party/rooms';
    mockInstance.get(getRoomsUrl).then(({ data }: { data: PartyRoom[] }) => {
      setPartyRooms(data);
    });
  }, [isAdmin]);

  useEffect(() => {
    if (withJoined) {
      mockInstance
        .get('/party/rooms/joined')
        .then(({ data }: { data: PartyRoom[] }) => {
          setJoinedPartyRooms(data);
        });
    }
  }, [isAdmin, withJoined]);

  return { partyRooms, joinedPartyRooms };
};

export default usePartyRoom;
