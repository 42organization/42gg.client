import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/Ticket/Ticket.module.scss';
interface TicketProps {
  ticketCount: number;
}

const Ticket = ({ type }: { type: string }) => {
  const { data } = useFetchGet<TicketProps>('/ticket');
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
      <button
        className={styles.submitButton}
        onClick={() => {
          alert('티켓 발급 시작');
        }}
      >
        발급 시작
      </button>
      <button className={styles.logButton}>내역 보기</button>
    </div>
  ) : (
    <></>
  );
};

export default Ticket;
