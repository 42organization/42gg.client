import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { Noti } from 'types/notiTypes';
import { openNotiBarState } from 'utils/recoil/layout';
import styles from 'styles/Layout/NotiItem.module.scss';
interface NotiItemProps {
  data: Noti;
}

export default function NotiItem({ data }: NotiItemProps) {
  const date = data.createdAt.slice(5, 16).replace('T', ' ');
  const noti: {
    [key: string]: { [key: string]: string | JSX.Element | undefined };
  } = {
    imminent: {
      title: '삭제 예정',
      content: '삭제될 타입',
    },
    announce: { title: '공 지', content: makeAnnounceContent(data.message) },
    matched: {
      title: '매칭 성사',
      content: MakeMatchedContent(data.enemyTeam),
    },
    canceledbyman: {
      title: '매칭 취소',
      content: makeContent(data.id, '번 방 신청한 매칭이 취소되었습니다.'),
    },
    canceledbytime: {
      title: '매칭 취소',
      content: makeContent(data.id, '번 방 신청한 매칭이 취소되었습니다.'),
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

function makeContent(id: number | undefined, message: string) {
  if (id) return id + message;
}

function makeAnnounceContent(message: string | undefined) {
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

function MakeMatchedContent(enemyTeam: string[] | undefined) {
  const setOpenNotiBar = useSetRecoilState(openNotiBarState);
  const makeEnemyUsers = (enemyTeam: string[]) => {
    return enemyTeam.map((intraId: string, i: number) => (
      <span key={intraId} onClick={() => setOpenNotiBar(false)}>
        <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
        {enemyTeam && i < enemyTeam.length - 1 ? ', ' : ''}
      </span>
    ));
  };
  return (
    <>{enemyTeam && <>{makeEnemyUsers(enemyTeam)}님과 경기를 준비하세요!</>}</>
  );
}
