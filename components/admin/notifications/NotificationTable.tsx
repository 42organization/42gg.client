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
import { useEffect, useState } from 'react';

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
  const [notificationInfo, setNotificationInfo] = useState<INotificaionTable>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/admin/notifications?page=${currentPage}`)
      .then((data) => {
        setNotificationInfo({ ...data.data });
      });
  }, [currentPage]);

  if (notificationInfo === undefined) {
    return <div>loading...</div>;
  }

  return (
    <TableContainer sx={{ width: 700 }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead sx={{ backgroundColor: 'lightgray' }}>
          <TableRow>
            <TableCell align='center'>Noti Id</TableCell>
            <TableCell align='center'>Intra Id</TableCell>
            <TableCell align='center'>Slot Id</TableCell>
            <TableCell align='center'>Type</TableCell>
            <TableCell align='center'>생성일</TableCell>
            <TableCell align='center'>유저 확인 여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notificationInfo.notiList.map((notification: INotification) => (
            <TableRow key={notification.notiId}>
              {Object.values(notification).map(
                (value: number | string | boolean, index: number) => {
                  return (
                    <TableCell align='center' key={index}>
                      {typeof value === 'boolean'
                        ? value
                          ? 'Checked'
                          : 'Unchecked'
                        : value}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PageNation
        curPage={notificationInfo.currentPage}
        totalPages={notificationInfo.totalPage}
        pageChangeHandler={(pageNumber: number) => {
          setCurrentPage(pageNumber);
        }}
      />
    </TableContainer>
  );
}
