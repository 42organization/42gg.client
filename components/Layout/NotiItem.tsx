import Link from 'next/link';
import { NotiData } from 'types/notiTypes';
import { gameTimeToString } from 'utils/handleTime';
import styles from 'styles/Layout/NotiItem.module.scss';

type NotiItemProps = {
  data: NotiData;
  showNotiBarHandler: () => void;
};

export default function NotiItem({ data, showNotiBarHandler }: NotiItemProps) {
  const title = makeTitle(data.type);
  const notiDate = data.createdAt.slice(5, 16).replace('T', ' ');

  const makeEnemyUsers = (enemyTeam: string[]) => {
    return enemyTeam.map((intraId: string, i: number) => (
      <span key={intraId} onClick={showNotiBarHandler}>
        <Link href={`/users/detail?intraId=${intraId}`}>{intraId}</Link>
        {data.enemyTeam && i < data.enemyTeam.length - 1 ? ', ' : ''}
      </span>
    ));
  };

  const makeImminentMinute = (gameTime: string, createdAt: string) => {
    return Math.floor(
      (Number(new Date(gameTime)) - Number(new Date(createdAt))) / 60000
    );
  };

  return (
    <div
      className={data.isChecked ? `${styles.readWrap}` : `${styles.unreadWrap}`}
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>
        {data.type === 'imminent' && data.enemyTeam && data.time ? (
          <>
            {makeEnemyUsers(data.enemyTeam)}님과 경기{' '}
            {makeImminentMinute(data.time, data.createdAt)}분 전 입니다.
            서두르세요!
          </>
        ) : (
          makeContent(data)
        )}
      </div>
      <div className={styles.date}>{notiDate}</div>
    </div>
  );
}

function makeTitle(type: string) {
  if (type === 'imminent') return '경기 준비';
  else if (type === 'matched') return '매칭 성사';
  else if (type.includes('canceled')) return '매칭 취소';
  else return '공 지';
}

function makeContent(data: NotiData) {
  if (data.type !== 'announce' && data.time) {
    const gameTime = gameTimeToString(data.time);
    if (data.type === 'matched')
      return `${gameTime}에 신청한 매칭이 성사되었습니다.`;
    else if (data.type === 'canceledbyman')
      return `${gameTime}에 신청한 매칭이 상대에 의해 취소되었습니다.`;
    else if (data.type === 'canceledbytime')
      return `${gameTime}에 신청한 매칭이 상대 없음으로 취소되었습니다.`;
  } else return `${data.message}`;
}
