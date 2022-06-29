import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CurrentMatch } from 'types/matchTypes';
import { gameTimeToString } from 'utils/handleTime';
import { cancelModalState } from 'utils/recoil/match';
import Modal from 'components/modal/Modal';
import CancelModal from 'components/modal/CancelModal';
import instance from 'utils/axios';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

export default function CurrentMatchInfo() {
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch | null>(null);
  const [openCancelModal, setOpenCancelModal] =
    useRecoilState<boolean>(cancelModalState);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/match/current`);
        setCurrentMatch(res?.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!currentMatch) return null;

  const { isMatch, enemyTeam, time, slotId } = currentMatch;
  const matchingMessage = makeMessage(time, isMatch);
  const enemyTeamInfo = isBeforeMin(time, 5)
    ? makeEnemyTeamInfo(enemyTeam)
    : '';

  const onCancel = () => {
    setOpenCancelModal(true);
  };

  return (
    <>
      {openCancelModal && (
        <Modal>
          <CancelModal slotId={slotId} />
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles.stringWrapper}>
          <div className={styles.icon}> ⏰ </div>
          <div className={styles.messageWrapper}>
            {matchingMessage}
            {enemyTeamInfo}
          </div>
        </div>
        <button className={styles.cancelButton} onClick={onCancel}>
          취소하기
        </button>
      </div>
    </>
  );
}

function makeMessage(time: string, isMatch: boolean) {
  const formattedTime = gameTimeToString(time);
  return (
    <div className={styles.messageString}>
      <span>{formattedTime}</span>
      <span>
        {isMatch ? '에 경기가 시작됩니다!' : ' 참가자 기다리는 중...'}
      </span>
    </div>
  );
}

function isBeforeMin(gameTimeString: string, min: number) {
  const gameTime = new Date(gameTimeString);
  const afterMin = new Date();
  afterMin.setMinutes(afterMin.getMinutes() + min);
  return gameTime.getTime() <= afterMin.getTime();
}

function makeEnemyTeamInfo(enemyTeam: string[]) {
  const enemyUsers = enemyTeam.map((userId: string, i: number) => (
    <span key={userId} id={styles.enemyUsers}>
      <Link href={`/users/${userId}`}>{userId}</Link>
      {i < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeamString}> 상대팀 : {enemyUsers}</div>;
}
