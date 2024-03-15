import usePartyRoomList from 'hooks/party/usePartyRoomList';
import styles from 'styles/main/PartyPreview.module.scss';
export default function PartyPreview() {
  const { partyRooms } = usePartyRoomList();
  const limitedRooms = partyRooms.slice(0, 3);
  return (
    <div className={styles.container}>
      <ul>
        {limitedRooms.map((room) => (
          <li key={room.roomId} className={styles.block}>
            <div>
              <span>{room.title}</span>
              <span
                className={styles.people}
              >{`${room.currentPeople}/${room.maxPeople}`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
