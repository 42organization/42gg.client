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
  const {
    currentPeople,
    maxPeople,
    dueDate,
    roomId,
    status,
    roomUsers,
    hostNickname,
  } = partyRoomDetail;

  return (
    <div className={styles.profile}>
      <div className={styles.line}>
        <span>{`참여인원  (${currentPeople}/${maxPeople})`}</span>
        <span>{`${dateToStringShort(new Date(dueDate))}`}</span>
      </div>
      <div className={styles.profileItem}>
        <Profile roomUsers={roomUsers} hostNickname={hostNickname} />
      </div>
      <ButtonHandler
        status={status}
        myNickname={partyRoomDetail.myNickname}
        roomId={roomId}
        hostNickname={hostNickname}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  );
}

/*------------------------profile------------------------------ */

type ProfileProps = {
  roomUsers: PartyRoomUser[];
  hostNickname: string;
};

function Profile({ roomUsers, hostNickname }: ProfileProps) {
  return (
    <ul>
      {roomUsers.map(({ intraId, nickname, userImage }, i) =>
        intraId ? (
          <li key={intraId} className={styles.user}>
            {nickname === hostNickname && (
              <div className={styles.crown}>
                <FaCrown color='gold' />
              </div>
            )}
            <Image
              src={
                userImage ||
                `https://random.dog/7f6f49dd-7ca5-46bd-97fb-c534628f9a2b.jpg`
              }
              className={styles.profileImg}
              alt={intraId}
              width={40}
              height={40}
            />
            <div style={{ color: nameToRGB(nickname) }}>{intraId}</div>
          </li>
        ) : (
          <li key={nickname} className={styles.user}>
            {nickname === hostNickname && (
              <div className={styles.crown}>
                <FaCrown color='gold' />
              </div>
            )}
            <Image
              src={`https://random.dog/7f6f49dd-7ca5-46bd-97fb-c534628f9a2b.jpg`}
              className={styles.profileImg}
              alt={nickname}
              width={40}
              height={40}
            />
            <div>{nickname}</div>
          </li>
        )
      )}
    </ul>
  );
}

/*-----------------------button------------------------------ */

type ButtonProps = {
  roomId: number;
  status: PartyRoomStatus;
  myNickname: string | null;
  hostNickname: string;
  fetchRoomDetail: () => void;
};

function ButtonHandler({
  status,
  myNickname,
  roomId,
  hostNickname,
  fetchRoomDetail,
}: ButtonProps) {
  return status !== 'OPEN' ? (
    <></>
  ) : !myNickname ? (
    <PartyRoomDetailButton.JoinRoom
      roomId={roomId}
      fetchRoomDetail={fetchRoomDetail}
    />
  ) : hostNickname !== myNickname ? (
    <div className={styles.btnContainer}>
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : (
    <>
      <PartyRoomDetailButton.StartRoom roomId={roomId} />
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
