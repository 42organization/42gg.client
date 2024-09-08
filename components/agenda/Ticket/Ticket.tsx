import Link from 'next/link';
import { instanceInAgenda } from 'utils/axios';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/Ticket/Ticket.module.scss';
import { useModal } from '../modal/useModal';
interface TicketProps {
  ticketCount: number;
  setupTicket: boolean;
}

const Ticket = ({ type }: { type: string }) => {
  const { data } = useFetchGet<TicketProps>({ url: '/ticket' });
  const { openModal } = useModal();
  console.log(data);
  return (
    <>
      {type === 'page' ? (
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
          {data && data.setupTicket ? (
            <button
              className={styles.submitButton}
              onClick={() => {
                instanceInAgenda.patch('/ticket');
              }}
            >
              발급 완료
            </button>
          ) : (
            <button
              className={styles.submitButton}
              onClick={() => {
                openModal({
                  type: 'proceedCheck',
                  description: '평가 포인트를 기부하시겠습니까?',
                  onProceed: () => {
                    instanceInAgenda.post('/ticket').then(() => {
                      location.href = 'https://profile.intra.42.fr/';
                    });
                  },
                });
              }}
            >
              발급 시작
            </button>
          )}
          <Link href='/agenda/ticket/history' style={{ width: '100%' }}>
            <button className={styles.logButton}>내역 보기</button>
          </Link>
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
      )}
    </>
  );
};

export default Ticket;
