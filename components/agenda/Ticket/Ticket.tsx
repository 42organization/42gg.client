import Link from 'next/link';
import { instanceInAgenda } from 'utils/axios';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/Ticket/Ticket.module.scss';
interface TicketProps {
  ticketCount: number;
}

const Ticket = ({ type }: { type: string }) => {
  const { data } = useFetchGet<TicketProps>('/ticket');
  let status = localStorage.getItem('ticket-issue-status') || false;
  return type === 'page' ? (
    <div className={styles.container}>
      <h1 className={styles.h1}>내 티켓</h1>
      <div className={styles.ticketSection}>
        <div className={styles.ticketFrame}>
          <h1>{data && data.ticketCount}</h1>
        </div>
        <h1>개</h1>
      </div>
      <div className={styles.section}>
        <h3>발급 방법</h3>
        <div className={styles.line} />
        <p>발급 시작 누르기</p>
        <div className={styles.arrowDown} />
        <p>
          평가 포인트 기부하기
          <br />
          {`(최대 2개까지 반영)`}
        </p>
        <div className={styles.arrowDown} />
        <p>현재 페이지로 돌아와 발급완료 누르기</p>
      </div>
      {status ? (
        <button
          className={styles.submitButton}
          onClick={() => {
            instanceInAgenda.patch('/ticket').then((res) => {
              console.log(res);
              localStorage.removeItem('ticket-issue-status');
              status = false;
            });
          }}
        >
          발급 완료
        </button>
      ) : (
        <button
          className={styles.submitButton}
          onClick={() => {
            instanceInAgenda.post('/ticket').then(() => {
              alert('티켓 발급 시작');
              status = true;
              localStorage.setItem('ticket-issue-status', 'true');
              location.href = 'https://profile.intra.42.fr/';
            });
          }}
        >
          발급 시작
        </button>
      )}
      <button
        className={styles.logButton}
        onClick={() => {
          instanceInAgenda.get('/ticket/history?page=1&size=20').then((res) => {
            console.log(res);
          });
        }}
      >
        내역 보기
      </button>
    </div>
  ) : (
    <div className={styles.container}>
      <h1 className={styles.h1}>내 티켓</h1>
      <div
        className={styles.ticketSection}
        style={{ gap: '2rem', alignItems: 'center' }}
      >
        <Link href='/agenda/ticket'>
          <button className={styles.submitButton}>발급하러가기</button>
        </Link>
        <div className={styles.ticketSection}>
          <div className={styles.ticketFrame}>
            <h1>{data && data.ticketCount}</h1>
          </div>
          <h1>개</h1>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
