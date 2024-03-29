import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaCrown } from 'react-icons/fa';
import {
  PartyRoomDetail,
  PartyRoomStatus,
  PartyRoomUser,
} from 'types/partyTypes';
import { nameToRGB } from 'utils/color';
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
  const { currentPeople, minPeople, roomId, status, roomUsers, hostNickname } =
    partyRoomDetail;
  const router = useRouter();

  return (
    <div className={styles.profile}>
      <div className={styles.line}>
        <span>{`인원 : ${currentPeople}`}</span>
        <button
          className={styles.exitBtn}
          onClick={() => router.push('/party')}
        >
          X
        </button>
      </div>
      <div className={styles.profileItem}>
        <Profile roomUsers={roomUsers} hostNickname={hostNickname} />
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
  hostNickname: string;
};

function Profile({ roomUsers, hostNickname }: ProfileProps) {
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
