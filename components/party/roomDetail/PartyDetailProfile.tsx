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
  nameToRGB: (name: string) => string;
  fetchRoomDetail: () => void;
};

export default function PartyDetailProfile({
  partyRoomDetail,
  nameToRGB,
  fetchRoomDetail,
}: PartyDetailProfileProps) {
  const {
    currentPeople,
    minPeople,
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
        <Profile
          roomUsers={roomUsers}
          nameToRGB={nameToRGB}
          hostNickname={hostNickname}
        />
      </div>
      <ButtonHandler
        currentPeople={currentPeople}
        minPeople={minPeople}
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
  nameToRGB: (name: string) => string;
  hostNickname: string;
};

function Profile({ roomUsers, hostNickname, nameToRGB }: ProfileProps) {
  return (
    <ul>
      {roomUsers.map(({ intraId, nickname, userImage }) =>
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
            <div style={{ color: nameToRGB(nickname) }}>{nickname}</div>
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
  minPeople: number;
  currentPeople: number;
  fetchRoomDetail: () => void;
};

function ButtonHandler({
  status,
  myNickname,
  roomId,
  hostNickname,
  minPeople,
  currentPeople,
  fetchRoomDetail,
}: ButtonProps) {
  return status !== 'OPEN' ? (
    <></>
  ) : !myNickname ? (
    <div className={styles.btnContainer}>
      <PartyRoomDetailButton.JoinRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : hostNickname !== myNickname ? (
    <div className={styles.btnContainer}>
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : (
    <div className={styles.btnContainer}>
      {currentPeople >= minPeople && currentPeople !== 1 && (
        <PartyRoomDetailButton.StartRoom
          roomId={roomId}
          fetchRoomDetail={fetchRoomDetail}
        />
      )}
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
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
