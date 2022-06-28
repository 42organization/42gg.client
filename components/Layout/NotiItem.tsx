import Link from 'next/link';
import { NotiData } from 'types/notiTypes';
import { filterDate } from 'utils/handleTime';
import styles from 'styles/Layout/NotiItem.module.scss';

type NotiItemProps = {
  data: NotiData;
  showNotiBarHandler: () => void;
};

export default function NotiItem({ data, showNotiBarHandler }: NotiItemProps) {
  const title = makeTitle(data.type);

  const makeEnemyUsers = (enemyTeam: string[]) => {
    return enemyTeam.map((userId: string, i: number) => (
      <span key={userId} onClick={showNotiBarHandler}>
        <Link href={`/users/${userId}`}>{userId}</Link>
        {data.enemyTeam && i < data.enemyTeam.length - 1 ? ', ' : ''}
      </span>
    ));
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
      <div className={styles.date}>{filterDate(data.createdAt)}</div>
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
  const getGameTime = () => {
    const gameTime = data.time?.split('T')[1].slice(0, 5);
    return gameTime?.charAt(0) === '0' ? gameTime.slice(1, 5) : gameTime;
  };
  if (data.type === 'matched')
    return `${getGameTime()}에 신청한 매칭이 상대에 의해 성사되었습니다.`;
  else if (data.type === 'canceledByMan')
    return `${getGameTime()}에 신청한 매칭이 상대에 의해 취소되었습니다.`;
  else if (data.type === 'canceledByTime')
    return `${getGameTime()}에 신청한 매칭이 상대 없음으로 취소되었습니다.`;
  else return `${data.message}`;
}

function makeImminentMinute(gameTime: string, createdAt: string) {
  const imminentMin =
    Number(gameTime.slice(-5, -3)) - Number(createdAt.slice(-5, -3));
  if (imminentMin < 0) return 60 + imminentMin;
  else if (imminentMin < 5) return imminentMin + 1;
  else return imminentMin;
}
