import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from 'recoil';
import { CurrentMatch } from 'types/matchTypes';
import { gameTimeToString, isBeforeMin } from 'utils/handleTime';
import { cancelModalState, matchRefreshBtnState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import Modal from 'components/modal/Modal';
import { CancelControll } from 'components/modal/cancel/CancelControll';
import instance from 'utils/axios';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

export default function CurrentMatchInfo() {
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch>({
    slotId: 0,
    time: '',
    isMatched: false,
    myTeam: [],
    enemyTeam: [],
  });
  const { isMatched, enemyTeam, time, slotId } = currentMatch;
  const [enemyTeamInfo, setEnemyTeamInfo] = useState(<></>);
  const matchingMessage = makeMessage(time, isMatched);
  const [matchRefreshBtn, setMatchRefreshBtn] =
    useRecoilState(matchRefreshBtnState);
  const [openCancelModal, setOpenCancelModal] =
    useRecoilState(cancelModalState);
  const setErrorMessage = useSetRecoilState(errorState);
  const presentPath = useRouter().asPath;

  useEffect(() => {
    getCurrentMatchHandler();
  }, []);

  useEffect(() => {
    if (isBeforeMin(time, 5)) {
      getCurrentMatchHandler();
      setEnemyTeamInfo(makeEnemyTeamInfo(enemyTeam));
    }
  }, [presentPath]); // 페이지를 바꿀 때, 5분 임박인지 확인후 상대팀 알리기

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/match/current`);
      setCurrentMatch(res?.data);
      if (matchRefreshBtn) {
        setMatchRefreshBtn(false);
      }
    } catch (e) {
      setErrorMessage('CurrentMatch Error');
    }
  };

  if (matchRefreshBtn) {
    getCurrentMatchHandler();
  } // 매치 페이지의 새로고침 버튼 누를 때, 실행

  const onCancel = () => {
    setOpenCancelModal(true);
  };

  return (
    <>
      {openCancelModal && (
        <Modal>
          <CancelControll slotId={slotId} time={time} enemyTeam={enemyTeam} />
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

function makeEnemyTeamInfo(enemyTeam: string[]) {
  const enemyUsers = enemyTeam.map((intraId: string, i: number) => (
    <span key={intraId} id={styles.enemyUsers}>
      <Link href={`/users/${intraId}`}>{intraId}</Link>
      {i < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeamString}> 상대팀 : {enemyUsers}</div>;
}
