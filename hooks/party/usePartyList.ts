import { useEffect, useState } from 'react';
import { PartyCategory, PartyRoom } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';

type PartyRoomProps = {
  isAdmin?: boolean;
  withJoined?: boolean;
};

type Response<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
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

  // date타입을 어떻게 잘 받을지?
  useEffect(() => {
    const getRoomsUrl = isAdmin ? '/party/admin/rooms' : '/party/rooms';
    mockInstance
      .get(getRoomsUrl)
      .then(({ data }: { data: Response<PartyRoom>[] }) => {
        setPartyRooms(
          data.map((room) => ({
            ...room,
            createDate: new Date(room.createDate),
            dueDate: new Date(room.dueDate),
          }))
        );
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
