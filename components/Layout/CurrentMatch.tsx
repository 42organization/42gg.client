import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState, currentMatchState } from 'utils/recoil/match';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

export default function CurrentMatch() {
  const [{ isMatched, enemyTeam, slotId }, setCurrentMatch] =
    useRecoilState(currentMatchState);
  const [reloadMatch, setReloadMatch] = useRecoilState(reloadMatchState);
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  const matchingMessage = slotId && makeMessage(slotId, isMatched);
  const presentPath = useRouter().asPath;

  useEffect(() => {
    getCurrentMatchHandler();
    if (reloadMatch) setReloadMatch(false);
  }, [presentPath, reloadMatch]);

  const getCurrentMatchHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/match/current`);
      setCurrentMatch(res?.data);
      if (res.data.mode === 'CHALLENGE' && !res.data.isMatched) {
        setModal({
          modalName: 'MATCH-CHALLENGE',
          challenge: {
            slotId: res.data.slotId,
            type: 'single',
          },
        });
      }
    } catch (e) {
      setError('JB01');
    }
  };

  const onCancel = () => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { slotId },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.stringWrapper}>
          <div className={styles.icon}> ⏰ </div>
          <div className={styles.messageWrapper}>
            {matchingMessage}
            <EnemyTeam enemyTeam={enemyTeam} slotId={slotId} />
          </div>
        </div>
        <div className={styles.cancelButton}>
          <input type='button' onClick={onCancel} value={'취소하기'} />
        </div>
      </div>
    </>
  );
}

function makeMessage(slotId: number, isMatched: boolean) {
  return (
    <div className={styles.message}>
      <span>{slotId}</span>
      <span>
        {isMatched ? (
          '번 방 경기가 시작됩니다!'
        ) : (
          <>
            <span>번 방 참가자 기다리는 중</span>
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
interface EnemyTeam {
  enemyTeam: string[];
  slotId: number;
}

function EnemyTeam({ enemyTeam, slotId }: EnemyTeam) {
  if (!slotId || enemyTeam.length === 0) return <></>;
  const enemyUsers = enemyTeam.map((intraId, index) => (
    <span key={intraId} id={styles.enemyUsers}>
      <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
      {index < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeam}> 상대 : {enemyUsers}</div>;
}
