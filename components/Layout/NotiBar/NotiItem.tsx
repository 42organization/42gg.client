import Link from 'next/link';
import { useContext } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { Noti } from 'types/notiTypes';
import {
  HeaderContextState,
  HeaderContext,
} from 'components/Layout/HeaderContext';
import styles from 'styles/Layout/NotiItem.module.scss';

interface NotiItemProps {
  data: Noti;
}

export default function NotiItem({ data }: NotiItemProps) {
  const date = data.createdAt.slice(5, -3).replace('T', ' ');
  const { type, message, isChecked } = data;

  const noti: {
    [key: string]: { [key: string]: string | JSX.Element | undefined };
  } = {
    IMMINENT: {
      style: styles.imminent,
      content: MakeImminentContent(message),
    },
    ANNOUNCE: {
      style: styles.announcement,
      content: MakeAnnounceContent(message),
    },
    MATCHED: {
      style: styles.matched,
      content: message,
    },
    CANCELEDBYMAN: {
      style: styles.canceldByMan,
      content: message,
    },
    // TODO: 고치기
    GIFT: {
      style: styles.gift,
      content: message,
    },
  };

  const notiWrapperStyle = isChecked ? styles.readWrap : styles.unreadWrap;
  const notiContentStyle =
    type === 'IMMINENT'
      ? styles.imminent
      : type === 'MATCHED'
      ? styles.matched
      : type === 'CANCELEDBYMAN'
      ? styles.canceledByMan
      : styles.announcement;

  return (
    <div className={styles.notiWrapper}>
      <div className={`${notiWrapperStyle} ${notiContentStyle}`}>
        {noti[type].content}
      </div>
      <div className={styles.date}>
        {date}&nbsp;
        {isChecked ? <BsCheckLg size='9' /> : <></>}
      </div>
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

function MakeImminentContent(message: string) {
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);

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

  const enemyId = parseEnemyIdMessage(message).enemyId;
  const enemyMessage = parseEnemyIdMessage(message).enemyMessage;

  return enemyId.length ? (
    <div className={styles.imminentContent}>
      {enemyId.map((intraId: string, i: number) => (
        <span
          key={intraId}
          onClick={() => HeaderState?.resetOpenNotiBarState()}
        >
          <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
          {enemyId && i < enemyId.length - 1 ? ', ' : ''}
        </span>
      ))}
      {enemyMessage}
    </div>
  ) : (
    <></>
  );
}
