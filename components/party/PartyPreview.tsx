import usePartyRoom from 'hooks/party/usePartyList';

export default function PartyPreview() {
  const { partyRooms } = usePartyRoom();
  const limitedRooms = partyRooms.slice(0, 3);
  return (
    <>
      <ul>
        {limitedRooms.map((room) => (
          <li key={room.roomId}>
            <div>
              <span>{room.title}</span>
              <span>{`${room.currentPeople}/${room.maxPeople}`}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
