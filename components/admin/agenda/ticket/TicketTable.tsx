import router, { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
// import { instance } from 'utils/axios';
// import { dateToStringShort } from 'utils/handleTime';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
// import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';
import ticketStyles from 'styles/admin/agenda/TicketTable.module.scss';

const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

export const mockAgendaList = [
  {
    ticketId: 1,
    createdAt: '2024-08-01',
    issuedFrom: '대회 1',
    issuedFromKey: '1',
    usedTo: '대회 2',
    usedToKey: '2',
    isApproved: true,
    approvedAt: '2024-08-01',
    isUsed: true,
    usedAt: '2024-08-01',
  },
  {
    ticketId: 2,
    createdAt: '2024-08-02',
    issuedFrom: '대회 2',
    issuedFromKey: '2',
    usedTo: '대회 1',
    usedToKey: '1',
    isApproved: false,
    approvedAt: '2024-08-02',
    isUsed: false,
    usedAt: '2024-08-02',
  },
  {
    ticketId: 3,
    createdAt: '2024-08-03',
    issuedFrom: '대회 3',
    issuedFromKey: '3',
    usedTo: '대회 4',
    usedToKey: '4',
    isApproved: true,
    approvedAt: '2024-08-03',
    isUsed: true,
    usedAt: '2024-08-03',
  },
];

const tableTitle: { [key: string]: string } = {
  ticketId: '티켓 ID',
  createdAt: '발급 시작 시간',
  issuedFrom: '발급된 곳',
  // issuedFromKey: '발급된 곳 키',
  usedTo: '사용처',
  // usedToKey: '사용처 키',
  isApproved: '발급 여부',
  approvedAt: '발급된 시간',
  isUsed: '사용 여부',
  usedAt: '사용된 시간',
  etc: '기타',
};

export interface ITicket {
  ticketId: number;
  createdAt: string;
  issuedFrom: string;
  issuedFromKey: string;
  usedTo: string;
  usedToKey: string;
  isApproved: boolean;
  approvedAt: string;
  isUsed: boolean;
  usedAt: string;
}

export interface ITicketTable {
  ticketList: ITicket[];
  totalPage: number;
  currentPage: number;
}

export default function TicketTable() {
  const [ticketInfo, setTicketInfo] = useState<ITicketTable>({
    ticketList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const modal = useRecoilValue(modalState);
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string) => {
    switch (buttonName) {
      case '자세히':
        // setModal({ modalName: 'ADMIN-PROFILE', intraId });
        alert('자세히');
        break;
      case '대회 수정':
        // setModal({ modalName: 'ADMIN-PROFILE', intraId });
        alert('대회 수정');
        break;
      case '대회 삭제':
        // 모달 추가
        alert('대회 삭제');
        break;
    }
  };

  const handleCellClick = (agedaKey) => {
    router.push(`/admin/agenda/${agedaKey}`);
  };

  const getTicketList = useCallback(async () => {
    try {
      // const res = await instance.get(`/agenda/admin/request/list`, {
      //   params: { page: currentPage, size: 10 },
      // });
      // const res = await instance.get(
      //   `/agenda/admin/request/list?page=${currentPage}&size=10`
      // );
      const res = mockAgendaList;
      // const params = {
      //   page: currentPage,
      //   size: itemsPerPage,
      // };
      // const res = useFetchGet(`/agenda/admin/request/list`, params).data;

      const totalPage = Math.ceil(res.length / itemsPerPage);
      const paginatedList = res.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      setTicketInfo({
        ticketList: paginatedList,
        totalPage: totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS00');
    }
  }, [currentPage]);

  useEffect(() => {
    getTicketList();
  }, [getTicketList]);

  const renderApprove = (isApproved: boolean) => {
    return isApproved ? '발급완료' : '발급대기';
  };
  const renderUsed = (isUsed: boolean) => {
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
                      const isClickable =
                        columnName === 'issuedFrom' || columnName === 'usedTo';
                      return (
                        <TableCell
                          className={`${styles.tableBodyItem} ${
                            isClickable ? ticketStyles.clickableCell : ''
                          }`}
                          key={index}
                          onClick={() => {
                            if (isClickable) {
                              handleCellClick(
                                columnName === 'issuedFrom'
                                  ? ticket.issuedFromKey
                                  : ticket.usedToKey
                              );
                            }
                          }}
                        >
                          {columnName === 'isApproved'
                            ? renderApprove(ticket.isApproved) // 상태 표시
                            : columnName === 'isUsed'
                            ? renderUsed(ticket.isUsed) // 사용 여부 표시
                            : columnName !== 'etc'
                            ? ticket[columnName as keyof ITicket] // 다른 열의 기본 값 표시
                            : agendaTableFormat['ticket'].etc?.value.map(
                                (buttonName: string, index: number) => (
                                  <button
                                    key={buttonName}
                                    className={`${styles.button} ${buttonList[index]}`}
                                    onClick={() =>
                                      handleButtonAction(buttonName)
                                    }
                                  >
                                    {buttonName}
                                  </button>
                                )
                              )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                  티켓이 없습니다.
                </TableCell>
              </TableRow>
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
}
