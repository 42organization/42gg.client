import Image from 'next/image';
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

  return (
    <div className={styles.profile}>
      <div className={styles.line}>
        <span>{`인원 : ${currentPeople}`}</span>
      </div>
      <div className={styles.profileItem}>
        <Profile
          roomUsers={roomUsers}
          hostNickname={hostNickname}
          roomStatus={status}
          roomId={roomId}
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
  hostNickname: string;
  roomStatus: PartyRoomStatus;
  roomId: number;
};

function Profile({
  roomUsers,
  hostNickname,
  roomStatus,
  roomId,
}: ProfileProps) {
  return (
    <ul>
      {roomUsers.map(({ intraId, nickname, userImage }) => (
        <li key={intraId || nickname} className={styles.user}>
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
            alt={intraId || nickname}
            width={40}
            height={40}
          />
          <div style={{ color: nameToRGB(nickname) }}>
            {intraId || nickname}
          </div>
          {roomStatus !== 'OPEN' && intraId ? (
            <PartyRoomDetailButton.ReportNoShow
              roomId={roomId}
              userIntraId={intraId}
            />
          ) : (
            <></>
          )}
        </li>
      ))}
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
      <div></div>
      <PartyRoomDetailButton.JoinRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : hostNickname !== myNickname ? (
    <div className={styles.btnContainer}>
      <div></div>
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  ) : (
    <div className={styles.btnContainer}>
      {currentPeople >= minPeople && currentPeople !== 1 ? (
        <PartyRoomDetailButton.StartRoom
          roomId={roomId}
          fetchRoomDetail={fetchRoomDetail}
        />
      ) : (
        <div></div>
      )}
      <PartyRoomDetailButton.LeaveRoom
        roomId={roomId}
        fetchRoomDetail={fetchRoomDetail}
      />
    </div>
  );
}
