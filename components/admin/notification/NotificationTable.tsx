import { useCallback, useEffect, useState } from 'react';
import { tableFormat } from 'constants/admin/table';
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
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import CreateNotiButton from 'components/admin/notification/CreateNotiButton';
import style from 'styles/admin/notification/NotificationTable.module.scss';
import instance from 'utils/axios';

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
      const res = await instance.get(
        `pingpong/admin/notifications?q=${intraId}&page=${currentPage}&size=10`
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
      const res = await instance.get(
        `pingpong/admin/notifications?page=${currentPage}&size=10`
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

  if (notificationInfo.notiList.length === 0) {
    return <div>비어있습니다!</div>;
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
                {tableFormat['notification'].columns.map((columnName) => (
                  <TableCell className={style.tableHeaderItem} key={columnName}>
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={style.tableBody}>
              {notificationInfo.notiList.map((notification: INotification) => (
                <TableRow key={notification.notiId}>
                  {tableFormat['notification'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={style.tableBodyItem} key={index}>
                          {notification[
                            columnName as keyof INotification
                          ]?.toString()}
                        </TableCell>
                      );
                    }
                  )}
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
