import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IitemHistory, IitemHistoryList } from 'types/admin/adminStoreTypes';
import { IUpdate } from 'types/modalTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
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

function ItemHistory({ update, setUpdate }: IUpdate) {
  const [itemHistoryData, setItemHistoryData] = useState<IitemHistoryList>({
    itemHistoryList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);
  const setModal = useSetRecoilState(modalState);

  const getItemHistoryListHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/items/history?page=${currentPage}&size=5`
      );
      setItemHistoryData({
        itemHistoryList: res.data.historyList.map(
          (itemHistory: IitemHistory) => {
            return {
              ...itemHistory,
              createdAt: dateToStringShort(new Date(itemHistory.createdAt)),
            };
          }
        ),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get itemhistory',
        severity: 'error',
        message: 'API 요청에 문제가 발생했습니다.',
        clicked: true,
      });
    }
  }, [currentPage]);

  const openDetailModal = (itemHistory: IitemHistory) => {
    setModal({
      modalName: 'ADMIN-DETAIL_CONTENT',
      detailTitle: itemHistory.mainContent,
      detailContent: itemHistory.subContent,
    });
  };

  useEffect(() => {
    if (update) {
      getItemHistoryListHandler();
      setUpdate(false);
    }
  }, [currentPage, update]);

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'itemHistory'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {itemHistoryData.itemHistoryList.length > 0 ? (
              itemHistoryData.itemHistoryList.map(
                (itemHistory: IitemHistory) => (
                  <TableRow
                    className={styles.tableRow}
                    key={itemHistory.itemId}
                  >
                    {tableFormat['itemHistory'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {columnName === 'imageUri' ? (
                              <Image
                                src={
                                  itemHistory.imageUri
                                    ? itemHistory[columnName]
                                    : '/public/image/fallBackSrc.jpeg'
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
                )
              )
            ) : (
              <AdminEmptyItem content={'아이템 변경 이력이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={itemHistoryData.currentPage}
          totalPages={itemHistoryData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default ItemHistory;
