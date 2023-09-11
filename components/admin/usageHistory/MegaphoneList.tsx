import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Imegaphone, ImegaphoneTable } from 'types/admin/adminReceiptType';
import { instanceInManage } from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  AdminContent,
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/usageHistory/MegaphoneList.module.scss';

const tableTitle: { [key: string]: string } = {
  megaphoneId: 'ID',
  usedAt: '적용 시간',
  intraId: 'Intra ID',
  content: '내용',
  status: '상태',
  delete: '삭제',
};

const MAX_CONTENT_LENGTH = 16;

function MegaphoneList() {
  const [megaphoneData, setMegaphoneData] = useState<ImegaphoneTable>({
    megaphoneList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [modal, setModal] = useRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserMegaphoneHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/megaphones/history?intraId=${intraId}&page=${currentPage}&size=10`
      );
      setMegaphoneData({
        megaphoneList: res.data.megaphoneList.map((megaphone: Imegaphone) => {
          const { year, month, date } = getFormattedDateToString(
            new Date(megaphone.usedAt)
          );
          return {
            ...megaphone,
            usedAt: `${year}-${month}-${date}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get user megaphone',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [intraId, currentPage]);

  const getAllMegaphoneHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/megaphones/history?page=${currentPage}&size=10`
      );
      setMegaphoneData({
        megaphoneList: res.data.megaphoneList.map((megaphone: Imegaphone) => {
          const { year, month, date } = getFormattedDateToString(
            new Date(megaphone.usedAt)
          );
          return {
            ...megaphone,
            usedAt: `${year}-${month}-${date}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get megaphone',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage]);

  const deleteMegaphone = (megaphone: Imegaphone) => {
    setModal({
      modalName: 'ADMIN-MEGAPHONE_DELETE',
      megaphone: megaphone,
    });
  };

  useEffect(() => {
    intraId ? getUserMegaphoneHandler() : getAllMegaphoneHandler();
  }, [intraId, getUserMegaphoneHandler, getAllMegaphoneHandler, modal]);

  return (
    <>
      <div className={styles.searchWrap}>
        <AdminSearchBar initSearch={initSearch} />
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'megaphoneList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {megaphoneData.megaphoneList.length > 0 ? (
              megaphoneData.megaphoneList.map((megaphone: Imegaphone) => (
                <TableRow
                  className={styles.tableRow}
                  key={megaphone.megaphoneId}
                >
                  {tableFormat['megaphoneList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'delete' ? (
                            <button
                              className={styles.deleteBtn}
                              onClick={() => deleteMegaphone(megaphone)}
                              disabled={
                                megaphone.status === '삭제' ||
                                megaphone.status === '사용 완료'
                              }
                            >
                              {megaphone.status === '삭제' ||
                              megaphone.status === '사용 완료'
                                ? 'X'
                                : '삭제'}
                            </button>
                          ) : (
                            <AdminContent
                              content={megaphone[
                                columnName as keyof Imegaphone
                              ].toString()}
                              maxLen={MAX_CONTENT_LENGTH}
                              detailTitle={megaphone.megaphoneId.toString()}
                              detailContent={megaphone.content}
                            />
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <AdminEmptyItem content={'확성기 사용 내역이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={megaphoneData.currentPage}
          totalPages={megaphoneData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default MegaphoneList;
