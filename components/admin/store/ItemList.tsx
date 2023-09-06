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
import { Item, ItemList } from 'types/itemTypes';
import { instance } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import styles from 'styles/admin/store/ItemList.module.scss';

const tableTitle: { [key: string]: string } = {
  itemId: 'ID',
  itemName: '아이템 이름',
  content: '설명',
  itemType: '타입',
  imageUri: '이미지',
  originalPrice: '원가',
  discount: '할인율',
  salePrice: '판매 가격',
  edit: '수정',
  delete: '삭제',
};

function ItemList() {
  const [itemListData, setItemListData] = useState<ItemList>({
    itemList: [],
  });
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const getItemListHandler = useCallback(async () => {
    try {
      const res = await instance.get(`/pingpong/items/store`);
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
      detailTitle: item.mainContent,
      detailContent: item.subContent,
    });
  };

  useEffect(() => {
    getItemListHandler();
  }, []);

  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table className={styles.table} aria-label='customized table'>
        <AdminTableHead tableName={'itemList'} table={tableTitle} />
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
                            src={
                              item.imageUri
                                ? item[columnName]
                                : '/public/image/fallBackSrc.jpeg'
                            }
                            alt='Item Iamge'
                            width={30}
                            height={30}
                          />
                        ) : columnName === 'content' ? (
                          <div>
                            {item.mainContent}
                            <br />
                            <span
                              style={{ cursor: 'pointer', color: 'grey' }}
                              onClick={() => openDetailModal(item)}
                            >
                              ...더보기
                            </span>
                          </div>
                        ) : columnName === 'edit' ? (
                          <button
                            className={styles.editBtn}
                            onClick={() => editItem(item)}
                          >
                            수정
                          </button>
                        ) : columnName === 'delete' ? (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteItem(item)}
                          >
                            삭제
                          </button>
                        ) : columnName === 'content' ? (
                          <div>
                            {item.mainContent}
                            <span
                              style={{ cursor: 'pointer', color: 'grey' }}
                              onClick={() =>
                                setModal({
                                  modalName: 'ADMIN-DETAIL_CONTENT',
                                  detailTitle: item.mainContent,
                                  detailContent: item.subContent,
                                })
                              }
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
              </TableRow>
            ))
          ) : (
            <AdminEmptyItem content={'아이템 목록이 비어있습니다'} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemList;
