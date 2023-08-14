import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Imegaphone, ImegaphoneTable } from 'types/admin/adminReceiptType';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import { getFormattedDateToString } from 'utils/handleTime';
import PageNation from 'components/Pagination';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/receipt/MegaphoneList.module.scss';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import AdminSearchBar from '../common/AdminSearchBar';

const megaPhoneTableTitle: { [key: string]: string } = {
  megaphoneId: 'ID',
  usedAt: '사용일자',
  intraId: '사용자',
  content: '내용',
  status: '상태',
  delete: '삭제',
};

const tableColumnName = [
  'megaphoneId',
  'usedAt',
  'intraId',
  'content',
  'status',
  'delete',
];

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

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler 추가 + 유저 검색 컴포넌트 추가
  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserMegaphoneHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/megaphones/history?intraId=${intraId}&page=${currentPage}&size=10`
      );
      setMegaphoneData({
        megaphoneList: res.data.megaphoneList.map((megaphone: Imegaphone) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(megaphone.usedAt)
          );
          return {
            ...megaphone,
            usedAt: `${year}-${month}-${date} ${hour}:${min}`,
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

  // instanceInManage로 변경
  const getAllMegaphoneHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/megaphones/history?page=${currentPage}&size=10`
      );
      setMegaphoneData({
        megaphoneList: res.data.megaphoneList.map((megaphone: Imegaphone) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(megaphone.usedAt)
          );
          return {
            ...megaphone,
            usedAt: `${year}-${month}-${date} ${hour}:${min}`,
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

  const openDetailModal = (megaphone: Imegaphone) => {
    setModal({
      modalName: 'ADMIN-DETAIL_CONTENT',
      detailTitle: megaphone.megaphoneId.toString(),
      detailContent: megaphone.content,
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
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell className={styles.tableHeaderItem} key={idx}>
                  {megaPhoneTableTitle[column]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
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
                          {megaphone[columnName as keyof Imegaphone].toString()
                            .length > MAX_CONTENT_LENGTH ? (
                            <div>
                              {megaphone[columnName as keyof Imegaphone]
                                .toString()
                                .slice(0, MAX_CONTENT_LENGTH)}
                              <span
                                style={{ cursor: 'pointer', color: 'grey' }}
                                onClick={() => openDetailModal(megaphone)}
                              >
                                ...더보기
                              </span>
                            </div>
                          ) : (
                            megaphone[columnName as keyof Imegaphone].toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                  <TableCell className={styles.tableBodyItem}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteMegaphone(megaphone)}
                    >
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={styles.tableBodyItem}>
                <TableCell className={styles.tableBodyItem}>
                  비어있습니다
                </TableCell>
              </TableRow>
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
