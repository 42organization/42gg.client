import { Noti } from 'types/notiTypes';
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
      title: '경기 준비',
      content: makeContent(data.id, '번 방 경기를 준비하세요.'),
    },
    announce: { title: '공 지', content: makeAnnounceContent(data.message) },
    matched: {
      title: '매칭 성사',
      content: makeContent(data.id, '번 방 신청한 매칭이 성사되었습니다.'),
    },
    canceledbyman: {
      title: '매칭 취소',
      content: makeContent(
        data.id,
        '번 방 신청한 매칭이 상대에 의해 취소되었습니다.'
      ),
    },
    canceledbytime: {
      title: '매칭 취소',
      content: makeContent(
        data.id,
        '번 방 신청한 매칭이 상대 없음으로 취소되었습니다.'
      ),
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
