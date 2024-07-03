import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IitemHistory } from 'types/admin/adminStoreTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/admin/store/ItemHistory.module.scss';

const tableTitle: { [key: string]: string } = {
  itemId: 'ID',
  createdAt: '변경 시간',
  name: '이름',
  content: '설명',
  imageUri: '이미지',
  price: '원가',
  discount: '할인율',
  creatorIntraId: '변경한 사람',
  deleterIntraId: '삭제한 사람',
  visible: '상점 노출',
};

function StoreItemHistory() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);
  const setModal = useSetRecoilState(modalState);

  const getApi = async (currentPage: number) => {
    const res = await instanceInManage.get(
      `/items/history?page=${currentPage}&size=5`
    );
    return res.data;
  };

  const { data, isError } = useQuery(
    ['itemHistoryList', currentPage],
    () => getApi(currentPage),
    {
      keepPreviousData: true,
      select: (data) => ({
        historyList: data.historyList?.map((history: IitemHistory) => {
          return {
            ...history,
            createdAt: dateToStringShort(new Date(history.createdAt)),
          };
        }),
        totalPage: data.totalPage,
      }),
    }
  );

  const openDetailModal = (itemHistory: IitemHistory) => {
    setModal({
      modalName: 'ADMIN-DETAIL_CONTENT',
      detailTitle: itemHistory.mainContent,
      detailContent: itemHistory.subContent,
    });
  };

  if (isError) {
    setSnackBar({
      toastName: 'get itemhistory',
      severity: 'error',
      message: 'API 요청에 문제가 발생했습니다.',
      clicked: true,
    });
  }

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'itemHistory'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {data?.historyList?.length > 0 ? (
              data?.historyList.map((itemHistory: IitemHistory) => (
                <TableRow className={styles.tableRow} key={itemHistory.itemId}>
                  {tableFormat['itemHistory'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'imageUri' ? (
                            <Image
                              src={
                                itemHistory.imageUri
                                  ? itemHistory[columnName]
                                  : '/image/takgu/not_found.svg'
                              }
                              width={30}
                              height={30}
                              alt='no'
                            />
                          ) : columnName === 'content' ? (
                            <div>
                              {itemHistory.mainContent}
                              <br />
                              <span
                                style={{ cursor: 'pointer', color: 'grey' }}
                                onClick={() => openDetailModal(itemHistory)}
                              >
                                ...더보기
                              </span>
                            </div>
                          ) : (
                            itemHistory[
                              columnName as keyof IitemHistory
                            ]?.toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <AdminEmptyItem content={'아이템 변경 이력이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={currentPage}
          totalPages={data?.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default StoreItemHistory;
