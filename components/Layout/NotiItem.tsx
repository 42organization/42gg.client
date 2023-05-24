import Link from 'next/link';
import { Noti } from 'types/notiTypes';
// import { gameTimeToString } from 'utils/handleTime';
import styles from 'styles/Layout/NotiItem.module.scss';

import { HeaderContextState, HeaderContext } from './HeaderContext';
import { useContext } from 'react';

interface NotiItemProps {
  data: Noti;
}

export default function NotiItem({ data }: NotiItemProps) {
  const date = data.createdAt.slice(5).replace('T', ' ');

  const parseEnemyIdMessage = (
    type: string,
    message: string
  ): [string[], string] => {
    const enemyId = [];
    let enemyMessage = '';
    if (type === 'imminent') {
      enemyId.push(
        message.slice(message.indexOf('<') + 9, message.indexOf('>'))
      );
      enemyMessage = message.slice(message.indexOf('>') + 1);
    }
    return [enemyId, enemyMessage];
  };

  const enemyIdMessage = parseEnemyIdMessage(data.type, data.message);

  const noti: {
    [key: string]: { [key: string]: string | JSX.Element | undefined };
  } = {
    imminent: {
      title: '경기 준비',
      content: MakeImminentContent(enemyIdMessage[0], enemyIdMessage[1]),
    },
    announce: {
      title: '공 지',
      content: MakeAnnounceContent(data.message),
    },
    matched: {
      title: '매칭 성사',
      content: data.message,
    },
    canceledbyman: {
      title: '매칭 취소',
      content: data.message,
    },
    canceledbytime: {
      title: '매칭 취소',
      content: data.message,
    },
  };

  // const noti: {
  //   [key: string]: { [key: string]: string | JSX.Element | undefined };
  // } = {
  //   imminent: {
  //     title: '경기 준비',
  //     content: MakeImminentContent(data.enemyTeam, data.time, data.createdAt),
  //   },
  //   announce: { title: '공 지', content: MakeAnnounceContent(data.message) },
  //   matched: {
  //     title: '매칭 성사',
  //     content: makeContent(data.time, '에 신청한 매칭이 성사되었습니다.'),
  //   },
  //   canceledbyman: {
  //     title: '매칭 취소',
  //     content: makeContent(
  //       data.time,
  //       '에 신청한 매칭이 상대에 의해 취소되었습니다.'
  //     ),
  //   },
  //   canceledbytime: {
  //     title: '매칭 취소',
  //     content: makeContent(
  //       data.time,
  //       '에 신청한 매칭이 상대 없음으로 취소되었습니다.'
  //     ),
  //   },
  // };
  return (
    <div
      className={data.isChecked ? `${styles.readWrap}` : `${styles.unreadWrap}`}
    >
      <span className={styles.title}>{noti[data.type].title}</span>
      <div className={styles.content}>{noti[data.type].content}</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
}

// function makeContent(time: string | undefined, message: string) {
//   if (time) return gameTimeToString(time) + message;
// }

function MakeAnnounceContent(message: string | undefined) {
  if (message && !message.includes('https')) return message;
  const url = message?.split('https')[1];
  const content = message?.split('https')[0].split('=>')[0];
  const linkedContent = message?.split('https')[0].split('=>')[1];
  return (
    <>
      {content} {'=>'}
      <span onClick={() => window.open(`https${url}`)}>{linkedContent}</span>
    </>
  );
}

function MakeImminentContent(
  enemyTeam: string[],
  message: string
  // time: string | undefined,
  // createdAt: string
) {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const makeEnemyUsers = (enemyTeam: string[]) => {
    return enemyTeam.map((intraId: string, i: number) => (
      <span key={intraId} onClick={() => HeaderState?.resetOpenNotiBarState()}>
        <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
        {enemyTeam && i < enemyTeam.length - 1 ? ', ' : ''}
      </span>
    ));
  };
  return (
    <>
      {enemyTeam.length && (
        <>
          {makeEnemyUsers(enemyTeam)} {message}
        </>
      )}
    </>
  );
}
// function MakeImminentContent(
//   enemyTeam: string[] | undefined,
//   time: string | undefined,
//   createdAt: string
// ) {
//   const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
//   const makeEnemyUsers = (enemyTeam: string[]) => {
//     return enemyTeam.map((intraId: string, i: number) => (
//       <span key={intraId} onClick={() => HeaderState?.resetOpenNotiBarState()}>
//         <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
//         {enemyTeam && i < enemyTeam.length - 1 ? ', ' : ''}
//       </span>
//     ));
//   };
//   const makeImminentMinute = (gameTime: string, createdAt: string) =>
//     Math.floor(
//       (Number(new Date(gameTime)) - Number(new Date(createdAt))) / 60000
//     );
//   return (
//     <>
//       {enemyTeam && time && (
//         <>
//           {makeEnemyUsers(enemyTeam)}님과 경기{' '}
//           {makeImminentMinute(time, createdAt)}분 전 입니다. 서두르세요!
//         </>
//       )}
//     </>
//   );
// }
