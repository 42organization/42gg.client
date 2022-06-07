import { NotiData } from '../types/notiTypes';
import styles from '../styles/NotiItem.module.scss';

type NotiItemProps = {
  data: NotiData;
};

export default function NotiItem({ data }: NotiItemProps) {
  const title = makeTitle(data.type);
  const content = makeContent(data);

  return (
    <div className={data.isChecked ? `${styles.readWrap}` : `${styles.notiWrap}`}>
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>{content}</div>
      <div className={styles.date}>{data.createdAt}</div>
    </div>
  );
}

function makeTitle(type: string) {
  if (type === 'matched') return '매칭 성사';
  else if (type.includes('cancled')) return '매칭 취소';
  else if (type === 'imminent') return '경기 준비';
  else return '공 지';
}

function makeContent(data: NotiData) {
  if (data.type === 'matched') return `${data.time}에 신청한 매칭이 상대에 의해 성사되었습니다.`;
  else if (data.type === 'cancledByMan') return `${data.time}에 신청한 매칭이 상대에 의해 취소되었습니다.`;
  else if (data.type === 'cancledByTime') return `${data.time}에 신청한 매칭이 상대 없음으로 취소되었습니다.`;
  else if (data.type === 'imminent') return `${data.enemyTeam}님과 경기 5분 전 입니다. 서두르세요!`;
  else return `${data.message}`;
}
