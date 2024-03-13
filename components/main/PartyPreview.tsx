import usePartyRoom from 'hooks/party/usePartyList';
import styles from 'styles/main/PartyPreview.module.scss';
export default function PartyPreview() {
  const { partyRooms } = usePartyRoom();
  const limitedRooms = partyRooms.slice(0, 3);
  console.log(partyRooms);
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
