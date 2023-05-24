import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { currentMatchState } from 'utils/recoil/match';
import { gameTimeToString } from 'utils/handleTime';
import styles from 'styles/Layout/CurrentMatchInfo.module.scss';

import useGetCurrentMatch from 'hooks/Layout/useGetCurrentMatch';

export default function CurrentMatch() {
  const { startTime, isMatched, enemyTeam, isImminent } =
    useRecoilValue(currentMatchState);
  const setModal = useSetRecoilState(modalState);
  const matchingMessage = startTime && makeMessage(startTime, isMatched);
  const blockCancelButton = isImminent && enemyTeam.length;

  useGetCurrentMatch();

  const onCancel = () => {
    setModal({
      modalName: 'MATCH-CANCEL',
      cancel: { startTime: startTime, isMatched: isMatched },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.stringWrapper}>
          <div className={styles.icon}>⏰</div>
          <div className={styles.messageWrapper}>
            {matchingMessage}
            <EnemyTeam enemyTeam={enemyTeam} isImminent={isImminent} />
          </div>
        </div>
        <div
          className={
            blockCancelButton ? styles.blockCancelButton : styles.cancelButton
          }
        >
          <input
            type='button'
            onClick={onCancel}
            value={blockCancelButton ? '취소불가' : '취소하기'}
          />
        </div>
      </div>
    </>
  );
}
// export default function CurrentMatch() {
//   const { isMatched, enemyTeam, time, slotId, isImminent } =
//     useRecoilValue(currentMatchState);
//   const setModal = useSetRecoilState(modalState);
//   const matchingMessage = time && makeMessage(time, isMatched);
//   const blockCancelButton = isImminent && enemyTeam.length;

//   useGetCurrentMatch();

//   const onCancel = () => {
//     setModal({
//       modalName: 'MATCH-CANCEL',
//       cancel: { isMatched, slotId, time },
//     });
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.stringWrapper}>
//           <div className={styles.icon}>⏰</div>
//           <div className={styles.messageWrapper}>
//             {matchingMessage}
//             <EnemyTeam enemyTeam={enemyTeam} isImminent={isImminent} />
//           </div>
//         </div>
//         <div
//           className={
//             blockCancelButton ? styles.blockCancelButton : styles.cancelButton
//           }
//         >
//           <input
//             type='button'
//             onClick={onCancel}
//             value={blockCancelButton ? '취소불가' : '취소하기'}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

function makeMessage(time: string, isMatched: boolean) {
  const formattedTime = gameTimeToString(time);
  return (
    <div className={styles.message}>
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
interface EnemyTeam {
  enemyTeam: string[];
  isImminent: boolean;
}

function EnemyTeam({ enemyTeam, isImminent }: EnemyTeam) {
  if (!isImminent || enemyTeam.length === 0) return <></>;
  const enemyUsers = enemyTeam.map((intraId, index) => (
    <span key={intraId} id={styles.enemyUsers}>
      <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
      {index < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div className={styles.enemyTeam}> 상대팀 : {enemyUsers}</div>;
}
