import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import PageNation from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { tableColumnNames } from 'types/admin/tableTypes';
import AdminSearchBar from '../common/AdminSearchBar';
import CreateNotiButton from './CreateNotiButton';
import style from 'styles/admin/notification/NotificationTable.module.scss';

interface INotification {
  notiId: number;
  intraId: string;
  slotId: number;
  type: string;
  createdTime: Date;
  isChecked: boolean;
}

interface INotificaionTable {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}

export default function NotificationTable() {
  const [notificationInfo, setNotificationInfo] = useState<INotificaionTable>({
    notiList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');

  const getUserNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_MOCK_ENDPOINT}/notifications/${intraId}?page=${currentPage}`
      );
      setIntraId(intraId);
      setNotificationInfo({ ...res.data });
    } catch (e) {
      console.error('MS00');
    }
  }, [intraId, currentPage]);

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getAllUserNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_MOCK_ENDPOINT}/notifications?page=${currentPage}`
      );
      setIntraId('');
      setNotificationInfo({ ...res.data });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    intraId ? getUserNotifications() : getAllUserNotifications();
  }, [intraId, getUserNotifications, getAllUserNotifications]);

  if (notificationInfo === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={style.notificationWrap}>
        <div className={style.header}>
          <span className={style.title}>알림 관리</span>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div>
        <TableContainer className={style.tableContainer} component={Paper}>
          <Table className={style.table} aria-label='customized table'>
            <TableHead className={style.tableHeader}>
              <TableRow>
                {tableColumnNames['notification'].map((columnName) => (
                  <TableCell className={style.tableHeaderItem} key={columnName}>
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={style.tableBody}>
              {notificationInfo.notiList.map((notification: INotification) => (
                <TableRow key={notification.notiId}>
                  {Object.values(notification).map(
                    (value: number | string | boolean, index: number) => {
                      return (
                        <TableCell className={style.tableBodyItem} key={index}>
                          {typeof value === 'boolean'
                            ? value
                              ? 'Checked'
                              : 'Unchecked'
                            : value}
                        </TableCell>
                      );
                    }
                  )}
                  {/* 버튼이 필요할 경우 아래처럼 단독으로 생성 */}
                  {/* <TableCell align='center'>
                  <button
                    onClick={() =>
                      console.log(
                        `자세히 id : ${notification.notiId}`,
                        `유저 id : ${notification.intraId}`
                      )
                    }
                  >
                    자세히
                  </button>
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={style.pageNationContainer}>
          <PageNation
            curPage={notificationInfo.currentPage}
            totalPages={notificationInfo.totalPage}
            pageChangeHandler={(pageNumber: number) => {
              setCurrentPage(pageNumber);
            }}
          />
        </div>
      </div>
    </>
  );
}
