import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyRoomReport, PartyRoomReportTable } from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/Party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  reporterIntraId: '신고자 이름',
  reporteeIntraId: '피신고자 이름',
  roomId: '방',
  message: '메세지',
  createdAt: '시간',
};

export default function AdminPartyRoomReport() {
  const [roomInfo, setRoomInfo] = useState<PartyRoomReportTable>({
    roomReportList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchRoom = useCallback(async () => {
    try {
      const res = await instanceInPartyManage.get(
        `/reports/rooms?page=${currentPage}&size=10`
      );
      setRoomInfo({
        roomReportList: res.data.roomReportList,
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>방 신고리스트</span>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyRoomReport'} table={tableTitle} />
          <TableBody>
            {roomInfo.roomReportList && roomInfo.roomReportList.length > 0 ? (
              roomInfo.roomReportList.map(
                (report: PartyRoomReport, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['partyRoomReport'].columns.map(
                      (columnName) => (
                        <TableCell key={columnName}>
                          {report[
                            columnName as keyof PartyRoomReport
                          ]?.toString()}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                )
              )
            ) : (
              <AdminEmptyItem content={'패널티 기록이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={roomInfo.currentPage}
          totalPages={roomInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
