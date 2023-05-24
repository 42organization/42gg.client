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
import PageNation from 'components/Pagination';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import CreateNotiButton from 'components/admin/notification/CreateNotiButton';
import styles from 'styles/admin/notification/NotificationTable.module.scss';
import { instanceInManage } from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';
import { useRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

const tableTitle: { [key: string]: string } = {
  notiId: 'ID',
  roleType: '권한',
  intraId: 'Intra ID',
  type: '종류',
  message: '내용',
  createdAt: '생성일',
  isChecked: '확인 여부',
};

interface INotification {
  notiId: number;
  intraId: string;
  message: string;
  type: string;
  createdAt: Date;
  isChecked: boolean;
}

interface INotificaionTable {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}

const MAX_CONTENT_LENGTH = 15;

export default function NotificationTable() {
  const [notificationInfo, setNotificationInfo] = useState<INotificaionTable>({
    notiList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [modal, setModal] = useRecoilState(modalState);

  const getUserNotifications = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/notifications?q=${intraId}&page=${currentPage}&size=10`
      );
      setIntraId(intraId);
      setNotificationInfo({
        notiList: res.data.notiList.map((noti: INotification) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(noti.createdAt)
          );
          return {
            ...noti,
            createdAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
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
      const res = await instanceInManage.get(
        `/notifications?page=${currentPage}&size=10`
      );
      setIntraId('');
      setNotificationInfo({
        notiList: res.data.notiList.map((noti: INotification) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(noti.createdAt)
          );
          return {
            ...noti,
            createdAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    intraId ? getUserNotifications() : getAllUserNotifications();
  }, [intraId, getUserNotifications, getAllUserNotifications, modal]);

  if (notificationInfo.notiList.length === 0) {
    return <div>비어있습니다!</div>;
  }

  const openDetailModal = (noti: INotification) => {
    setModal({
      modalName: 'ADMIN-DETAIL_CONTENT',
      intraId: noti.intraId,
      detailContent: noti.message,
    });
  };
  return (
    <>
      <div className={styles.notificationWrap}>
        <div className={styles.header}>
          <span className={styles.title}>알림 관리</span>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='customized table'>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                {tableFormat['notification'].columns.map((columnName) => (
                  <TableCell
                    className={styles.tableHeaderItem}
                    key={columnName}
                  >
                    {tableTitle[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {notificationInfo.notiList.map((notification: INotification) => (
                <TableRow key={notification.notiId} className={styles.tableRow}>
                  {tableFormat['notification'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'createdAt' ? (
                            <div>
                              {notification.createdAt.toString().slice(0, 4)}
                              <br />
                              {notification.createdAt.toString().slice(5, 10)}
                            </div>
                          ) : notification[
                              columnName as keyof INotification
                            ]?.toString().length > MAX_CONTENT_LENGTH ? (
                            <div>
                              {notification[columnName as keyof INotification]
                                ?.toString()
                                .slice(0, MAX_CONTENT_LENGTH)}
                              <span
                                style={{ cursor: 'pointer', color: 'grey' }}
                                onClick={() => openDetailModal(notification)}
                              >
                                ...더보기
                              </span>
                            </div>
                          ) : (
                            notification[
                              columnName as keyof INotification
                            ]?.toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pageNationContainer}>
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
