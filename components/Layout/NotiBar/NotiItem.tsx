import Link from 'next/link';
import { Noti } from 'types/notiTypes';
import styles from 'styles/Layout/NotiItem.module.scss';

import { HeaderContextState, HeaderContext } from '../HeaderContext';
import { useContext } from 'react';

interface NotiItemProps {
  data: Noti;
}

export default function NotiItem({ data }: NotiItemProps) {
  const date = data.createdAt.slice(5).replace('T', ' ');

  const parseEnemyIdMessage = (
    message: string
  ): {
    enemyId: string[];
    enemyMessage: string;
  } => {
    const regList = /<intraId::(.+?)>/;
    const regId = /^[a-zA-Z0-9]*$/;
    const parseList = message.split(regList).filter((str) => str !== '');
    const enemyId = parseList.filter((id) => regId.test(id) !== false);
    const enemyMessage = parseList.filter((id) => regId.test(id) === false)[0];
    return { enemyId, enemyMessage };
  };

  let enemyId: string[] = [];
  let enemyMessage = '';

  if (data.type === 'IMMINENT') {
    enemyId = parseEnemyIdMessage(data.message).enemyId;
    enemyMessage = parseEnemyIdMessage(data.message).enemyMessage;
  }

  const noti: {
    [key: string]: { [key: string]: string | JSX.Element | undefined };
  } = {
    IMMINENT: {
      title: '경기 준비',
      content: MakeImminentContent(enemyId, enemyMessage),
    },
    ANNOUNCE: {
      title: '공 지',
      content: MakeAnnounceContent(data.message),
    },
    MATCHED: {
      title: '매칭 성사',
      content: data.message,
    },
  };

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

function MakeImminentContent(enemyTeam: string[], message: string) {
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
