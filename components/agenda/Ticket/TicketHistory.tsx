import {
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';
import styles from 'styles/agenda/Ticket/Ticket.module.scss';

interface TicketHistoryProps {
  createdAt: string; // 발급 시작한 시
  issuedFrom: string; // Agenda 이름 or 42Intra
  issuedFromKey: string | null; // AgendaKey UUID or null
  usedTo: string; // Agenda 이름 or NotUsed or NotApporve
  usedToKey: string | null; // AgendaKey UUID or null
  approved: boolean; // true 발급완료, false 발급대기
  approvedAt: string | null; // 발급된 시간 or null
  isUsed: boolean; // true 사용된 티켓, false 사용하지 않음
  usedAt: string | null; //
}

const TicketHistory = ({ data }: { data: TicketHistoryProps[] | null }) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>티켓 발급 내역</h1>
      <Table sx={{ minWidth: 340 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>idx</TableCell>
            <TableCell align='center'>발급요청일</TableCell>
            <TableCell align='center'>승인여부</TableCell>
            <TableCell align='center'>승인일</TableCell>
            <TableCell align='center'>사용여부</TableCell>
            <TableCell align='center'>사용처</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((d, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {index}
                  </TableCell>
                  <TableCell align='center'>{d.createdAt}</TableCell>
                  <TableCell align='center'>
                    {d.approved ? '✔︎' : '✕'}
                  </TableCell>
                  <TableCell align='center'>{d.approvedAt}</TableCell>
                  <TableCell align='center'>{d.isUsed ? '✔︎' : '✕'}</TableCell>
                  <TableCell align='center'>
                    {d.usedAt ? d.usedAt : ''}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketHistory;
