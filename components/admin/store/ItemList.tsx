import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Item, ItemList } from 'types/itemTypes';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import styles from 'styles/admin/store/ItemList.module.scss';

const itemListTableTitle: { [key: string]: string } = {
  itemId: 'ID',
  itemName: '아이템명',
  content: '설명',
  itemType: '타입',
  imageUri: '이미지',
  originalPrice: '원가',
  discount: '할인율',
  salePrice: '판매가격',
  edit: '수정',
  delete: '삭제',
};

const tableColumnName = [
  'itemId',
  'itemName',
  'content',
  'itemType',
  'imageUri',
  'originalPrice',
  'discount',
  'salePrice',
  'edit',
  'delete',
];

const MAX_CONTENT_LENGTH = 15;

function ItemList() {
  const [itemListData, setItemListData] = useState<ItemList>({
    itemList: [],
  });
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  // api 연결 시 instanceInManage로 변경
  const getItemListHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(`items/store`);
      setItemListData(res.data);
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get itemlist',
        severity: 'error',
        message: 'API 요청에 문제가 발생했습니다.',
        clicked: true,
      });
    }
  }, []);

  const editItem = (item: Item) => {
    setModal({
      modalName: 'ADMIN-ITEM_EDIT',
      item: item,
    });
  };

  const deleteItem = (item: Item) => {
    setModal({
      modalName: 'ADMIN-ITEM_DELETE',
      item: item,
    });
  };

  const openDetailModal = (item: Item) => {
    setModal({
      modalName: 'ADMIN-DETAIL_CONTENT',
      detailTitle: item.itemName,
      detailContent: item.content,
    });
  };

  useEffect(() => {
    getItemListHandler();
  }, []);

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell className={styles.tableHeaderItem} key={idx}>
                  {itemListTableTitle[column]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {itemListData.itemList.length > 0 ? (
              itemListData.itemList.map((item: Item) => (
                <TableRow className={styles.tableRow} key={item.itemId}>
                  {tableFormat['itemList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'imageUri' ? (
                            <Image
                              src={item[columnName]}
                              alt='Item Iamge'
                              width={30}
                              height={30}
                            />
                          ) : item[columnName as keyof Item].toString().length >
                            MAX_CONTENT_LENGTH ? (
                            <div>
                              {item[columnName as keyof Item]
                                ?.toString()
                                .slice(0, MAX_CONTENT_LENGTH)}
                              <span
                                style={{ cursor: 'pointer', color: 'grey' }}
                                onClick={() => openDetailModal(item)}
                              >
                                ...더보기
                              </span>
                            </div>
                          ) : (
                            item[columnName as keyof Item]?.toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                  <TableCell className={styles.tableBodyItem}>
                    <button
                      className={styles.editBtn}
                      onClick={() => editItem(item)}
                    >
                      수정
                    </button>
                  </TableCell>
                  <TableCell className={styles.tableBodyItem}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteItem(item)}
                    >
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={styles.tableRow}>
                <TableCell className={styles.tableBodyItem}>
                  비어있습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ItemList;
