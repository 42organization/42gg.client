import Image from 'next/image';
import { FaCrown } from 'react-icons/fa';
import {
  PartyRoomDetail,
  PartyRoomStatus,
  PartyRoomUser,
} from 'types/partyTypes';
import { dateToStringShort } from 'utils/handleTime';
import styles from 'styles/party/PartyDetailRoom.module.scss';
import PartyRoomDetailButton from './PartyDetailButton';

type PartyDetailProfileProps = {
  partyRoomDetail: PartyRoomDetail;
  fetchRoomDetail: () => void;
};

export default function PartyDetailProfile({
  partyRoomDetail,
  fetchRoomDetail,
}: PartyDetailProfileProps) {
  const { currentPeople, maxPeople, dueDate, roomId, roomStatus, roomUsers } =
    partyRoomDetail;

  return (
    <div className={styles.profile}>
      <div className={styles.line}>
        <span>{`참여인원  (${currentPeople}/${maxPeople})`}</span>
        <span>{`${dateToStringShort(new Date(dueDate))}`}</span>
      </div>
      <div className={styles.profileItem}>
        <Profile roomUsers={roomUsers} />
      </div>
      <ButtonHandler
        roomStatus={roomStatus}
        myNickname={partyRoomDetail.myNickname}
        roomId={roomId}
        roomUsers={roomUsers}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  );
}

/*------------------------profile------------------------------ */

type ProfileProps = {
  roomUsers: PartyRoomUser[];
};

function Profile({ roomUsers }: ProfileProps) {
  return (
    <ul>
      {roomUsers.map(({ intraId, nickname, intraImg }, i) =>
        intraId ? (
          <>
            <li key={intraId} className={styles.user}>
              {i === 0 && (
                <div className={styles.crown}>
                  <FaCrown color='gold' />
                </div>
              )}
              <Image
                src={`https://random.dog/7f6f49dd-7ca5-46bd-97fb-c534628f9a2b.jpg`}
                className={styles.profileImg}
                alt={intraId}
                width={40}
                height={40}
              />
              <div style={{ color: nameToRGB(nickname) }}>{intraId}</div>
            </li>
          </>
        ) : (
          <>
            <li key={nickname} className={styles.user}>
              {i === 0 && (
                <div className={styles.crown}>
                  <FaCrown color='gold' />
                </div>
              )}
              <Image
                src={
                  intraImg ||
                  `https://random.dog/7f6f49dd-7ca5-46bd-97fb-c534628f9a2b.jpg`
                }
                className={styles.profileImg}
                alt={nickname}
                width={40}
                height={40}
              />
              <div>{nickname}</div>
            </li>
          </>
        )
      )}
    </ul>
  );
}

/*-----------------------button------------------------------ */

type ButtonProps = {
  roomId: number;
  roomStatus: PartyRoomStatus;
  myNickname: string | null;
  roomUsers: PartyRoomUser[];
  fetchRoomDetail: () => void;
};

function ButtonHandler({
  roomStatus,
  myNickname,
  roomId,
  roomUsers,
  fetchRoomDetail,
}: ButtonProps) {
  return roomStatus !== 'OPEN' ? (
    <></>
  ) : !myNickname ? (
    <PartyRoomDetailButton.JoinRoom
      roomId={roomId}
      fetchRoomDetail={fetchRoomDetail}
    />
  ) : roomUsers[0].nickname !== myNickname ? (
    <div className={styles.btnContainer}>
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : (
    <>
      <PartyRoomDetailButton.StartRoom />
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </>
  );
}

function nameToRGB(name: string): string {
  let codeSum = 0;
  for (let i = 0; i < name.length; i++) {
    codeSum += name.charCodeAt(i) ** i * 10;
  }

  const red = codeSum % 256;
  const green = (codeSum * 2) % 256;
  const blue = (codeSum * 3) % 256;

  return `rgb(${red}, ${green}, ${blue})`;
}
