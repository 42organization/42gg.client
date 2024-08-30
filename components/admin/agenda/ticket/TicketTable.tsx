import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { ITicket } from 'types/agenda/ticket/ticketTypes';
import { instance } from 'utils/axios';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { NoContent } from 'components/admin/agenda/utils';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import AdminTicketForm from 'components/agenda/Form/AdminTicketForm';
import { useModal } from 'components/agenda/modal/useModal';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

const tableTitle: { [key: string]: string } = {
  ticketId: '티켓 ID',
  createdAt: '발급 시간',
  issuedFrom: '발급처',
  usedTo: '사용처',
  isApproved: '승인 여부',
  approvedAt: '승인 시간',
  isUsed: '사용 여부',
  usedAt: '사용 시간',
  etc: '기타',
};

export interface ITicketTable {
  ticketList: ITicket[];
  totalPage: number;
  currentPage: number;
}

interface TicketTableProps {
  intraId: string;
}

const TicketTable = ({ intraId }: TicketTableProps) => {
  const [ticketInfo, setTicketInfo] = useState<ITicketTable>({
    ticketList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openModal, closeModal } = useModal();

  const handleButtonAction = (ticket: ITicket) => {
    openModal({
      type: 'modify',
      title: '티켓 수정',
      description: '변경 후 수정 버튼을 눌러주세요.',
      FormComponent: AdminTicketForm,
      data: ticket,
      isAdmin: true,
      stringKey: intraId,
      onProceed: () => {
        closeModal();
        getTicketList();
      },
    });
  };

  const getTicketList = useCallback(async () => {
    const response = await instance.get(
      `/agenda/admin/ticket/list/${intraId}`,
      {
        params: {
          page: currentPage,
          size: itemsPerPage,
        },
      }
    );

    setTicketInfo({
      ticketList: response.data.content,
      totalPage: Math.ceil(response.data.totalSize / itemsPerPage),
      currentPage: currentPage,
    });
  }, [currentPage, intraId]);

  useEffect(() => {
    getTicketList();
  }, [getTicketList]);

  const renderApprove = (isApproved?: boolean) => {
    return isApproved ? '발급완료' : '발급대기';
  };
  const renderUsed = (isUsed?: boolean) => {
    return isUsed ? '사용완료' : '사용대기';
  };

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>티켓 관리</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='agenda table'>
          <AdminAgendaTableHead tableName={'ticket'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {ticketInfo.ticketList.length > 0 ? (
              ticketInfo.ticketList.map((ticket: ITicket) => (
                <TableRow key={ticket.ticketId} className={styles.tableRow}>
                  {agendaTableFormat['ticket'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell
                          className={`${styles.tableBodyItem} `}
                          key={index}
                        >
                          {columnName === 'isApproved' ? (
                            renderApprove(ticket.isApproved) // 상태 표시
                          ) : columnName === 'isUsed' ? (
                            renderUsed(ticket.isUsed) // 사용 여부 표시
                          ) : columnName !== 'etc' ? (
                            ticket[columnName as keyof ITicket]
                          ) : (
                            <button
                              className={`${styles.button} ${styles.coin}`}
                              onClick={() => handleButtonAction(ticket)}
                            >
                              수정
                            </button>
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <NoContent col={9} content={'티켓이 없습니다.'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={ticketInfo.currentPage}
          totalPages={ticketInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
            getTicketList();
          }}
        />
      </div>
    </div>
  );
};

export default TicketTable;
