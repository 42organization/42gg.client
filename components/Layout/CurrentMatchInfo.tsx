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

  const { isMatched, enemyTeam, time, slotId } = currentMatch;
  const matchingMessage = makeMessage(time, isMatched);
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
            {enemyTeam.length ? enemyTeamInfo : null}
          </div>
        </div>
        <div className={styles.cancelButton}>
          <input type='button' onClick={onCancel} value='취소하기' />
        </div>
      </div>
    </>
  );
}

function makeMessage(time: string, isMatched: boolean) {
  const formattedTime = gameTimeToString(time);
  return (
    <div className={styles.messageString}>
      <span>{formattedTime}</span>
      <span>
        {isMatched ? (
          '에 경기가 시작됩니다!'
        ) : (
          <>
            <span> 참가자 기다리는 중</span>
            <span className={styles.waitUpDown}>
              <span className={styles.span1}>.</span>
              <span className={styles.span2}>.</span>
              <span className={styles.span3}>.</span>
            </span>
          </>
        )}
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
  const enemyUsers = enemyTeam.map((intraId: string, i: number) => (
    <span key={intraId} id={styles.enemyUsers}>
      <Link href={`/users/${intraId}`}>{intraId}</Link>
      {i < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeamString}> 상대팀 : {enemyUsers}</div>;
}
