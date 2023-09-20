import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  INotificaionTable,
  INotification,
} from 'types/admin/adminNotificationTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  AdminContent,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import CreateNotiButton from 'components/admin/notification/CreateNotiButton';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/notification/NotificationTable.module.scss';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  intraId: 'Intra ID',
  type: '종류',
  message: '내용',
  createdAt: '생성 시간',
  isChecked: '확인 여부',
};

const MAX_CONTENT_LENGTH = 15;

export default function NotificationTable() {
  const [notificationInfo, setNotificationInfo] = useState<INotificaionTable>({
    notiList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const modal = useRecoilValue(modalState);

  const getUserNotifications = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/notifications?intraId=${intraId}&page=${currentPage}&size=10`
      );
      setIntraId(intraId);
      setNotificationInfo({
        notiList: res.data.notiList.map((noti: INotification) => {
          return {
            ...noti,
            createdAt: dateToStringShort(new Date(noti.createdAt)),
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
          return {
            ...noti,
            createdAt: dateToStringShort(new Date(noti.createdAt)),
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

  return (
    <div className={styles.notificationWrap}>
      <div className={styles.header}>
        <span className={styles.title}>알림 관리</span>
        <div className={styles.searchWrap}>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'notification'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {notificationInfo.notiList.map((notification: INotification) => (
              <TableRow key={notification.id} className={styles.tableRow}>
                {tableFormat['notification'].columns.map(
                  (columnName: string, index: number) => {
                    return (
                      <TableCell className={styles.tableBodyItem} key={index}>
                        <AdminContent
                          content={notification[
                            columnName as keyof INotification
                          ]?.toString()}
                          maxLen={MAX_CONTENT_LENGTH}
                          detailTitle={notification.intraId}
                          detailContent={notification.message}
                        />
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
  );
}
