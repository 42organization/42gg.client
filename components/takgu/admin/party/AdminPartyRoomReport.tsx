import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
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
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/admin/party/AdminPartyCommon.module.scss';

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
    totalPages: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setSnackBar = useSetRecoilState(toastState);

  useEffect(() => {
    instanceInPartyManage
      .get(`/reports/rooms?page=${currentPage}&size=10`)
      .then((res) => {
        setRoomInfo({
          roomReportList: res.data.roomReportList,
          totalPages: res.data.totalPage,
          currentPage: currentPage,
        });
      })
      .catch((error) => {
        setSnackBar({
          toastName: 'GET request',
          message: '댓글신고를 가져오는데 실패했습니다.',
          severity: 'error',
          clicked: true,
        });
      });
  }, [currentPage]);

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>방 신고 목록</span>
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
          totalPages={roomInfo.totalPages}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
