import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  Inotication,
  InoticationTable,
} from 'types/admin/adminRecruitmentsTypes';
import { instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/Recruitments.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  intraId: 'Intra ID',
  interview: '면접',
  result: '결과',
};

export interface notiMessageType {
  content: string;
}

function NotificationResults({ recruitId }: { recruitId: number }) {
  const [notificationData, setNotificationData] = useState<InoticationTable>({
    noticationList: [],
    totalPage: 0,
    currentPage: 0,
  });
  // const [notificationMessageData, setNotificationMessageData] =
  //   useState<notiMessageType>({ content: '' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alignment, setAlignment] = useState<Record<number, string | null>>({});
  const setSnackBar = useSetRecoilState(toastState);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
    id: number
  ) => {
    setAlignment((prev) => ({ ...prev, [id]: newAlignment }));
  };

  const getRecruitNotiHandler = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/admin/recruitments?page=${currentPage}&size=20`
      // );
      const id = recruitId;
      const res = await mockInstance.get(`/admin/recruitments/${id}`);
      setNotificationData({
        noticationList: res.data.applications,
        totalPage: res.data.totalPages,
        currentPage: res.data.number + 1,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get notification',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage]);

  // const resultHandler = useCallback(async (id: number, result: string | null, messageType: 'interview' | 'result') => {
  //   try {
  //     const res = await instanceInManage.get(
  //       `/admin/recruitments/result/message/preview?messageType=${messageType}`
  //     );
  //     setNotificationMessageData({
  //       content: res.data.content,
  //     });
  //   } catch (e: any) {
  //     setSnackBar({
  //       toastName: 'get message',
  //       severity: 'error',
  //       message: `API 요청에 문제가 발생했습니다.`,
  //       clicked: true,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    getRecruitNotiHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'notificationList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {notificationData.noticationList.length > 0 ? (
              notificationData.noticationList.map((recruit: Inotication) => (
                <TableRow className={styles.tableRow} key={recruit.id}>
                  {tableFormat['notificationList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'interview' ? (
                            <div className={styles.interview}>
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                              &nbsp;
                              <Button variant='outlined'>면접</Button>
                            </div>
                          ) : columnName === 'result' ? (
                            <>
                              <ToggleButtonGroup
                                value={alignment[recruit.id] || null}
                                exclusive
                                onChange={(event, newAlignment) =>
                                  handleAlignment(
                                    event,
                                    newAlignment,
                                    recruit.id
                                  )
                                }
                              >
                                <ToggleButton size='small' value='합격'>
                                  합 격
                                </ToggleButton>
                                <ToggleButton size='small' value='불합격'>
                                  불합격
                                </ToggleButton>
                              </ToggleButtonGroup>
                              &nbsp;
                              <Button
                                variant='outlined'
                                onClick={() => {
                                  // resultHandler(recruit.id, alignment[recruit.id], 'result');
                                }}
                              >
                                결과
                              </Button>
                            </>
                          ) : (
                            recruit[columnName as keyof Inotication]?.toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <AdminEmptyItem content={'지원자 내역이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={notificationData.currentPage}
          totalPages={notificationData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default NotificationResults;
