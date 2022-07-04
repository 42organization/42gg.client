import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CurrentMatch } from 'types/matchTypes';
import { LiveData } from 'types/mainType';
import { liveState } from 'utils/recoil/main';
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
  const setLiveData = useSetRecoilState<LiveData>(liveState);
  const presentPath = useRouter().asPath;

  useEffect(() => {
    getCurrentMatchHandler();
  }, []);

  useEffect(() => {
    getCurrentMatchHandler();
    if (matchRefreshBtn && isBeforeMin(time, 0)) {
      setLiveData((prev) => ({ ...prev, event: 'game' }));
    }
  }, [presentPath, matchRefreshBtn]);

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/match/current`);
      setCurrentMatch(res?.data);
      if (isBeforeMin(res?.data.time, 5)) {
        setEnemyTeamInfo(makeEnemyTeamInfo(res?.data.enemyTeam));
      }
      if (matchRefreshBtn) setMatchRefreshBtn(false);
    } catch (e) {
      setErrorMessage('JB01');
    }
  };

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
