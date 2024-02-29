import { useEffect, useState } from 'react';
import { PartyCategory, PartyRoom } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomProps = {
  isAdmin?: boolean;
  withJoined?: boolean;
};

const usePartyRoom = ({
  isAdmin = false,
  withJoined = false,
}: PartyRoomProps = {}) => {
  const [categorys, setCategorys] = useState<PartyCategory[]>([]);
  const [partyRooms, setPartyRooms] = useState<PartyRoom[]>([]);
  const [joinedPartyRooms, setJoinedPartyRooms] = useState<PartyRoom[]>([]);

  useEffect(() => {
    mockInstance
      .get('/party/categorys')
      .then(({ data }: { data: PartyCategory[] }) => {
        setCategorys(data);
      });
  }, []);

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

  return { partyRooms, joinedPartyRooms, categorys };
};

export default usePartyRoom;
